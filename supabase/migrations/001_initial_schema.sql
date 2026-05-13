-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase Auth users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  daily_goal_minutes int default 60 not null,
  subscription_tier text default 'free' not null check (subscription_tier in ('free', 'pro', 'team')),
  accent_color text default 'lime' not null check (accent_color in ('lime', 'cyan', 'coral')),
  total_focus_minutes int default 0,
  level int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Identities table
create table identities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  color text not null default '#ccff00',
  icon text,
  sort_order int default 0,
  is_archived boolean default false,
  total_minutes int default 0,
  created_at timestamptz default now()
);

-- Tasks table
create table tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  identity_id uuid references identities(id) on delete set null,
  estimated_minutes int,
  is_recurring boolean default false,
  recurrence_rule text,
  due_date date,
  completed_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz default now()
);

-- Focus sessions table
create table focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  task_id uuid references tasks(id) on delete set null,
  identity_id uuid not null references identities(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  duration_seconds int not null,
  was_completed boolean default true,
  created_at timestamptz default now()
);

-- Daily logs table (materialized for fast grid queries)
create table daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  total_minutes int default 0,
  identity_breakdown jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);

-- Crews table
create table crews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique not null,
  created_by uuid not null references profiles(id) on delete cascade,
  challenge_config jsonb default '{"default_target_hours": 40, "default_cadence": "weekly"}',
  created_at timestamptz default now()
);

-- Crew memberships table
create table crew_memberships (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references crews(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  privacy_level text default 'ring_only' not null check (privacy_level in ('ghost', 'ring_only', 'identity_breakdown')),
  joined_at timestamptz default now(),
  unique(crew_id, user_id)
);

-- Crew challenges table
create table crew_challenges (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references crews(id) on delete cascade,
  title text not null,
  target_hours int,
  target_completions int,
  identity_filter uuid[],
  starts_at date not null,
  ends_at date not null,
  created_by uuid not null references profiles(id) on delete cascade,
  created_at timestamptz default now()
);

-- Crew progress table (aggregate)
create table crew_progress (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references crews(id) on delete cascade,
  challenge_id uuid references crew_challenges(id) on delete cascade,
  date date not null,
  total_hours numeric default 0,
  total_completions int default 0,
  updated_at timestamptz default now()
);

-- Wrapped reports table
create table wrapped_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  year int not null,
  is_rolling boolean default false,
  report_data jsonb not null,
  share_card_url text,
  generated_at timestamptz default now(),
  unique(user_id, year, is_rolling)
);

-- Indexes for performance
create index idx_identities_user on identities(user_id);
create index idx_tasks_user on tasks(user_id);
create index idx_tasks_identity on tasks(identity_id);
create index idx_focus_sessions_user on focus_sessions(user_id);
create index idx_focus_sessions_identity on focus_sessions(identity_id);
create index idx_focus_sessions_started on focus_sessions(started_at);
create index idx_daily_logs_user_date on daily_logs(user_id, date);
create index idx_crew_memberships_crew on crew_memberships(crew_id);
create index idx_crew_memberships_user on crew_memberships(user_id);
create index idx_crew_challenges_crew on crew_challenges(crew_id);

-- Row Level Security (RLS)
alter table profiles enable row level security;
alter table identities enable row level security;
alter table tasks enable row level security;
alter table focus_sessions enable row level security;
alter table daily_logs enable row level security;
alter table crews enable row level security;
alter table crew_memberships enable row level security;
alter table crew_challenges enable row level security;
alter table crew_progress enable row level security;
alter table wrapped_reports enable row level security;

-- RLS Policies

-- Profiles: users can read/update their own
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Identities: user owns data
create policy "Users can CRUD own identities"
  on identities for all
  using (auth.uid() = user_id);

-- Tasks: user owns data
create policy "Users can CRUD own tasks"
  on tasks for all
  using (auth.uid() = user_id);

-- Focus sessions: user owns data
create policy "Users can CRUD own focus sessions"
  on focus_sessions for all
  using (auth.uid() = user_id);

-- Daily logs: user owns data
create policy "Users can CRUD own daily logs"
  on daily_logs for all
  using (auth.uid() = user_id);

-- Crews: members can read, creator can update
create policy "Crew members can read crews"
  on crews for select
  using (exists (
    select 1 from crew_memberships where crew_id = crews.id and user_id = auth.uid()
  ));

create policy "Crew creators can update"
  on crews for update
  using (created_by = auth.uid());

-- Crew memberships: members can read
create policy "Members can read crew memberships"
  on crew_memberships for select
  using (crew_id in (
    select crew_id from crew_memberships where user_id = auth.uid()
  ));

create policy "Users can join crews"
  on crew_memberships for insert
  with check (auth.uid() = user_id);

create policy "Users can leave crews"
  on crew_memberships for delete
  using (auth.uid() = user_id);

-- Crew challenges: members can read, creator can write
create policy "Members can read challenges"
  on crew_challenges for select
  using (crew_id in (
    select crew_id from crew_memberships where user_id = auth.uid()
  ));

create policy "Creators can manage challenges"
  on crew_challenges for all
  using (created_by = auth.uid());

-- Crew progress: members can read
create policy "Members can read crew progress"
  on crew_progress for select
  using (crew_id in (
    select crew_id from crew_memberships where user_id = auth.uid()
  ));

-- Wrapped reports: user owns data
create policy "Users can CRUD own wrapped reports"
  on wrapped_reports for all
  using (auth.uid() = user_id);

-- Function to update profile level on focus session insert
create or replace function update_profile_level()
returns trigger as $$
begin
  update profiles
  set 
    total_focus_minutes = total_focus_minutes + (new.duration_seconds / 60),
    level = floor((total_focus_minutes + (new.duration_seconds / 60)) / 600),
    updated_at = now()
  where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_focus_session_inserted
  after insert on focus_sessions
  for each row
  execute function update_profile_level();

-- Function to update identity total_minutes
create or replace function update_identity_minutes()
returns trigger as $$
begin
  update identities
  set total_minutes = total_minutes + (new.duration_seconds / 60)
  where id = new.identity_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_focus_session_identity_update
  after insert on focus_sessions
  for each row
  execute function update_identity_minutes();

# SOCIAL_FEATURES.md — Monolith Social Module Deep Dive

## Philosophy

Monolith's social layer is **opt-in, minimally intrusive, and competence-focused**. It is designed around the principle that **local competition beats global competition**, and that social proof should feel supportive — not surveillant.

**Core Tenets:**
1. **Privacy by default**: Share nothing unless explicitly chosen
2. **No judgment**: The app never shames users for low activity
3. **Cooperation over competition**: Crew challenges are shared goals, not leaderboards
4. **Minimal cognitive load**: Social features do not become a second job
5. **Competence reflection**: Wrapped is a mirror, not a scorecard

**What We Reject:**
- Global leaderboards
- Public activity feeds
- Likes, kudos, reactions
- Streak comparisons
- Read receipts or activity status
- Any feature that makes users feel watched

---

## Feature 1: Crews

### Concept
A **Crew** is a private micro-group of 3–8 people bound by mutual accountability without surveillance. It is not a team. It is not a company. It is a pact.

### Creation
- Any Pro user can create a Crew
- Crew name: Max 30 characters
- Invite code: Auto-generated 6-character alphanumeric (e.g., `X7K9P2`)
- Invite link: `monolith://join-crew?code=X7K9P2`
- Crews cannot be public or discoverable

### Membership
- Max 8 members (soft constraint, can be increased)
- Members join via invite code or link
- No approval required (trust-based via code secrecy)
- Members can leave anytime
- Creator can remove members
- Crew auto-deletes if all members leave

### Privacy Levels
Every member chooses their privacy level per crew:

| Level | Shared Data | Use Case |
|---|---|---|
| **Ghost** | Nothing. You see aggregate challenge progress but contribute anonymously. | Private person who wants group accountability without exposure |
| **Ring Only** | Binary: Did you hit your daily goal today? (yes/no) | Light sharing, no details |
| **Identity Breakdown** | Your hours per identity toward the challenge | Full transparency with trusted friends |

**Default for new members:** Ring Only

**Changing privacy:** Anytime from Crew Settings. Changes apply immediately.

### Crew Dashboard

**Layout:**
- Header: Crew name, member count, invite code (tap to copy)
- Active Challenge: Title, target, progress bar, time remaining
- Member Pulse: "4/6 members hit their ring this week" (respects privacy — ghosts not counted in denominator)
- My Contribution: Your hours toward the current challenge
- Challenge History: Past challenges, completion status

**Member List (Minimal):**
- Shows avatar + first name (or "Anonymous" for ghosts)
- Privacy icon next to name: 🔒 (ghost), 👁️ (ring only), 📊 (breakdown)
- No individual stats displayed inline
- Tap member → Shows what they chose to share (respects privacy level)

### Crew Challenges

**Structure:**
- **Creator**: Crew creator or designated admin
- **Target Type**: Aggregate hours OR total completions
- **Target Value**: Numeric (e.g., 50 hours, 20 completions)
- **Identity Filter**: Optional. Only time logged to specified identities counts.
- **Cadence**: User-defined — Weekly or Bi-weekly
- **Start/End**: Explicit dates

**Auto-Generation:**
- If no challenge is active, the app suggests one based on crew's historical performance
- Suggestion: Previous challenge target + 10% (if completed) or -10% (if failed)
- Creator can accept, modify, or ignore suggestion

**Challenge States:**
| State | Visual | Action |
|---|---|---|
| Active | Progress bar filling | Log time normally, it counts |
| Completed | Full bar, subtle checkmark | Next challenge auto-suggested |
| Failed | Bar at final position, muted | No penalty. Next challenge auto-suggested with lower target |

**Example Challenges:**
- "Collectively log 40 hours of focused work this week"
- "Complete 15 exercise sessions before Sunday night"
- "Everyone hits their daily goal at least 4 times this week"
- "50 hours of Code collectively — Deep Work only"

### Notifications
- **Challenge Started**: "New crew challenge: 50 hours of focused work. You've got this week."
- **Progress Milestone**: "Your crew is 75% to the weekly goal. 3 days left."
- **Challenge Complete**: "Challenge completed! Your crew logged 52 hours this week."
- **NEVER**: "John hasn't hit his ring in 3 days" or "You're falling behind the crew"

### Crew Settings
- Crew name
- Invite code (regenerate)
- Default challenge config (target type, cadence)
- Member management (remove, transfer ownership)
- Leave Crew
- Delete Crew (creator only)

---

## Feature 2: Wrapped (Annual Competence Report)

### Concept
A **personal, shareable annual report** that proves your competence growth. Think Spotify Wrapped, but for focused work. It answers: "What did I actually accomplish this year?"

### Generation Modes

**Calendar Year:**
- Auto-generated on January 1st for the previous year
- User receives a subtle notification: "Your 2025 Wrapped is ready."
- Report is permanent and viewable anytime

**Rolling Year:**
- User can generate anytime from Profile screen
- Covers last 365 days from generation date
- Does not replace calendar year report
- Useful for mid-year reflection or after a big life change

### Data Points

| Section | Data | Visualization |
|---|---|---|
| **Hero** | "Your Year in Focus" | Large title + year |
| **Total Hours** | Sum of all focus sessions | Giant number (JetBrains Mono, display size) |
| **Top Identity** | Identity with most hours + percentage | Name + percentage + mini grid filtered to that identity |
| **Strongest Month** | Month with highest total hours | Month name + hours + mini grid for that month |
| **Skill Velocity** | % change in avg session length vs. previous year | Number + trend arrow + sparkline |
| **Milestone Moments** | Longest session, most productive day, longest consistency streak | Cards with date + value |
| **Identity Breakdown** | Hours per identity | Horizontal bar chart (Monolith colors) |
| **Full-Year Grid** | 365-day contribution grid | High-resolution render, scrollable |
| **Comparison** | "You focused 23% more than last year" | Simple text stat |

### Computation
Wrapped data is pre-computed via **Supabase Edge Function** to avoid heavy client-side queries:

```sql
-- Edge Function: generate_wrapped(user_id, year)
-- 1. Aggregate focus_sessions by identity
-- 2. Find strongest month from daily_logs
-- 3. Calculate skill velocity (compare to previous year)
-- 4. Find milestone moments
-- 5. Generate share_card_url (via S3/Supabase Storage + image generation library)
-- 6. Store result in wrapped_reports table
```

Execution: Triggered on Jan 1 via cron job, or on-demand via RPC call.

### Shareable Image Card

**Design:**
- Aspect ratio: 1080 × 1920 (Instagram Story) or 1200 × 630 (Twitter/LinkedIn)
- Background: `#0a0a0a`
- Accent: User's chosen accent color (lime, cyan, coral)
- Typography: JetBrains Mono for numbers, Plus Jakarta Sans for text
- Layout: Vertical stack of stats, clean spacing

**Privacy Toggles:**
Before generating the share card, user selects which stats to include:
- [x] Total Hours (default on)
- [x] Top Identity (default on)
- [ ] Skill Velocity
- [ ] Milestone Moments
- [ ] Identity Breakdown
- [ ] Full-Year Grid

**Default selection:** Conservative (Total Hours + Top Identity only)

**Sharing:**
- Native share sheet (iOS/Android)
- Generated image is temporary (expires in 30 days)
- No public URL. No web profile. The image is the only artifact.

### Wrapped Preview Screen

**Layout:**
- Full-screen scrollable
- Each section is a full viewport height (card-like)
- Smooth scroll snapping between sections
- Background subtly shifts between `#0a0a0a` and `#0f0f0f` per section
- No navigation bar. Back button floats top-left.

**Sections Flow:**
1. Hero (title + year)
2. Total Hours (giant number, fade in on scroll)
3. Top Identity (name + mini grid)
4. Strongest Month (calendar visualization)
5. Skill Velocity (sparkline animates on view)
6. Milestones (staggered card reveal)
7. Identity Breakdown (bars grow on scroll)
8. Full Grid (zoom out to show entire year)
9. Share CTA (generate card button)

---

## Feature 3: Ambient Social Proof (Solo Tier)

Even without joining a Crew, the app provides anonymous social benchmarks:

### Global Anonymous Pulse
- **Opt-in toggle** in settings (default: off)
- Shows: "Users like you average 4.2 hours of focused work per week"
- "Like you" means: similar daily goal, similar identity mix
- Data is anonymized and aggregated (minimum 100 users in bucket)
- No usernames. No rankings. Just context.

### Competence Benchmarks
- Insight cards that reference anonymized data:
  - "You're in the top 20% of Monolith users for session consistency."
  - "Your Deep Work ratio is higher than 65% of users with a 'Code' identity."
- Framed as validation, not status
- No percentile shown if user is below 50% (no negative social proof)

---

## Data Model (Social Layer)

### Crews
```sql
create table crews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,           -- 6-char invite code
  created_by uuid references profiles(id),
  challenge_config jsonb default '{"default_target_hours": 40, "default_cadence": "weekly"}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Crew Memberships
```sql
create table crew_memberships (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid references crews(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  privacy_level text not null default 'ring_only' check (privacy_level in ('ghost', 'ring_only', 'identity_breakdown')),
  joined_at timestamptz default now(),
  unique(crew_id, user_id)
);
```

### Crew Challenges
```sql
create table crew_challenges (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid references crews(id) on delete cascade,
  title text not null,
  target_hours int,
  target_completions int,
  identity_filter uuid[],              -- Array of identity IDs
  starts_at date not null,
  ends_at date not null,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);
```

### Crew Progress (Aggregate)
```sql
create table crew_progress (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid references crews(id) on delete cascade,
  challenge_id uuid references crew_challenges(id) on delete cascade,
  date date not null,
  total_hours numeric default 0,
  total_completions int default 0,
  updated_at timestamptz default now()
);
-- Updated daily by edge function or trigger
```

### Wrapped Reports
```sql
create table wrapped_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  year int not null,
  is_rolling boolean default false,
  report_data jsonb not null,
  share_card_url text,
  generated_at timestamptz default now(),
  unique(user_id, year, is_rolling)
);
```

---

## Privacy & Security Rules

### Row-Level Security
```sql
-- Crews: Members can read their crews
create policy "Crew members can read their crews"
  on crews for select
  using (exists (
    select 1 from crew_memberships 
    where crew_id = crews.id and user_id = auth.uid()
  ));

-- Crew memberships: Members can read, but only see what privacy allows
create policy "Members can read crew memberships"
  on crew_memberships for select
  using (crew_id in (
    select crew_id from crew_memberships where user_id = auth.uid()
  ));

-- Challenges: Members can read
create policy "Members can read crew challenges"
  on crew_challenges for select
  using (crew_id in (
    select crew_id from crew_memberships where user_id = auth.uid()
  ));

-- Wrapped: User owns their data
create policy "Users own their wrapped reports"
  on wrapped_reports for all
  using (user_id = auth.uid());
```

### Data Minimization
- Crew progress stores ONLY aggregate data, never individual logs
- Ghost members contribute to aggregate but have zero identifiable data
- Wrapped share cards are generated server-side and stored as images (not raw data)
- All social data is deleted when user deletes account

---

## Edge Cases

| Scenario | Behavior |
|---|---|
| Crew creator deletes account | Ownership transfers to oldest member. If no members, crew deletes. |
| Member switches to Ghost mid-challenge | Their future contributions become anonymous. Past contributions remain in aggregate. |
| Challenge target is impossible | Crew can vote to adjust target (simple majority). Or creator overrides. |
| Wrapped generation fails | Retry once. If still failing, show "Wrapped is being generated" with manual refresh. |
| Share card image fails to generate | Fallback to text-based share (copy stats to clipboard). |
| User in multiple crews | Separate dashboards per crew. No cross-crew visibility. |
| Crew reaches 8 members | New joins blocked. Creator must remove someone or upgrade (future). |

---

## Implementation Phases

### Phase 1: Crews MVP (v3.0)
- Crew creation and joining
- Basic challenges (aggregate hours, weekly cadence)
- Ring-only and Identity Breakdown privacy
- Ghost mode (v3.1)

### Phase 2: Enhanced Crews (v3.2)
- Bi-weekly cadence
- Identity filter challenges
- Challenge history
- Auto-generation suggestions

### Phase 3: Wrapped (v3.3)
- Calendar year generation
- Rolling year generation
- Shareable image cards
- Privacy toggles

### Phase 4: Ambient Social (v3.4)
- Global anonymous pulse
- Competence benchmarks
- Opt-in insights

---

## Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| Crew Creation Rate | 10% of Pro users | # crews created / # pro users |
| Crew Retention | 60% active after 4 weeks | % crews with challenge activity |
| Wrapped Share Rate | 25% of users share | # shares / # wrapped generated |
| Privacy Level Distribution | 40% Ring Only, 35% Breakdown, 25% Ghost | Survey or analytics |
| Social Feature NPS | > 40 | In-app survey |

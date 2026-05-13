export type SubscriptionTier = 'free' | 'pro' | 'team';
export type PrivacyLevel = 'ghost' | 'ring_only' | 'identity_breakdown';
export type ChallengeCadence = 'weekly' | 'bi_weekly';

export interface User {
  id: string;
  email: string;
  display_name: string;
  username: string;
  avatar_url?: string;
  daily_goal_minutes: number;
  subscription_tier: SubscriptionTier;
  accent_color: 'lime' | 'cyan' | 'coral';
  created_at: string;
  updated_at: string;
}

export interface Identity {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  sort_order: number;
  is_archived: boolean;
  total_minutes: number;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  identity_id: string;
  estimated_minutes?: number;
  is_recurring: boolean;
  recurrence_rule?: string;
  due_date?: string;
  completed_at?: string;
  archived_at?: string;
  created_at: string;
}

export interface FocusSession {
  id: string;
  user_id: string;
  task_id?: string;
  identity_id: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  was_completed: boolean;
  created_at: string;
}

export interface DailyLog {
  id: string;
  user_id: string;
  date: string;
  total_minutes: number;
  identity_breakdown: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface Crew {
  id: string;
  name: string;
  code: string;
  created_by: string;
  challenge_config: {
    default_target_hours: number;
    default_cadence: ChallengeCadence;
  };
  created_at: string;
}

export interface CrewMembership {
  id: string;
  crew_id: string;
  user_id: string;
  privacy_level: PrivacyLevel;
  joined_at: string;
}

export interface CrewChallenge {
  id: string;
  crew_id: string;
  title: string;
  target_hours?: number;
  target_completions?: number;
  identity_filter?: string[];
  starts_at: string;
  ends_at: string;
  created_by: string;
  created_at: string;
}

export interface WrappedReport {
  id: string;
  user_id: string;
  year: number;
  is_rolling: boolean;
  report_data: {
    total_hours: number;
    top_identity: { name: string; hours: number; percentage: number };
    strongest_month: { month: string; hours: number };
    skill_velocity: number;
    longest_session: { duration: number; date: string };
    most_productive_day: { date: string; hours: number };
    identity_breakdown: Record<string, number>;
  };
  share_card_url?: string;
  generated_at: string;
}

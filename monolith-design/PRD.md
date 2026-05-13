# PRD.md — Monolith Product Requirements Document

## 1. Product Overview

### 1.1 Vision
Monolith is a minimalist, cross-platform competence tracker. It visualizes focused work through an effort-based contribution grid with a brutalist aesthetic. The product rewards meaningful progress — not app usage — and makes users feel they are improving at the things they care about.

### 1.2 Target Audience
- Primary: Developers, engineers, designers, writers, and other knowledge workers who value deep work
- Secondary: Anyone who wants to track focused time across different life areas (fitness, creative work, learning)
- Psychographic: Values minimalism, privacy, and data ownership. Skeptical of "engagement theater."

### 1.3 Platforms & Phases

| Phase | Platforms | Timeline | Focus |
|---|---|---|---|
| **MVP** | iOS, Android (Expo) | Months 1-3 | Core loop: Grid + Focus + Identities |
| **v2** | iOS/Android + Interactive Widgets + macOS/Linux (Tauri) | Months 4-6 | Widgets, desktop sync, advanced analytics |
| **v3** | All platforms + Social | Months 7-9 | Crews, Wrapped, team tier |

---

## 2. Core User Flows

### 2.1 Onboarding Flow

**Screen 1: Welcome**
- Full-screen dark background
- Monolith logo (acid lime geometric shape)
- Headline: "Track what matters."
- Subhead: "A competence tracker for people who do deep work."
- CTA: "Get Started" (accent button)
- No account required for free tier

**Screen 2: Set Daily Goal**
- "How many focused minutes do you aim for each day?"
- Slider: 15min to 240min, default 60min
- Giant number display in JetBrains Mono
- Context: "This fills your daily ring. You can change this anytime."

**Screen 3: Pick Identities**
- "What areas of your life do you want to track?"
- Pre-set identities: Code, Write, Design, Learn, Exercise, Create
- User can add custom identities with color picker
- Select 2-3 minimum, no maximum for Pro
- Free tier: Select 1, "Upgrade for more" prompt if selecting second

**Screen 4: Widget Setup**
- "Add Monolith to your home screen"
- Visual preview of small, medium, large widgets
- Instructions for iOS/Android widget installation
- Skip button available

**Screen 5: Done**
- "You're ready."
- First grid cell is shown empty with today's date
- CTA: "Start your first session"

### 2.2 Daily Core Loop

**Step 1: Plan (Grid Screen)**
- User opens app, sees their contribution grid
- Grid shows past 6 months by default, scrollable
- Today's cell is outlined in accent
- Below grid: Today's task list (swipeable rows)
- Tap "+" or swipe down to add task

**Step 2: Focus**
- User taps a task → "Start Focus"
- App transitions to Focus Mode (full screen, zero chrome)
- Timer starts counting up (not down — Pomodoro is optional, not default)
- Background is `#0a0a0a`, timer digits are acid lime JetBrains Mono at 48px
- Swipe up to cancel, tap to pause
- On end: User categorizes time by identity (pre-filled from task)

**Step 3: Reflect**
- Grid updates instantly
- Ring fills proportionally
- If daily goal reached: Subtle accent glow on ring (no confetti, no "YOU DID IT!" popup)
- Insight Card may appear: "You've done 4 hours of Deep Work this week. That's 20% more than last week."

### 2.3 Quick Log (No Focus Mode)**
- Swipe a task → "Log Time"
- Bottom sheet opens: "How long did you spend?" + Identity selector
- Submit → Grid updates

### 2.4 Retroactive Logging**
- Tap any past grid cell
- Bottom sheet: "Log activity for May 12"
- Input: Duration + Identity
- Submit → Cell updates, daily log recalculates

---

## 3. Screen Specifications

### 3.1 Grid Screen (Home)

**Layout:**
- Header: Profile avatar (tap → Profile), Settings gear, Current level (mono-sm)
- Hero: Contribution grid (scrollable horizontally through months, vertically through weeks)
- Identity Filter Pills: Horizontal scroll, tap to filter grid by identity
- Today's Ring: Large ring below grid, shows today's progress %
- Task List: Below ring. Today's tasks. Swipe actions: Complete | Log Time | Delete
- Floating Action Button: "+" (accent, bottom-right) for new task

**Grid Behavior:**
- 7 rows (Sun-Sat) × variable columns (months)
- Cell size: 12px, gap: 3px
- Tap cell: Show tooltip with date, total minutes, identity breakdown
- Long press cell: Open retroactive log sheet
- Today: 1px accent border

**Empty State:**
- Grid shows past 6 months, all cells `grid-0`
- Centered text: "Start your first focus session"
- CTA: "Focus" button

### 3.2 Focus Mode

**Layout:**
- Full screen, `#0a0a0a` background
- Top: Identity pill (shows what you're tracking). Tap to change.
- Center: Timer in JetBrains Mono `display` size (48px)
  - Format: `01:23:45` (hours:minutes:seconds)
- Below timer: Task name (if started from task)
- Bottom: Controls
  - Left: Pause/Resume (icon button)
  - Center: Stop (accent button, larger)
  - Right: Cancel (ghost button)
- Swipe up from bottom: Cancel with confirmation

**States:**
- **Idle**: Timer at `00:00:00`, "Tap to start" hint
- **Running**: Timer counts up every second, screen stays awake
- **Paused**: Timer frozen, dimmed, "Paused" label
- **Complete**: Transition to Log Summary sheet (duration, identity confirmation)

**Background Behavior:**
- App goes background: Timer continues via `expo-task-manager` background task
- Notification: "Focus session in progress — 45m elapsed"
- Return to app: Timer shows current elapsed time

### 3.3 Log Task / Quick Log Sheet

**Layout (Bottom Sheet):**
- Handle bar at top
- Title: "Log Activity" or "Quick Log"
- Input: "What did you work on?" (text field)
- Identity Selector: Horizontal scroll of identity pills, single select
- Duration: Number input + unit selector (min / hr)
- Date: Default today, tap to change
- Submit: "Save" (accent button)

**Validation:**
- Title: Required, max 100 chars
- Identity: Required
- Duration: Required, max 12 hours
- Date: Cannot be future

### 3.4 Identity Manager

**Layout:**
- Header: "Identities" + "Add" button (Pro only, or upgrade prompt)
- List of identity cards:
  - Color indicator (left border)
  - Name + total hours logged
  - Mini grid (last 30 days, filtered to this identity)
  - Tap → Identity detail screen
- Reorder via drag handle (Pro only)

**Identity Detail:**
- Large filtered grid (all time)
- Stats: Total hours, sessions count, average session length
- Recent tasks filtered to this identity
- Edit / Archive / Delete actions

### 3.5 Profile / Stats Screen

**Layout:**
- Header: User avatar, display name, username
- Level Badge: Large level number + title (e.g., "Level 12 — Architect")
- Current Ring: Today's progress + weekly streak (momentum, not guilt-based)
- Skill Velocity Sparkline: Line chart showing average session length over last 8 weeks
- Personal Records:
  - "Longest session: 3h 12m"
  - "Most productive day: 8h 45m"
  - "Most consistent identity: Code"
- Identity Breakdown: Horizontal bar chart of hours per identity
- Subscription Card: Current tier, upgrade CTA (if Free)

### 3.6 Settings Screen

**Sections:**
- **Account**: Edit profile, change password, sign out
- **Daily Goal**: Slider to adjust (affects ring target)
- **Notifications**: Focus reminders, daily summary, crew updates
- **Appearance**: Accent color picker (Pro: lime, cyan, coral. Free: lime only)
- **Data**: Export CSV/JSON (Pro), delete all data, delete account
- **About**: Version, privacy policy, terms, support email
- **Debug** (dev only): Sync status, offline queue, clear cache

### 3.7 Crew Dashboard (v3)

**Layout:**
- Header: Crew name, member count
- Weekly Challenge: Progress bar (aggregate hours vs. target)
- Member Pulse: "4/5 members hit their ring this week" (no names unless opted in)
- My Contribution: Your hours toward the challenge
- Invite Code: Shareable 6-char code

**Privacy Indicators:**
- Each member shows a privacy icon: 🔒 (ghost), 👁️ (ring only), 📊 (breakdown)
- No individual stats visible for ghost members

### 3.8 Wrapped Preview (v3)

**Layout:**
- Full-screen scrollable report
- Sections:
  1. "Your Year in Focus" — hero title
  2. Total Focus Hours (giant number)
  3. Top Identity with percentage
  4. Strongest Month with mini grid
  5. Skill Velocity: "+18% avg session length"
  6. Milestone Moments (longest session, most productive day)
  7. Full-year grid (high-res render)
- CTA: "Generate Share Card" → Opens image preview with privacy toggles
- Share: Native share sheet with generated image

---

## 4. Data Model

### 4.1 Core Entities

```typescript
interface User {
  id: string;                    // Supabase Auth UUID
  email: string;
  display_name: string;
  username: string;              // Unique, @handle
  avatar_url?: string;
  daily_goal_minutes: number;    // Default: 60
  subscription_tier: 'free' | 'pro' | 'team';
  accent_color: 'lime' | 'cyan' | 'coral';
  created_at: string;
  updated_at: string;
}

interface Identity {
  id: string;
  user_id: string;
  name: string;                  // e.g., "Code", "Write", "Exercise"
  color: string;                 // Hex color for identity
  icon?: string;                 // Lucide icon name
  sort_order: number;
  is_archived: boolean;
  total_minutes: number;         // Computed / cached
  created_at: string;
}

interface Task {
  id: string;
  user_id: string;
  title: string;
  identity_id: string;
  estimated_minutes?: number;
  is_recurring: boolean;
  recurrence_rule?: string;      // RFC 5545 RRULE
  due_date?: string;
  completed_at?: string;
  archived_at?: string;
  created_at: string;
}

interface FocusSession {
  id: string;
  user_id: string;
  task_id?: string;              // Optional (free-form focus)
  identity_id: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  was_completed: boolean;        // False if cancelled
  created_at: string;
}

interface DailyLog {
  id: string;
  user_id: string;
  date: string;                  // ISO date (YYYY-MM-DD)
  total_minutes: number;
  identity_breakdown: Record<string, number>;  // { identity_id: minutes }
  created_at: string;
  updated_at: string;
}
```

### 4.2 Social Entities

```typescript
interface Crew {
  id: string;
  name: string;
  code: string;                  // 6-char invite code
  created_by: string;            // user_id
  challenge_config: {
    default_target_hours: number;
    default_cadence: 'weekly' | 'bi_weekly';
  };
  created_at: string;
}

interface CrewMembership {
  id: string;
  crew_id: string;
  user_id: string;
  privacy_level: 'ring_only' | 'identity_breakdown' | 'ghost';
  joined_at: string;
}

interface CrewChallenge {
  id: string;
  crew_id: string;
  title: string;
  target_hours: number;
  target_completions?: number;
  identity_filter?: string[];    // Optional: only count specific identities
  starts_at: string;
  ends_at: string;
  created_at: string;
}

interface WrappedReport {
  id: string;
  user_id: string;
  year: number;
  report_data: {
    total_hours: number;
    top_identity: { name: string; hours: number; percentage: number };
    strongest_month: { month: string; hours: number };
    skill_velocity: number;       // Percentage change in avg session
    longest_session: { duration: number; date: string };
    most_productive_day: { date: string; hours: number };
    identity_breakdown: Record<string, number>;
  };
  share_card_url?: string;       // Generated image URL
  generated_at: string;
}
```

### 4.3 Computed / Cached Fields

- `profiles.total_focus_minutes`: Cached from sum of all `focus_sessions`
- `profiles.level`: Computed from `total_focus_minutes / 600` (1 level per 10 hours)
- `identities.total_minutes`: Cached from sum of sessions for that identity
- `daily_logs`: Materialized view or trigger-maintained table for fast grid queries

---

## 5. Feature Requirements

### 5.1 Grid Visualization

**FR-1**: The contribution grid must display the last 12 months of activity by default, scrollable to earlier dates.
**FR-2**: Each cell represents one day. Color intensity corresponds to focused minutes relative to daily goal.
**FR-3**: Tapping a cell shows a tooltip with date, total minutes, and identity breakdown.
**FR-4**: Long-pressing a cell opens a bottom sheet for retroactive logging.
**FR-5**: Today's cell has a 1px accent border.
**FR-6**: The grid must update instantly (within 100ms) after logging a session.

### 5.2 Focus Timer

**FR-7**: The timer counts up from zero (not down from a preset).
**FR-8**: The screen stays awake during an active session.
**FR-9**: Background sessions continue timing via background task and show a persistent notification.
**FR-10**: Pausing the timer freezes the count but keeps the session alive.
**FR-11**: Cancelling a session discards the elapsed time (no log created).
**FR-12**: Completing a session creates a `focus_session` record and updates `daily_logs`.

### 5.3 Identities

**FR-13**: Users can create custom identities with a name and color.
**FR-14**: Free users are limited to 1 active identity. Pro users have unlimited.
**FR-15**: Archiving an identity hides it from the filter bar but preserves historical data.
**FR-16**: Deleting an identity removes it from the filter but keeps sessions labeled "Uncategorized."
**FR-17**: Each identity has its own filtered grid view in the Identity Manager.

### 5.4 Tasks

**FR-18**: Users can create tasks with a title, identity, estimated duration, and optional due date.
**FR-19**: Tasks can be marked complete without logging time (binary todo mode).
**FR-20**: Completing a task with time logs creates both a task completion and a focus session.
**FR-21**: Tasks support swipe actions: Complete, Log Time, Delete.
**FR-22**: Recurring tasks generate new instances based on RRULE.

### 5.5 Widgets (v1)

**FR-23**: Small widget shows today's ring progress percentage and total minutes.
**FR-24**: Medium widget shows a 7-day mini-grid and top 2 incomplete tasks.
**FR-25**: Large widget shows a full month grid with identity filter indicator.
**FR-26**: Widgets update at least every 15 minutes via background fetch.
**FR-27**: Tapping a widget deep-links into the app.

### 5.6 Widgets (v2)

**FR-28**: Interactive widgets allow checking off tasks directly from the home screen.
**FR-29**: Interactive widgets allow starting a quick focus session with a pre-selected identity.
**FR-30**: Widget actions update the app's state via shared storage and trigger a background sync.

### 5.7 Crews (v3)

**FR-31**: Users can create a crew with a name and invite code.
**FR-32**: Crews support 3-8 members.
**FR-33**: Members choose a privacy level: ring_only, identity_breakdown, or ghost.
**FR-34**: Crew challenges have user-defined cadence (weekly or bi-weekly).
**FR-35**: Challenge progress shows aggregate hours, not individual contributions.
**FR-36**: No messaging or chat within crews.

### 5.8 Wrapped (v3)

**FR-37**: Wrapped generates for calendar years and rolling 365-day windows.
**FR-38**: Reports include total hours, top identity, strongest month, skill velocity, milestones.
**FR-39**: Users can generate a shareable image card with privacy toggles per stat.
**FR-40**: Share cards use the Monolith design system (dark background, acid lime accents).

### 5.9 Sync & Offline

**FR-41**: The app works fully offline. All mutations queue in AsyncStorage.
**FR-42**: On network recovery, the offline queue flushes in order.
**FR-43**: Conflict resolution: Last-write-wins per field. If a conflict is detected, the local value is preserved and flagged for review.
**FR-44**: Supabase Realtime subscriptions update the UI for active tables.

---

## 6. Edge Cases & Error Handling

| Scenario | Behavior |
|---|---|
| **No network on app launch** | Show cached data. Display subtle "Offline" indicator in header. |
| **Focus session interrupted by OS** | Save elapsed time. Show notification: "Session paused. Tap to resume." |
| **Device timezone changes** | Recompute daily_logs for affected dates. Preserve session times in UTC. |
| **Duplicate offline mutations** | Deduplicate by mutation ID. Ignore duplicates. |
| **Supabase RLS rejection** | Log error locally. Show "Sync error" in settings. Do not crash. |
| **User deletes account** | Clear all local data. Call `supabase.auth.signOut()`. Remove from all crews. |
| **Subscription expires** | Downgrade to Free tier gracefully. Keep Pro data but gate new Pro actions. |
| **Widget data stale** | Show last known data with subtle timestamp. Never show empty/error state. |
| **Focus session > 12 hours** | Cap at 12 hours. Prompt user to end session. |
| **Retroactive log on future date** | Reject with validation error. |

---

## 7. Analytics & Telemetry

Track only product-relevant events (not engagement theater):

| Event | Purpose |
|---|---|
| `focus_session_started` | Understand which identities users focus on most |
| `focus_session_completed` | Measure session completion rate |
| `task_created` | Understand task volume |
| `identity_created` | Understand identity diversity |
| `grid_cell_tapped` | Verify grid is being used for reflection |
| `wrapped_shared` | Measure Wrapped virality |
| `crew_challenge_completed` | Measure social feature engagement |
| `subscription_upgraded` | Revenue attribution |

**Do NOT track:**
- Daily active users (DAU)
- Session duration in app
- Screen view counts
- Time spent per screen

---

## 8. Performance Targets

| Metric | Target |
|---|---|
| App launch (cold) | < 2s |
| App launch (warm) | < 500ms |
| Grid render (12 months) | < 100ms |
| Focus timer accuracy | ±1s per hour |
| Widget update latency | < 15 minutes |
| Offline sync flush | < 5s for < 100 queued mutations |
| Bundle size (mobile) | < 15MB |

---

## 9. Accessibility Requirements

- All interactive elements have `accessibilityLabel` and `accessibilityRole`
- Grid cells have `accessibilityLabel`: "May 13, 45 minutes of Code"
- Focus Mode announces "Focus session started" via screen reader
- Timer updates are not announced every second (use `accessibilityLiveRegion` on pause/end only)
- Color is not the only indicator: grid cells have subtle border intensity in addition to fill
- Supports Dynamic Type (iOS) and font scaling (Android)
- Respect `prefers-reduced-motion`: disable all transitions

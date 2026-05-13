# CLAUDE_DESIGN_PROMPT.md — Monolith Screen Design Prompts

## How to Use This Document

Each section below is a self-contained prompt you can paste into Claude (or any coding agent) to generate a specific screen, component, or widget for Monolith. Each prompt includes:
- Context and constraints
- Design system references
- Layout specifications
- Interaction details
- Example output expectations

**Before using any prompt:**
1. Ensure the agent has read `DESIGN_SYSTEM.md`
2. Ensure the agent has read `PRD.md` for screen context
3. Specify the target platform (React Native / Web / Desktop)

---

## Prompt Template: Screen Design

Use this template to create custom prompts for screens not listed below:

```
Design the [SCREEN_NAME] screen for Monolith, a minimalist competence tracker app.

CONTEXT:
- Monolith uses a brutalist dark theme: background #0a0a0a, surface #141414, accent #ccff00 (acid lime)
- Typography: JetBrains Mono for data/numbers, Plus Jakarta Sans for UI text
- Philosophy: Precise, utilitarian, almost austere. The only "fun" element is the acid lime accent.
- No engagement theater: no confetti, no "Good morning!" popups, no daily login bonuses
- Motion: Snappy (150ms), functional, never decorative. Use cubic-bezier(0.4, 0, 0.2, 1)

SCREEN PURPOSE:
[Describe what this screen does and why the user is here]

LAYOUT:
[Describe the visual hierarchy, sections, and arrangement]

COMPONENTS NEEDED:
[List specific components and their variants]

INTERACTIONS:
[Describe tap, swipe, long-press, and state changes]

STATES:
[Empty state, loading state, error state, success state]

OUTPUT:
Generate React Native code using NativeWind (Tailwind for RN). Follow the Design System tokens.
Include TypeScript types and proper accessibility labels.
```

---

## Screen 1: Grid Screen (Home)

```
Design the Grid Screen — the home screen of Monolith.

CONTEXT:
- This is the primary screen. The contribution grid is the hero element.
- The grid shows the last 12 months of focused work activity.
- Each cell = one day. Color intensity = focused minutes relative to daily goal.
- Intensity levels: 0=#141414, 1=#2a3311, 2=#4d6600, 3=#7a9900, 4=#a3cc00, 5=#ccff00

LAYOUT (Top to Bottom):
1. Header (48px height):
   - Left: User avatar (32px circle, tap → Profile)
   - Center: "MONOLITH" in JetBrains Mono caption size, uppercase, letter-spacing 0.1em
   - Right: Settings gear icon (tap → Settings)

2. Identity Filter Pills (horizontal scroll, 44px height):
   - Pills: radius-full, border identity.color/30, text identity.color
   - Active pill: bg identity.color/15, border identity.color/50
   - "All" pill is default active
   - Scrolls horizontally with snap-x

3. Contribution Grid (flexible height, ~280px):
   - 7 rows (Sun-Sat) × ~53 columns (weeks)
   - Cell size: 12px × 12px, gap: 3px
   - Cell radius: 2px
   - Month labels on top: JetBrains Mono, 10px, text-tertiary, uppercase
   - Today: 1px solid #ccff00 border
   - Scrolls horizontally
   - Tap cell: Tooltip appears above with date + total minutes + identity breakdown
   - Long press: Opens retroactive log bottom sheet

4. Today's Momentum Ring (160px height):
   - Centered, 120px diameter
   - 7 segments (Mon-Sun), each 51.4°
   - Track: #1a1a1a, 8px stroke
   - Filled segment: #ccff00, 8px stroke, sharp ends
   - Rest day segment: #00f0ff outline, no fill
   - Center text: "TODAY" caption + "45m" mono-lg + "/ 60m goal" body-sm
   - Tap ring → Focus Mode

5. Task List (remaining height):
   - Section header: "TODAY" + date (caption, uppercase)
   - Task rows: full width, bg surface, border-bottom border-subtle
   - Row layout:
     - Left: Checkbox (2px border #262626, #ccff00 fill when checked, 20px)
     - Middle: Task title (body, text-primary) + Identity pill below (caption)
     - Right: Estimated time or logged time (mono-sm, text-tertiary)
   - Swipe right: "Complete" (accent background)
   - Swipe left: "Log Time" / "Delete"
   - Tap row → Start Focus with this task

6. Floating Action Button:
   - Bottom-right, 56px circle, bg #ccff00
   - Plus icon, #0a0a0a color
   - Tap → Log Task bottom sheet
   - Shadow: 0 4px 12px rgba(204, 255, 0, 0.3)

EMPTY STATE:
- Grid shows 12 months of #141414 cells
- Centered text: "Start your first focus session"
- CTA: "Focus" accent button

ACCESSIBILITY:
- Grid cells: "May 13, 45 minutes of Code, 20 minutes of Write"
- Ring: "Today's progress, 45 of 60 minutes"
- Tasks: "Task: Write blog post, Identity: Write, 30 minutes estimated"
```

---

## Screen 2: Focus Mode

```
Design Focus Mode — a full-screen, distraction-free timer.

CONTEXT:
- This is the core action screen. Zero chrome. Zero distractions.
- Timer counts UP from zero (not down from a preset).
- Background stays awake. Background timer continues via background task.
- User should feel like they're entering a different mental space.

LAYOUT:
- Full screen, bg #0a0a0a
- Status bar: hidden
- Top safe area: Identity pill (tap to change)
  - radius-full, border identity.color/30, text identity.color, caption size
  - Centered horizontally, 16px from top

- Center (vertically and horizontally):
  - Timer digits: JetBrains Mono, 48px (display), #ccff00
  - Format: HH:MM:SS (leading zeros)
  - Tabular figures (monospace alignment)
  - Below timer: Task name (if applicable), body-sm, text-secondary
  - If no task: "Free Focus" in text-tertiary

- Bottom controls (120px from bottom):
  - Horizontal row, centered
  - Left: Pause/Resume button (44px circle, border #262626, icon text-secondary)
  - Center: Stop button (64px circle, bg #ccff00, #0a0a0a stop icon)
  - Right: Cancel button (44px circle, border #262626, X icon text-secondary)
  - Gap between buttons: 32px

- Bottom hint (safe area bottom):
  - "Swipe up to cancel" in caption, text-tertiary
  - Fades out after 3 seconds

STATES:
- Idle: Timer at 00:00:00, "Tap to start" hint pulses subtly (opacity 0.3 → 0.6, 2s loop)
- Running: Timer increments every second. Pause icon shows. Screen stays awake.
- Paused: Timer frozen. Play icon shows. "Paused" label appears below timer in text-tertiary.
- Complete: Timer stops. Auto-transition to Log Summary sheet after 500ms.

INTERACTIONS:
- Tap timer area: Start (if idle) / Pause (if running) / Resume (if paused)
- Tap Stop: End session, transition to Log Summary
- Swipe up: Show cancel confirmation ("Discard 45 minutes?" — Cancel / Confirm)
- Background: Show persistent notification "Focus: 45m elapsed"

ANIMATIONS:
- Enter: Fade in 250ms
- Timer digit change: Instant (no animation — precision feel)
- Pause: Screen dims to 70% brightness, "Paused" fades in 150ms
- Stop button press: Scale 0.95, 100ms

ACCESSIBILITY:
- "Focus session started. Timer running."
- "Focus session paused."
- "Focus session ended. 45 minutes logged."
```

---

## Screen 3: Log Task / Quick Log (Bottom Sheet)

```
Design the Log Task bottom sheet.

CONTEXT:
- Appears when user taps FAB or swipes "Log Time" on a task.
- Used for both creating new tasks and logging retroactive time.
- Bottom sheet: 85% height, radius-lg (16px) on top corners only.

LAYOUT:
- Handle bar: 36px wide, 4px tall, bg #262626, radius-full, centered
- Title: "Log Activity" (h2, text-primary)
- Close: X icon top-right

Form fields (vertical stack, space-4 gap):
1. "What did you work on?" (Input):
   - bg surface, border border, radius-md
   - placeholder text-tertiary
   - Plus Jakarta Sans, body size
   - Auto-focus, max 100 chars

2. Identity Selector:
   - Label: "Identity" (caption, uppercase, text-secondary)
   - Horizontal scroll of identity pills
   - Single select
   - Pre-selected if started from a task

3. Duration:
   - Label: "Duration" (caption)
   - Number input + segmented control: "min" | "hr"
   - Default: empty, placeholder "0"
   - JetBrains Mono for number
   - Validation: max 12 hours

4. Date:
   - Label: "Date" (caption)
   - Default: Today
   - Tap → Native date picker
   - Validation: cannot be future

5. Submit button:
   - Full width, bg #ccff00, text #0a0a0a, h3 weight
   - "Save"
   - Disabled state: opacity 40
   - Loading state: spinner

STATES:
- Creating new task: All fields empty
- Logging existing task: Title pre-filled, identity pre-selected
- Retroactive log: Date picker enabled, default today
- Validation error: Red border on invalid field, body-sm error text below

INTERACTIONS:
- Drag down on handle: Dismiss sheet
- Tap backdrop: Dismiss sheet
- Keyboard: Sheet adjusts to avoid keyboard
- Success: Sheet dismisses, grid updates instantly

ACCESSIBILITY:
- "Log activity form. Task name field."
- "Identity selector. Code selected."
- "Duration, 45 minutes."
- "Save button."
```

---

## Screen 4: Profile / Stats

```
Design the Profile / Stats screen.

CONTEXT:
- This is the reflection screen. Users come here to see their competence growth.
- Data-heavy but visually clean. Numbers are the stars.
- No gamification theater. Just proof.

LAYOUT:
1. Header:
   - Back button left
   - Title: "Profile" (h1)
   - Edit button right (if own profile)

2. User Card (120px height):
   - Avatar: 64px circle, border 2px #262626
   - Display name: h3, text-primary
   - Username: body-sm, text-tertiary (@handle)
   - Level badge: "LVL 12" in JetBrains Mono mono-sm, bg accent-dim, text accent, radius-sm, px-2 py-1
   - Title: "Architect" in caption, text-secondary

3. Current Momentum Ring (compact, 80px):
   - Smaller version of home ring (48px diameter)
   - Shows this week's progress
   - Tap → expanded weekly view (modal)

4. Skill Velocity (160px height):
   - Section header: "Skill Velocity" (h3) + trend arrow + percentage (mono-md, accent if positive)
   - Sparkline chart: 8 data points, line stroke #ccff00, fill accent-dim below line
   - X-axis: weeks (labels: caption, text-tertiary)
   - No Y-axis labels (relative trend only)
   - Tap → full analytics (Pro gated)

5. Personal Records (card list):
   - Section header: "Records" (h3)
   - Cards (horizontal scroll):
     - "Longest Session" → "3h 12m" (mono-md) + date (caption)
     - "Most Productive Day" → "8h 45m" + date
     - "Best Week" → "32h 10m" + date range
   - Card: bg surface, border border-subtle, radius-md, p-4, min-width 140px

6. Identity Breakdown (200px height):
   - Section header: "Where Your Time Goes" (h3)
   - Horizontal bar chart:
     - Each bar = one identity
     - Bar color = identity.color
     - Bar width = proportional to hours
     - Label left: identity name (body-sm)
     - Value right: hours (mono-sm, text-tertiary)
   - Sorted by hours desc

7. Subscription Card (if Free):
   - bg surface-elevated, border accent/20, radius-md
   - "Pro" h3 + "Unlimited identities, sync, widgets..." body-sm
   - CTA: "Upgrade" accent button
   - Dismissible

EMPTY STATE (new user):
- "No data yet. Complete a few focus sessions to see your stats."
- CTA: "Start Focusing"

ACCESSIBILITY:
- "Profile. Level 12, Architect."
- "Skill velocity, up 12 percent. Sparkline showing 8 week trend."
- "Personal records. Longest session, 3 hours 12 minutes, August 14."
```

---

## Screen 5: Identity Manager

```
Design the Identity Manager screen.

CONTEXT:
- Users manage their life areas/identities here.
- Each identity gets a card with its own mini-grid and stats.
- Free users see 1 identity + upgrade prompt for more.

LAYOUT:
1. Header:
   - Back button
   - Title: "Identities" (h1)
   - "Add" button right (Pro only, or shows upgrade sheet)

2. Identity List (vertical scroll):
   Each identity card (160px height, bg surface, border border-subtle, radius-md, mb-4):
   
   Card layout:
   - Top row:
     - Color indicator: 4px wide vertical bar left edge, identity.color
     - Name: h3, text-primary
     - Total hours: mono-sm, text-tertiary (e.g., "124h total")
     - Menu icon right (⋯)
   
   - Middle: Mini grid (last 30 days)
     - 5 rows × 6 columns, cell size 8px, gap 2px
     - Same intensity scale as main grid
   
   - Bottom: Consistency score
     - "Consistency: 73%" mono-sm + trend arrow
     - "30-day average: 45m/day" caption, text-tertiary
   
   - Tap card → Identity Detail screen

3. Add Identity Sheet (modal):
   - Title: "New Identity"
   - Name input
   - Color picker: Grid of 12 preset colors (Monolith palette)
   - Icon picker: Grid of Lucide icons
   - "Create" button

EMPTY STATE:
- "You have no identities yet."
- "Start with one area you want to track."
- CTA: "Create Identity"

ACCESSIBILITY:
- "Identity: Code. 124 hours total. Consistency 73 percent."
- "Mini grid showing last 30 days."
```

---

## Screen 6: Settings

```
Design the Settings screen.

CONTEXT:
- Clean, utilitarian settings list.
- Grouped by category with clear labels.
- No fluff. Every setting has a purpose.

LAYOUT:
1. Header: "Settings" (h1) + back button

2. Account Section:
   - "Account" (caption header, text-secondary, uppercase, mt-6)
   - Row: "Edit Profile" → chevron right
   - Row: "Change Password" → chevron right
   - Row: "Sign Out" → text in error color

3. Goals Section:
   - "Daily Goal" row:
     - Label left: "Daily Focus Goal"
     - Value right: "60 min" (mono-sm, text-secondary)
     - Tap → Slider modal (15-240 min)
   - "Rest Days" row:
     - Label: "Scheduled Rest Days"
     - Value: "Sat, Sun"
     - Tap → Day picker

4. Notifications Section:
   - Toggle rows:
     - "Focus Reminders" (switch)
     - "Daily Summary" (switch)
     - "Crew Updates" (switch, Pro only)

5. Appearance Section:
   - "Accent Color" row (Pro only):
     - Label: "Accent Color"
     - Preview: 20px circle of current accent
     - Tap → Color picker (Lime, Cyan, Coral)
   - "Theme": "Dark" (static, no light mode)

6. Data Section:
   - "Export Data" row (Pro only):
     - Label: "Export Your Data"
     - Subtext: "CSV or JSON"
     - Tap → Format selector → Share sheet
   - "Delete All Data" row (destructive, red text)
   - "Delete Account" row (destructive, red text)

7. About Section:
   - "Version": "1.0.0" (static)
   - "Privacy Policy" → external link
   - "Terms of Service" → external link
   - "Support": "hello@monolith.app" → mailto

ROW COMPONENT:
- Full width, bg transparent
- Left: Label (body), optional subtext (body-sm, text-tertiary)
- Right: Value (body-sm, text-secondary) or Chevron or Switch
- Border-bottom: 1px border-subtle
- Height: 56px
- Press: bg surface, 100ms

ACCESSIBILITY:
- "Settings. Daily goal, 60 minutes."
- "Toggle, focus reminders, on."
- "Button, delete account."
```

---

## Screen 7: Crew Dashboard

```
Design the Crew Dashboard screen.

CONTEXT:
- Social feature for Pro users. Private micro-group accountability.
- Cooperative, not competitive. No leaderboards. No shame.

LAYOUT:
1. Header:
   - Back button
   - Title: Crew name (h1)
   - Member count: "5 members" (caption, text-tertiary)
   - Settings icon right

2. Invite Card (if creator/admin):
   - bg surface, border border-subtle, radius-md
   - "Invite Code: X7K9P2" (mono-md, text-primary)
   - "Tap to copy" (caption, text-tertiary)
   - Copy icon right

3. Active Challenge (200px height):
   - bg surface-elevated, border accent/10, radius-md
   - Title: "Weekly Focus Goal" (h3)
   - Target: "50 hours collectively" (body-sm, text-secondary)
   - Time remaining: "3 days left" (caption, text-tertiary)
   - Progress bar:
     - Track: bg #1a1a1a, height 8px, radius-full
     - Fill: #ccff00, height 8px, radius-full
     - Percentage label: "72%" mono-sm, accent
   - Aggregate stats: "36h logged • 4 members contributed"

4. Member Pulse (120px):
   - "This Week" (caption header)
   - "4/5 members hit their ring" (body, text-primary)
   - Row of member avatars (overlapping circles, 32px)
   - Ghost members shown as generic silhouette
   - Tap → Member detail (respects privacy)

5. My Contribution:
   - "Your contribution: 8h 30m" (h3)
   - Breakdown by identity (if privacy allows)

6. Challenge History:
   - "Past Challenges" (caption header)
   - Collapsible list:
     - "Week of May 1" → "Completed ✓" or "62% reached"
     - Tap → expand details

INTERACTIONS:
- Tap invite code: Copy to clipboard, toast "Copied"
- Tap member avatar: Show profile (filtered by their privacy level)
- Long press member: Admin options (remove, if creator)

EMPTY STATE (no active challenge):
- "No active challenge"
- "Start one to begin tracking together"
- CTA: "Create Challenge" (creator only)

ACCESSIBILITY:
- "Crew: The Grinders. 5 members."
- "Active challenge: 50 hours collectively. 72 percent complete. 3 days left."
- "4 of 5 members hit their ring this week."
```

---

## Screen 8: Wrapped Preview

```
Design the Wrapped Preview screen.

CONTEXT:
- Annual competence report. Full-screen, scrollable, cinematic.
- Each section is a moment of reflection. Not a game. Not a score.
- Dark, moody, with acid lime highlights.

LAYOUT:
- Full screen, bg #0a0a0a
- Scrollable vertically with snap-y (each section is full viewport)
- No navigation bar. Back button floats top-left (44px circle, bg #1a1a1a, opacity 80)

Sections (each 100vh):

1. Hero:
   - "Your Year in Focus" (h1, centered)
   - Year: "2025" (display size, JetBrains Mono, #ccff00)
   - Scroll indicator: Chevron down, pulsing

2. Total Hours:
   - "Total Focus Hours" (caption, uppercase, text-secondary)
   - "312" (display size, JetBrains Mono, #ccff00)
   - "That's 7.8 work weeks of pure focus." (body, text-secondary)

3. Top Identity:
   - "This year, you were primarily a" (body, text-secondary)
   - "Creator" (h1, identity.color)
   - "42% of your focused time" (body-sm, text-tertiary)
   - Mini grid filtered to this identity (30 days)

4. Strongest Month:
   - "Your strongest month was" (body, text-secondary)
   - "March" (h1, text-primary)
   - "48 hours of focused work" (mono-md, #ccff00)
   - Mini calendar grid for March

5. Skill Velocity:
   - "You got better at focusing" (body, text-secondary)
   - "+18%" (display size, JetBrains Mono, #ccff00)
   - "Average session length growth" (caption)
   - Sparkline animates on scroll into view

6. Milestones:
   - "Milestone Moments" (h3)
   - Cards (vertical stack):
     - "Longest Session" → "3h 12m" + "August 14"
     - "Most Productive Day" → "8h 45m" + "June 3"
     - "Longest Streak" → "12 days" + "Feb 1 - Feb 12"
   - Card: bg surface, border border-subtle, radius-md

7. Identity Breakdown:
   - "Where Your Time Went" (h3)
   - Horizontal bar chart:
     - Creator: ████████████████████ 42%
     - Code: ████████████ 28%
     - Write: ████████ 18%
     - Exercise: ████ 12%
   - Bars animate width on scroll (300ms ease-out)

8. Full Grid:
   - Entire year grid (365 cells)
   - Zoomed out view, 8px cells
   - "Every day you showed up." (caption, text-tertiary)

9. Share CTA:
   - "Share your year" (h3)
   - Privacy toggles (checklist):
     - [x] Total Hours
     - [x] Top Identity
     - [ ] Skill Velocity
     - [ ] Milestones
     - [ ] Identity Breakdown
     - [ ] Full Grid
   - "Generate Card" button (accent, full width)
   - "Your data, your choice." (caption, text-tertiary)

INTERACTIONS:
- Scroll: Snap to each section
- Tap back: Exit with fade out
- Tap generate: Show loading, then image preview
- Tap share: Native share sheet

ANIMATIONS:
- Numbers count up on scroll into view (0 → 312, 1s, ease-out)
- Bars grow from 0 to final width
- Sparkline draws left-to-right
- Section fades in + translateY(20px → 0) on snap

ACCESSIBILITY:
- "Wrapped report. 2025. Total focus hours: 312."
- "Top identity: Creator. 42 percent of your time."
- "Generate share card button."
```

---

## Widget 1: Small (Read-Only)

```
Design the Small Widget for iOS (SwiftUI) and Android (XML layout).

CONTEXT:
- 1×1 grid cell equivalent on home screen
- Shows today's progress at a glance
- Tapping opens the app

LAYOUT (iOS SwiftUI):
- Container: bg #141414, radius-md (12px iOS widget default)
- Centered vertically:
  - Ring: 48px diameter, 6px stroke
    - Track: #1a1a1a
    - Fill: #ccff00, proportion = today's minutes / daily goal
  - Below ring: "45m" (mono-sm, #ccff00)
  - Below time: "/ 60m" (caption, text-tertiary)
- No labels, no icons. Pure data.

LAYOUT (Android):
- RemoteViews layout
- Same structure as iOS
- Uses monospaced font if available

DATA:
- Updated via shared storage every 15 minutes
- Last updated timestamp not shown (cleanliness)

DEEP LINK:
- Tap → `monolith://grid`

EMPTY STATE (no data today):
- Ring at 0%
- "— / 60m" (dashes indicate no data)
```

---

## Widget 2: Medium (Read-Only → Interactive)

```
Design the Medium Widget.

CONTEXT:
- 2×2 grid cell equivalent
- Shows week overview + today's tasks
- v2: Interactive (check off tasks, start quick focus)

LAYOUT (v1 Read-Only):
- Left half (50%): 7-day mini grid
  - 7 cells vertically, 12px each
  - Same intensity scale
  - Today highlighted with accent border
- Right half (50%):
  - "Today" (caption, uppercase)
  - Task list (max 2 tasks):
    - Checkbox (12px) + task title truncated (body-sm)
  - "+ 3 more" (caption, text-tertiary) if > 2 tasks

LAYOUT (v2 Interactive):
- Same as v1, but:
  - Tasks have tappable checkboxes (iOS 17+ Button intents / Android PendingIntents)
  - "Quick Focus" button at bottom (starts 25m timer with default identity)

DATA:
- Grid data: 7 days of daily_logs
- Task data: Today's incomplete tasks
- Updated: Every 15 minutes + after app sync

DEEP LINKS:
- Grid cell → `monolith://grid?date=YYYY-MM-DD`
- Task → `monolith://task?id=xxx`
- Quick Focus → `monolith://focus?identity=default`
```

---

## Widget 3: Large (Read-Only → Interactive)

```
Design the Large Widget.

CONTEXT:
- 4×2 grid cell equivalent
- Shows full month grid
- Best for iPad and large phone home screens

LAYOUT (v1 Read-Only):
- Top row: Month label + identity filter indicator
  - "May 2025" (caption, text-primary)
  - Filter pill: "All" or identity name (caption, accent color)
- Main area: Month grid
  - 7 columns (Sun-Sat), 5-6 rows
  - Cell size: 16px, gap 4px
  - Same intensity scale
  - Today: accent border
- Bottom: Today's progress
  - "Today: 45m / 60m" (mono-sm)

LAYOUT (v2 Interactive):
- Same as v1, plus:
  - Identity filter pills at top (scrollable, tap to filter widget)
  - "Log Time" button (opens app to quick log)

DATA:
- 35-42 days of daily_logs
- Identity filter state persisted in shared storage

DEEP LINKS:
- Cell → `monolith://grid?date=YYYY-MM-DD`
- Filter → `monolith://identity?id=xxx`
- Log Time → `monolith://log?date=today`
```

---

## Component: Insight Card

```
Design the Insight Card component.

CONTEXT:
- Appears below the grid on Home screen
- Contextual, intelligent observations about user's patterns
- Max 1 per app open. Dismissible.

LAYOUT:
- Full width (minus screen padding)
- bg surface, radius-md
- Left border: 2px solid #ccff00
- Padding: space-5 (20px)
- Content:
  - Insight text (body, text-primary)
  - Optional: Subtext (body-sm, text-secondary)
- Right: Dismiss X (24px, text-tertiary, tap to dismiss)

VARIANTS:
1. Pattern Recognition:
   - "You do your best Deep Work on Tuesday mornings. Consider blocking that time."
   - Border: accent

2. Progress Validation:
   - "This is your 4th week hitting your daily goal 5+ times. You're building something sustainable."
   - Border: accent

3. Gentle Nudge:
   - "You've logged 0 hours of Write this week. Is this intentional?"
   - Border: #00f0ff (secondary-accent, softer)

4. Milestone:
   - "100 hours of Deep Work. That's 2.5 work weeks of pure focus."
   - Border: accent + subtle glow

ANIMATION:
- Enter: Slide down from top (150ms) + fade in
- Dismiss: Slide up (150ms) + fade out
- Never bounces

ACCESSIBILITY:
- "Insight: You do your best Deep Work on Tuesday mornings."
- "Dismiss insight button."
```

---

## Component: Contribution Grid Cell

```
Design the Grid Cell component.

CONTEXT:
- The atomic unit of Monolith. 12px × 12px.
- Must render fast (hundreds on screen at once).
- Must be accessible.

PROPS:
```typescript
interface GridCellProps {
  intensity: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;           // ISO date
  totalMinutes: number;
  identityBreakdown: Record<string, number>;
  isToday: boolean;
  onTap: () => void;
  onLongPress: () => void;
}
```

LAYOUT:
- Container: 12px × 12px, radius-sm (2px)
- Background: grid-{intensity} color from Design System
- Border: isToday ? 1px solid #ccff00 : none
- No shadow. No elevation.

TOOLTIP (on tap):
- Appears above cell
- bg surface-elevated, border border, radius-md, shadow-md
- Content:
  - Date: "Mon, May 13" (body-sm, text-primary)
  - Total: "45m" (mono-md, accent)
  - Breakdown: "Code: 30m, Write: 15m" (caption, text-secondary)
- Dismiss: Tap anywhere else or auto-dismiss after 3s

PERFORMANCE:
- Memoize with React.memo
- No re-render on parent scroll
- Tooltip is portal/absolute positioned, not nested

ACCESSIBILITY:
- label: "May 13, 45 minutes total. Code 30 minutes, Write 15 minutes."
- role: "button"
- hint: "Double tap to log activity for this day."
```

---

## Component: Task Row

```
Design the Task Row component.

PROPS:
```typescript
interface TaskRowProps {
  task: Task;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onLogTime: () => void;
  onDelete: () => void;
  onTap: () => void;
}
```

LAYOUT:
- Full width, height 64px
- bg transparent (parent provides surface bg)
- border-bottom: 1px solid border-subtle
- Horizontal layout:
  1. Checkbox (left, 48px wide, centered):
     - 20px square, radius-sm (2px)
     - Border: 2px solid #262626
     - Checked: bg #ccff00, border #ccff00, checkmark icon #0a0a0a
  
  2. Content (flex-1, ml-3):
     - Title: body, text-primary, line-clamp-1
     - Identity pill below: caption, identity.color
  
  3. Meta (right, ml-3):
     - Time: mono-sm, text-tertiary (e.g., "30m" or "—")
     - Chevron right (if navigable)

STATES:
- Default: As above
- Pressed: bg surface, 100ms
- Completed: Title strikethrough, text-tertiary. Checkbox checked.
- Swiping right: Reveal "Complete" action (accent bg)
- Swiping left: Reveal "Log Time" (surface bg) + "Delete" (error bg)

ACCESSIBILITY:
- "Task: Write blog post. Identity: Write. 30 minutes."
- "Checkbox, not checked. Double tap to complete."
- "Complete task button."
```

---

## Notes for Agents

When generating any screen or component:

1. **Always use NativeWind classes**, never inline styles (except dynamic values)
2. **Always reference the color tokens** from Design System, never hardcode hexes
3. **Always include TypeScript interfaces** for props
4. **Always add accessibility labels** and roles
5. **Always handle loading, empty, and error states**
6. **Never add decorative animations** — motion must serve a purpose
7. **Never use emojis** in UI text (Monolith is serious, not playful)
8. **Never use gradients** (except the subtle grid intensity scale)
9. **Never use border-radius > 8px** except for pills and avatars
10. **Always test for reduced motion** (`useReducedMotion()` hook)

---

## Quick Reference: Color Tokens

```
bg-background: #0a0a0a
bg-surface: #141414
bg-surface-elevated: #1a1a1a
border-border: #262626
border-border-subtle: #1f1f1f
text-primary: #f5f5f0
text-secondary: #737373
text-tertiary: #525252
text-inverse: #0a0a0a
accent: #ccff00
accent-hover: #b8e600
accent-dim: rgba(204, 255, 0, 0.15)
secondary-accent: #00f0ff
grid-0: #141414
grid-1: #2a3311
grid-2: #4d6600
grid-3: #7a9900
grid-4: #a3cc00
grid-5: #ccff00
```

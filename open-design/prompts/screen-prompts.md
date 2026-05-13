# Open Design Screen Prompts — Monolith

Ready-to-use prompts for generating each Monolith screen via Open Design.
Copy-paste these into the Open Design chat surface.

**Setup for each prompt:**
- Design System: `monolith`
- Skill: `monolith-mobile`
- Model: **Kimi K2.6** (recommended)
- Platform: `mobile`
- Mode: `prototype`

---

## 1. Grid Screen (Home)

```
Design the Grid Screen — the primary home screen of Monolith.

This is the app's hero screen. The contribution grid dominates.

LAYOUT (top to bottom):
1. Header: "MONOLITH" in JetBrains Mono 11px uppercase, centered. Right: settings gear icon.
2. Identity Filter Pills: horizontal scroll. Pills for "All", "Code", "Write", "Design", "Exercise". Active pill has acid lime border at 50% opacity and acid lime text. Inactive pills have grey border at 30% opacity.
3. Contribution Grid: 7 rows × ~20 weeks visible. 12px cells, 3px gap, 2px radius. 6 intensity levels from dark grey to acid lime. Month labels (J, F, M, A, M...) above in 9px JetBrains Mono. Today has 1px acid lime border.
4. Today's Momentum Ring: 120px diameter, 7 segments for Mon-Sun. Track `#1a1a1a`, filled segments `#ccff00`, rest days `#00f0ff` outline. Center: "TODAY" label + "45m" in mono-lg + "/ 60m" in mono-sm.
5. Task List: "TODAY — May 13" section header. 3 task rows with checkbox (20px, 2px border, acid lime fill when checked), task title, identity pill, duration. Swipe affordances hinted.
6. Floating Action Button: 56px circle, acid lime, plus icon, bottom-right.

EMPTY STATE: If no data, show "Start your first focus session" with acid lime "Focus" button.

COLORS: bg `#0a0a0a`, surface `#141414`, accent `#ccff00`, secondary accent `#00f0ff`, text `#f5f5f0`.

OUTPUT: Single HTML artifact in iPhone 15 Pro frame. Dark mode only. No external images.
```

---

## 2. Focus Mode

```
Design Focus Mode — a full-screen, distraction-free timer.

This is the core action screen. Zero chrome. The user should feel they've entered a different mental space.

LAYOUT:
- Full screen, bg `#0a0a0a`
- Top (60px from top): Identity pill "Code" — radius-full, border acid lime at 30% opacity, acid lime text, caption size. Centered.
- Center (vertically & horizontally): Timer "00:45:32" in JetBrains Mono, 48px, weight 700, acid lime `#ccff00`. Tabular figures.
- Below timer: Task name "Review pull requests" in body-sm, text `#737373`.
- Bottom (120px from bottom): Controls row — Pause button (44px circle, border `#262626`), Stop button (64px circle, bg acid lime, dark icon), Cancel button (44px circle, border `#262626`). Gap 32px between buttons.
- Bottom hint: "Swipe up to cancel" in caption, `#525252`. Fades out after 3s.

STATES:
- Idle: Timer at "00:00:00", "Tap to start" hint pulses subtly
- Running: Timer counts up. Pause icon shows. Screen stays awake.
- Paused: Timer frozen. Play icon shows. "Paused" label below timer in `#525252`. Screen dims to 70%.

INTERACTIONS:
- Tap timer: Start / Pause / Resume
- Tap Stop: End session
- Swipe up: Cancel confirmation

OUTPUT: Single HTML artifact in iPhone 15 Pro frame. Full-screen feel. Dark mode only.
```

---

## 3. Log Task / Quick Log (Bottom Sheet)

```
Design the Log Task bottom sheet.

Appears when user taps FAB or swipes "Log Time" on a task. Used for creating new tasks and logging retroactive time.

LAYOUT:
- Bottom sheet: 85% height, top corners 16px radius, bg `#1a1a1a`
- Handle bar: 36px wide, 4px tall, bg `#262626`, centered
- Title: "Log Activity" in h2, text `#f5f5f0`
- Close: X icon top-right

Form fields (vertical stack, 16px gap):
1. "What did you work on?" — Input, bg `#141414`, border `#262626`, radius 4px, placeholder `#525252`. Auto-focus.
2. "Identity" label (caption, uppercase, `#737373`). Horizontal scroll of identity pills: "Code" (acid lime), "Write" (cyan), "Exercise" (coral). Single select. Active has bg at 15% opacity.
3. "Duration" label. Number input + "min" | "hr" segmented control. JetBrains Mono for number. Max 12 hours.
4. "Date" label. Default "Today". Tap changes.
5. "Save" button: full width, bg `#ccff00`, text `#0a0a0a`, h3 weight, radius 4px, 14px padding.

VALIDATION:
- Title required, max 100 chars
- Identity required
- Duration required
- Date cannot be future

OUTPUT: Single HTML artifact showing the bottom sheet overlaid on the Grid screen (dimmed backdrop). iPhone 15 Pro frame.
```

---

## 4. Profile / Stats

```
Design the Profile / Stats screen.

The reflection screen. Users come here to see their competence growth. Data-heavy but visually clean. Numbers are the stars.

LAYOUT:
1. Header: Back button left, "Profile" h1 centered.
2. User Card:
   - Avatar: 64px circle, bg `#141414`, border 2px `#262626`, initials "PR" in JetBrains Mono 20px acid lime.
   - Display name: h3, text `#f5f5f0`
   - Username: body-sm, text `#525252`
   - Level badge: "LVL 12" in mono-sm, bg acid lime at 15% opacity, acid lime text, radius 2px. Title "Architect" in caption.
3. Current Momentum Ring: Compact 48px version showing week progress. Tap expands.
4. Skill Velocity:
   - Header: "Skill Velocity" h3 + "+12%" mono-md + up arrow in acid lime.
   - Sparkline: 8 data points, line stroke acid lime, fill acid lime at 10% below. No Y-axis labels.
5. Personal Records (horizontal scroll cards):
   - "Longest Session" → "3h 12m" mono-md + "Aug 14" caption
   - "Most Productive Day" → "8h 45m" + "Jun 3"
   - "Best Week" → "32h 10m" + "Feb 1-7"
   - Card: bg `#141414`, border `#1f1f1f`, radius 4px, 16px padding, min-width 140px.
6. Identity Breakdown:
   - Header: "Where Your Time Goes" h3
   - Horizontal bar chart: Code 42% (acid lime), Write 28% (cyan), Design 18% (purple), Exercise 12% (coral)
   - Label left, bar proportional, value right in mono-sm.

EMPTY STATE: "No data yet. Complete a few focus sessions to see your stats." + "Start Focusing" acid lime button.

OUTPUT: Single HTML artifact in iPhone 15 Pro frame. Scrollable content.
```

---

## 5. Identity Manager

```
Design the Identity Manager screen.

Users manage their life areas/identities here. Each identity gets a card with its own mini-grid and stats.

LAYOUT:
1. Header: Back button, "Identities" h1, "Add" button right (acid lime plus).
2. Identity Cards (vertical scroll):
   Each card (160px height, bg `#141414`, border `#1f1f1f`, radius 4px, 16px margin-bottom):
   
   - Top row: 4px color bar left edge (identity color), name h3, total hours mono-sm `#525252`, menu icon.
   - Middle: Mini grid (last 30 days, 5 rows × 6 cols, 8px cells, 2px gap). Same intensity scale.
   - Bottom: "Consistency: 73%" mono-sm + trend arrow. "30d avg: 45m/day" caption `#525252`.

IDENTITIES TO SHOW:
- Code (acid lime) — 124h total — 73% consistency
- Write (cyan) — 86h total — 58% consistency  
- Design (purple) — 52h total — 45% consistency

EMPTY STATE: "You have no identities yet. Start with one area you want to track." + "Create Identity" button.

OUTPUT: Single HTML artifact in iPhone 15 Pro frame.
```

---

## 6. Settings

```
Design the Settings screen.

Clean, utilitarian settings list. Grouped by category. No fluff.

LAYOUT:
1. Header: "Settings" h1 + back button.

SECTIONS:

Account (caption header "ACCOUNT", uppercase, `#737373`, mt-6):
- "Edit Profile" → chevron right
- "Change Password" → chevron right
- "Sign Out" → text `#ff4444`

Goals (caption header "GOALS"):
- "Daily Focus Goal" → value "60 min" mono-sm → tap opens slider
- "Scheduled Rest Days" → value "Sat, Sun"

Notifications (caption header "NOTIFICATIONS"):
- Toggle rows: "Focus Reminders", "Daily Summary", "Crew Updates"
- Switch: track `#262626`, thumb acid lime when on

Appearance (caption header "APPEARANCE"):
- "Accent Color" → preview circle (acid lime) → options: Lime, Cyan, Coral
- "Theme": "Dark" (static, no light mode)

Data (caption header "DATA"):
- "Export Your Data" → subtext "CSV or JSON" → Pro only
- "Delete All Data" → `#ff4444`
- "Delete Account" → `#ff4444`

About (caption header "ABOUT"):
- "Version": "1.0.0"
- "Privacy Policy", "Terms of Service", "Support"

ROW STYLE:
- Full width, height 56px, border-bottom 1px `#1f1f1f`
- Left: label body, optional subtext body-sm `#525252`
- Right: value body-sm `#737373` or chevron or switch
- Press: bg `#141414`, 100ms

OUTPUT: Single HTML artifact in iPhone 15 Pro frame.
```

---

## 7. Wrapped Preview

```
Design the Wrapped Preview screen.

Annual competence report. Full-screen, scrollable, cinematic. Each section is a moment of reflection.

LAYOUT:
- Full screen, bg `#0a0a0a`
- No navigation bar. Back button floats top-left (44px circle, bg `#1a1a1a`, opacity 80).
- Vertical scroll with snap-y. Each section is full viewport height.

SECTIONS:

1. Hero:
   - "Your Year in Focus" (h1, centered)
   - "2025" (display size, JetBrains Mono 48px, acid lime)

2. Total Hours:
   - "Total Focus Hours" (caption, uppercase, `#737373`)
   - "312" (display, 48px, acid lime)
   - "That's 7.8 work weeks of pure focus." (body, `#737373`)

3. Top Identity:
   - "This year, you were primarily a" (body, `#737373`)
   - "Creator" (h1, acid lime)
   - "42% of your focused time" (body-sm, `#525252`)

4. Strongest Month:
   - "Your strongest month was" (body, `#737373`)
   - "March" (h1, `#f5f5f0`)
   - "48 hours of focused work" (mono-md, acid lime)

5. Skill Velocity:
   - "You got better at focusing" (body, `#737373`)
   - "+18%" (display, 48px, acid lime)
   - "Average session length growth" (caption)
   - Sparkline animates on scroll into view

6. Milestones (vertical card stack):
   - "Longest Session" → "3h 12m" + "Aug 14"
   - "Most Productive Day" → "8h 45m" + "Jun 3"
   - "Longest Streak" → "12 days" + "Feb 1-12"
   - Cards: bg `#141414`, border `#1f1f1f`, radius 4px

7. Identity Breakdown:
   - "Where Your Time Went" h3
   - Bars: Creator 42% (acid lime), Code 28% (cyan), Write 18% (purple), Exercise 12% (coral)
   - Bars animate width on scroll (300ms ease-out)

8. Full Grid:
   - Entire year grid (365 cells, 8px each)
   - "Every day you showed up." caption `#525252`

9. Share CTA:
   - "Share your year" h3
   - Checklist toggles (all default on): Total Hours, Top Identity
   - "Generate Card" button (acid lime, full width)
   - "Your data, your choice." caption

ANIMATIONS:
- Numbers count up on scroll into view (0 → final, 1s, ease-out)
- Bars grow from 0 to final width
- Sections fade in + translateY(20px → 0) on snap

OUTPUT: Single HTML artifact in iPhone 15 Pro frame. Scroll-snap behavior simulated.
```

---

## 8. Widgets (v1 Read-Only)

```
Design three iOS home screen widgets for Monolith.

ALL WIDGETS:
- Background: `#141414`
- Corner radius: 12px (iOS widget default)
- No external images. Pure CSS/SVG.

### Small Widget (1×1)
- Centered ring: 48px diameter, 6px stroke
  - Track: `#1a1a1a`
  - Fill: `#ccff00`, proportion 75%
- Below: "45m" mono-sm acid lime
- Below: "/ 60m" caption `#525252`
- Deep link: opens app to Grid

### Medium Widget (2×2)
- Left half (50%): 7-day mini grid
  - 7 cells vertically, 10px each, 2px gap
  - Intensity scale from dark grey to acid lime
  - Today: acid lime border
- Right half:
  - "Today" caption uppercase `#525252`
  - 2 tasks: checkbox + truncated title
  - "+ 1 more" caption `#525252`

### Large Widget (4×2)
- Top: "May 2025" caption + "All" pill (acid lime border)
- Main: Month grid (7 cols × 5-6 rows, 16px cells, 4px gap)
- Today: acid lime border
- Bottom: "Today: 45m / 60m" mono-sm

OUTPUT: Single HTML artifact showing all three widget sizes side by side on a dark iOS home screen wallpaper. No iPhone frame needed — just the widgets.
```

---

## 9. Onboarding Flow

```
Design the Onboarding flow for Monolith.

Screen 1: Welcome
- Full-screen dark `#0a0a0a`
- Monolith logo: simple vertical rectangle, acid lime, centered
- "Track what matters." (h1, centered)
- "A competence tracker for people who do deep work." (body, `#737373`, centered, max-width 280px)
- "Get Started" button (acid lime, full width, max-width 280px, radius 4px)

Screen 2: Set Daily Goal
- "How many focused minutes do you aim for each day?" (h2)
- Slider: 15min to 240min, default 60min
- Giant number "60" in JetBrains Mono display size, acid lime
- "min" caption below
- Context: "This fills your daily ring. You can change this anytime." body-sm `#525252`
- "Continue" button

Screen 3: Pick Identities
- "What areas of your life do you want to track?" (h2)
- Pre-set identity pills: Code (acid lime), Write (cyan), Design (purple), Learn, Exercise, Create
- Multi-select. Selected pills have bg at 15% opacity.
- "Select 2-3" hint in caption
- "Continue" button

Screen 4: Widget Setup
- "Add Monolith to your home screen" (h2)
- Visual previews of small, medium, large widgets
- "Skip" button available
- "Done" button

Screen 5: Done
- "You're ready." (h1)
- Empty grid cell shown with today's date
- "Start your first session" acid lime button

OUTPUT: Single HTML artifact showing all 5 onboarding screens as a horizontal scroll/swipe flow. iPhone 15 Pro frame.
```

---

## 10. Crew Dashboard

```
Design the Crew Dashboard screen.

Social feature for Pro users. Private micro-group accountability. Cooperative, not competitive.

LAYOUT:
1. Header: Back button, crew name "The Grinders" h1, "5 members" caption `#525252`, settings icon.

2. Invite Card (if creator):
   - bg `#141414`, border `#1f1f1f`, radius 4px
   - "Invite Code: X7K9P2" mono-md `#f5f5f0`
   - "Tap to copy" caption `#525252`

3. Active Challenge:
   - bg `#1a1a1a`, border acid lime at 10%, radius 4px
   - "Weekly Focus Goal" h3
   - "50 hours collectively" body-sm `#737373`
   - "3 days left" caption `#525252`
   - Progress bar: track `#1a1a1a` 8px, fill acid lime 8px, 72%
   - "36h logged • 4 members contributed" caption

4. Member Pulse:
   - "This Week" caption uppercase
   - "4/5 members hit their ring" body `#f5f5f0`
   - Row of 5 overlapping avatars (32px circles)
   - Ghost members shown as generic silhouette with lock icon

5. My Contribution:
   - "Your contribution: 8h 30m" h3
   - Breakdown by identity (if privacy allows)

6. Challenge History:
   - "Past Challenges" caption uppercase
   - "Week of May 1" → "Completed ✓" (acid lime check)
   - "Week of Apr 24" → "62% reached" (muted)

PRIVACY INDICATORS:
- Each member shows privacy icon: 🔒 (ghost), 👁️ (ring only), 📊 (breakdown)
- No individual stats for ghost members

OUTPUT: Single HTML artifact in iPhone 15 Pro frame.
```

---

## Usage Tips

1. **Start with Grid or Focus Mode** — these establish the core visual language.
2. **Use Kimi K2.6** for all prompts — it follows the token spec precisely.
3. **If a color is wrong**, say exactly: "Change the accent from teal to acid lime #ccff00"
4. **If typography is wrong**, say: "Use JetBrains Mono for all numbers, Plus Jakarta Sans for UI text"
5. **Iterate 2-3 times** per screen before moving to the next one.
6. **Export as HTML** after each screen is approved. Save to `apps/mobile/reference-screens/`.
7. **Use the HTML as a pixel-perfect target** when implementing in React Native + NativeWind.

---

## Quick Reference: Core Tokens

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Surface | `#141414` |
| Elevated Surface | `#1a1a1a` |
| Primary Text | `#f5f5f0` |
| Secondary Text | `#737373` |
| Tertiary Text | `#525252` |
| Accent (Acid Lime) | `#ccff00` |
| Secondary Accent (Cyan) | `#00f0ff` |
| Border | `#262626` |
| Border Subtle | `#1f1f1f` |
| Error | `#ff4444` |
| Warning | `#ffaa00` |
| Font Mono | JetBrains Mono |
| Font Sans | Plus Jakarta Sans |
| Border Radius (default) | 4px |
| Border Radius (pills) | 9999px |
| Motion Duration | 150ms |

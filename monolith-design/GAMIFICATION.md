# GAMIFICATION.md — Monolith Competence & Progression System

## Philosophy

Monolith does not gamify app usage. It gamifies **competence growth**. Every mechanic exists to make the user feel: *"I am getting better at the things I care about."*

**What we do NOT do:**
- Reward opening the app
- Use fear-based retention (streak loss anxiety)
- Create global leaderboards
- Add RPG stats, HP, classes, or avatars
- Use daily login bonuses or loot boxes

**What we DO:**
- Visualize progress through effort-based grids
- Measure and surface skill velocity
- Reward consistency without punishing breaks
- Create local, achievable social challenges
- Generate periodic competence reflections (Wrapped)

---

## Core Progression Loop

```
Set Goal → Do Focus Work → Log Session → Grid Updates → Reflect on Patterns → Adjust → Improve
```

The "reward" is the grid cell filling with color. The deeper the color, the more satisfying. No confetti. No badges. Just proof of work.

---

## 1. The Grid as Primary Motivator

### Effort-Based Intensity
Unlike GitHub's binary "did you commit?" grid, Monolith cells reflect **how much** you worked:

| Intensity | Color | Criteria (% of daily goal) |
|---|---|---|
| 0 | `#141414` (surface) | 0 minutes |
| 1 | `#2a2a2a` | > 0, < 25% |
| 2 | `#4a4a4a` | 25% - 49% |
| 3 | `#6a6a6a` | 50% - 74% |
| 4 | `#8a8a8a` | 75% - 99% |
| 5 | `#ffffff` (white) | 100%+ |

### Why This Works
- Users see **partial progress** as valuable (not all-or-nothing)
- A 30-minute session on a 60-minute goal still fills the cell to level 3
- This creates **momentum**: "I did something, the grid noticed"
- No binary failure state. Every minute counts.

### Identity-Filtered Grids
Each identity has its own grid view. Users can ask:
- "How consistent have I been with Exercise?"
- "Am I actually doing more Deep Work or just more Admin?"

This prevents the trap of "productive" work that isn't aligned with goals.

---

## 2. Levels & Titles

### Level Formula
```
Level = floor(Total Focus Minutes / 600)
```
1 level = 10 hours of focused work.

This is purely a **lifetime competence metric**. It does not reset. It cannot be lost.

### Titles
Titles unlock at milestone levels. They are cosmetic and reflect the user's journey:

| Level | Title | Rationale |
|---|---|---|
| 0 | Initiate | Starting out |
| 5 | Apprentice | 50 hours — consistent beginner |
| 10 | Practitioner | 100 hours — established habit |
| 25 | Specialist | 250 hours — deep in one area |
| 50 | Architect | 500 hours — building systems |
| 100 | Monolith | 1000 hours — mastery level |

**Display Rules:**
- Title appears on Profile screen below level number
- No special animation on level-up. The number simply changes.
- No notifications for leveling up. If the user notices, they notice.

---

## 3. Momentum Ring (Anti-Streak Design)

### The Problem with Streaks
Traditional streaks create:
- Guilt when you miss a day
- Anxiety about maintaining the number
- Burnout from "don't break the chain" mentality

### The Momentum Ring Solution
Instead of a streak counter, Monolith uses a **weekly momentum ring**:

- **Shape**: 7-segment circle (one segment per day)
- **Fill**: Segment fills if daily goal is met
- **Goal**: Not "7/7" but a sustainable target (default: 5/7 days)
- **Reset**: Every Monday at 00:00 local time. No carryover guilt.

### Momentum States
| State | Visual | Meaning |
|---|---|---|
| On Track | Ring 60%+ filled, accent color | Sustainable pace |
| Ahead | Ring 85%+ filled | Strong week |
| Rest Day | Empty segment, secondary-accent outline | Intentional rest (not failure) |
| Behind | < 40% filled by Thursday | Gentle nudge: "2 days left to find your rhythm" |

### Rest Day Mechanics
- Users can mark a day as "Rest Day" in advance
- Rest days show as a grey (`#737373`) outline, not empty
- Rest days do NOT break momentum. They are part of sustainable progress.
- App encourages 1-2 rest days per week in onboarding

### Notification Strategy
- **Good**: "You've hit your ring 4 days this week. One more for your goal." (Thursday evening)
- **Bad**: "You're about to lose your 12-day streak!" (NEVER used)
- **Rest**: "Tomorrow is your scheduled rest day. Recovery is part of the process." (Wednesday evening)

---

## 4. Identity Mastery

### Concept
Each identity tracks its own consistency independently. You can be a "Level 15" overall but only "Level 3" in Exercise.

### Identity Level Formula
```
Identity Level = floor(Identity Total Minutes / 600)
```

### Identity Mastery Rings
On the Identity Detail screen:
- 30-day mini ring for that identity
- "Consistency Score": % of days in the last 30 where you logged time for this identity
- Trend arrow: ↑ ↓ → compared to previous 30-day window

### Why This Matters
Users often feel productive in one area while neglecting others. Identity Mastery surfaces this without judgment:
- "Your Code consistency is 85% (trending up)"
- "Your Exercise consistency is 23% (trending down)"

The user decides what to do with this information. The app does not nag.

---

## 5. Skill Velocity

### Definition
Skill Velocity measures the **rate of improvement** in a user's focused work habits.

### Metrics Tracked
1. **Average Session Length**: 4-week rolling average
2. **Session Completion Rate**: % of started sessions that are completed (not cancelled)
3. **Daily Goal Hit Rate**: % of days where daily goal is reached
4. **Deep Work Ratio**: % of total time spent on "Deep Work" identities vs. "Admin"

### Calculation
```
Skill Velocity = weighted_average(
  session_length_change * 0.3,
  completion_rate_change * 0.3,
  goal_hit_rate_change * 0.2,
  deep_work_ratio_change * 0.2
)
```

Compared to previous 4-week period. Expressed as percentage.

### Display
- Profile screen: Sparkline showing 8-week trend
- Insight cards: "Your average session is 12% longer than last month"
- Wrapped: Annual skill velocity summary

### Why This Works (Competence = Retention)
Users stay when they feel improvement. Skill Velocity is the app's way of proving:
"You are getting better at focusing. The data shows it."

---

## 6. Insight Engine (Variable Rewards)

### Concept
Instead of predictable daily summaries, Monolith generates **contextual insights** at meaningful moments. The unpredictability creates anticipation without casino psychology.

### When Insights Appear
- After completing a focus session (20% chance)
- When opening the app after 3+ days absence (not a "we miss you" — a genuine pattern observation)
- On Sunday evening (weekly summary, if momentum was strong)
- Randomly, when a new personal record is set

### Insight Types

**Pattern Recognition:**
- "You do your best Deep Work on Tuesday mornings. Consider blocking that time."
- "Your Exercise sessions are 40% longer on weekends."

**Progress Validation:**
- "This is your 4th week hitting your daily goal 5+ times. You're building something sustainable."
- "Your Code consistency is up 15% this month."

**Gentle Nudges (never guilt-based):**
- "You've logged 0 hours of Write this week. Is this intentional?"
- "Your average session length dropped 20% this week. Feeling distracted?"

**Milestones:**
- "100 hours of Deep Work. That's 2.5 work weeks of pure focus."
- "Your longest session yet: 2h 47m. You're building stamina."

### Insight Card Design
- Appears as a card below the grid (not a modal, not a popup)
- Dismissible with swipe
- Max 1 insight per app open
- Color: Surface background, left border in accent (2px)
- Typography: Body text, no exclamation marks, no emojis

---

## 7. Personal Records

### Records Tracked
| Record | Description |
|---|---|
| Longest Session | Single focus session duration |
| Most Productive Day | Total focused minutes in one day |
| Most Productive Week | Total focused minutes in one week |
| Longest Consistency | Most consecutive days with > 0 minutes |
| Best Identity Streak | Most consecutive days for a single identity |

### Behavior
- Records update silently in the background
- When a record is broken, an insight card appears (not a popup)
- Records are viewable on Profile screen
- Records never reset. They are lifetime achievements.

---

## 8. Crew Challenges (Social Gamification)

### Philosophy
Crew challenges are **cooperative, not competitive**. The group works toward a shared bucket.

### Challenge Structure
- **Target**: Aggregate hours OR total completions
- **Cadence**: User-defined (weekly or bi-weekly)
- **Filter**: Optional identity filter (e.g., "Only Exercise counts")
- **Progress**: Anonymous aggregate bar

### Example Challenges
- "Collectively log 50 hours of focused work this week"
- "Complete 20 exercise sessions before Sunday"
- "Everyone hits their ring at least 3 times this week"

### Reward
- No points. No badges.
- On completion: Crew pulse updates to "Challenge completed 🎯" (subtle)
- Next challenge auto-generates based on crew's historical performance + 10%

### Why This Works (Local Competition)
- The challenge is achievable because it's 5 friends, not 10,000 strangers
- No individual shame for low contribution
- Aggregate progress means every member matters
- The "reward" is the group succeeding, not individual status

---

## 9. Wrapped (Annual Competence Report)

### Philosophy
Wrapped is a **reflection**, not a game. It appears once per year (or on-demand for rolling windows) and answers: "What did I actually accomplish this year?"

### Data Points
1. **Total Focus Hours**: The headline number
2. **Top Identity**: "This year, you were primarily a Creator (42% of your time)"
3. **Strongest Month**: "March was your peak — 48 hours of focused work"
4. **Skill Velocity**: "Your average session grew by 18% this year"
5. **Milestone Moments**:
   - Longest session of the year
   - Most productive day
   - Longest consistency streak
6. **Identity Breakdown**: Horizontal bar chart
7. **Full-Year Grid**: High-resolution render of the entire year

### Generation
- Calendar year: Auto-generated on Jan 1, user notified subtly
- Rolling year: User can generate anytime from Profile
- Data is pre-computed via edge function to avoid client-side heavy lifting

### Sharing
- Generate static image card (designed in Monolith theme)
- Privacy toggles: User selects which stats appear
- Default is conservative: Total hours + Top Identity only
- Share via native share sheet (Instagram, Twitter, etc.)
- No public URL. No web profile. The image is the artifact.

### Why This Works
- Wrapped is not a daily mechanic. It's an annual mirror.
- It makes users feel: "I did more than I thought."
- The shareable card is organic marketing without being pushy.

---

## 10. Anti-Burnout Mechanics

### Rest Days
- Explicit rest day scheduling (1-2 per week recommended)
- Rest days are visually distinct (cyan outline) and celebrated, not penalized
- Momentum ring does not require 7/7. Default target is 5/7.

### Sustainability Score
A hidden metric (not shown to user) that tracks:
- Rest day adherence
- Session length trends (rapid increase = burnout risk)
- Daily goal reasonableness (hitting goal < 30% of time = goal too high)

If sustainability score drops below threshold:
- Insight card: "Your focus time dropped 40% this week. Consider lowering your daily goal temporarily."
- Suggest rest day scheduling
- NEVER suggest "push harder"

### Session Cap
- Hard cap at 12 hours per session
- Soft warning at 4 hours: "You've been focusing for 4 hours. Consider a break."
- Focus Mode UI dims slightly after 2 hours as gentle reminder

---

## 11. Monetization Gates (Pro Tier)

| Feature | Free | Pro |
|---|---|---|
| Identities | 1 | Unlimited |
| History | 30 days | Unlimited |
| Grid identities | View all | Filter by identity |
| Skill Velocity | Current only | 8-week trend + history |
| Insight Engine | Basic (5 types) | Full (15+ types) |
| Personal Records | Last 30 days | Lifetime |
| Crew Creation | Join only | Create + manage |
| Wrapped | Current year only | Rolling + all years |
| Widgets | Small read-only | All sizes + interactive |
| Export | — | CSV/JSON |

**Upgrade Prompts:**
- Contextual, not interruptive
- "Filter your grid by identity to see where your time goes. Upgrade to Pro."
- Shown when user attempts a Pro action, not randomly

---

## 12. Formulas Reference

```typescript
// Level
const level = Math.floor(totalFocusMinutes / 600);

// Grid Intensity (0-5)
function getGridIntensity(minutes: number, dailyGoal: number): number {
  if (minutes === 0) return 0;
  const ratio = minutes / dailyGoal;
  if (ratio < 0.25) return 1;
  if (ratio < 0.50) return 2;
  if (ratio < 0.75) return 3;
  if (ratio < 1.00) return 4;
  return 5;
}

// Identity Consistency Score (last 30 days)
function getConsistencyScore(identityLogs: DailyLog[], identityId: string): number {
  const daysWithActivity = identityLogs.filter(
    log => (log.identity_breakdown[identityId] || 0) > 0
  ).length;
  return Math.round((daysWithActivity / 30) * 100);
}

// Skill Velocity (4-week comparison)
function getSkillVelocity(currentPeriod: PeriodMetrics, previousPeriod: PeriodMetrics): number {
  const sessionLengthChange = (currentPeriod.avgSessionLength - previousPeriod.avgSessionLength) 
    / previousPeriod.avgSessionLength;
  const completionChange = currentPeriod.completionRate - previousPeriod.completionRate;
  const goalHitChange = currentPeriod.goalHitRate - previousPeriod.goalHitRate;
  const deepWorkChange = currentPeriod.deepWorkRatio - previousPeriod.deepWorkRatio;
  
  return Math.round(
    (sessionLengthChange * 0.3 + 
     completionChange * 0.3 + 
     goalHitChange * 0.2 + 
     deepWorkChange * 0.2) * 100
  );
}

// Momentum Ring Segments
function getMomentumSegments(dailyLogs: DailyLog[], weekStart: Date): Segment[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const log = dailyLogs.find(l => l.date === format(date, 'yyyy-MM-dd'));
    const isRestDay = user.restDays.includes(format(date, 'yyyy-MM-dd'));
    
    return {
      filled: (log?.total_minutes || 0) >= user.daily_goal_minutes,
      isRestDay,
      date,
    };
  });
}
```

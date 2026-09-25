# AGENTS.md — Monolith

> ⚠️ **LIVING DOCUMENT** — Update this file after every session. Any coding agent picking up this project MUST read this first.

---

## Project At a Glance

**Monolith** is a minimalist, gamified cross-platform competence tracker. It visualizes focused work through an effort-based contribution grid (GitHub/LeetCode-style) with a brutalist "Monolith" aesthetic.

**Product Philosophy:** Competence-tracking, not engagement-farming. Users are rewarded for meaningful progress, not app usage.

**Current Phase:** Local-first mobile MVP implementation. iOS Simulator build verified; backend sync, widgets, and release QA remain incomplete.

---

## What's Been Done ✅

### Documentation (Complete)
- [x] `DESIGN_SYSTEM.md` — Full visual system (colors, typography, spacing, components, motion)
- [x] `PRD.md` — Product requirements, screen specs, data model, edge cases
- [x] `GAMIFICATION.md` — Progression system, momentum rings, anti-burnout mechanics
- [x] `SAAS_PLAN.md` — Freemium pricing tiers, RevenueCat integration, unit economics
- [x] `SOCIAL_FEATURES.md` — Crews, Wrapped, ambient social proof
- [x] `CLAUDE_DESIGN_PROMPT.md` — Reusable screen/component design prompts
- [x] `PROJECT_STRUCTURE.md` — Turborepo monorepo layout
- [x] `SCREENS_AND_WIDGETS.html` — Interactive HTML prototype of all screens

### Project Scaffold (Complete)
- [x] Turborepo root configuration (`package.json`, `turbo.json`, `.gitignore`)
- [x] Mobile app configuration (Expo, NativeWind, Metro, Babel, TypeScript)
- [x] Mobile app source structure (navigation, stores, types, lib, utils)
- [x] Shared package (date utilities, grid calculations, XP/level formulas)
- [x] Supabase initial migration (all tables, RLS policies, indexes, triggers)
- [x] Git repo initialized and pushed to GitHub (`PratikRai0101/cron`)

### Core Screens (React Native Implementation)
- [x] Grid screen — contribution grid, identity filter pills, momentum ring, task list, FAB
- [x] Focus Mode — count-up timer, ring progress, identity picker, pause/stop/cancel, keep-awake, background elapsed-time recovery
- [x] Task flows — create/edit/complete/delete, identity selection, estimates, quick time logging, daily/weekly/monthly recurrence
- [x] Identity screen — local activity grids/stats, add/edit/archive/restore, Free-tier identity limit
- [x] Profile screen — locally computed focus totals, level, momentum, records, identity breakdown
- [x] Settings — daily goal, local JSON export, confirmed local-data deletion
- [ ] Verify every flow with automated UI tests and accessibility audit
- [x] Onboarding — welcome, set goal, pick identities (seeds identityStore), widget setup, done
- [x] Retroactive logging — tap/long-press grid cell opens retro-log sheet (FR-4)
- [x] Add-identity modal — name + color picker, wired to Identity tab "+"
- [x] Insight card — weekly deep-work hours + delta vs last week, below grid

### State Management & Data Layer
- [x] `taskStore`, `identityStore`, `focusStore`, `userStore`, `appStore`, and `logStore` persist locally via AsyncStorage
- [x] Grid, identity totals, and profile derive from actual local focus sessions and retro logs
- [x] Supabase email sign-up/sign-in UI, optional client config, and auth profile trigger migration
- [ ] Cloud data sync, durable offline mutation queue, conflict resolution, and realtime subscriptions

### Open Design Integration (Complete)
- [x] Custom `monolith` design system for Open Design
- [x] Custom `monolith-mobile` skill for Open Design
- [x] 10 ready-to-use screen prompts

### Reference Screens (In Progress)
- [x] `01-grid-home.html` — Grid/Home screen reference
- [ ] `02-focus-mode.html` — Focus Mode reference
- [ ] `03-log-task.html` — Log Task bottom sheet reference
- [ ] `04-profile.html` — Profile/Stats reference
- [ ] `05-identity-manager.html` — Identity Manager reference
- [ ] `06-settings.html` — Settings reference
- [ ] `07-wrapped.html` — Wrapped annual report reference
- [ ] `08-widgets.html` — Widget mocks reference
- [ ] `09-onboarding.html` — Onboarding flow reference
- [ ] `10-crew-dashboard.html` — Crew Dashboard reference

---

## What's In Progress 🔄

### Priority 1: Core Screens (React Native Implementation)
Implement these screens in `apps/mobile/src/` using NativeWind:

1. **Grid Screen** (`app/(tabs)/grid.tsx`)
   - Contribution grid component (7 rows × variable columns)
   - Identity filter pills
   - Momentum ring (SVG, 7 segments)
   - Task list with swipe actions
   - FAB for new task
   - Insight cards below grid

2. **Focus Mode** (`app/modals/focus-mode.tsx`)
   - Full-screen timer (counts up)
   - Identity pill selector
   - Pause/Resume/Stop/Cancel controls
   - Background timer continuation
   - Auto-transition to log summary on stop

3. **Log Task Sheet** (`app/modals/log-task.tsx`)
   - Bottom sheet form
   - Task title input
   - Identity selector (single select)
   - Duration input (min/hr)
   - Date picker (default today)

4. **Profile Screen** (`app/(tabs)/profile.tsx`)
   - User card with level badge
   - Momentum ring (compact)
   - Skill velocity sparkline
   - Personal records cards
   - Identity breakdown bar chart
   - Subscription card (if Free)

### Priority 2: State Management & Data Layer
- [ ] Task store (`stores/taskStore.ts`) — CRUD operations, offline queue
- [ ] Identity store (`stores/identityStore.ts`) — identities, filters, mastery
- [ ] Focus session sync to Supabase
- [ ] Daily logs aggregation
- [ ] Offline-first sync implementation

### Priority 3: Backend Integration
- [ ] Supabase auth setup (email + OAuth)
- [ ] Realtime subscriptions for grid data
- [ ] Edge functions for Wrapped report generation
- [ ] RevenueCat integration for subscriptions

### Priority 4: Widgets (v1)
- [ ] iOS widget extension (Swift, WidgetKit)
- [ ] Android widget (Kotlin, AppWidgetProvider)
- [ ] Shared storage bridge (AppGroups / SharedPreferences)
- [ ] Background fetch for widget updates

### Priority 5: Desktop App
- [ ] Tauri configuration
- [ ] System tray integration
- [ ] Global shortcuts (Cmd+Shift+M for quick log)

---

## Architecture

### Tech Stack
| Layer | Technology |
|---|---|
| Mobile | React Native + Expo (EAS Build) |
| Desktop | Tauri (Rust) |
| Backend | Supabase (Postgres, Auth, Realtime, RLS) |
| State | Zustand |
| Billing | RevenueCat |
| Monorepo | Turborepo |
| Styling | NativeWind (Tailwind for React Native) |

### Directory Structure
```
monolith/
├── apps/
│   ├── mobile/              # React Native + Expo
│   │   ├── src/
│   │   │   ├── app/         # Expo Router screens
│   │   │   │   ├── (tabs)/  # Bottom tabs: grid, focus, identity, profile
│   │   │   │   ├── modals/  # Modal screens: log-task, focus-mode, settings
│   │   │   │   └── onboarding/
│   │   │   ├── components/  # UI components by domain
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── stores/      # Zustand stores (one per domain)
│   │   │   ├── lib/         # Utilities, configs, clients
│   │   │   ├── utils/       # Pure utility functions
│   │   │   ├── types/       # TypeScript types
│   │   │   └── widgets/     # Widget bridge logic
│   │   ├── assets/
│   │   ├── reference-screens/  # HTML reference mocks
│   │   └── [config files]
│   └── desktop/             # Tauri desktop app
├── packages/
│   └── shared/              # Shared types & utilities
├── supabase/
│   └── migrations/          # Database schema
├── open-design/             # Open Design configuration
│   ├── design-systems/monolith/
│   ├── skills/monolith-mobile/
│   └── prompts/
├── widgets/                 # Native widget source (iOS/Android)
└── monolith-design/         # Planning documents
```

### Navigation
- Bottom tabs: `Grid`, `Focus`, `Identity`, `Profile`
- Modal stack: `LogTask`, `FocusMode`, `Settings`, `CrewDashboard`, `WrappedPreview`
- Onboarding stack: `Welcome`, `SetGoal`, `PickIdentities`, `WidgetSetup`, `Done`

### State Stores (Zustand)
| Store | Responsibility |
|---|---|
| `appStore` | Theme, settings, onboarding status, offline state |
| `taskStore` | Tasks, completions, today's queue, offline queue |
| `focusStore` | Active session, timer state, elapsed time |
| `identityStore` | Identities, filters, mastery stats |
| `userStore` | Profile, subscription tier, level/XP |
| `crewStore` | Crew memberships, challenges, progress |

### Database Schema (Supabase)
Key tables: `profiles`, `identities`, `tasks`, `focus_sessions`, `daily_logs`, `crews`, `crew_memberships`, `crew_challenges`, `wrapped_reports`

All tables have RLS enabled. See `supabase/migrations/001_initial_schema.sql` for full schema.

---

## Design System Quick Reference

### Colors
```
Background:       #0a0a0a
Surface:          #141414
Surface Elevated: #1a1a1a
Border:           #262626
Border Subtle:    #1f1f1f
Text Primary:     #f5f5f0
Text Secondary:   #737373
Text Tertiary:    #525252
Accent (White):     #ffffff
Secondary Accent: #737373
Tertiary Accent:  #ff6b6b
```

### Typography
- **Data/Numbers**: JetBrains Mono (tab-nums)
- **UI/Headings**: Plus Jakarta Sans
- **Display size**: 48px / 700 / -0.02em (Focus timer)
- **H1**: 28px / 700 / -0.01em
- **Body**: 15px / 400 / 1.5
- **Caption**: 11px / 500 / uppercase / 0.02em

### Shape
- Default radius: 4px (cards, buttons, inputs)
- Grid cells: 2px radius
- Pills/Avatars: 9999px
- **No radius > 8px except pills**

### Motion
- Default duration: 150ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- **No bouncy springs. No decorative animations.**
- Reduced motion: instant (0ms)

### Core Rules
1. Dark mode ONLY. No light mode.
2. Acid lime is the ONLY accent. Everything else is disciplined.
3. No gradients. No shadows as primary elevation.
4. No engagement theater (no confetti, no streak anxiety, no daily login bonuses).
5. Grid cell fill is INSTANT. No animation.
6. Respect `prefers-reduced-motion`.

---

## Feature Gates

| Feature | Free | Pro |
|---|---|---|
| Identities | 1 | Unlimited |
| History | 30 days | Unlimited |
| Grid Filtering | View all | Filter by identity |
| Analytics | Current week only | Full trends |
| Widgets | Small read-only | All + interactive |
| Export | — | CSV/JSON |
| Sync | Local-only | Cloud sync |
| Crews | Join only | Create + manage |
| Wrapped | Current year | All + rolling |

**Pricing**: Pro = $4.99/mo or $39.99/year

---

## Environment Variables

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_REVENUECAT_API_KEY_IOS=
EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID=
EXPO_PUBLIC_POSTHOG_KEY=      # Optional telemetry
```

---

## How to Run

```bash
# Start Supabase locally
npm run supabase:start

# Start mobile app (Expo)
npm run mobile
# or
cd apps/mobile && npx expo start

# Start desktop app (Tauri)
npm run desktop

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Agent Instructions

When generating code for this project:

1. **Always reference `DESIGN_SYSTEM.md`** for colors, typography, spacing, and motion values.
2. **Follow the Monolith philosophy**: The UI should feel precise, utilitarian, and almost austere. Acid lime is the only "fun" element.
3. **Never add engagement theater**: No confetti, no "Good morning!" popups, no daily login bonuses. The reward is the grid filling up.
4. **Prioritize offline-first**: Assume the user has no network. Make it work locally, sync when possible.
5. **Respect privacy**: Social features are opt-in, anonymized by default, and never judgmental.
6. **Keep it minimal**: If a feature can be removed without breaking the core loop, question its existence.
7. **Use NativeWind**: All styling via Tailwind classes. No inline styles except dynamic values.
8. **TypeScript strict mode**: All components typed. Props interfaces required.
9. **Accessibility**: Labels on all interactive elements. Minimum 44px touch targets.
10. **Test what you build**: Run the app, verify the screen renders correctly.

---

## Git Workflow

- **Main branch**: Production-ready
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Micro-commits**: Commit frequently, push after each logical chunk
- **Remote**: `origin` = `git@github.com:PratikRai0101/cron.git`

---

## Useful Files for Quick Reference

| File | What's In It |
|---|---|
| `monolith-design/DESIGN_SYSTEM.md` | Complete visual system |
| `monolith-design/PRD.md` | All screen specs and data model |
| `monolith-design/CLAUDE_DESIGN_PROMPT.md` | Reusable prompts per screen |
| `apps/mobile/reference-screens/` | HTML pixel-perfect mocks |
| `apps/mobile/src/types/models.ts` | TypeScript interfaces |
| `apps/mobile/src/lib/constants.ts` | App constants |
| `apps/mobile/src/lib/colors.ts` | Typed color tokens |
| `supabase/migrations/001_initial_schema.sql` | Database schema |
| `open-design/prompts/screen-prompts.md` | Open Design prompts |

---

## Last Updated

**Date**: 2026-09-25
**Session**: Added daily/weekly/monthly recurring tasks and optional Supabase email account creation/sign-in with a profile trigger migration. Live auth and data sync require project credentials; sync is still unimplemented. Current work is being built before the requested later test pass.
**Next Session**: Implement cloud/offline sync, then native widgets, notifications, billing, social, and desktop features before release QA.

---

## Notes for Future Agents

- The project uses **Turborepo** with npm workspaces. Run `npm install` from root.
- Supabase is managed via CLI. Migrations are in `supabase/migrations/`.
- Open Design daemon runs separately. See `open-design/` for config.
- The `reference-screens/` HTML files are pixel-perfect targets. Match them exactly when implementing in React Native.
- If you need to generate a new screen design, use the prompts in `open-design/prompts/screen-prompts.md` with the Open Design daemon.
- When in doubt, check the interactive prototype: `monolith-design/SCREENS_AND_WIDGETS.html`

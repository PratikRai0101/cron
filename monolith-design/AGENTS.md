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
- [x] `redesign/fresh/DIRECTION.md` — Approved visual system (Strata: colors, typography, spacing, components, motion)
- [x] `PRD.md` — Product requirements, screen specs, data model, edge cases
- [x] `GAMIFICATION.md` — Progression system, momentum rings, anti-burnout mechanics
- [x] `SAAS_PLAN.md` — Freemium pricing tiers, RevenueCat integration, unit economics
- [x] `SOCIAL_FEATURES.md` — Crews, Wrapped, ambient social proof
- [x] `PROJECT_STRUCTURE.md` — Turborepo monorepo layout
- [x] `redesign/fresh/mockup.html` — High-fidelity mockup of every screen

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
│   └── mobile/              # React Native + Expo app
│       ├── src/
│       │   ├── app/         # Expo Router screens
│       │   │   ├── (tabs)/  # Bottom tabs: grid, focus, identity, profile
│       │   │   ├── modals/  # day, layer, log-task, retro-log, add-identity, settings
│       │   │   └── onboarding/  # area, set-goal, done
│       │   ├── components/  # strata, identity, tasks, ui
│       │   ├── hooks/       # useActivity, useIdentities, useMotion
│       │   ├── stores/      # Zustand stores (one per domain)
│       │   ├── lib/         # Strata geometry, activity records, presets, supabase client
│       │   ├── theme/       # Strata tokens and ThemeContext
│       │   ├── types/       # TypeScript types
│       │   └── __tests__/   # Jest suites
│       ├── assets/          # Fonts and app icons
│       └── [config files]
├── packages/
│   └── shared/              # Shared types & utilities
├── supabase/
│   └── migrations/          # Database schema
├── redesign/                # Design directions, critique and review evidence
│   ├── fresh/               # Approved Strata direction (the app's design)
│   └── onboarding-core/     # Approved Core Column onboarding + demo videos
└── monolith-design/         # Planning documents
```

### Navigation
- Bottom tabs: `Grid`, `Focus`, `Identity`, `Profile`
- Modal stack: `Day`, `Layer`, `LogTask`, `RetroLog`, `AddIdentity`, `Settings`
- Onboarding stack: `Area`, `SetGoal`, `Done`

### State Stores (Zustand)
| Store | Responsibility |
|---|---|
| `appStore` | Theme, settings, onboarding status, offline state |
| `taskStore` | Tasks, completions, today's queue, offline queue |
| `focusStore` | Active session, timer state, elapsed time |
| `identityStore` | Identities, filters, mastery stats |
| `userStore` | Profile, subscription tier, level/XP |
| `logStore` | Manual activity logs and their identities |
| `activityUndoStore` | The last record change, so an edit can be undone |

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

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Agent Instructions

When generating code for this project:

1. **Always reference `redesign/fresh/DIRECTION.md`** for colors, typography, spacing, and motion values.
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
| `redesign/fresh/DIRECTION.md` | Approved visual system (Strata) |
| `monolith-design/PRD.md` | All screen specs and data model |
| `redesign/fresh/mockup.html` | High-fidelity mockup of every screen |
| `apps/mobile/src/types/models.ts` | TypeScript interfaces |
| `apps/mobile/src/theme/config.js` | Strata colour tokens |
| `apps/mobile/src/lib/strata.ts` | Strata geometry |
| `supabase/migrations/001_initial_schema.sql` | Database schema |

---

## Last Updated

**Date**: 2026-09-25
**Session**: Added recurring tasks and optional Supabase email accounts. Added Xcode 27 DeviceHub support for local development. Fixed onboarding so Free setup selects exactly one identity, raised identity option contrast, and constrained daily goals to 15–240 minutes.
**Next Session**: Implement cloud/offline sync, then native widgets, notifications, billing, social, and desktop features before release QA.

---

## Notes for Future Agents

- The project uses **Turborepo** with npm workspaces. Run `npm install` from root.
- Supabase is managed via CLI. Migrations are in `supabase/migrations/`.
- The `redesign/fresh/mockup.html` screens are pixel-perfect targets. Match them exactly when implementing in React Native.
- When in doubt, check the approved mockups: `redesign/fresh/mockup.html`

## Design exploration — 2026-10-04
User requested fresh directions and mockups only. New exploration is in `redesign/fresh/` (Strata, Studio, Workshop). The rejected Loom direction was removed. No mobile source changed. Latest comparison: `redesign/fresh/shots/r3/sheet.png`; brief and stage limits: `redesign/fresh/DIRECTION.md`. Direction remains provisional pending user feedback; do not treat the existing Loom or these explorations as implementation requirements.

## Strata mockups — 2026-10-04
User approved A (Strata), mockups only. Full set: `redesign/fresh/mockup.html`; latest sheets `redesign/fresh/shots/full-r3/sheet.png` and `full-r3-se/sheet.png`; comparison `redesign/fresh/shots/before-after/sheet.png`. Same critic across rounds, final all13 scores4, scan0FAIL. Brief/tokens/content/keep coverage in DIRECTION.md and round history in CRITIQUE.md. No mobile source changed; no implementation authorized in this session. Prior Loom preserved.

## Strata implementation — 2026-10-04
User subsequently asked to build the approved set and requested branch isolation. Work is on `feat/strata-redesign`, carried off `master` before further edits; no main/master commit changed. Approved reference remains `redesign/fresh/shots/full-r3/`. Existing Expo SDK54 app now implements Strata across Grid, Focus/Recorded, Identities, Profile, History detail, appearance and related forms. Tokens: `apps/mobile/src/theme/config.js`; implementation evidence and limits: `redesign/fresh/BUILD.md`; native captures: `redesign/fresh/native-shots/`. Historical mockups-only scope above describes the earlier stage and is superseded by this build request.
NativeWind2 needs its own `darkMode: off` pseudo-variant; web CSS uses `tailwind.web.config.js` with class mode, without native extractor in PostCSS. Keep the shared palette and explicit theme provider. Native focus clock restores paused accumulated time; regression test covers it.

## Living strata — 2026-10-05
User requested the intended animation. On feat/strata-redesign, Specimen is now data driven through useActivity and lib/strata.ts: actual layers, latest7 plus compressed base, unsaved timer outline, full saved-layer spring and reduced-motion dissolve. Date-only retro logs precede timed sessions on the same local day. 22tests across3suites; motion evidence and limitations in redesign/fresh/BUILD.md and motion-shots/. Preserve existing simulator records when testing; use isolated browser fixtures. Main/master stays untouched.

## Strata microinteractions — 2026-10-05
User requested supporting microanimations and manual run steps. MotionPressable uses NativeWind2 styled AnimatedPressable so layout classes remain intact. useMotion shares spring behaviour and listens for Reduce Motion preference changes. Tab selection uses a measured sliding indicator; task checkmark, exact total settlement and anchored goal bar animate only state changes. QA fixtures remain browser-only; preserve the active simulator session. Manual instructions: redesign/fresh/RUN.md; captures/video: micro-shots/. Same branch; local commits only.

## Expo Go launch — 2026-10-05
User prefers Expo Go. `npm run go -- --port8087` explicitly chooses Go despite installed expo-dev-client. Official Expo Go54.0.7 tested on QA simulator: SDK54 and native glass imports work, onboarding skip reaches core. Native app data preserved in separate sandbox. SDK54 CLI cannot find conventional Simulator under Xcode27 Device Hub; manual simctl launch documented in redesign/fresh/RUN.md. Main unchanged; no SDK upgrade.

## Strata SDK57 — 2026-10-05
User requested SDK57 after Expo Go setup. Current feat/strata-redesign uses Expo57.0.26/RN0.86.3/React19.2.3. This supersedes SDK54 and NativeWind2 setup notes above. NativeWind4 uses withNativeWind Metro, nativewind/preset, class dark mode, colorScheme.set and cssInterop for AnimatedPressable/Text. No separate PostCSS/web Tailwind config. Derive custom tab props from Expo Router, whose navigation types now differ from external bottom-tabs types. Supabase pinned~2.105.0 because2.106.0 webpackIgnore OpenTelemetry import fails Hermes release compilation. iOS16.4 minimum, splash plugin and scene support for Xcode27/iOS27; old15.1 pod plugin removed. Use Node>=22.13. Native folders are ignored/generated; backed up before migration, with app data preserved. Run guide and validation: redesign/fresh/RUN.md and BUILD.md. Stay on feature branch; main/master unchanged, commits local.

## Physical Android spacing — 2026-10-05
User reported Grid action touching navigation and serif y cropped in empty state. FloatingNavigationProvider now shares measured custom tab-bar height; Grid/idle Focus derive action and scroll clearance from max(bottomSafeArea,16)+barHeight+20dp. Active Focus still hides tabs and keeps its existing action position. Preserve this shared geometry rather than restoring fixed+78 offsets. Empty heading line-height56/70 (compact28/36),6dp bottom glyph allowance. User phone screenshots supersede emulator-only confidence. Current changes stay on feat/strata-redesign.

## Layer inspection and record corrections — 2026-10-05
Added modals/layer for actual sessions/manual logs, with selected slice and older-base record list. Source-prefixed IDs are now used for strata and route lookup. activityRecords normalizes read models; replaceRecord compares the exact previous version before replacing, inserting or deleting. focusStore.replaceSession and logStore.replaceLog are typed mutation boundaries. activityChanges provides reversible edits/removal/new-record undo through a non-persisted activityUndoStore; clearing all local data must also dismiss this store. Do not replace whole history snapshots for Undo or reassign original timestamps/tasks during edits. Unchanged identity snapshots must survive a duration-only correction. Active timers are independent of saved-record edits.
Compact edit state replaces expanded detail and scrolls to top; native375×667pt SE number-pad proof in redesign/fresh/record-shots/r2. Android polish shares measured navigation clearance on Profile/Identity and adds keyboard avoidance/input target sizing.32tests across4suites pass; final bundling/review evidence in BUILD.md and CRITIQUE.md. Keep feat/strata-redesign isolated; commits remain local, main/master untouched.

## README and repository sync — 2026-10-19
Rewrote the root `README.md` for the shipped Strata build: native screenshots from `redesign/fresh/native-shots/`, an explicit built/not-built split, verified run and quality-gate commands, the actual monorepo tree, and a documentation index. Added the `LICENSE` file (MIT) that the README had always referenced. Updated RUN.md's push-status note. `feat/strata-redesign` now carries the docs commit; `master` was fast-forwarded to the same commit, and both were pushed to `origin` (PratikRai0101/cron). No application source changed; the last verified gates remain 32 tests across 4 suites, TypeScript, and ESLint.

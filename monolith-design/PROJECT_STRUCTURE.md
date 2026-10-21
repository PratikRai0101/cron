# PROJECT_STRUCTURE.md — Monolith

## Repository Layout

```
monolith/
├── apps/
│   └── mobile/                    # React Native + Expo app (iOS, Android, web QA)
│       ├── src/
│       │   ├── app/               # Routes: expo-router
│       │   │   ├── (tabs)/        # grid · focus · identity · profile
│       │   │   ├── modals/        # day · layer · log-task · retro-log · add-identity · settings
│       │   │   ├── onboarding/    # area · set-goal · done
│       │   │   └── _layout.tsx    # Root layout (providers, fonts, theme)
│       │   ├── components/
│       │   │   ├── strata/        # Strata visuals: CoreColumn, CoreSection, DepthRuler, Specimen
│       │   │   ├── identity/      # IdentityPill
│       │   │   ├── tasks/         # TaskRow
│       │   │   └── ui/            # Button, Card, Input, Pill
│       │   ├── hooks/             # useActivity, useIdentities, useMotion
│       │   ├── lib/               # strata geometry, activity records, presets, supabase client
│       │   ├── stores/            # Zustand: app, task, focus, identity, user, log, activityUndo
│       │   ├── theme/             # Strata tokens (config.js) and ThemeContext
│       │   ├── types/             # Shared TypeScript models
│       │   └── __tests__/         # Jest suites
│       └── assets/                # Instrument Serif, app icons
├── packages/
│   └── shared/                    # Date, grid and XP utilities
├── supabase/
│   └── migrations/                # Schema, RLS policies, auth profile trigger
├── monolith-design/               # PRD, gamification, SaaS plan, social specs, agent docs
├── redesign/                      # Design directions, critique and review evidence
│   ├── fresh/                     # Approved Strata direction (the app's design)
│   └── onboarding-core/           # Approved Core Column onboarding + demo videos
```

## Notable paths

| Path | What lives there |
|---|---|
| `apps/mobile/src/theme/config.js` | The Strata colour and type tokens the app renders with |
| `apps/mobile/src/lib/strata.ts` | Strata geometry: band shapes, column layout, depth math |
| `apps/mobile/src/lib/coreColumn.ts` | The core column used by the onboarding flow |
| `apps/mobile/src/lib/activityRecords.ts` | Turns sessions and manual logs into recordable layers |
| `apps/mobile/src/stores/` | Zustand stores, each persisted to AsyncStorage |
| `packages/shared/src/utils/` | Date, grid-intensity and XP maths shared with the app |
| `redesign/fresh/DIRECTION.md` | The approved visual system: brief, tokens, content, signature |
| `redesign/fresh/BUILD.md` | Implementation evidence and the limits of that evidence |
| `redesign/onboarding-core/demo/` | Demo videos: the hands-on cut and the full walkthrough |

## Commands

```bash
npm install                  # from the repo root
npm run type-check           # tsc across workspaces
npm run lint                 # eslint
npm test                     # jest
npm run mobile               # start the Expo dev server
```

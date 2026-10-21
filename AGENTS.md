# Monolith — contributor context

Monolith is a local-first competence tracker built with Expo SDK 57, React Native 0.86, React 19.2, NativeWind 4, Zustand and npm workspaces. The canonical branch is `main`.

## Start here

- `README.md`: implemented features, roadmap, setup and repository layout.
- `docs/DEVELOPMENT.md`: Expo Go, native builds, verification and known limits.
- `docs/DESIGN.md`: approved Strata visual and interaction system.
- `monolith-design/`: product, gamification, pricing and social plans. These describe future requirements as well as implemented behavior; check the README and source before assuming a feature exists.

## Architecture

- `apps/mobile/src/app/`: Expo Router tabs (Grid, Focus, Identity, Profile), modals and three-step onboarding (area, goal, result).
- `apps/mobile/src/components/strata/`: shared visual geometry and interaction components.
- `apps/mobile/src/theme/config.js`: authoritative light/dark tokens, shared with NativeWind.
- `apps/mobile/src/stores/`: app, task, focus, identity, user and manual-log state persisted to AsyncStorage; record Undo is deliberately session-local.
- `apps/mobile/src/lib/activityRecords.ts` and `activityChanges.ts`: normalized records and reversible compare-and-replace mutations.
- `packages/shared/src/`: date, contribution-grid and XP utilities.
- `supabase/migrations/`: optional backend schema, RLS and auth profile trigger. Cloud sync is not implemented.
- `docs/assets/` and `docs/demo/`: published README screenshots and demo media, not application assets.

## Invariants

- Preserve existing on-device records. Use isolated simulators/browser fixtures for QA; never reseed or clear the user's app data.
- Focus saves exactly once. Active timers are independent of saved-record edits. Record edits preserve the original task/date/completion time and unchanged identity snapshots.
- Undo must not replace whole history snapshots or overwrite a newer record version. Clear Undo when deleting local data.
- Strata layers derive from actual records; the newest seven remain distinct and older records compress into a base without losing totals or editability.
- Use the existing measured floating-navigation clearance, not fixed bottom offsets.
- Respect Reduce Motion/Transparency, accessible labels and at least 44-point touch targets. No engagement theater, confetti or streak anxiety.
- Preserve System/Light/Dark appearance and the mineral-blue palette. The superseded dark-only/lime and Loom directions are not requirements.
- Keep TypeScript strict. Reuse existing component and state patterns.

## Development

Run `npm install` at the root. Use Node 22.13+ and a matching SDK 57 Expo Go runtime.

```sh
npm run type-check
npm run lint
npm test
cd apps/mobile && npm run go -- --port 8087
```

Native `ios/` and `android/` folders are generated and ignored. Do not delete them or private `.env` files as routine cleanup. Supabase stays pinned to `~2.105.0`: the previously tested 2.106.0 release left a dynamic OpenTelemetry import that broke Hermes bytecode generation.

## Repository hygiene

Use conventional commits. Keep only active branches; delete feature branches after merging. Do not commit disposable HTML mockups, repeated screenshot rounds, build output or task caches. Keep published README assets and useful product requirements. Update this context when architecture or constraints change; use Git history rather than appending session transcripts.

## Current status

Local-first mobile MVP implemented; cloud/offline sync, widgets, notifications, billing, social and desktop remain future work. Physical-device haptics, Android runtime/keyboard behavior, VoiceOver and accessibility-sized Dynamic Type still need release QA.

Repository cleanup (2026-10-22): removed superseded design explorations, HTML mockups, duplicate captures, obsolete handoff docs and unused Button/Pill components. Consolidated current design/run guidance into `docs/` and contributor context here. Published screenshots and demo videos are retained; application behavior and storage are unchanged.

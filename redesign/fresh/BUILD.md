# Strata implementation

Branch: `feat/strata-redesign`. Existing Expo/React Native app; no SwiftUI rewrite. Main/master commits unchanged; changes are committed locally for review; nothing is pushed.

## Coverage
- Grid: actual daily minutes and goal, mineral specimen, 26-week history, identity filters, today/overdue tasks, add/edit/delete/complete and activity logging.
- Focus: count-up clock, pause/resume, minimum one minute to save, twelve-hour cap, discard confirmation, persistent active/paused state, recorded effort and layer landing interaction.
- History: day navigation, identity filtering, saved sessions and retro logs, real totals, log-time action.
- Identities: real accumulated time and 30-day activity, add/edit/archive/restore; original free/pro restrictions retained.
- Profile: real focused time, level, session/day counts, weekly goals, records and identity breakdown.
- System/light/dark appearance, onboarding and task/identity/log/settings forms use the shared palette. Approved icon included for iOS and Android adaptive foreground.

## Implementation choices
Shared light/dark tokens feed NativeWind, navigation and SVGs. UI uses the iOS system font; Instrument Serif is bundled with its OFL for static totals. Native Liquid Glass belongs only to floating navigation, with a tinted opaque fallback when unavailable or Reduce Transparency is enabled. SDK54 provides the native glass module on supported iOS26 runtimes.

Landing: 420ms ease-out, light impact at completion. Reduce Motion uses a 120ms dissolve without movement or haptics. Physical haptic feel is unverified. The new history route retains the app’s sheet/navigation conventions.

NativeWind2 uses its own native dark pseudo-selector. Web has a separate class-mode Tailwind config and normal CSS PostCSS pipeline; the native extractor must not rewrite web selectors. The web-only Expo import-meta transform supports the existing Zustand ESM export.

## Validation
- Xcode Debug iOS simulator build: BUILD SUCCEEDED.
- TypeScript: pass. ESLint: pass. Jest: 2 suites, 16 tests pass.
- Regression: restoring a paused session displays accumulated seconds without advancing during pause.
- Simulator: onboarding skip, focus start, pause, app restart, paused clock restoration, finish/save, recorded layer, history, identity collection, profile and light/dark switching inspected.
- Web export succeeds without malformed CSS warnings; fresh-browser onboarding skip reaches the core screen with zero page errors.
- Existing mockup scan remains 0 FAIL in normal and small-phone sets; native screenshots are reviewed visually, not by that DOM scanner.

## Evidence and limits
`native-shots/` contains actual iPhone17Pro simulator screenshots at native 3x resolution. Testing used a separate simulator named Monolith Strata QA (iOS26.5), leaving the existing simulator’s records alone. Rich-history and paused-state fixture records are synthetic and were written only into that QA simulator’s sandbox; no fixture/demo data is added to production source. One session was started, paused and saved through the UI.

Physical-device haptics, Android rendering, VoiceOver end-to-end, enlarged Dynamic Type and live widgets were not verified. Existing cloud-sync/purchase/widget limitations are unchanged. Small-phone static mockups passed; native small-phone validation remains unverified.

## Visual review
Same independent critic: 9/12 design scores4, 3 scores3; Fidelity4. Passed stop rule with no concrete remaining defect in eight native frames. Rhythm/craft3 reflect broader native spacing; Signature3 reflects motion not observed by critic. See CRITIQUE.md. Latest native sheet: `native-shots/sheet.png`.

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

Landing: the entire newly saved stratum drops 32 SVG units and settles with a spring (stiffness230, damping25, mass1); light impact at completion. Reduce Motion uses a 120ms dissolve without movement or haptics. Physical haptic feel is unverified. The new history route retains the app’s sheet/navigation conventions.

NativeWind2 uses its own native dark pseudo-selector. Web has a separate class-mode Tailwind config and normal CSS PostCSS pipeline; the native extractor must not rewrite web selectors. The web-only Expo import-meta transform supports the existing Zustand ESM export.

## Validation
- Xcode Debug iOS simulator build: BUILD SUCCEEDED.
- TypeScript: pass. ESLint: pass. Jest: 3 suites, 22 tests pass.
- Regression: restoring a paused session displays accumulated seconds without advancing during pause.
- Simulator: onboarding skip, focus start, pause, app restart, paused clock restoration, finish/save, recorded layer, history, identity collection, profile and light/dark switching inspected.
- Web export succeeds without malformed CSS warnings; fresh-browser onboarding skip reaches the core screen with zero page errors.
- Existing mockup scan remains 0 FAIL in normal and small-phone sets; native screenshots are reviewed visually, not by that DOM scanner.

## Evidence and limits
`native-shots/` contains actual iPhone17Pro simulator screenshots at native 3x resolution. Testing used a separate simulator named Monolith Strata QA (iOS26.5), leaving the existing simulator’s records alone. Rich-history and paused-state fixture records are synthetic and were written only into that QA simulator’s sandbox; no fixture/demo data is added to production source. One session was started, paused and saved through the UI.

Physical-device haptics, Android rendering, VoiceOver end-to-end, enlarged Dynamic Type and live widgets were not verified. Existing cloud-sync/purchase/widget limitations are unchanged. Small-phone static mockups passed; native small-phone validation remains unverified.

## Visual review
Same independent critic: 9/12 design scores4, 3 scores3; Fidelity4. Passed stop rule with no concrete remaining defect in eight native frames. Rhythm/craft3 reflect broader native spacing; Signature3 originally reflected motion not observed by critic; the subsequent motion review scores it4 (see below). See CRITIQUE.md. Latest native sheet: `native-shots/sheet.png`.

## Data-driven strata — 2026-10-05
The rock now renders actual saved sessions and manual logs across Grid, Focus, Profile and day detail, using each screen’s filter. Zero records render a wire outline. Each record deposits a band; thickness is sqrt(minutes)×3, clamped6–30units for legibility, and the whole stack compresses to96units. The latest seven records stay distinct; older records merge into a base that retains every minute and record count. Thickness is illustrative, not a linear time chart. Date-only manual logs precede timed sessions on the same local day.

An outlined unsaved layer grows with the count-up timer. It does not change saved totals, survives pause/restart through existing timer state, and disappears on discard. Finishing saves once and animates that actual new band’s front, side and cap into the stack. No replay on timer ticks, theme changes or ordinary history hydration. Reduce Motion uses120ms opacity only and no impact. SVG headroom covers the full stack plus incoming cap at−41units.

`motion-shots/` contains 3x React Native web captures and a native rich-history screenshot. Isolated browser tests seeded one15min saved session, advanced a live session15min, then finished: two records/30min, outline removed, translated group settled to0. A second1min save with reduced motion had no translate. Zero page errors. Synthetic test records live only in a fresh browser context; existing simulator records were not reseeded. Unit tests cover chronology, empty/invalid data, thickness, preview separation and100-record compression. Actual physical haptic feel and frame pacing still require a device.

Motion critique: Signature4, Richness4, Craft4, Rhythm3 after two rounds. Fixed singular day copy and max-stack animation headroom; no remaining concrete motion defect. Reviewer carries other accepted native scores forward. Review sheet: motion-shots/sheet.png; recording: motion-shots/landing.webm; browser viewer: motion-shots/index.html.

## Microinteractions — 2026-10-05
Primary actions, task controls, identity pills and tabs now compress to0.97 on press and spring back. With Reduce Motion they dim instead. The tab indicator slides between measured equal-width slots; changed selections have a selection haptic. A task checkmark fades/scales into the filled circle; a success haptic occurs only for explicit completion, never hydration. The real saved totals appear immediately and settle6points/fade140ms; the count-up clock remains steady. Goal progress scales with left anchoring and a spring, without layout animation. Shared spring360/36/1; Reduced Motion sets geometry immediately, preserving fades. Preference-change listeners apply updates live.

Validation: TypeScript/lint pass; existing22tests pass. Isolated3x browser captures/video in micro-shots/ exercise held press, identity filter (45→15minutes; goal75%→25%), persisted task completion and web checkbox state, tab changes and reduced motion with zero page errors. Native active-focus buttons/header inspected without changing the user’s session. Physical haptics and native intermediate tab/check frames remain unverified. Copy singulars corrected; Profile dark time-share tracks now use the dark separator. Static mockup scan remains0FAIL; runtime frames visually reviewed. Manual launch commands: RUN.md.

## Expo Go verification — 2026-10-05
The earlier custom-client requirement was too strict: GlassEffect is included in Expo Go. Added `npm run go` (explicit `expo start --go`) and tested official SDK54 Expo Go54.0.7 on the QA simulator. Onboarding skip reaches the actual Strata core screen; no missing-native-module failure. Capture: expo-go.png. Expo Go uses separate storage; development-client records preserved. No SDK upgrade or UI fallback rewrite needed. Xcode27 Device Hub is not recognized by SDK54 CLI’s iOS launcher, so this Mac uses simctl to open the already-installed Expo Go app; details in RUN.md. Physical phone QR connectivity unverified.

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

## SDK 57 migration — 2026-10-05

Upgraded the approved Strata branch from Expo54 to Expo57.0.26, React Native0.86.3 and React19.2.3. Expo modules, Reanimated4.5.1, Worklets0.10.1, Gesture Handler2.32, TypeScript6 and Jest Expo57 are aligned. Root Worklets0.5 dependency removed. NativeWind2 migrated to4 with shared Metro CSS, class-based themes, colorScheme and cssInterop for animated controls. Stable Animated.Value instances use lazy state to satisfy current React lint rules; their timing and reduced-motion behavior are preserved. Tab-bar types are derived from Expo Router, which now carries its own navigation types.

Splash configuration moved to its native plugin; obsolete pod-target workaround removed. iOS minimum16.4 and scene support enabled for Xcode27/iOS27. Previous ignored native folders were backed up outside the repository before regeneration. Local app storage was not cleared.

Supabase2.106.0 currently leaves a webpackIgnore dynamic import for OpenTelemetry in the native bundle. Hermes rejects it during bytecode generation. Pinning Supabase to~2.105.0 avoids this issue; revisit the pin when a compatible upstream release is available. No auth or storage schema changes.

Validation: Expo Doctor21/21; all22tests across3suites; TypeScript and ESLint pass; production iOS Hermes and web exports pass. Expo Go57.0.9 visibly reports SDK57.0.0 and renders Strata on iPhone17Pro/iOS26.5. Navigation, Settings dark preference and Focus start checked in the actual runtime. Physical phone connection, Android runtime, and physical haptic feel remain unverified. Run instructions: RUN.md. Native build result and final session verification recorded below.

Runtime loop confirmed: a real~1min Focus session in Expo Go advances the outlined draft, saves exactly1min and1layer on Finish, and displays Recorded with the exact total. Dark capture: expo-go-sdk57.png. Existing native-development-client records remain in their separate sandbox.

Final build checks: Android Hermes export passed as well. Fresh Xcode27 Debug simulator build succeeded from the regenerated SDK57 iOS project (`/tmp/strata-sdk57-build/Build/Products/Debug-iphonesimulator/Monolith.app`), and installed over the existing QA development client without uninstalling/clearing its data. All22tests and Expo Doctor21/21 passed again after the Supabase pin. Theme preference in the Expo Go QA sandbox was restored to System after verification.

Rebuilt development client also launches with runtime exposdk:57.0.0. Its existing78records/3082saved minutes and3tasks are present after installing the upgrade; no data reset. Expo Go remains the preferred launch mode at port8087.

## Android visual corrections — 2026-10-05
User’s physical-phone screenshot revealed CTA/tab contact and a cropped serif descender. Grid/idle Focus action placement now derives from the actual custom tab-bar height, the same minimum16dp safe-area offset used by the bar, and a20dp clear gap. Scroll padding follows the control group. Empty Grid heading uses56/70pt or28/36pt leading with6pt bottom glyph allowance. No data or motion behavior changed. TypeScript/ESLint pass; native Android Expo Go57 confirms the y descender clears the text box at360dp width. Clean spacing capture and independent review recorded below.

Native capture verification: layout-fix-shots/ios-grid.png shows the CTA separated from tabs by20pt. layout-fix-shots/android-360-heading.png shows the full serif descender at360dp width. Expo Go’s Android first-run developer overlay blocked a clean lower-screen capture; Android CTA geometry is code-verified but not visually verified on the user’s physical phone. CUA could not bind the Android emulator, so no alternate UI-input automation was used. Temporary emulator display overrides were reset before closing the first session; subsequent test used read-only AVD and was closed. No user app records were cleared. Native screenshots are not DOM slop scans.

Independent critic confirmed both reported fixes, then caught an incidental native progress regression. GoalProgress now scales from explicit left-centre transform origin; ios-grid-r2.png verifies the1/60 fill starts on the left. Final scoped scores Typography4/Rhythm3/Craft4 with no concrete defect left in reviewed fixes. TypeScript and ESLint pass after the final change. Reload the existing Expo Go session to receive these JS/style changes; no native rebuild needed.

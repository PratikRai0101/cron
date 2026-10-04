# Monolith — Strata redesign mockups

## Brief
User-confirmed: fresh visual directions first, mockups only. No application code changes.
Inferred from the existing product: a competence tracker for people practising Code, Write, Design and Train. Core action: inspect today’s effort and start focused work. Working feel: tangible, deliberate, rewarding. Feel and audience remain provisional until the user supplies preferences. Existing name, bar mark, contribution history and product capabilities retained. Imagery: custom SVG and material colours; no paid image generation.

## Current app
Source: apps/mobile/src/app/(tabs)/grid.tsx and existing redesign/before.html. Prior Loom work is preserved in redesign/.
The live app still uses a dark, mono-heavy grid with a centred goal ring, boxed insights, filters and an add-task FAB. Its scan and reconstructed before images remain in redesign/shots/before; those are reference reconstructions, not newly captured live screenshots. Fresh concepts differ from both this look and the Loom direction.

Keep: contribution grid and day detail/retro log; focus count-up timer with pause/finish/discard; task creation/edit/completion/deletion; identity filter and management; daily goal; weekly comparison; profile/level/statistics; settings and onboarding. The full core loop is now represented; secondary form states remain production requirements.
Lose: competing ring and grid, boxed insight presentation, monospace as the app’s blanket identity.
Unknown: detailed audience/mood preferences beyond the selected direction.
User-approved visual decision: home hero becomes focused minutes with Strata. Name and Grid / Focus / Identity / Profile tab structure remain.

## Content before layout
Same fixture for all three: Sun 4 Oct, 09:41. 47 minutes today out of 60; 13 remaining. Four tasks, two complete. Completed: parser fix, Code, 25m; run, Train, 22m. Pending: Review Sana’s scheduler PR, Code, due yesterday, 30m estimate; Draft the Rust post, Write, new, 45m estimate. 3h 42m this week, 38m more than last week. 26-week grid, 78 worked days, Apr–Oct, outlined last cell is today. Filters: All, Code, Write, Design. CTA Start focus. Navigation: Grid, Focus, Identity, Profile. This is synthetic design data, not the user’s records.

## Three concepts
1. **Strata. Monolith is a geological core sample.** Nature / light / serif / blue / illustration. Instrument Serif display makes the number feel cut into a specimen, paired with SF UI. Cool mineral white, slate blue, hand-drawn section of layered stone. The original name finds a literal physical form. Signature proposal: finishing a session adds one thin blue stratum and deepens today’s grid cell, 420ms spring, light landing haptic; reduced motion crossfade.
2. **Studio. Monolith is a recording studio.** Media / dark / mono / yellow / shape. SF Mono for the hero and title, SF for labels. Plum-tinted charcoal and warm meter yellow; quiet waveform as a trace of work recorded. Signature proposal: finish closes the waveform into a saved take, 350ms spring, success haptic; reduced motion instant saved take.
3. **Workshop. Monolith is a clay workshop.** Place / colour-field / condensed / pink / colour-material. Condensed SF heavy figures on fired rose; a ceramic section built from effort. Signature proposal: another coil settles on the form, 450ms spring, soft impact; reduced motion dissolve.

Ground, display design, hue family and richness all differ. Three different source families. No photography promised; all art authored locally. Instrument Serif font and OFL licence bundled in assets/.

## Refused defaults
Refuse the current dark developer dashboard, monochrome ring plus tiny grid, default stat card stack, terminal typography everywhere and green productivity heatmap. Also refuse the Loom’s indigo-and-saffron cloth and the skill’s grey-paper/red-ink rut. Category comparisons are visual design hypotheses, not newly researched market rankings.

## History check
Compared with every row in ~/.app-designer/history.md on 2026-10-04:
Strata (nature, light, serif, blue, illustration): differs by 3 / 5 / 3 / 3 / 3 columns from Loom / Monolith Loom / MonoCode / NeoBot / Varq respectively.
Studio (media, dark, mono, yellow, shape): 5 / 5 / 4 / 5 / 3.
Workshop (place, colour-field, condensed, pink, colour-material): 4 / 3 / 3 / 5 / 4.
Strata recorded in history after exploration; full set continues that same direction.

## Stage
User approved A (Strata). Full mockup set follows. Strata won because the name, accumulated effort and physical layers reinforce each other without renaming the product’s controls. Studio may overemphasise developer instrument language; Workshop may imply pottery or a habit toy. All three were rendered and shown before selection.

## Exploration validation
Three visual rounds, rendered at 3x on 402×874 and 375×667. Latest: shots/r3/sheet.png. All six final scans clean: no FAILs, no warnings. All individual PNGs inspected. Each direction has six type steps; cross-concept count covers three separate styles.
R2 reserves navigation space, exposes pending rows on the large phone, reduces artwork, adds irregular rock boundaries and moves weekly comparison above filters. R3 shrinks small-phone Strata art by20pt to keep its task heading intact. Small phones scroll the remaining task list.
Independent scores and findings: CRITIQUE.md. Motion/haptics remain proposals; real-device feel untested. Font locally bundled. No image-generation credits used. The full set now includes icon, dark mode, signature and before/after.

## Chosen direction — user approved A
Strata is selected. Same product name and four destinations. Mockups only. App audience and mood remain inferred from the codebase; visual direction is now user-confirmed.

## Final tokens
| Role | Mineral daylight | Basalt dark |
|---|---|---|
| ground | #F1F4F3 | #142029 |
| raised | #E5ECEE | #233541 |
| ink | #182C3B | #EDF3F4 |
| ink-2 | #4B606B | #B6C8D0 |
| ink-3 | #526874 | #A0B5C0 |
| rule | #CCD7DC | #394D5B |
| accent | #24577E | #99C2DF |
| on-accent | #FFFFFF | #142029 |

Accent role: selected action/state. Blue is also the quantitative effort ramp, with opacity encoding effort. Identity labels and position distinguish categories; no rainbow palette. Art uses slate/blue tints from the same mineral family. Raised is used for form fields, not stacked cards.
Typography: Instrument Serif regular for static totals and expressive headlines; SF Pro for UI, live timer and rolling totals (real tabular numerals). Seven steps: display76/1.0, title28/1.1, heading20/1.2, action17/1.3, body15/1.4, metadata13/1.35, caption11/1.3. Display tracking−2%; SF titles−1%; metadata0. Weights: serif400; UI400/600/700. Margins24pt; spacing4/8/12/16/24/32/48; square mineral tiles, circular completion controls, capsules for action and glass navigation. Dark display uses pale mineral strata on basalt ground, retaining the blue family.

## Full-set content (written before layouts)
Synthetic mid-use fixture; no user data read.
1. Home: Monolith; Sun4Oct09:41; Today;47 minutes today;13 to60 min goal;26weeks/78worked days;3h42 this week,38m more than previous. All/Code/Write/Design/Train filter (Train restored from actual app). Today’s work4tasks2done; Add task. Two pending rows and two completed rows as above. Start focus. Grid/Focus/Identity/Profile.
2. Day detail: back History; Tue22Sep;3h10m; across2identities; geological slab with three session seams; Sessions;09:12 Code Review pull requests1h05;11:30 Code Ship parser fix40m;15:05 Write Draft the Rust post1h25. Log time. Edit logs through session context actions; no fictitious tap targets on artwork.
3. Focus: Sun4Oct09:41; Focus; count-up18:24; Draft the Rust post; Write; session seam, marked18min. Code/Write/Design/Train picker, Write selected. Pause; Finish; Discard session separated. Today47min saved; current session not yet added. Finish adds18min once duration rounds down; signature total65.
4. Identities: Identities;4active;186h14 total. Code121h18,Write38h42,Design18h11,Train8h03; each last30days activity, tiny mineral cut, context Edit/Archive. Add identity. Archived1 with Restore action. Fixture is a Pro account to avoid implying Free allows4identities.
5. Profile: Profile; Settings;186h total with14m remainder; Level19;184focus sessions;78days worked. This week2of7days met goal, daily60min. Longest session1h47; bestday4h12; breakdown totals match Identity screen. Pro account; local data; Export data via Settings entry. Settings/onboarding forms retained in product, not all designed in this limited set.
6. Signature panel: A new layer; Finishing a session makes today’s work permanent. Three mini frames:0ms (save18min;47min total);160ms (blue seam descending);420ms (seam docked;65min;Today cell deepened). Captions18min recorded; light impact420ms; reduced motion120ms dissolve. Artwork is a visual aggregate, grid remains exact day-by-day data. No fake correspondence between five drawn strata and78days: layers are an abstract illustration of cumulative work.
7. Dark: same Home content and layout, basalt ground, pale slate art and blue action.
8. Empty: Monolith; Sun4Oct09:41;0minutes today;60min goal. Untouched geological outline. No work recorded yet. Choose an identity, then start your first session. Code selected; Edit identity; Start focus; same navigation. This screen represents post-onboarding first use, not removal of onboarding.
9. Icon: three stacked angular mineral bars in blue/slate on cool light ground. One silhouette at29pt; separate SVG background and three foreground layers support later Icon Composer work (not compiled/verified).

## Signature storyboard
Trigger: Finish and save an18min session. Frame0 saved minutes held at47; frame160 new seam moves12pt toward slab; frame420 seam lands, total65, today’s cell deepens. Duration420ms critically damped spring, interruptible. Light impact on landing; success state conveyed by total and cell, not confetti. Reduced motion120ms crossfade with instant number update. Prototype replays the art only; device haptics and digit transitions specified, not verified on hardware.

## Coverage contract
Home preserves grid, goal, identity filtering, task list, completion controls and Add task. Detail preserves retro logging and session access. Focus preserves count-up/pause/finish/discard. Identities preserves add/manage/archive/restore entry points and actual totals. Profile preserves level, session totals, records, weekly goal count and settings access. Dark/empty/signature/icon complete the visual set. Not designed: add/edit-task form, identity editor, archive confirmation, settings/auth/export forms, multi-step onboarding and widgets. These remain required production features and are not proposed removals.

## Current-app audit evidence
Reconstructed current UI matches the dark developer-dashboard face in slop.md: mono, ring/grid competition, tiny metadata. Original DOM scan FAILs: text below11pt on home/focus/profile; contrast4.18:1 for small text and2.53:1 profile goal copy; touching35m/+ labels on home. The before-image wrapper does not re-test the original DOM. Source scan: ../shots/before/scan.json. Comparison: shots/before-after/sheet.png.

## Keep checklist
- [x] Contribution grid, daily goal and weekly comparison: Home; day/retro log access: History.
- [x] Tasks, completion and creation: Home; edit/delete entry via contextual affordance.
- [x] Count-up, identity selection, pause, finish and discard: Focus (discard scrolls on small phone).
- [x] Identity add/manage/archive/restore: Identities; activity strips have30cells and exact active-day counts.
- [x] Profile total, level, records, weekly goals and Settings entry: Profile.
- [x] Theme and first-use coverage: dark Home and post-onboarding empty state.
- [x] Settings, onboarding and secondary forms remain required, outside this mockup set.
No pending product removal or naming/tab decisions. This is a visual design, with synthetic records; app code untouched.

## Small-phone adaptation
First-run and storyboard headlines reduce to28pt on375×667 to preserve the primary action and complete signature. Scroll viewports stop above floating navigation; remaining task, identity and breakdown rows are deliberately scrollable. No image-generation credits used. Audience/mood brief was self-authored from the product; direction and mockup scope were user-confirmed.

## Final delivery
Full mockups complete after three full-set critique rounds. Latest sheet: shots/full-r3/sheet.png; small phone: shots/full-r3-se/sheet.png. Zero scan FAILs, warnings explained in CRITIQUE.md. Final independent scores4/5 on all13 lines. Before/after: shots/before-after/sheet.png. No app implementation performed.

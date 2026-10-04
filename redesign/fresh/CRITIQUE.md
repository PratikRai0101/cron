# Fresh Monolith exploration — independent critique

One independent design critic reviewed the same three concepts over all rounds. Scope: home-screen directions only. Signature storyboard, alternate modes, app icon and complete flow fidelity are deferred until direction selection. Full-app completion rule does not apply to this exploration.

## Scores
Each cell: Strata / Studio / Workshop. Twelve applicable lines, including home-screen fidelity.

| Line | R1 | R2 | Visible evidence / change |
|---|---|---|---|
| Concept | 4/4/4 | 4/4/4 | Rock layers, recorded waveform, ceramic vessel |
| Category distinctiveness | 4/3/4 | 4/3/4 | Studio retains dark developer-instrument vocabulary |
| Skill distinctiveness | 4/4/4 | 4/4/4 | Authored art rather than monochrome paper |
| Hierarchy | 3/4/3 | 4/4/4 | Removed competing Strata slogan; Workshop hero now beside vessel |
| Typography | 4/4/4 | 4/4/4 | Serif, mono, condensed display voices |
| Colour | 4/4/4 | 4/4/4 | Mineral blue, meter yellow, fired rose; shown mode only |
| Richness | 3/4/4 | 4/4/4 | Irregular rock boundaries replace sheet-like layers |
| Rhythm | 3/3/2 | 4/4/3 | Compact art frees task space; Workshop still has a lower rest |
| Craft | 2/2/2 | 3/4/4 | Chrome no longer overlaps task rows; R2 small Strata heading cut at viewport |
| Native fluency | 3/3/3 | 4/4/4 | Reserved content viewport plus floating glass nav |
| Feature test | 3/3/3 | 4/3/3 | Strata best links product name to accumulation |
| Home fidelity | 3/3/2 | 4/4/4 | Goal, history, filters, weekly comparison, both pending tasks visible at large size |

R1 five asks: reserve bottom navigation space; shrink/remove Strata slogan; make mineral boundaries irregular; shrink Workshop vessel and place beside number; move weekly insight above filters. All landed in R2. No declined asks.

R3: small Strata artwork 82→62pt so Today’s work heading remains intact. Large-phone images and Studio/Workshop unchanged from R2. Independent critic confirmed the heading fix: Strata craft rises 3→4; all other scores carry forward. Strata now scores4 on all12 applicable lines. Exploration ready; full-app set not yet designed.

## Scan and visual QA
Final images: shots/r3 and shots/r3-se. All six full-size PNGs inspected. All six DOM scans clean: no FAILs or warnings. Cross-concept type count is deliberately broader than an individual app; each individual direction has six text sizes.

R1 dash warning fixed using “Apr to Oct”; broad type count narrowed but different display sizes remain intentional across independent concepts. Small R1 safe-area warnings were caused by content under chrome; actual viewport reserve corrects them. R2 safe-area warning concerned completed content outside the clipped viewport and was not painted onscreen; R3 clean.

## Recommendation and limits
Strata recommended independently: literal connection to Monolith and accumulated work, without implying an audio app or pottery app. Proposed signature: a fresh mineral layer lands as today’s cell fills. Timing/haptics remain an unbuilt proposal. No real-device feel or motion validated. User mood/audience inferred from current product, not newly confirmed. No application code changed.


# Full Strata set — same independent critic
User selected A. Eight screen frames plus icon; critic inspected all18 full-size PNGs in R1/R2, then the changed Identity screen at both sizes in R3. Unchanged scores carry forward.

| Rubric line | Full R1 | Full R2 | Full R3 | Final evidence |
|---|---:|---:|---:|---|
| Concept |4|4|4|Mineral slab, cut grids, icon and empty outline share one world|
| Category |4|4|4|Physical accumulation and daylight replace developer dashboard|
| Skill distinctiveness |4|4|4|Authored geological art rather than red-paper minimalism|
| Hierarchy |4|4|4|One total or timer leads each functional screen|
| Typography |4|4|4|Serif static totals and SF tabular timer have distinct roles|
| Colour |4|4|4|Mineral daylight and basalt dark, one blue action family|
| Richness |4|4|4|Purposeful specimen and outline artwork|
| Rhythm |3|4|4|Small Focus and empty states keep groups clear|
| Craft |2|3|4|Collisions and final duplicated rule resolved|
| Native fluency |3|4|4|Selected tabs, floating navigation, contextual actions|
| Signature |3|4|4|Docked cap,47→65 and deepening Today tile read together|
| Feature test |4|4|4|Home/dark/signature tell effort becoming material|
| Fidelity |3|4|4|Kept routes/actions present; secondary forms explicitly scoped|

## Full R1 asks and R2 response
1. Small Focus divider crossed Write pill. Picker44pt/nonshrinking,16pt separator gap, smaller specimen: landed.
2. Signature seam mismatched slab projection. Shared SVG coordinates, final docked state and visible Today cell: landed.
3. Identity/Profile selected tabs missing. Correct selection states: landed.
4. Empty title too close to outline. Small title28pt and clear artwork separation: landed.
5. Archive/Restore discoverability weak. Entry under compact summary, tighter identity rows and continuation: landed.
No declined asks. Profile goal count corrected to2of7 to agree with222weekly minutes.

Full R2 met threshold:11of12 standard lines≥4, no score<3, Fidelity4. One concrete remaining correction: duplicated Archive/Code horizontal rules. Full R3 removes Archive bottom border, retaining Code top boundary. Critic confirmed craft3→4 at both sizes; all13 lines now4. No further concrete defects. Done by critique.md stop rule after three full-set rounds.

## Final scans and verification
Latest shots/full-r3 and shots/full-r3-se. Zero FAILs at402×874 and375×667, all18 individual PNGs opened. Large scan has zero warnings. Three small-screen warning groups answered: Home/Dark Rust task and Identity Design-day metadata lie beyond clipped scroll viewport, not painted in system safe areas. They remain accessible by scrolling. Critic independently confirmed this.
Seven app-wide type sizes; font loaded locally; no browser page errors. Prototype replay uses420ms animation, reduced-motion120ms dissolve (computed styles verified). Identity strips have30cells with18/11/8/14active matching their labels. Day sessions sum190min; identity totals sum186h14; saved47+18=65. Before/after uses original reconstructed reference, not a new live-app screenshot.

## Limits
No application code changed. Browser-rendered glass approximates native Liquid Glass; no real-device motion timing, haptics or interaction feel verified. Local SF fonts render on this Mac; bundled Instrument Serif verified loaded. Icon layers are source assets, not compiled Icon Composer output. Mockups show route/action entry points; no forms or live state transitions implemented. Brief audience and mood self-authored from existing product, direction and scope user-confirmed.

## Native implementation QA — 2026-10-04
Same independent critic reviewed all eight final native captures. Concept4, Category4, Skill distinction4, Hierarchy4, Typography4, Colour4, Richness4, Rhythm3, Craft3, Native fluency4, Signature3, Feature test4, Fidelity4. Done by the visual stop rule: 9/12 design lines at4, none below3. No remaining concrete must-fix defect. Native spacing has broader gaps than static mockups; animation timing was not inspected by the critic.

Corrections landed: compact empty-state zero/goal baseline, paused controls separated with no runtime warning, coherent Pro fixture, singular session copy, consistent historical fixture labels, basalt goal track. Actual historical snapshot names remain preserved in product data. Scroll content behind glass is deliberate and remains scrollable. Functional timer/persistence validation and limits are recorded in BUILD.md.

## Living strata: motion review — 2026-10-05
Same independent critic reviewed the seven 3x React Native web frames, model/component code and verification.json. This is an incremental signature review; the accepted three-direction exploration and full native set are unchanged. Physical haptics/frame pacing not scored from screenshots.

| Changed rubric line | Motion round1 | Motion round2 |
|---|---:|---:|
| Signature | 4 | 4 |
| Richness | 4 | 4 |
| Craft | 3 | 4 |
| Rhythm | 3 | 3 |

Round1: outlined draft is distinct from saved fill, saved band visibly suspended, settled seams join, reduced-motion has no translate. Two concrete asks: singular “1 day worked”; enough SVG headroom for maximum stack’s incoming cap at−41. Both landed: singular conditional and viewBox top−44. Thin first band retained deliberately because one real record must not invent six strata.

Round2: both fixes verified; no remaining concrete motion defect. Signature4, Richness4, Craft4, Rhythm3. Existing other native scores carry forward rather than being claimed as newly rescored. Done by the stop rule. No declined asks. Latest evidence: motion-shots/sheet.png and landing.webm. Existing static mockup scan stays0FAIL; actual runtime screenshots were visually reviewed, not DOM-scanned.

## Supporting microinteractions — 2026-10-05
Same critic reviewed six3x runtime web frames, the interaction sources and a native focus capture.

| Changed line | Round1 | Round2 |
|---|---:|---:|
| Colour | 3 | 4 |
| Craft | 4 | 4 |
| Native fluency | 4 | 4 |
| Signature | 4 | 4 |
| Rhythm | 3 | 3 |

Other accepted native scores carry forward. Round1 found one concrete defect: Profile dark time-share tracks were light, visually dominating filled blue portions. Changed to dark-rule. Singular task/day copy also corrected, checkbox/tab web semantics added, and interrupted total fades now finish in place when the motion preference changes. Native focus recaptured without Expo’s Refreshing banner.

Round2: track fix and native header clearance verified; no remaining concrete defects. Done by stop rule. No declined asks. Physical spring feel/haptics remain unverified. Latest sheet: micro-shots/sheet.png; runtime recording: micro-shots/interactions.webm. The static scan remains0FAIL; these runtime frames were visually reviewed rather than DOM-scanned.

## Physical-phone layout fixes — 2026-10-05
Same critic, two focused rounds. User screenshot identified action/tab contact and cropped serif y. Round1: native Android360dp screenshot confirms full descender; native iOS Grid confirms20pt CTA clearance. Typography4, Rhythm3, overallCraft3 because critic identified the native goal fill rendered near track centre. Round2: GoalProgress now uses native transformOrigin:left center and scaleX, avoiding translation/scale composition. ios-grid-r2.png visibly confirms left anchoring. Final Typography4, Rhythm3, Craft4; other accepted scores carry forward. Critic: no outstanding concrete defects in reviewed fixes, done by stop rule.

Evidence: layout-fix-shots/android-360-heading.png (Expo intro overlay obscures bottom); ios-grid.png; ios-grid-r2.png. Android CTA proof is shared measured geometry plus clean iOS rendering; no clean Android lower-screen capture or physical-phone recheck. Native captures cannot run the HTML DOM scanner. No unchanged design screens were rescored.

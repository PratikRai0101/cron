# CRITIQUE.md — Monolith onboarding, "The Core Column"

One critic for the whole job: a design-director agent briefed against `references/critique.md`, given the concept, the colour system and the refused defaults, and pointed at the rendered PNGs. It scored round 1 from the PNGs, not from my description.
Rounds: `shots/r1` (the set the critic saw) → `shots/r2` → `shots/r3` (current). Before: `shots/before`. Small phone: `shots/se`.

---

## Round 1 — scores

| # | Line | R1 | Evidence the critic saw |
|---|---|---|---|
| 1 | Concept on the pixel | 4 | Cover the name and it still reads as a cut core sample, but the flat left/right edges read as much like a stacked progress bar as a cylinder of rock |
| 2 | Not the category average | 4 | Nothing resembles Forest/Rize/Session, but `02-goal` puts the most category-standard object in the flow (a horizontal slider) at the centre |
| 3 | Not this skill's average | 4 | The bands with wavy fracture lines and a Didone serif speak the direction's voice, yet the only control is a stock slider knob and the lower two-thirds of `02-goal` is one flat colour field |
| 4 | Hierarchy | 3 | On `01-area` the accent band is as heavy as the serif question; on `03-core` the outlined TODAY slot is the brightest object and the accent band the heaviest — two focal masses |
| 5 | Typography | 3 | The 76pt "60" sets old-style figures: the 6 drops below the baseline of "min a day" and the 0 sits at x-height, so the hero number reads as "6o"; "Settings." stranded alone on a line |
| 6 | Colour | 4 | The palette is nameable and dark mode is re-designed, not inverted, but Design #ACC0C9 and Exercise #B6C8D0 sit 4% apart in luminance |
| 7 | Richness | 4 | The silhouette is drawn, not borrowed, but nothing has material: no grain, no lit edge, no shadow — the concept's rock never appears as rock |
| 8 | Rhythm and space | 3 | 101pt of stranded ground under the caption on `02-goal`; the four identity names float at four different heights inside their bands, so nothing shares a rail |
| 9 | Craft details | 3 | The ruler's ticks are drawn in the empty track's own colour, so they notch the filled accent line; the CTA jumps 26pt between screens |
| 10 | Native fluency | 3 | No nav bar, no back chevron on screens 2 and 3, no SF Symbol anywhere, the wordmark sits in the same slot on every screen — a designed web page in a phone frame |
| 11 | Signature | 4 | Dragging the number and watching the band's depth carve into the core is a real concept-born interaction with a spec, but in a still frame the band reads as a decorative block |
| 12 | The feature test | 4 | An editor would shoot `01-area` and `03-core`, but the payoff screen drops the display face to SF Pro Bold for the same four words and adds an unexplained band |
| 13 | Fidelity | 4 | All four presets, the 60-minute default and the daily goal are present, but the 15-minute step is invisible, the one-identity reason is gone, and "Skip setup" is gone, so nothing reaches the app without all three decisions |

Distribution: 3s at lines 4, 5, 8, 9, 10; 4s at 1, 2, 3, 6, 7, 11, 12, 13. Seven of twelve at 4 or above; the stop rule was **not** met.

The critic's own verdict: *"02-goal is materially weaker than the other two… 03-core is second."*

---

## What changed in round 2

| Critic's ask | What landed |
|---|---|
| 1. Lining figures | **Partly.** Instrument Serif has no `lnum` (verified in the font's GSUB table: only `aalt case ccmp dlig liga locl ordn ss01`) — its figures are old-style by design, so they cannot be switched. Instead the *pairing* was fixed: the unit label now sits on the figure's x-height (`translateY(-27px)`) rather than on its baseline, so "60" and "min a day" read as one line. The app's home screen has the same baseline mismatch and should be corrected the same way when this ships. |
| 2. Equal strata, one rail, one bevel | **Landed.** All four layers are 116pt; every name is optically centred in its layer, so the four sit on one rail; every fracture line now carries a 2pt bevel (a 1px highlight at 24% white above, a 1px shadow at 20% ink below; in dark mode 16% / 50%). The column now reads as cut rock, and the two pale layers separate. |
| 3. Close the void, lock the button | **Landed.** The goal screen's section grew from 246pt to 300pt and now carries two pale layers instead of one flat field; the void under the caption went from 101pt to 20pt. The primary capsule is pinned at y=786–840 on all three screens, and `03-core`'s secondary link moved above the button. |
| 4. Rebuild the ruler | **Landed.** Nine ticks at 0/15/30/45/60/75/90/105/120, drawn in ink-3 *above* the track so they never cut the fill, and all eight steps labelled — the 15-minute step is now legible instead of implied. |
| 5. Make the top behave like an app | **Landed.** A 44pt nav row on every screen with the name centred, and a 22pt chevron on screens 2 and 3 (the flow used `router.replace`, so it had no way back at all). Note for implementation: the stack must `push` rather than `replace` for those two steps, or the chevron has nothing to pop. |
| 6. `03-core` reads the grammar differently | **Partly, by design.** The accent is the app's live band: the layer you chose on the picker, the band being cut on the goal screen, the layer in play on the result screen. `03-core` now shows the same four layers as `01-area` with today's empty slot above them, so the two column screens agree; the goal screen is a one-day detail of the same rock. The contradiction the critic found — four filled bands under "Your core starts empty" — was fixed in the copy: the line is now "Every session you finish adds a band to your core." |
| 7. `03-core` drops the display face | **Landed.** The four names are Instrument Serif again, the same face as `01-area`. |

---

## Round 2 — the critic's scores

| # | Line | R1 | R2 | The critic's evidence |
|---|---|---|---|---|
| 1 | Concept on the pixel | 4 | 4 | The column now reads as cut rock — equal strata, a lit lip, a shadow seam — but `02-goal` is still a pale rectangle with a blue cap, carrying no identity |
| 2 | Not the category average | 4 | 4 | A cut column with specimen labels in a Didone serif is unlike anything in the category, but `02-goal` still resolves to a stock horizontal slider |
| 3 | Not this skill's average | 4 | 4 | The identity list *is* the artwork and the controls speak the direction's voice; what reads as default UI is the tick-label strip and the knob |
| 4 | Hierarchy | 3 | 3 | On `03-core` the empty TODAY slot is filled with the ground colour, so it is the brightest object and the squint lands on an empty box; on `01-area` the accent band is as heavy as the question |
| 5 | Typography | 3 | 3 | The pairing is fixed, but Instrument Serif's figures are old-style by design, so the readout's box changes with the value; the `02-goal` subhead still widows "Settings." |
| 6 | Colour | 4 | 4 | The bevel separates the pale layers and dark mode is re-designed — but the accent means "today's depth" on `02-goal` and "Code" on the column screens |
| 7 | Richness | 4 | 4 | The bevel is the first material in the set and the strata catch light like cut rock; there is still no grain, and `02-goal`'s lower half is two featureless fields |
| 8 | Rhythm and space | 3 | 3 | The 6.1" is now the strongest thing in the set — 23pt of air under the caption, a pinned capsule, equal strata, two strict rails; the hold is the 375pt render |
| 9 | Craft details | 3 | 3 | The fill is no longer notched and the capsule no longer jumps; on the 375pt render the column runs to the screen edge, the ruler's "120" ends 5pt from the edge, and the `03-core` copy widows "core." |
| 10 | Native fluency | 3 | 3 | The nav row with a centred title and a chevron is a genuine step, but the chevron is heavier than SF Symbols' and the title never changes |
| 11 | Signature | 4 | 4 | The ruler plus a band whose depth follows the goal is still the one interaction worth describing; but at 60 minutes the band is 22% of the column, so the depth does not encode the value |
| 12 | The feature test | 4 | 4 | A cut column with specimen labels in a Didone serif is screenshot-able; but `03-core` still opens on a white hole and the goal frame is a slider over a pale slab |
| 13 | Fidelity | 4 | 4 | All four presets with descriptions, the 60 default, the goal and the route into focus are present and the 15-minute step is legible; but on the 375pt render the four descriptions are dropped |

Distribution: five lines at 3 (hierarchy, typography, rhythm, craft, native fluency), eight at 4. **Not done** by the stop rule.

The critic's own verdict: *"`02-goal` is still the weakest screen… `03-core` is second… the 375pt render is the weakest artefact in the round."*

---

## What changed in round 3

| Critic's ask | What landed |
|---|---|
| The live readout must hold one box | **Landed.** The digits are now SF Pro 76 semibold with tabular numerals and the unit is Instrument Serif 26 — the app's own rule (serif for static totals, SF Pro for live numbers) applied honestly. The number no longer bobs as it counts, and the serif voice stays in the words. |
| Two copy rags | **Landed.** `02-goal` now reads "Minutes of focused work each day. / Change it anytime in Settings." on two substantial lines; `03-core` reads "Every session adds a band to your core." |
| The column's depth must be the scale | **Landed.** The whole core is now 120 minutes deep: at a 60-minute goal the accent band is exactly half the column and fills it at 120. The storyboard's 30 / 60 / 90 frames now read 25% / 50% / 75%. |
| Kill the white hole, give the accent one referent | **Landed.** The outlined, ground-filled TODAY slot is gone. `TODAY` is now an 11pt letterspaced accent label on the ground, 20pt above the column, and the accent Code band is the top of the column exactly as it is on `02-goal`. The caption on `02-goal` now names the area: "Code, one day of work, cut to this depth." The accent means one thing across the flow: the band you are working on. |
| The 375pt layout | **Landed, with one exception.** The caption is kept, the four descriptions are kept (a layer only drops its description below 70pt), the copy no longer widows, and the section is cropped to the room it is given at the full content width instead of being inset to 62%. The critic's "the column runs 25→374pt inside a 375pt screen" was a misreading of the contact sheet's scale — measured in the DOM the column is 24→351pt on every screen, the 24pt margin intact. |

---

## Round 3 — the critic's scores

| # | Line | R1 | R2 | R3 |
|---|---|---|---|---|
| 1 | Concept on the pixel | 4 | 4 | **5** |
| 2 | Not the category average | 4 | 4 | 4 |
| 3 | Not this skill's average | 4 | 4 | 4 |
| 4 | Hierarchy | 3 | 3 | 4 |
| 5 | Typography | 3 | 3 | 4 |
| 6 | Colour | 4 | 4 | 4 |
| 7 | Richness | 4 | 4 | 4 |
| 8 | Rhythm and space | 3 | 3 | 4 |
| 9 | Craft details | 3 | 3 | 4 |
| 10 | Native fluency | 3 | 3 | 4 |
| 11 | Signature | 4 | 4 | 4 |
| 12 | The feature test | 4 | 4 | 4 |
| 13 | Fidelity | 4 | 4 | 4 |

**Twelve of twelve at 4 or above, one at 5, nothing below 3 — the stop rule is met.** The critic's own words: *"the concept is no longer illustrated, it is the structure."* They also withdrew their round-2 small-phone measurements as a misreading of the contact sheet's scale, and confirmed the column holds its 24pt margins on both phone sizes.

### Post-stop fixes (unscored, all landed)

1. The small phone's band now scales with its column, so 60 minutes is half the core on the 375pt render too.
2. The four descriptions survive on the small phone (a layer only drops its description below 56pt).
3. The unit sits 6pt from the figure instead of 13pt.
4. The goal screen now labels its own object: `TODAY` above the column and `Code` inside the accent band, exactly as `03-core` does — the two screens show the same object at two moments.
5. `01-area`'s plan constraint was **declined**: the sentence stays out of the picker, because a plan explanation inside a choice was one of the old screens' faults, and the limit is already stated where it bites (the add-identity sheet). It is listed in `DIRECTION.md` as a decision for the user.

---

## Round 3 — self-check before the final critique

- Scan: **0 FAILs, 0 warns** at 402×874 and at 375×667 (`shots/r3/scan.json`, `shots/se/scan.json`).
- Type scale: 8 steps across the set (76/34/28/26/17/15/13/11).
- The readout's box no longer changes with the value (SF Pro tabular).
- The band on `02-goal` is half the column at the 60-minute default, and the storyboard frames are 25/50/75% of it.
- The accent has one referent in all three screens.

---

## Warns answered

- Scan: **0 FAILs** at 402×874 and at 375×667 (`shots/r2/scan.json`, `shots/se/scan.json`).
- Type scale: 7 sizes across the set (76/34/28/17/15/13/11).
- Contrast, measured by hand because the scan reads SVG `fill` as opaque: the tightest label pair is 4.82:1 (the Write layer in dark mode); every other pair is 5.7:1 or better. The ruler's labels are 5.2:1, the `TODAY` label 6.8:1.
- The 15-minute step is now visible in the ruler and unchanged in the store (`setDailyGoal` still takes minutes).
- Small phone (375×667): the layers scale to the room and the descriptions drop when a layer cannot hold them; the type never shrinks. Checked at `shots/se/sheet.png`.

---

## Warns answered

- *"Text within 12pt of the screen edge"* on the ruler's "120" at 375 wide: the ruler's stops are now computed in CSS from the container's own width, not from a fixed pixel range.
- *"Text inside the system's safe areas"* on `03-core`: the link moved above the capsule; the button now sits at the same y as on the other screens.

---

## Declined asks

- **Lining figures in Instrument Serif** — the font has no lining figures. Changing the hero numeral to SF Pro would fix the digits but break the app's display voice (the app's own home screen sets its minutes in Instrument Serif). The pairing was fixed instead, and the same correction should be made in the app's home screen.
- **A 9-tick ruler that reads as a slider** — the critic called the horizontal ruler "the single most category-standard object in the flow". It is kept because a depth scale is the honest control for a depth, and it is re-cut so the ticks sit above the track, the steps are labelled and the accent fill reads as a measured interval rather than a UI slider.

---

## What I could not verify

Motion timing and haptics are a storyboard, not a running prototype; the spring numbers are the app's own (230 / 25 / mass 1, from `Specimen.tsx`). The labels are SVG text in the mockup so the scan can measure them against the rock they sit on; in the app they will be `Text` views over the same SVG with the same colour pairs. Real-device feel, Dynamic Type at the accessibility sizes and VoiceOver order are untested. The small phone was checked in the mockup only.

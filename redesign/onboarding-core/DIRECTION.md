# DIRECTION.md — Monolith onboarding, redesigned

Status: **Direction chosen (The Core Column). Three critique rounds; round 3 rendered and scanned clean at 402×874 and 375×667.**
Working folder: `redesign/onboarding-core/`. Before: `before.html` → `shots/before/`. Exploration: `explore.html` → `shots/explore/`. Set: `mockup.html` → `shots/r3/`, small phone `shots/se/`. Comparison: `before-after.html` → `shots/before-after/`. Critique: `CRITIQUE.md`.

---

## Brief

- **App / audience.** Monolith, a competence tracker for developers, writers, designers and anyone else who does deep work on a few areas of their life. It records focused minutes against those areas ("identities") and shows them accumulating as bands of rock. Promise: *I am getting better at the things I care about.*
- **Core action.** Open → see today's focused minutes against the daily goal → start a focus session.
- **Feel.** Tactile, accumulated, lived-in. Mineral, quiet, exact.
- **What exists.** A working React Native / Expo app with an approved visual direction ("Strata": a geological core sample), the Instrument Serif face bundled, a hand-drawn rock in `lib/strata.ts`, a full token set in `theme/config.js`, and a demo dataset. No photography, no illustration assets.
- **Deliverable — user confirmed.** Mockups only. No application code was changed.
- **Scope — user confirmed.** Restructure *and* redesign. The flow itself is in scope, not only the styling.
- **Imagery.** No image-generation tool is connected and no credits were spent. The richness is a drawn colour-and-material system: the app's own rock.

---

## Current app

The onboarding was five screens: splash → set goal → pick identities → widget setup → done.
Reconstructed from `apps/mobile/src/app/onboarding/*.tsx` into `before.html` and shot (`shots/before/sheet.png`).

**What it is.** Five centred stacks of `h1` + body + a pill button. Every screen is the same layout with different words, so the flow has no shape: the user cannot feel where they are or how much is left.

**Which slop faces it hits.**
- *The onboarding carousel* (slop.md §1): a four-dot stepper, a "Skip" link, and a splash that teaches nothing before the first real decision.
- *The symmetrical stack* (§1): every block centred, same width, same height.
- *The dashboard reflex* (§1): no hero, no hierarchy — the biggest type on four of five screens is 28pt, and the scan reported *"Only 3 text sizes across 12 text elements. Hierarchy is flat."* on the identity screen.
- *Marketing voice in the UI* (§5): "Track what matters.", "A competence tracker for people who do deep work.", "Start tracking your deep work, building momentum, and leveling up your skills." (`level up` is on the scan's banned list; the current screens would fail it).
- *Copy §2*: the plan limit is explained inside a choice ("The Free plan supports one active identity."), and the day after setup says a feature is missing ("Widgets are coming later.").

**Scan of the reconstruction.** `shots/before/scan.json` — no mechanical FAILs; the old screens are not broken, they are *thin*. The tell is the eye: nothing owns any screen and the app's own hero art appears once, as a pale wireframe outline.

**The missed opportunity.** The app ships a beautiful rock (the app's home screen hero) and a display face (Instrument Serif, used everywhere in the app). The onboarding uses **neither**: it is the only part of Monolith that does not speak the Strata voice. The one place the rock appears is the splash, where it is drained to a hairline outline and made to mean "nothing yet".

**Keep.**
- [x] The four preset areas and their descriptions (Code, Write, Design, Exercise) — real product content, unchanged.
- [x] The goal bounds: 60-minute default, 15-minute steps, 15–240 range.
- [x] One active identity on the free plan (single select, not multi).
- [x] `setOnboarded` → route into `/(tabs)/grid`; the goal writes to `useUserStore`.
- [x] The app's tokens, the Instrument Serif face and the rock drawing hand.

**Lose.**
- [x] The splash screen — it announces the product instead of starting it.
- [x] The four-dot stepper.
- [x] The "Widgets are coming later" screen.
- [x] The "You're all set" congratulation screen (it is replaced by a screen that shows the result and starts the work).
- [x] Both "Skip" affordances, and the skip that seeded an identity literally named "Focus".
- [x] The plan sentence inside the area picker.

**Harvested assets.** `theme/config.js` (all colour roles, light and dark), `assets/fonts/InstrumentSerif-Regular.ttf`, the boundary geometry in `lib/strata.ts` (`boundary()`, `layerPaths()`), and the shipped icon, which is **not** redesigned here — it already exists in the approved Strata set (`assets/images/icon.png`) and re-drawing it would be scope creep.

---

## The direction

**Monolith is a core sample, and the first run is cutting one.** The app shows a horizontal slab of rock. The onboarding shows the same rock stood on end as a **core column**: four layers, one per area of your work, the chosen one dyed in the accent. The goal screen is the same material measured: one day of work is a band cut to a depth. The third screen is your column with today's slot waiting on top.

### The three concepts, and why two lost

1. **The Core Column — chosen.** Nature / light / serif / blue / illustration. The app's own direction, with the column used as the control: the four layers *are* the four identities, labelled inside the rock, the chosen one dyed. *(explore: `shots/explore/01-a-core-section.png`)*
2. **The Dig Face — lost.** Place / colour-field / condensed / rust / colour-material. A full-bleed ochre rock face with the areas as seams. The most striking of the three, and it fails for a reason that is not taste: an ochre dig site would make Monolith look like an archaeology app and would fight the blue accent the rest of the product is built on. Onboarding is the one moment where the app must say *this is the same product*. *(02-b-dig-face.png.)*
3. **The Night Log — lost.** Printed / dark / mono / amber / illustration. A lamp-lit core on black, the areas as lines in a survey log. The best frame I made, and the wrong app: night instrument + mono + a ruled log is the shape this skill's own history has produced too often, and it would teach a different product than the one that opens. *(03-c-night-log.png.)*

### The category default I am refusing

The category (developer productivity, contribution-grid apps) reaches for **near-black plus acid lime, or GitHub green, with monospace figures and a grid of stat cards**. This app's own system doubled down on it: dark-only, mono, "brutalist developer minimalism". Refused: no lime-on-black, no GitHub-green heatmap, no terminal mono, no grey dashboard tiles, no centred greeting, and no feature carousel. Also refused, by the same reasoning: this skill's *other* rut, the grey-paper-with-one-red printed form. The onboarding is warm mineral daylight, drawn in one hand, with a single accent that means one thing.

### Richness source — art direction

**One hand: a flat geological section, cut from the app's own rock.** Strata boundaries are irregular and lean up to the right, exactly as `boundary()` does in `lib/strata.ts`; the layer values are the app's mineral ramp. No gradients, no glow, no 3D render, no photography. Light is flat and mineral: the rock is a solid colour field, the ink is the ink, the accent is the one dyed band. On the goal screen the same material is used as a measured section: a band of accent cut into pale rock, its depth is the goal. Nothing in the onboarding is decoration that could not be an instrument.

### Signature interaction — "one day, cut to your goal"

Trigger: the user drags the goal ruler. Storyboard in `mockup.html` (frame `06-storyboard`).

1. The day's band is cut downward into the pale core; its depth tracks the goal (1 unit = 1 minute).
2. The number above rolls to the new value (`contentTransition(.numericText())`).
3. The ruler's thumb settles on the step, the filled portion of the rule grows to it.
4. The band seats with a critically damped spring, 230 stiffness / 25 damping / mass 1, no bounce, interruptible mid-drag.

Haptic: one selection tick when the ruler snaps to a step, one light impact when the band settles. Nothing on every frame. Reduced motion: the band re-cuts in place over 120 ms with no spring and no impact; the number updates immediately, never mid-roll.

**Why this and not something louder.** The app already has a signature — finishing a session drops a band onto the core. The onboarding does not need a second one; it needs to teach the first. The goal screen uses *the same spring, the same material and the same gesture* one step earlier in the product's life, so the first time the user finishes a session the motion is already familiar. A second, showier moment would compete with the one the app should own.

---

## Tokens

Named after the roles in `color.md`. Values live in `mockup.html` and match `apps/mobile/src/theme/config.js`, so nothing new has to be invented to build it.

### Colour roles

| Role | Light | Dark |
|---|---|---|
| `ground` | `#F1F4F3` mineral daylight | `#142029` basalt |
| `raised` | `#E5ECEE` | `#233541` |
| `ink` | `#182C3B` | `#EDF3F4` |
| `ink-2` | `#4B606B` | `#B6C8D0` |
| `ink-3` | `#526874` | `#A0B5C0` |
| `rule` | `#CCD7DC` | `#394D5B` |
| `accent` | `#24577E` | `#99C2DF` |
| `on-accent` | `#FFFFFF` | `#142029` |
| layer 1 / 2 / 3 | `#7D9CAB` `#ACC0C9` `#B6C8D0` | `#516E7E` `#466070` `#394D5B` |

**Accent role:** the band you are working on. On the picker it is the layer of the area you chose; on the goal screen it is that same layer seen one day at a time — a day of Code, cut to the depth of your goal; on the result screen it is the Code layer again, with today's empty slot marked above it. One referent, three screens. The accent appears nowhere else except the primary action, which is the same idea (the thing you act on). Roughly 5–10% of a screen. Identity colours are *not* a rainbow: the four areas are four values of one mineral ramp, so they are told apart by position and label, and the app's own rule ("no rainbow palette") holds.

Dark mode is a second design, not an inversion: the same layers re-cut for the basalt ground, the accent lightened to `#99C2DF`, and the label ink swapped to `#EDF3F4`. Both value sets were checked against their band: the smallest step still clears 4.5:1.

### Type

One family pair, as in the shipped app: **Instrument Serif** for the display moments, **SF Pro** for everything you tap or read. Seven sizes across the set, no more.

| Step | Size / line | Weight · face | Tracking | Use |
|---|---|---|---|---|
| display | 76 / 0.92 | 600 · SF Pro, tabular | −2.4% | The goal's minutes (a live figure) |
| title | 34 / 1.06 | 400 · Instrument Serif | −0.6% | Screen titles, the summary |
| name | 28 / 1.05 | 400 · Instrument Serif | −0.2% | An identity's name, inside its layer |
| action | 17 | 600 · SF Pro | −0.3% | Buttons |
| body | 15 / 1.35 | 400 · SF Pro | 0 | Sub-copy |
| meta | 13 / 1.3 | 400 · SF Pro | 0 | Descriptions, captions |
| label | 11 | 600 · SF Pro | +1.6% | The `TODAY` label, the ruler's steps |

**The serif sets old-style figures.** Instrument Serif's GSUB table carries only `aalt case ccmp dlig liga locl ordn ss01`, so it has no `lnum` and its "60" is a 6 that descends and a 0 at x-height. Two consequences, both handled. The *live* figure is set in SF Pro with tabular numerals, because the app's own rule is "serif for static totals, SF Pro for the live timer and rolling totals" and a number that changes must not change its box. The *words* keep the serif: the unit on the goal screen is Instrument Serif 26. Static serif totals — the "60" in `03-core`'s headline and the app's own "47 minutes today" — keep their old-style figures, which is what the face is for.

**Instrument Serif sets old-style figures** — the font has no `lnum` (its GSUB table carries only `aalt case ccmp dlig liga locl ordn ss01`), so its "60" is a 6 that descends and a 0 at x-height. Two consequences, both handled: the unit label sits on the figure's *x-height* rather than its baseline, so the pair reads as one line; and the live figure is the only place a serif number is set beside sans text. The app's own home screen pairs its serif minutes with a sans label on the baseline and should be corrected the same way when this ships.

The one new step against the app is `name` (28pt serif) — the identities are named in the display face because the layer they sit in is the app's idea, not a form field. The live goal figure keeps the app's own 76pt serif so the two screens agree.

### Space, shape, layout

- **Margin 24**, matching the app's screens (the old onboarding used 20).
- Spacing 8 / 12 / 16 / 18 / 22 / 26 / 34 / 44.
- **Square world.** Layers and rows are rectangles; only the primary action is a capsule (27 radius, 54 tall). No rounded cards anywhere.
- **Hero:** the column on screen 1, the number on screen 2, the column on screen 3. One per screen, at least 2× anything else.
- **Nav:** a 44pt nav row on every screen with the name centred, and a 22pt chevron on the two steps after the first. The flow used `router.replace`, so it had no way back; the stack must `push` for those steps. The primary action sits in the thumb zone, 34pt above the bottom edge, full content width, pinned to the same y on all three screens.
- **Scale:** the whole core is 120 minutes deep. A 60-minute goal therefore cuts a band exactly half the column and a 120-minute goal fills it, so the picture and the number cannot disagree. On a 375pt screen the section is cropped to the room it is given, at the full content width.
- **Material:** every fracture line carries a 2pt bevel — a 1px highlight above (white at 24%, dark mode 16%) and a 1px shadow below (ink at 20%, dark mode 50%). This is what turns four flat colour fields into cut rock, and it costs no new tokens.
- **Small phone (375×667):** the artwork takes the hit, never the words. The column's layers scale to the room available and the descriptions drop when a layer cannot hold them; the caption under the section is dropped; the section shrinks to 62% width. Type sizes are unchanged.

---

## Content

Written before any layout. Real content, one realistic state: the default area (Code), the default goal (60 minutes).

**Areas (dyes):** Code · "Programming, development, engineering" · Write · "Writing, blogging, documentation" · Design · "UI/UX, graphic design, creative" · Exercise · "Fitness, sports, movement".

### 1. The column — pick the area
- Nav `Monolith`
- Title `What are you working on?`
- Sub `Pick one identity to start with.`
- Column, top to bottom: **Code** (dyed accent) / Write / Design / Exercise, each with its description, each name on the same rail
- Action `Continue`

### 2. The goal — how much a day
- Nav `Monolith` + a back chevron
- Title `How much a day?`
- Sub `Minutes of focused work each day.` / `Change it anytime in Settings.`
- Readout `60` (SF Pro, tabular) `min a day` (Instrument Serif)
- Ruler: nine stops at 0/15/30/45/60/75/90/105/120, the eight steps labelled, the thumb on 60, the active figure in accent
- Section: a band cut into the core, its depth = 60 minutes of a 120-minute core, over two pale layers of uncut rock
- Caption `Code, one day of work, cut to this depth.`
- Action `Continue`

### 3. The core — the result
- Nav `Monolith` + a back chevron
- Title `Code, 60 minutes a day.`
- Sub `Every session adds a band to your core.`
- `TODAY` on the ground, above the column
- Column: Code dyed, then Write, Design, Exercise — the same four layers, the same names, the same rail as screen 1
- Link `Change identity or goal`, then the action `Start your first session`

### 4. Dark
Screens 1 and 2 re-cut for basalt.

### 5. Signature
`One day, cut to your goal.` — three frames at 30 / 60 / 90 minutes, with the motion, haptic and reduced-motion notes.

---

## History check

`~/.app-designer/history.md`, 2026-10-20. The current onboarding counts as this app's history row: source family *none* (it has no idea), ground *light*, type *grotesque* (SF Pro throughout), accent *blue*, richness *none* (a hairline outline).

| Column | Current onboarding | This design | Differs? |
|---|---|---|---|
| source family | none | nature | **yes** |
| ground | light | light | no |
| type | grotesque | serif | **yes** |
| accent hue | blue | blue | no |
| richness | none | illustration | **yes** |

**3 of 5** — the rule passes.

Against the rest of the history this row is *identical* to `Monolith (Strata) | nature | light | serif | blue | illustration`. That row is this same app, and the rule exists so a different app cannot repeat a look; the onboarding adopting its own product's direction is the point of the job, not a repeat of it. The sub-direction is new: a vertical core section used as the picker, and the goal expressed as a measured depth.

---

## Decisions the user should sign off

1. **The splash screen is gone.** The first screen is now the first decision.
2. **The "Widgets are coming later" screen is gone.** Widgets are not implemented (`WIDGET_UPDATE_INTERVAL_MINUTES` is defined but no widget ships). If widgets arrive, the prompt belongs at the end of Settings, not in first run.
3. **The "You're all set" screen is replaced** by a screen that shows the result and starts the first session.
4. **The plan sentence leaves the onboarding.** "The Free plan supports one active identity." is no longer inside the picker; the add-identity sheet still says it, where the limit actually bites.
5. **The goal control changes.** The ±15 stepper becomes a depth ruler with six stops (15 / 30 / 45 / 60 / 90 / 120). The stored value is still minutes and still a 15-minute step; the interaction is one tap instead of many.
6. **The area choice moves before the goal.** The goal only means something once you know what you are working on.
7. **App code that must change with this (not in this deliverable):** the app's empty state still says *"Choose an identity, then start your first session."* — after this onboarding the identity is already chosen, so that line has to become *"Start your first session."* (`app/(tabs)/grid.tsx`). The app's home screen also needs the old-style-figure pairing corrected the way the goal screen does it, and the onboarding stack must `push` (not `replace`) the two steps after the first so the back chevron has something to pop.
8. **The onboarding's copy uses "identity"** because that is the product's word (Identity tab, `identityStore`). No second vocabulary is introduced.

---

## What was not designed

The four tabs, the day detail, the focus timer, the profile, settings, the add-identity sheet, task creation and the widget. They are out of scope and untouched. The onboarding's three screens assume the existing stores: `seedFromPresets` for the area, `setDailyGoal` for the goal, `setOnboarded` to enter the app.

---

## What I could not verify

Motion timing and haptics are a storyboard, not a running prototype; the spring numbers are the app's own (`230 / 25 / mass 1` from `Specimen.tsx`). The labels are SVG text in the mockup so the scan can measure them against the rock they sit on; in the app they will be `Text` views over the same SVG, with the same colour pairs checked by hand. Real-device feel, Dynamic Type at the accessibility sizes, and VoiceOver order are untested. The small phone was checked at 375×667 in the mockup only.

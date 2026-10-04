# DIRECTION.md — Monolith redesign

Status: **Direction chosen (The Loom). Tokens + content written. Building the screen set.**
Working folder: `redesign/`. Exploration: `explore.html` → `shots/explore/`. Before: `before.html` → `shots/before/`.

---

## Brief — *self-authored* (the user said "you pick")

- **App / audience.** Monolith, a competence tracker for developers, designers, writers and other deep-work people. It records focused minutes against life areas ("identities") and shows them as an effort-based grid. Promise: *"I am getting better at the things I care about."*
- **Core action.** Open → see today's focused minutes against the daily goal → start a focus session on a task. Every day.
- **Feel.** Tactile, accumulated, lived-in. Not austere. The work should feel like it is *becoming something*.
- **Exists.** Name, vertical-bar logo, a working RN/Expo app, a full design system, demo data, no photography or illustration.
- **Deliverable.** A redesign of the look (mockups + this document + icon). SwiftUI / App Store panels only if later asked.
- **Imagery.** No generation tool connected → no paid credits. Richness is a drawn colour-and-material system, not photography.

---

## The direction

**Monolith is a bolt of hand-dyed cloth.** Focused effort is thread. Each day you lay a weft row across the loom; each identity is a dye colour. Over a year the grid becomes a textile you have woven — the most literal possible picture of competence accumulating. The one genuinely good idea in the current app (the contribution grid) survives, transformed from a GitHub heatmap into cloth.

### The three concepts, and why two lost

1. **The Loom — chosen.** Object/material. Colour-field ground, expanded type, a woven material richness, saffron accent. The metaphor maps exactly onto the product: warp = the days that are always there, weft = the days you worked, dye = identity, cloth length = progress. It is warm, tactile and unlike any tracker on the store. *(Screens: `shots/explore/01-d1-loom.png`.)*
2. **The Sound — lost.** A coastal tide chart. Nature, light ground, serif, teal, illustration. Gorgeous and calm, but it is the *safe* pick — the sea is a mood, not the product, and it could be a weather or wellness app. It also sat in this skill's printed-form rut. *(02-d2-tide.png.)*
3. **The Pool — lost.** A public pool at night. Place, dark, rounded, pink, shape. Memorable and vivid, but "swimming laps" does not map to building competence across Code / Write / Design, and the candy tiles pulled it toward a game. *(03-d3-pool.png.)*

### The category default I am refusing

The category (developer productivity / contribution-grid apps) reaches for **near-black + acid lime or GitHub green + monospace + a dashboard of stat cards**, and this app's own system doubled down on it ("brutalist developer minimalism", dark-only, mono figures, Plus Jakarta Sans). Refused: **no lime-on-black, no GitHub-green heatmap, no terminal mono, no grey dashboard stat-tiles, no "Good morning"**, and no throwback to this skill's *other* rut (grey paper, black ink, one red, mono, ruled rows). The Loom is warm, dyed, colourful and material; the grid is cloth, not a heatmap; the type is expanded, not mono.

### Richness source — art direction

**Cloth and dye: a colour-and-material system, drawn, not photographed.** A fine 1px weft texture runs across the whole cloth; the ground is the indigo dye vat; each worked day is a square of dyed thread whose opacity encodes effort against the goal. Light is soft and from above-left: the cloth seats into the ground with an inset shadow, no glows, no gradients-as-decoration. Dyes are natural and warm — saffron, madder, an indigo-light, undyed cream — never neon. The cloth is on the first screen, edge to edge, and it is the hero.

### Signature interaction — "The shuttle"

Trigger: a focus session ends and you accept the time. Storyboard in `mockup.html` (`signature` panel):

1. A small brass shuttle enters at the left edge of **today's row** on the cloth.
2. It travels left → right across the 7 cells, laying a saffron thread; each cell takes the thread colour as the shuttle passes (40ms stagger).
3. It exits right; the row settles flat and today's cell keeps its outline.
4. Today's thread number rolls up from the old value to the new (`contentTransition(.numericText())`).

Timing ~700ms on a front-loaded spring (no bounce). Haptic: one light impact as the shuttle lands on each cell, `.success` at the end. Reduced motion: the shuttle does not travel; today's row cross-fades to the new colour and the number updates instantly.

---

## Tokens

Named after the colour roles in `color.md`. Values live in `mockup.html`.

### Colour roles

| Role | Raw cloth (light, default) | Indigo vat (dark) |
|---|---|---|
| `ground` | `#DCE1E4` faded denim | `#18243F` indigo dye |
| `raised` | `#E7EBEE` | `#121B31` |
| `ink` | `#1A2744` | `#F2E9D6` undyed thread |
| `ink-2` | `#4C5670` | `#C7BB9E` |
| `ink-3` | `#6E778F` | `#93876E` |
| `rule` | `rgba(26,39,68,.16)` | `rgba(242,233,214,.16)` |
| `accent` | `#B9501E` saffron | `#E07A3F` saffron |
| `on-accent` | `#FFF3E8` | `#25160C` |
| thread: saffron | `#C25A22` | `#E07A3F` |
| thread: madder | `#A33A2A` | `#B8452F` |
| thread: indigo | `#52679B` | `#6E86B8` |
| thread: undyed | `#F3ECDA` | `#F2E9D6` |

Light is the **raw cloth**: the same dyes on an unbleached, cool ground — not cream, not white. Dark is the **dye vat**: the cloth's true home. Dark mode is not an inversion; the ground keeps the indigo hue, the accent brightens a step, and the cloth threads gain a little luminance.

**Accent role:** saffron means *the thread being laid now* — today's row, the primary action, the live timer. It covers roughly 5–10% of a screen. Nothing else is saffron.

### Type

One family: **SF Pro**, given a voice by width and weight, not by a novelty face. Display uses **Expanded (font-stretch 125–135%) at weight 800**; UI is default width at 400/600. Figures are tabular.

| Step | Size / line | Weight · width | Tracking | Use |
|---|---|---|---|---|
| display | 54 / 0.95 | 800 · Expanded | −3% | Today's minutes, day totals |
| title | 28 / 1.05 | 800 · Expanded | −2% | Screen titles |
| headline | 17 / 1.25 | 600 · normal | −1% | Section headings, task titles |
| body | 15 / 1.4 | 400 · normal | 0 | Rows, descriptions |
| meta | 13 / 1.3 | 500 · normal | 0 | Times, counts, secondary |
| eyebrow | 11 / 1.0 | 600 · Expanded | +14% caps | The single "today" label per screen |

Six steps. At most one all-caps eyebrow per screen.

### Space, shape, layout

- **Margin 20.** Spacing scale 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48. Tight inside a group, 24–32 between, one 40 rest around the cloth.
- **Radius:** a square world. Content is **0** (cloth cells, task rows, inputs). Only the floating navigation layer and the primary action are **capsule** (30 / 27). No medium-rounded cards.
- **Hero:** the cloth. Everything else steps down and quiets.
- **Nav:** iOS 26 structure — content edge to edge and scrolling, a floating glass capsule tab bar (`data-float`), primary action a 54pt capsule in the thumb zone. Behaviour native, look in the Loom's voice (squared content, woven nav).

---

## Content

Exact content per screen. One realistic day: **Fri 26 Sep**, goal **60 min**, **47 min** done. Some done, one overdue, one new.

**Identities (the dyes):** Code · saffron; Write · undyed cream; Design · indigo-light; Train · madder.

### 1. The Loom (core)
- Header: `Fri 26 Sep · morning` / `MONOLITH`
- Cloth: 26 weeks woven; selvedge `26 weeks on the loom` / `78 days woven`
- Today: eyebrow `TODAY'S THREAD`, `47` `of 60 min`, saffron bar at 78%
- Insight (woven tag): `Best work before 10am. Six of your last eight mornings opened with Code.`
- Tasks: `Today's work` · `3 tasks · 1 done`
  - ☑ `Zone 2 run, 5k` — Train — 22m
  - ☑ `Ship the parser fix` — Code — 25m
  - ☐ `Draft chapter 3, Rust post` — Write — 45m est
  - ☐ `Review Sana's PR on the scheduler` — Code — 30m est · **overdue**
- CTA: `Start focus`
- Nav: `Cloth · Focus · Areas · You`

### 2. A day in the cloth (detail — Tue 23 Sep)
- `Tue 23 Sep` / back
- Total `3h 10m`, `across 2 threads`
- Mini-cloth of that week, the day outlined
- Sessions:
  - `09:12` · Code · `Review pull requests` · 1h 05m
  - `11:30` · Code · `Ship the parser fix` · 40m
  - `15:05` · Write · `Draft chapter 3, Rust post` · 1h 25m
- Secondary action: `Log time` · `Total 3h 10m`

### 3. Focus
- Header `Fri 26 Sep` / `Focus`
- Today's row, thread drawn to the leading edge (Write · cream), saffron needle
- Timer `18:24` tabular
- Task `Draft chapter 3, Rust post`
- Thread picker: `Code · Write · Design · Train` (Write active)
- Controls: pause / `Finish` / discard
- Footnote: `This thread joins 78 days on the loom.`

### 4. The shuttle (signature) — storyboard, 4 frames
- `The shuttle` panel caption: `Ending a session lays a new thread across today.`

### 5. Raw cloth (light mode)
- Same core content on the unbleached ground; cloth, saffron accent, expanded type unchanged.

### 6. Empty (first run)
- Bare warp threads on the loom, one empty today row.
- `Nothing on the loom yet.`
- `Your first focus session lays the first thread.`
- `0` `of 60 min` · CTA `Start focus`

### 7. App icon
- A woven crossing: a saffron warp thread and a cream weft on indigo.

---

## History check

`~/.app-designer/history.md` was empty when I started but gained a row mid-session from another session: `Loom | object | light | serif | blue | colour-material`.

| Column | That row | This app | Differs? |
|---|---|---|---|
| source family | object | object | no |
| ground | light | colour-field | **yes** |
| type | serif | expanded | **yes** |
| accent hue | blue | orange | **yes** |
| richness | colour-material | colour-material | no |

Differs on **3 of 5 columns**, so the rule passes. Worth flagging: both rows are `object` + `colour-material` — two cloth/material apps. Visually they are far apart (a light serif app versus an indigo dye-vat colour field with expanded type), but the shared metaphor is a genuine near-miss the user should know about.

## Signature

Storyboarded above. Lives on the core action (ending a session), born from the concept (a loom lays weft), short and interruptible, with a haptic and a reduced-motion fallback.

## Decisions the user should sign off

1. Breaking dark-only and the mono/brutalist identity, as above.
2. Reordering the home screen so the primary action ("Start focus") is a thumb-zone capsule and the insight is one line, not a card.
3. Replacing cards with space, rules and the cloth.
4. Keeping the name "Monolith" (the cloth metaphor fits — a monolith is woven from many threads of days).

# CRITIQUE.md — Monolith, The Loom

No sub-agent runtime is available in this session, so this critique is **self-scored**,
harder than feels fair. Rounds: `shots/r1` (first full set) → `shots/r6` (current).
Before render: `shots/before`. Small phone checked at 375×667 (`shots/r6-se`).

## Scores

| # | Line | R1 | R2 (r6) | Evidence at r6 |
|---|---|---|---|---|
| 1 | Concept on the pixel | 3 | 4 | The core screen is literally woven cloth; "today's thread", the selvedge, the shuttle. Focus is the weakest — a big timer with a thread strip, not obviously cloth. |
| 2 | Not the category average | 5 | 5 | No lime/black, no GitHub green, no mono, no stat cards. Nothing like Habitica/GitHub/Streaks. |
| 3 | Not this skill's average | 4 | 4 | Warm indigo + saffron, expanded SF, a material richness. Not grey paper + mono + red; not the dark brutalist original. |
| 4 | Hierarchy | 4 | 4 | Core: the cloth then the 47. Focus: the 76pt timer. Day: the 3h 10m. Empty: cloth then headline. |
| 5 | Typography | 4 | 4 | SF Pro Expanded 800 at 54pt is a real, seldom-used voice; 6-step scale; tabular figures. Body is default SF. |
| 6 | Colour | 4 | 4 | Named palette (indigo vat, saffron, madder, undyed). One accent with one job (the live thread). Light + dark designed. |
| 7 | Richness | 5 | 5 | The cloth — a colour-and-material field — is on every core screen, edge to edge. |
| 8 | Rhythm and space | 3 | 4 | R1 had a dead gap on Focus and a collision on Empty. Both fixed; core is tight groups with one cloth rest. |
| 9 | Craft details | 3 | 4 | R1: empty overlap, readable-data good, icon barcode-y. R2: no clipping, believable uneven data, 22/25/45m and an overdue PR. |
| 10 | Native fluency | 4 | 4 | Floating glass tab capsule, 54pt thumb-zone action, correct safe areas, content scrolling under chrome. No gestures shown (static). |
| 11 | Signature | 3 | 4 | R1 minis were unreadable. R2 storyboard: dock → cross → exit → number rolls, with haptic + reduced-motion. |
| 12 | Feature test | 4 | 4 | "A contribution grid you actually want to look at" is a screenshot-able idea. |
| 13 | **Fidelity** (redesign) | 4 | 4 | Cloth/grid, count-up focus, identities, tasks, retro-log (Day → Log time), goal, insight all present. Level is not shown. |

Min at r6: 4. Lines ≥4: 13 of 13. Stop rule: **Done**.

## Five changes that raised the lowest lines (R1 → R2)

1. **Focus** — the footnote sat in the home-indicator safe area and the thread picker was hidden behind the controls. Moved the picker into the centred group and padded the body above the floating layer. *Landed.*
2. **Empty** — the headline overlapped the selvedge and the total. Rebuilt in flow over a taller bare-warp cloth. *Landed.*
3. **Colour** — a third saturated hue family (madder 0°). Shifted madder into the saffron warm family; the app now reads 2 hue families (saffron, indigo). *Landed.*
4. **Type scale** — 12 sizes. Consolidated to 6 (76/54/28/17/13/11). *Landed.*
5. **Icon** — three thin warps would muddy at 29pt. Rebuilt as two warps + one weft with a real over/under. *Landed.*

## Warns answered (not fixed, deliberately)

- **"Text inside the system's safe areas" at 375×667** — the task list is a scroll view (`data-scrolls`) passing under the floating CTA and tab bar, which is the iOS 26 structure; the production build adds ~100pt of bottom content inset.
- **"N distinct left edges in the left third"** — the left third carries the cloth, the 54pt numeral and task text; collapsing further would crowd the numeral.
- **"cards 1"** — the floating navigation capsule, i.e. chrome, not a content card.

## Declined asks

None — no external critic was available to make any.

## What I could not verify

Motion timing and haptics are a storyboard, not a running prototype. Fonts render via
macOS SF Pro at 3x; on a non-Mac machine the stacks fall back. Real-device feel
(spring interruptibility, haptic weight) is untested.

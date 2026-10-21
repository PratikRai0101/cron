# Strata design system

Monolith treats focused work as a geological core sample: each saved session or manual log deposits a layer of stone. This is the approved, implemented direction, replacing the earlier dark-only dashboard and Loom experiments. The running app and `apps/mobile/src/theme/config.js` are authoritative; obsolete HTML mockups are not development dependencies.

## Palette

| Role | Mineral daylight | Basalt dark |
|---|---|---|
| Background | `#F1F4F3` | `#142029` |
| Raised surface | `#E5ECEE` | `#233541` |
| Primary ink | `#182C3B` | `#EDF3F4` |
| Secondary ink | `#4B606B` | `#B6C8D0` |
| Tertiary ink | `#526874` | `#A0B5C0` |
| Rule | `#CCD7DC` | `#394D5B` |
| Accent | `#24577E` | `#99C2DF` |
| On accent | `#FFFFFF` | `#142029` |

Blue means selected action/state and quantitative effort. Identity names and position distinguish categories; do not introduce a rainbow palette. Support System, Light and Dark. Raised surfaces belong to form fields, not stacks of dashboard cards.

## Typography and layout

- Instrument Serif regular for static totals and expressive headings; system UI type for controls, live timers and rolling totals. The font and OFL license live in `apps/mobile/assets/fonts/`.
- Core scale: display 76, title 28, heading 20, action 17, body 15, metadata 13, caption 11 points. Onboarding titles use 34-point serif.
- Instrument Serif has old-style numerals and descending glyphs: preserve line-height and glyph clearance rather than clipping to the nominal font size.
- Typical horizontal margin: 24 points. Base spacing: 4/8/12/16/24/32/48.
- Square mineral tiles, circular completion controls, capsule actions and floating navigation. Geological illustration uses solid mineral shades, irregular boundaries and restrained bevels, not gradients or glow.
- Floating navigation may use native Liquid Glass, with an opaque fallback when unavailable or Reduce Transparency is enabled.
- Derive action/scroll clearance from `FloatingNavigation`; keep primary actions separated from the measured tab bar. Small screens reduce artwork and allow content to scroll rather than shrinking essential controls.

## Living specimen

`lib/strata.ts` builds bands from saved focus sessions and manual logs. Recent seven records stay distinct; older work compresses into a base retaining all minutes and record identities. Band thickness is illustrative, not a linear time chart. No records means an outline.

While focusing, an unsaved outlined band grows with elapsed time; pause freezes it and discard removes it. Finish saves once, updates the real total immediately, then drops the saved band 32 SVG units onto the stack with spring stiffness/damping/mass 230/25/1 and a light landing impact. Do not replay it on hydration, theme changes or timer ticks. Reduce Motion fills in place over 120 ms without translation or impact.

Tap a band or use the larger Inspect layers control to inspect/edit a record. The compressed base opens its underlying records; never pretend it is one session. Edits retain the recorded task and timestamps. Undo is guarded against newer mutations.

## Supporting motion

- Press: compress to 0.97, release with spring 360/36/1; Reduce Motion dims instead.
- Navigation: measured sliding indicator, haptic only for a changed tab; reduced movement snaps.
- Task completion: update immediately, fade/scale the checkmark, success haptic only on explicit completion, never hydration.
- Totals: show actual numbers immediately, with a 140 ms fade/6-point settling motion; reduced movement fades in place. Clock digits do not animate each tick.
- Goal progress: spring from an explicitly anchored left edge; reduced movement updates immediately.

No decorative loops, entrance cascades, invented intermediate totals, confetti or engagement rewards.

## Core Column onboarding

Three steps: choose an area → set a daily goal → inspect the result and start the first session. The vertical core uses the same material as the app's horizontal specimen. Area presets and descriptions live in `lib/presets.ts`; the Free setup selects one identity.

`CoreColumn`, `CoreSection` and `DepthRuler` implement the picker, measured goal band and result. The current onboarding ruler uses 15-minute steps from 15 to 120; Settings has its own goal control. The band and number must agree. Back navigation uses the stack, not replacement routes. Artwork adapts to measured available space; never collide with the primary action. Preserve the layout regression test.

## Reference and limits

Published native examples are in `docs/assets/screenshots/`; demos are in `docs/demo/`. They show the real iOS app using sample data. Physical haptic feel, VoiceOver and accessibility-sized Dynamic Type still need device QA; archived mockup scans do not establish native accessibility.

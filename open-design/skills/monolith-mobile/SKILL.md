# Monolith Mobile Skill

## Design a Monolith mobile app screen

Design a single screen for Monolith, a minimalist competence tracker with brutalist developer aesthetics.

### Visual Direction
- **Theme**: Dark brutalist minimalism (`#0a0a0a` background)
- **Accent**: White `#ffffff` (progress, completion, CTAs)
- **Secondary accent**: Grey `#737373` (rest, recovery)
- **Typography**: JetBrains Mono for data/numbers, Plus Jakarta Sans for UI
- **Shape**: Near-zero border-radius (0-2px for most elements, 9999px only for pills)
- **Motion**: Snappy 150ms, functional only, no decorative animations
- **Density**: Controlled, not sparse. Sharp contrast.

### Philosophy
Every pixel serves a purpose. The UI feels precise, utilitarian, and almost austere. Acid lime is the only "fun" element. No engagement theater (no confetti, no streak-loss anxiety, no daily login bonuses). The reward is the grid filling up.

### Output
Single HTML artifact inside an iPhone 15 Pro frame. Dark mode only. CSS inline or in `<style>`. No external images — use SVG, CSS gradients, and geometric shapes. The artifact should look like a high-fidelity mockup, not a functioning app.

### Grid System (Contribution Graph)
The contribution grid is the hero element:
- 7 rows (Sun-Sat) × variable columns (weeks)
- Cell size: 12px, gap: 3px
- 6 intensity levels from `#141414` (no activity) to `#ffffff` (100%+ goal)
- Today highlighted with 1px `#ffffff` border

### Component Library
Use these exact primitives:

**Button**
- primary: bg `#ffffff`, text `#0a0a0a`, radius 4px, px-5 py-3
- secondary: bg `#141414`, text `#f5f5f0`, border 1px `#262626`
- ghost: transparent bg, text `#737373`

**Card**
- bg `#141414`, border 1px `#1f1f1f`, radius 4px
- No shadow by default

**Input**
- bg `#141414`, border 1px `#262626`, radius 4px
- focus: border `#ffffff`

**Pill / Badge**
- radius-full (9999px), uppercase, 11px
- Border color at 30% opacity

**Ring (Progress)**
- SVG circle, 8px stroke, sharp ends (butt cap)
- Track: `#1a1a1a`, Fill: `#ffffff`

### Motion
- Screen transitions: slide from right, 150ms
- Bottom sheets: slide up, 250ms
- Button press: scale 0.97, 100ms
- No bouncy springs. No decorative fades.

### Screen Types
The user will specify which screen to design. Common screens:
- **Grid (Home)**: Contribution grid hero, identity filter pills, momentum ring, task list, FAB
- **Focus Mode**: Full-screen timer, zero chrome, giant white digits, minimal controls
- **Log Task**: Bottom sheet form, identity selector, duration input
- **Profile**: Level badge, momentum ring, skill velocity sparkline, identity breakdown
- **Identity Manager**: Identity cards with mini-grids, consistency scores
- **Settings**: Clean list rows, toggles, section headers
- **Wrapped**: Full-screen annual report, scroll-snap sections, giant numbers

### Device Frame
Render inside a pixel-accurate iPhone 15 Pro frame:
- Dynamic Island cutout
- Status bar (time, signal, battery)
- Home indicator
- Frame color: dark grey metallic

### Example Prompt
"Design the Focus Mode screen for Monolith. Full-screen dark background (`#0a0a0a`). Top: identity pill 'Code'. Center: giant timer '00:45:32' in JetBrains Mono 48px white. Bottom: pause button (44px circle), stop button (64px circle, white), cancel button. Minimal. No chrome."

### Checklist
- [ ] Background is `#0a0a0a`
- [ ] Accent is `#ffffff` only (grey `#737373` for rest/recovery only)
- [ ] JetBrains Mono for all numbers and data
- [ ] Plus Jakarta Sans for UI text
- [ ] Border radius ≤ 4px (except pills)
- [ ] No gradients, no shadows (except subtle card lift)
- [ ] No decorative animations
- [ ] Dark mode only
- [ ] iPhone 15 Pro frame rendered

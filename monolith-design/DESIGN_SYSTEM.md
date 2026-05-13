# DESIGN_SYSTEM.md — Monolith

## Philosophy

Monolith is **brutalist developer minimalism**. Every pixel serves a purpose. The aesthetic is austere, precise, and utilitarian — with a single electric accent (acid lime) that represents energy, progress, and completion. The design should feel like a high-end developer tool, not a consumer app.

**Core Principles:**
- Information density is controlled, not sparse
- Contrast is sharp, not gentle
- Motion is snappy and functional, never decorative
- The grid is the hero. Everything else supports it.

---

## Color System

### Base Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0a0a0a` | App background, darkest surface |
| `surface` | `#141414` | Cards, sheets, widget backgrounds |
| `surface-elevated` | `#1a1a1a` | Elevated cards, modals, focused states |
| `border` | `#262626` | Dividers, borders, grid lines |
| `border-subtle` | `#1f1f1f` | Very subtle separators |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#f5f5f0` | Headings, primary content, active states |
| `text-secondary` | `#737373` | Body text, descriptions, inactive states |
| `text-tertiary` | `#525252` | Placeholders, disabled text, timestamps |
| `text-inverse` | `#0a0a0a` | Text on accent backgrounds |

### Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `accent` | `#ccff00` | Primary accent — acid lime. Progress, completion, CTAs, active rings |
| `accent-hover` | `#b8e600` | Hover state for accent elements |
| `accent-dim` | `rgba(204, 255, 0, 0.15)` | Subtle accent backgrounds, glows |
| `secondary-accent` | `#00f0ff` | Rest, recovery, rest days, cooldown states |
| `tertiary-accent` | `#ff6b6b` | Optional Pro accent. Warnings, important alerts |

### Graph Intensity Scale (Contribution Grid)

The grid cells use a 5-level intensity scale based on focused time relative to the user's daily goal:

| Level | Hex | Criteria |
|---|---|---|
| `grid-0` | `#141414` | No activity (matches surface) |
| `grid-1` | `#2a3311` | > 0 but < 25% of goal |
| `grid-2` | `#4d6600` | 25% - 49% of goal |
| `grid-3` | `#7a9900` | 50% - 74% of goal |
| `grid-4` | `#a3cc00` | 75% - 99% of goal |
| `grid-5` | `#ccff00` | 100%+ of goal (acid lime) |

**For identity-specific grids**, each identity can optionally tint the scale with its assigned color at 80% saturation while keeping the same luminosity progression.

### Utility Colors

| Token | Hex | Usage |
|---|---|---|
| `success` | `#ccff00` | Same as accent. Success states are progress. |
| `error` | `#ff4444` | Minimal use. Only for destructive actions. |
| `warning` | `#ffaa00` | Sparingly. Overdue tasks only. |

---

## Typography

### Font Stack

| Role | Font | Fallback | Usage |
|---|---|---|---|
| **Data / Numbers** | JetBrains Mono | monospace | Grid cells, timer digits, stats, levels, timestamps |
| **UI / Headings** | Plus Jakarta Sans | system-ui | Screen titles, section headers, buttons, labels |
| **Body** | Plus Jakarta Sans | system-ui | Descriptions, task text, settings items |

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `display` | 48px | 700 | 1.0 | -0.02em | Focus timer, huge numbers |
| `h1` | 28px | 700 | 1.2 | -0.01em | Screen titles |
| `h2` | 20px | 600 | 1.3 | 0 | Section headers |
| `h3` | 16px | 600 | 1.4 | 0 | Card titles, identity names |
| `body` | 15px | 400 | 1.5 | 0 | Task text, descriptions |
| `body-sm` | 13px | 400 | 1.5 | 0 | Secondary info, timestamps |
| `caption` | 11px | 500 | 1.4 | 0.02em | Labels, badges, pills uppercase |
| `mono-lg` | 32px | 500 | 1.0 | -0.02em | Large stat numbers |
| `mono-md` | 18px | 500 | 1.2 | 0 | Grid cell tooltips, durations |
| `mono-sm` | 12px | 400 | 1.2 | 0 | Small timestamps, code-like labels |

### Typography Rules
- Headings and data numbers are **always** `text-primary`
- Body text defaults to `text-secondary`
- Timestamps, placeholders, hints use `text-tertiary`
- Labels and pills are `caption` weight, often uppercase
- Numbers in the timer use tabular figures (JetBrains Mono default)

---

## Spacing System

Base unit: **4px**

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight padding, icon gaps |
| `space-2` | 8px | Inline spacing, small gaps |
| `space-3` | 12px | Button padding vertical, card internal padding |
| `space-4` | 16px | Standard padding, section gaps |
| `space-5` | 20px | Card padding, modal internal spacing |
| `space-6` | 24px | Section separators, large gaps |
| `space-8` | 32px | Screen padding, major section breaks |
| `space-10` | 40px | Hero spacing, onboarding slides |
| `space-12` | 48px | Major vertical rhythm |

### Layout
- Screen horizontal padding: `space-5` (20px) on mobile
- Max content width on tablet/desktop: 480px centered
- Bottom sheet corner radius: 16px (top only)
- Modal corner radius: 12px

---

## Shape & Borders

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Grid cells, brutalist buttons, full-width inputs |
| `radius-sm` | 2px | Small badges, tags, compact buttons |
| `radius-md` | 4px | Cards, list items, standard buttons |
| `radius-lg` | 8px | Modals, bottom sheets, large cards |
| `radius-full` | 9999px | Pills, floating action buttons, avatars |

### Borders
- Default border: 1px solid `border` (`#262626`)
- Subtle border: 1px solid `border-subtle` (`#1f1f1f`)
- Accent border: 1px solid `accent` (for focused inputs, active states)

---

## Motion & Animation

### Philosophy
Motion is **functional and snappy**. No bouncy springs. No slow fades. Everything should feel immediate, like a precision instrument.

### Timing
| Token | Duration | Usage |
|---|---|---|
| `duration-instant` | 0ms | State changes, color shifts |
| `duration-fast` | 100ms | Hover states, opacity changes |
| `duration-normal` | 150ms | Transitions, layout shifts, button presses |
| `duration-slow` | 250ms | Screen transitions, modal entrances |
| `duration-dramatic` | 400ms | Onboarding reveals, major state changes |

### Easing
| Token | Value | Usage |
|---|---|---|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrance animations |
| `ease-linear` | `linear` | Timer animations, progress bars |

### Patterns
- **Grid cell fill**: Instant color change on completion. No animation. The satisfaction is in the state change itself.
- **Screen transitions**: Slide from right (150ms, ease-default). No fancy shared element transitions.
- **Bottom sheet**: Slide up from bottom (250ms, ease-out).
- **Modal**: Fade in backdrop (150ms) + scale up content (150ms, ease-out).
- **Button press**: Scale to 0.97 (100ms, ease-default), release instantly.
- **Ring progress**: Smooth SVG stroke animation (linear, 300ms) when data updates.
- **Toast/Notification**: Slide down from top (150ms), auto-dismiss after 3s, slide up (150ms).

### Reduced Motion
Respect `prefers-reduced-motion`. All motion becomes instant (0ms) when enabled.

---

## Shadows & Elevation

Monolith uses **minimal shadows**. Elevation is communicated primarily through border contrast and background color shifts.

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.5)` | Subtle card lift |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.6)` | Modals, bottom sheets |
| `shadow-accent` | `0 0 20px rgba(204, 255, 0, 0.15)` | Active/focused elements with accent glow |
| `shadow-glow` | `0 0 40px rgba(204, 255, 0, 0.08)` | Hero moments, level-up (rare) |

---

## Component Primitives

### Button
```
Variants:
- primary: bg-accent, text-inverse, radius-md, px-5 py-3, font-semibold
- secondary: bg-surface, text-primary, border border-border, radius-md, px-5 py-3
- ghost: bg-transparent, text-secondary, hover:text-primary
- destructive: bg-error/10, text-error, border border-error/20

States:
- pressed: scale-97 (100ms)
- disabled: opacity-40, pointer-events-none
```

### Input / TextField
```
- bg-surface, border border-border, radius-md, px-4 py-3
- text-primary, placeholder:text-tertiary
- focus: border-accent, shadow-accent
- JetBrains Mono for numeric inputs, Plus Jakarta Sans for text
```

### Card
```
- bg-surface, border border-border-subtle, radius-md
- p-5 (internal padding)
- No shadow by default. Use shadow-sm only when elevated.
```

### Badge / Pill
```
- bg-surface, border border-border, radius-full
- px-3 py-1, caption size, uppercase
- Active state: bg-accent-dim, border-accent/30, text-accent
```

### Grid Cell
```
- Size: 12px × 12px (mobile), 14px × 14px (tablet)
- radius-sm (2px)
- No border. Gaps create separation.
- Color: grid-0 through grid-5 based on intensity
- Today: 1px border-accent outline
```

### Task Row
```
- Full width, bg-surface on hover/press
- Left: Checkbox (2px border, accent fill when checked)
- Middle: Task title (body), Identity pill below (caption)
- Right: Duration or time logged (mono-sm, text-tertiary)
- Swipe right: Quick log / Complete
- Swipe left: Delete / Archive
```

### Ring / Progress Circle
```
- SVG circle, stroke-width 8px
- Track: bg-surface (or transparent)
- Fill: accent
- No rounded caps. Sharp ends.
- Size: 120px (home screen), 48px (small widget), 200px (focus mode)
```

### Identity Pill
```
- radius-full, px-3 py-1, caption size
- Border color: identity.color at 30% opacity
- Text color: identity.color
- Active state: bg with identity.color at 15% opacity
```

---

## Iconography

- Use **Lucide React Native** (or `@expo/vector-icons` if size is concern)
- Stroke width: 1.5px (sharp, not chunky)
- Size: 20px default, 16px for inline, 24px for navigation
- Color: text-secondary default, text-primary when active, accent for CTAs
- No filled icons. Outline only.

---

## Layout Grid

- Mobile: Single column, edge-to-edge with 20px horizontal padding
- Breakpoints:
  - `sm`: 0px (mobile)
  - `md`: 768px (tablet — show side-by-side grid + task list)
  - `lg`: 1024px (desktop Tauri — max-width 960px centered, sidebar nav)

---

## Dark Mode

Monolith is **dark-only**. There is no light mode. The contrast between `#0a0a0a` and `#ccff00` is the brand identity.

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for all text (we exceed this)
- Focus indicators: 2px solid accent outline on all interactive elements
- Touch targets: Minimum 44px × 44px
- Screen reader labels on all icons and interactive elements
- Respect `prefers-reduced-motion`

---

## Asset Summary

| Asset | Notes |
|---|---|
| Logo | Simple geometric monolith shape (vertical rectangle), acid lime on dark |
| App Icon | Monolith shape with subtle grid texture |
| Splash Screen | Pure `#0a0a0a` background, acid lime logo centered, JetBrains Mono "MONOLITH" below |
| Widget Previews | Rendered in real-time from widget code |

---

## Tailwind Config Reference

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: {
          DEFAULT: '#141414',
          elevated: '#1a1a1a',
        },
        border: {
          DEFAULT: '#262626',
          subtle: '#1f1f1f',
        },
        text: {
          primary: '#f5f5f0',
          secondary: '#737373',
          tertiary: '#525252',
          inverse: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#ccff00',
          hover: '#b8e600',
          dim: 'rgba(204, 255, 0, 0.15)',
        },
        'secondary-accent': '#00f0ff',
        'tertiary-accent': '#ff6b6b',
        grid: {
          0: '#141414',
          1: '#2a3311',
          2: '#4d6600',
          3: '#7a9900',
          4: '#a3cc00',
          5: '#ccff00',
        },
      },
      fontFamily: {
        mono: ['JetBrainsMono', 'monospace'],
        sans: ['PlusJakartaSans', 'system-ui'],
      },
      borderRadius: {
        'monolith': '2px',
      },
    },
  },
};
```

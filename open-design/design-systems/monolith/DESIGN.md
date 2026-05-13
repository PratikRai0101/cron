# Monolith Design System

> Brutalist developer minimalism for competence tracking.

---

## 1. Color

### Background & Surface
| Token | Hex | Usage |
|---|---|---|
| `bg` | `#0a0a0a` | App background, darkest surface |
| `bg-panel` | `#141414` | Cards, sheets, widget backgrounds |
| `bg-elevated` | `#1a1a1a` | Elevated cards, modals, focused states |

### Text
| Token | Hex | Usage |
|---|---|---|
| `fg` | `#f5f5f0` | Headings, primary content, active states |
| `fg-muted` | `#737373` | Body text, descriptions, inactive states |
| `fg-subtle` | `#525252` | Placeholders, disabled text, timestamps |
| `fg-inverse` | `#0a0a0a` | Text on accent backgrounds |

### Accent
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#ffffff` | Primary accent — white. Progress, completion, CTAs, active rings |
| `primary-hover` | `#e0e0e0` | Hover state for accent elements |
| `primary-dim` | `rgba(255, 255, 255, 0.15)` | Subtle accent backgrounds, glows |
| `secondary` | `#737373` | Rest, recovery, rest days, cooldown states |
| `tertiary` | `#ff6b6b` | Optional Pro accent. Warnings, important alerts |

### Graph Intensity Scale (Contribution Grid)
| Level | Hex | Criteria |
|---|---|---|
| `intensity-0` | `#141414` | No activity |
| `intensity-1` | `#2a3311` | > 0, < 25% of daily goal |
| `intensity-2` | `#4d6600` | 25% - 49% of daily goal |
| `intensity-3` | `#7a9900` | 50% - 74% of daily goal |
| `intensity-4` | `#a3cc00` | 75% - 99% of daily goal |
| `intensity-5` | `#ffffff` | 100%+ of daily goal |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `success` | `#ffffff` | Same as primary. Success states are progress. |
| `error` | `#ff4444` | Minimal use. Only for destructive actions. |
| `warning` | `#ffaa00` | Sparingly. Overdue tasks only. |
| `border` | `#262626` | Dividers, borders, grid lines |
| `border-subtle` | `#1f1f1f` | Very subtle separators |

---

## 2. Typography

### Font Stack
| Role | Font | Fallback | Usage |
|---|---|---|---|
| **Display / Data** | JetBrains Mono | ui-monospace, monospace | Grid cells, timer digits, stats, levels, timestamps |
| **UI / Headings** | Plus Jakarta Sans | system-ui, sans-serif | Screen titles, section headers, buttons, labels |
| **Body** | Plus Jakarta Sans | system-ui, sans-serif | Descriptions, task text, settings items |

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
- Headings and data numbers are always `fg`
- Body text defaults to `fg-muted`
- Timestamps, placeholders, hints use `fg-subtle`
- Labels and pills are `caption` weight, often uppercase
- Numbers in the timer use tabular figures (JetBrains Mono default)

---

## 3. Spacing

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

## 4. Layout

### Grid
- Mobile: Single column, edge-to-edge with 20px horizontal padding
- Breakpoints:
  - `sm`: 0px (mobile)
  - `md`: 768px (tablet — show side-by-side grid + task list)
  - `lg`: 1024px (desktop Tauri — max-width 960px centered, sidebar nav)

### Density
- Information density is controlled, not sparse
- Contrast is sharp, not gentle
- The grid is the hero. Everything else supports it.

---

## 5. Components

### Button
```
Variants:
- primary: bg-primary, fg-inverse, radius-md, px-5 py-3, font-semibold
- secondary: bg-panel, fg, border border-border, radius-md, px-5 py-3
- ghost: bg-transparent, fg-muted, hover:fg
- destructive: bg-error/10, text-error, border border-error/20

States:
- pressed: scale-97 (100ms)
- disabled: opacity-40, pointer-events-none
```

### Input / TextField
```
- bg-panel, border border-border, radius-md, px-4 py-3
- fg, placeholder:fg-subtle
- focus: border-primary, shadow-accent
- JetBrains Mono for numeric inputs, Plus Jakarta Sans for text
```

### Card
```
- bg-panel, border border-border-subtle, radius-md
- p-5 (internal padding)
- No shadow by default. Use shadow-sm only when elevated.
```

### Badge / Pill
```
- bg-panel, border border-border, radius-full
- px-3 py-1, caption size, uppercase
- Active state: bg-primary-dim, border-primary/30, text-primary
```

### Grid Cell
```
- Size: 12px × 12px (mobile), 14px × 14px (tablet)
- radius-sm (2px)
- No border. Gaps create separation.
- Color: intensity-0 through intensity-5 based on effort
- Today: 1px border-primary outline
```

### Task Row
```
- Full width, bg-panel on hover/press
- Left: Checkbox (2px border, primary fill when checked)
- Middle: Task title (body), Identity pill below (caption)
- Right: Duration or time logged (mono-sm, fg-subtle)
- Swipe right: Quick log / Complete
- Swipe left: Delete / Archive
```

### Ring / Progress Circle
```
- SVG circle, stroke-width 8px
- Track: bg-elevated (or transparent)
- Fill: primary
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

## 6. Motion

### Philosophy
Motion is functional and snappy. No bouncy springs. No slow fades. Everything should feel immediate, like a precision instrument.

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
- **Grid cell fill**: Instant color change on completion. No animation.
- **Screen transitions**: Slide from right (150ms, ease-default).
- **Bottom sheet**: Slide up from bottom (250ms, ease-out).
- **Modal**: Fade in backdrop (150ms) + scale up content (150ms, ease-out).
- **Button press**: Scale to 0.97 (100ms, ease-default), release instantly.
- **Ring progress**: Smooth SVG stroke animation (linear, 300ms) when data updates.
- **Toast/Notification**: Slide down from top (150ms), auto-dismiss after 3s, slide up (150ms).

### Reduced Motion
Respect `prefers-reduced-motion`. All motion becomes instant (0ms) when enabled.

---

## 7. Voice & Tone

- Precise, utilitarian, almost austere
- The only "fun" element is the white accent
- No exclamation marks. No emojis. No marketing fluff.
- Headlines are statements, not questions
- Error messages explain what happened, never blame the user
- Progress is framed as competence, not achievement

### Examples
| Bad | Good |
|---|---|
| "You're on fire! 🔥 Keep it up!" | "4 hours of Deep Work this week." |
| "Oops! You lost your streak!" | "Monday was a rest day." |
| "Good morning! Ready to crush it?" | [No greeting. Just the grid.] |

---

## 8. Brand

### Logo
Simple geometric monolith shape (vertical rectangle), white on dark.

### App Icon
Monolith shape with subtle grid texture.

### Splash Screen
Pure `#0a0a0a` background, white logo centered, JetBrains Mono "MONOLITH" below.

### Core Identity
- Dark-only. No light mode.
- The contrast between `#0a0a0a` and `#ffffff` is the brand.
- Developer-tool aesthetic, not consumer-app aesthetic.

---

## 9. Anti-Patterns

### What We Never Do
- **No gradients** (except the subtle grid intensity scale)
- **No border-radius > 8px** except for pills and avatars
- **No shadows as primary elevation** — use border contrast and background shifts
- **No decorative animations** — motion must serve a purpose
- **No engagement theater** — no confetti, no "Good morning!" popups, no daily login bonuses
- **No generic fonts** — never use Inter, Roboto, or Arial
- **No light mode** — Monolith is dark-only
- **No filled icons** — outline only, 1.5px stroke
- **No bouncy springs** — motion is snappy and functional
- **No engagement-farming** — reward progress, not app usage

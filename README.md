# Monolith

A minimalist, cross-platform competence tracker. Visualize focused work through an effort-based contribution grid with a brutalist aesthetic.

## Philosophy

Monolith gamifies **competence growth**, not app usage. Every mechanic exists to make you feel: *"I am getting better at the things I care about."*

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native + Expo (EAS Build) |
| Desktop | Tauri (Rust) |
| Backend | Supabase |
| State | Zustand |
| Billing | RevenueCat |
| Monorepo | Turborepo |

## Project Structure

```
monolith/
├── apps/
│   ├── mobile/          # React Native + Expo
│   └── desktop/         # Tauri desktop app
├── packages/
│   └── shared/          # Shared types & utilities
├── supabase/            # Migrations & edge functions
├── widgets/             # Native iOS/Android widget source
└── docs/                # Design & planning documents
```

## Quick Start

```bash
# Install dependencies
npm install

# Start Supabase locally
npm run supabase:start

# Configure optional Supabase email authentication
cp apps/mobile/.env.example apps/mobile/.env
# Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in apps/mobile/.env
# Apply database migrations with the Supabase CLI before enabling accounts

# Start mobile app
npm run mobile

# Start desktop app
npm run desktop
```

## Documentation

- [AGENTS.md](monolith-design/AGENTS.md) — Coding agent context
- [PRD.md](monolith-design/PRD.md) — Product requirements
- [DESIGN_SYSTEM.md](monolith-design/DESIGN_SYSTEM.md) — Visual design system
- [GAMIFICATION.md](monolith-design/GAMIFICATION.md) — Progression & mechanics
- [SAAS_PLAN.md](monolith-design/SAAS_PLAN.md) — Monetization strategy
- [SOCIAL_FEATURES.md](monolith-design/SOCIAL_FEATURES.md) — Crews & Wrapped
- [CLAUDE_DESIGN_PROMPT.md](monolith-design/CLAUDE_DESIGN_PROMPT.md) — Design prompts

## License

MIT

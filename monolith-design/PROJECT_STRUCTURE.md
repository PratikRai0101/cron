# PROJECT_STRUCTURE.md — Monolith

## Repository Layout

```
monolith/
├── apps/
│   ├── mobile/                    # React Native + Expo (primary app)
│   │   ├── src/
│   │   │   ├── app/               # Entry point, navigation, providers
│   │   │   │   ├── (tabs)/        # Bottom tab screens
│   │   │   │   │   ├── grid.tsx
│   │   │   │   │   ├── focus.tsx
│   │   │   │   │   ├── identity.tsx
│   │   │   │   │   ├── profile.tsx
│   │   │   │   │   └── _layout.tsx
│   │   │   │   ├── modals/        # Modal screens (stack navigator)
│   │   │   │   │   ├── log-task.tsx
│   │   │   │   │   ├── focus-mode.tsx
│   │   │   │   │   ├── crew-dashboard.tsx
│   │   │   │   │   ├── wrapped-preview.tsx
│   │   │   │   │   ├── settings.tsx
│   │   │   │   │   └── _layout.tsx
│   │   │   │   ├── onboarding/    # Onboarding flow
│   │   │   │   │   ├── welcome.tsx
│   │   │   │   │   ├── set-goal.tsx
│   │   │   │   │   ├── pick-identities.tsx
│   │   │   │   │   ├── widget-setup.tsx
│   │   │   │   │   └── _layout.tsx
│   │   │   │   └── _layout.tsx    # Root layout (providers, auth gate)
│   │   │   ├── components/        # Shared UI components
│   │   │   │   ├── ui/            # Primitive components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Badge.tsx
│   │   │   │   │   ├── Icon.tsx
│   │   │   │   │   ├── Skeleton.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── contribution-grid/
│   │   │   │   │   ├── GridCell.tsx
│   │   │   │   │   ├── GridMonth.tsx
│   │   │   │   │   ├── GridTooltip.tsx
│   │   │   │   │   ├── IdentityFilter.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── focus/
│   │   │   │   │   ├── Timer.tsx
│   │   │   │   │   ├── RingProgress.tsx
│   │   │   │   │   ├── FocusControls.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── TaskRow.tsx
│   │   │   │   │   ├── TaskList.tsx
│   │   │   │   │   ├── QuickLogSheet.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── identity/
│   │   │   │   │   ├── IdentityCard.tsx
│   │   │   │   │   ├── IdentityPill.tsx
│   │   │   │   │   ├── IdentityGrid.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── insights/
│   │   │   │       ├── InsightCard.tsx
│   │   │   │       ├── MomentumRing.tsx
│   │   │   │       └── index.ts
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useFocusTimer.ts
│   │   │   │   ├── useGridData.ts
│   │   │   │   ├── useOfflineSync.ts
│   │   │   │   ├── useSubscription.ts
│   │   │   │   ├── useWidgetData.ts
│   │   │   │   └── index.ts
│   │   │   ├── stores/            # Zustand stores
│   │   │   │   ├── appStore.ts
│   │   │   │   ├── taskStore.ts
│   │   │   │   ├── focusStore.ts
│   │   │   │   ├── identityStore.ts
│   │   │   │   ├── userStore.ts
│   │   │   │   ├── crewStore.ts
│   │   │   │   └── index.ts
│   │   │   ├── lib/               # Utilities, configs, clients
│   │   │   │   ├── supabase.ts    # Supabase client init
│   │   │   │   ├── revenuecat.ts  # RevenueCat init
│   │   │   │   ├── constants.ts   # App constants
│   │   │   │   ├── colors.ts      # Typed color tokens
│   │   │   │   ├── analytics.ts   # PostHog / telemetry
│   │   │   │   └── index.ts
│   │   │   ├── utils/             # Pure utility functions
│   │   │   │   ├── date.ts
│   │   │   │   ├── grid.ts
│   │   │   │   ├── xp.ts
│   │   │   │   ├── validation.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/             # TypeScript types
│   │   │   │   ├── models.ts
│   │   │   │   ├── api.ts
│   │   │   │   └── index.ts
│   │   │   └── widgets/           # Widget bridge logic
│   │   │       ├── ios-bridge.ts
│   │   │       ├── android-bridge.ts
│   │   │       └── index.ts
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   │   ├── JetBrainsMono-*.ttf
│   │   │   │   └── PlusJakartaSans-*.ttf
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── plugins/               # Expo Config Plugins for native widgets
│   │   │   ├── ios-widget-plugin/
│   │   │   └── android-widget-plugin/
│   │   ├── app.json               # Expo config
│   │   ├── eas.json               # EAS Build config
│   │   ├── tailwind.config.js
│   │   ├── metro.config.js
│   │   ├── babel.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── desktop/                   # Tauri desktop app
│       ├── src/
│       │   ├── main.rs            # Tauri Rust entry
│       │   ├── tray.rs            # System tray logic
│       │   ├── shortcuts.rs       # Global shortcuts
│       │   └── lib.rs
│       ├── tauri.conf.json
│       ├── Cargo.toml
│       └── src-tauri/
│
├── packages/
│   ├── shared/                    # Shared code between mobile and desktop
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui/                        # Shared UI primitives (if needed)
│       └── src/
│
├── supabase/                      # Supabase project config
│   ├── migrations/
│   ├── functions/                 # Edge Functions
│   ├── seed.sql
│   └── config.toml
│
├── widgets/                       # Native widget source code
│   ├── ios/
│   │   ├── MonolithWidget/
│   │   │   ├── MonolithWidget.swift
│   │   │   ├── MonolithWidgetBundle.swift
│   │   │   ├── GridProvider.swift
│   │   │   ├── TimelineProvider.swift
│   │   │   └── Views/
│   │   └── Info.plist
│   └── android/
│       ├── src/main/
│       │   ├── java/com/monolith/widget/
│       │   │   ├── MonolithWidget.kt
│       │   │   ├── GridRemoteViewsFactory.kt
│       │   │   └── WidgetUpdateService.kt
│       │   └── res/
│       │       ├── layout/
│       │       ├── xml/
│       │       └── values/
│       └── build.gradle
│
├── docs/                          # Design & planning docs
│   ├── AGENTS.md
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── GAMIFICATION.md
│   ├── SAAS_PLAN.md
│   ├── SOCIAL_FEATURES.md
│   ├── CLAUDE_DESIGN_PROMPT.md
│   └── PROJECT_STRUCTURE.md
│
├── scripts/                       # Build & deployment scripts
│   ├── build-widgets.sh
│   ├── sync-env.sh
│   └── release-checklist.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── build-mobile.yml
│       └── build-desktop.yml
│
├── .env.example
├── turbo.json                     # Turborepo config
├── package.json                   # Root package (workspaces)
└── README.md
```

---

## Monorepo Strategy

Use **Turborepo** with npm/yarn/pnpm workspaces:

```json
// root package.json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {},
    "type-check": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Key Directories Explained

### `apps/mobile/src/app/`
Uses **Expo Router** (file-based routing):
- `(tabs)/` → Bottom tab navigator
- `modals/` → Stack screens that can be presented as modals
- `onboarding/` → Onboarding flow stack
- `_layout.tsx` files define navigation wrappers and context providers

### `apps/mobile/src/components/`
Organized by domain, not by type:
- `ui/` — Primitive, reusable components (Button, Input, etc.)
- `contribution-grid/` — Everything related to the grid
- `focus/` — Timer and focus mode UI
- `tasks/` — Task list and management
- `identity/` — Identity cards and pills
- `insights/` — Stats, rings, insight cards

### `apps/mobile/src/stores/`
One Zustand store per domain. Each store:
- Has typed state interface
- Has actions that update local state immediately
- Syncs to Supabase asynchronously
- Handles offline queueing

Example pattern:
```ts
// stores/taskStore.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskInput) => Promise<void>;
  // ...
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  addTask: async (input) => {
    const tempId = generateId();
    const optimisticTask = { ...input, id: tempId, isOptimistic: true };
    set((s) => ({ tasks: [...s.tasks, optimisticTask] }));
    
    const { data, error } = await supabase.from('tasks').insert(input).select().single();
    if (error) {
      // Rollback
      set((s) => ({ tasks: s.tasks.filter((t) => t.id !== tempId) }));
      queueForRetry('tasks.insert', input);
    } else {
      set((s) => ({
        tasks: s.tasks.map((t) => (t.id === tempId ? data : t)),
      }));
    }
  },
}));
```

### `apps/mobile/src/widgets/`
Bridge between JS app and native widgets:
- `ios-bridge.ts`: Writes widget data to `AppGroups` shared container
- `android-bridge.ts`: Writes widget data to `SharedPreferences`
- Called from stores after every state change that affects widgets

### `widgets/`
Contains the actual native widget source code:
- iOS widgets in Swift (WidgetKit)
- Android widgets in Kotlin (AppWidgetProvider)
- These are compiled via EAS Build Config Plugins, not included in the JS bundle

### `supabase/`
Managed via **Supabase CLI**:
```bash
npx supabase link
npx supabase db push        # Push migrations
npx supabase functions deploy  # Deploy edge functions
```

### `packages/shared/`
Code shared between mobile and desktop:
- TypeScript types
- Pure utility functions (date math, XP calculations)
- Constants and color tokens

---

## Dependency Rules

```
apps/mobile      → packages/shared
apps/desktop     → packages/shared
packages/shared  → (no internal deps)
packages/ui      → packages/shared
```

No circular dependencies. Mobile and desktop do not depend on each other.

---

## Environment Configuration

### `apps/mobile/.env`
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_REVENUECAT_API_KEY=
EXPO_PUBLIC_POSTHOG_KEY=      # Optional telemetry
```

### `apps/desktop/.env`
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
REVENUECAT_API_KEY=
```

### `supabase/.env`
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Build & Deploy

### Mobile (EAS Build)
```bash
# Development build (includes native widgets)
cd apps/mobile && eas build --profile development

# Production build
cd apps/mobile && eas build --profile production

# Over-the-air updates (only JS changes, no native)
cd apps/mobile && eas update
```

### Desktop (Tauri)
```bash
# Export web build
cd apps/mobile && npx expo export:web

# Build Tauri binary
cd apps/desktop && cargo tauri build

# Platforms: macOS (.app, .dmg), Linux (.AppImage, .deb), Windows (.msi)
```

### Supabase
```bash
# Local development
npx supabase start

# Deploy migrations
npx supabase db push

# Deploy edge functions
npx supabase functions deploy
```

---

## Git Workflow

- **Main branch**: Production-ready
- **Develop branch**: Integration branch
- **Feature branches**: `feature/grid-redesign`, `feature/crew-challenges`
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)

---

## Code Quality

### Linting & Formatting
- **ESLint** with `@typescript-eslint` and React Native rules
- **Prettier** with single quotes, no semicolons, 100 char width
- **TypeScript** strict mode enabled

### Pre-commit Hooks
```json
// .husky/pre-commit
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}

// lint-staged config
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
}
```

### Testing
```bash
# Unit tests
npm test

# Type checking
npm run type-check

# E2E tests (Detox)
npm run e2e:ios
npm run e2e:android
```

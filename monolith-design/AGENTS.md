# AGENTS.md — Monolith

## Project Overview

**Monolith** is a minimalist, gamified cross-platform productivity tracker. It visualizes focused work through an effort-based contribution grid (GitHub/LeetCode-style) with a brutalist "Monolith" aesthetic. The product philosophy is competence-tracking, not engagement-farming. Users are rewarded for meaningful progress, not app usage.

- **Mobile**: React Native + Expo (EAS Build for native widgets)
- **Desktop**: Tauri (Rust) wrapping the React web build
- **Backend**: Supabase (Postgres, Auth, Realtime, Row-Level Security)
- **State**: Zustand (client-side) + Supabase (source of truth)
- **Billing**: RevenueCat (cross-platform subscriptions)

---

## Architecture Patterns

### Navigation
Use **React Navigation v6+** with a bottom-tab navigator for the main app:
- `Grid` (Home)
- `Focus`
- `Identity`
- `Profile`

Modal screens (full-screen or bottom-sheet):
- `LogTask`
- `FocusMode`
- `CrewDashboard`
- `WrappedPreview`
- `Settings`
- `Onboarding`

### State Management
**Zustand** for all client state. One store per domain:
- `useAppStore` — theme, settings, onboarding status
- `useTaskStore` — tasks, completions, today's queue
- `useFocusStore` — active session, timer state
- `useIdentityStore` — identities, filters, mastery stats
- `useCrewStore` — crew memberships, challenges, progress
- `useUserStore` — user profile, subscription tier, level/XP

**Supabase** is the source of truth. Zustand stores sync via:
- `supabase.from('table').subscribe()` for real-time updates
- Optimistic updates in Zustand, rollback on Supabase error
- Queue offline mutations in `AsyncStorage`, flush on reconnect

### Offline-First Sync Strategy
```
User Action → Zustand (optimistic) → AsyncStorage Queue → Supabase
                                          ↑_____________↓ (on reconnect)
```
- Every mutation writes to an `offline_queue` table in AsyncStorage
- On app launch and network recovery, flush the queue in order
- Show a subtle "Syncing..." indicator in Profile header only if queue > 0

---

## Supabase Integration

### Auth
- Use **Supabase Auth** with email/password and OAuth (Google, Apple)
- Store session in `expo-secure-store` (iOS keychain / Android Keystore)
- Refresh token automatically via `supabase.auth.onAuthStateChange()`

### Database Schema (Core Tables)
```sql
-- Users (managed by Supabase Auth, extended via public.profiles)
profiles: id, username, display_name, avatar_url, daily_goal_minutes,
          subscription_tier, accent_color, created_at

-- Identities
identities: id, user_id, name, color, icon, sort_order, is_archived

-- Tasks
tasks: id, user_id, title, identity_id, estimated_minutes, is_recurring,
       recurrence_rule, created_at, completed_at, archived_at

-- Focus Sessions
focus_sessions: id, user_id, task_id, identity_id, started_at, ended_at,
                duration_seconds, was_completed

-- Daily Logs (aggregated from sessions for fast grid queries)
daily_logs: id, user_id, date, total_minutes, identity_breakdown (jsonb)

-- Crews
crews: id, name, code, created_by, challenge_config (jsonb), created_at

-- Crew Memberships
crew_memberships: id, crew_id, user_id, privacy_level, joined_at
-- privacy_level: 'ring_only' | 'identity_breakdown' | 'ghost'

-- Crew Challenges
crew_challenges: id, crew_id, title, target_hours, target_completions,
                 identity_filter, starts_at, ends_at

-- Wrapped Reports
wrapped_reports: id, user_id, year, report_data (jsonb), share_card_url,
                 generated_at
```

### Row-Level Security (RLS)
Every table must have RLS enabled. Default policies:
- `profiles`: Users can read/update only their own row
- `identities`, `tasks`, `focus_sessions`, `daily_logs`: User owns data
- `crews`: Members can read crew row. Creator can update.
- `crew_memberships`: Members can read their crew's memberships (respecting privacy_level)
- `crew_challenges`: Members can read. Creator can write.
- `wrapped_reports`: User owns data.

### Realtime Subscriptions
Subscribe to tables the user actively views:
- Grid screen: `daily_logs` for the current user
- Crew screen: `crew_challenges` and aggregate progress for user's crews
- Profile: `profiles` (for tier/subscription changes)

---

## Widget Development (Native)

### Constraints
- Native iOS widgets use **WidgetKit** (SwiftUI)
- Native Android widgets use **AppWidgetProvider** (Kotlin + RemoteViews)
- Both require **EAS Build** with custom **Config Plugins**; they do NOT work in Expo Go
- Widgets are read-only in v1, interactive in v2

### Data Bridge
Widgets cannot access the app's JS runtime. They read from:
1. **Shared Storage**: Write widget data to `AppGroups` (iOS) and `SharedPreferences` (Android) via native modules
2. **Background Fetch**: Use `expo-background-fetch` to periodically sync widget data from Supabase
3. **Deep Links**: Tapping a widget opens the app via deep link (`monolith://focus`, `monolith://grid?date=2024-05-13`)

### v1 Read-Only Widgets
- **Small**: Ring progress % + hours today
- **Medium**: 7-day mini-grid + top 2 tasks
- **Large**: Month grid + identity filter indicator

### v2 Interactive Widgets
- iOS: Use **WidgetKit Button intents** (iOS 17+) to trigger actions without opening app
- Android: Use **PendingIntents** on RemoteViews buttons
- Actions: Check off task, start quick focus session

### Development Flow
1. Develop app logic in Expo Go (ignore widgets)
2. When ready for widgets, switch to `expo run:ios` / `expo run:android` (development builds)
3. Use EAS Build for production widgets

---

## Desktop (Tauri)

### Build Process
1. `expo export:web` → generates static web build
2. Tauri wraps the web build in a native window
3. Tauri provides: system tray icon, global shortcuts (e.g., `Cmd+Shift+M` for quick log), native menus

### Sync
Desktop app uses the same Supabase client as mobile. No separate backend.

### Storage
Use Tauri's `fs` + `path` APIs for local data persistence if offline, sync to Supabase when online.

---

## Coding Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `ContributionGrid.tsx`)
- Screens: `PascalCaseScreen.tsx` (e.g., `GridScreen.tsx`)
- Hooks: `useCamelCase.ts` (e.g., `useFocusTimer.ts`)
- Stores: `camelCaseStore.ts` (e.g., `taskStore.ts`)
- Utils: `camelCase.ts` (e.g., `dateUtils.ts`)

### Styling
- Use **NativeWind** (Tailwind for React Native) for all styling
- All colors come from `DESIGN_SYSTEM.md` tokens, mapped in `tailwind.config.js`
- No inline styles except for dynamic values (e.g., grid cell intensity)

### Component Structure
```tsx
// Screen component
export default function GridScreen() {
  // Hooks at top
  const { tasks } = useTaskStore();
  
  // Render
  return (
    <View className="flex-1 bg-background">
      <ContributionGrid />
      <TaskList tasks={tasks} />
    </View>
  );
}
```

### Performance Rules
- FlatList for all scrollable lists
- Memoize grid cell rendering with `React.memo`
- Debounce focus session writes to Supabase (every 10s during active session, flush on end)
- Avoid re-rendering the entire grid on every timer tick

---

## Feature Flags & Gates

Use `subscription_tier` from `profiles` to gate features:
- `free`: Local-only (no Supabase sync), 1 identity, 30-day history, read-only small widget
- `pro`: Full sync, unlimited identities, unlimited history, all widgets + interactive, export, custom accents
- `team`: Crew creation, advanced crew analytics (future)

Check tier in components:
```tsx
const { tier } = useUserStore();
if (tier === 'free' && identities.length >= 1) {
  showUpgradePrompt();
}
```

---

## Environment Setup

Required environment variables (in `.env` and EAS secrets):
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
REVENUECAT_API_KEY_IOS=
REVENUECAT_API_KEY_ANDROID=
```

---

## Testing Strategy

- **Unit**: Test pure utility functions (date math, XP calculations) with Jest
- **Component**: Test screen rendering with React Native Testing Library
- **Integration**: Test Zustand store logic + Supabase mock
- **E2E**: Detox for critical flows (onboarding → focus → grid updates)

---

## Agent Instructions

When generating code for this project:

1. **Always reference `DESIGN_SYSTEM.md`** for colors, typography, spacing, and motion values.
2. **Follow the Monolith philosophy**: The UI should feel precise, utilitarian, and almost austere. Acid lime is the only "fun" element. Everything else is disciplined.
3. **Never add engagement theater**: No confetti on task completion. No "Good morning!" popups. No daily login bonuses. The reward is the grid filling up.
4. **Prioritize offline-first**: Assume the user has no network. Make it work locally, sync when possible.
5. **Respect privacy**: Social features are opt-in, anonymized by default, and never judgmental.
6. **Keep it minimal**: If a feature can be removed without breaking the core loop, question its existence.

---

## Useful Commands

```bash
# Start Expo development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Build native widgets (EAS)
eas build --platform ios
eas build --platform android

# Export web build for Tauri
npx expo export:web

# Run Tauri dev
cd apps/desktop && cargo tauri dev
```

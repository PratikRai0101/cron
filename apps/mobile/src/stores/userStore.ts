import { create } from 'zustand';
import { SubscriptionTier } from '@/types/models';

interface UserState {
  id: string | null;
  displayName: string | null;
  username: string | null;
  avatarUrl: string | null;
  dailyGoalMinutes: number;
  subscriptionTier: SubscriptionTier;
  accentColor: 'lime' | 'cyan' | 'coral';
  totalFocusMinutes: number;
  level: number;
  isLoading: boolean;
  
  setUser: (user: Partial<UserState>) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  setDailyGoal: (minutes: number) => void;
  setAccentColor: (color: 'lime' | 'cyan' | 'coral') => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  displayName: null,
  username: null,
  avatarUrl: null,
  dailyGoalMinutes: 60,
  subscriptionTier: 'free',
  accentColor: 'lime',
  totalFocusMinutes: 0,
  level: 0,
  isLoading: true,
  
  setUser: (user) => set((state) => ({ ...state, ...user, isLoading: false })),
  setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),
  setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),
  setAccentColor: (color) => set({ accentColor: color }),
  clearUser: () => set({
    id: null,
    displayName: null,
    username: null,
    avatarUrl: null,
    dailyGoalMinutes: 60,
    subscriptionTier: 'free',
    accentColor: 'lime',
    totalFocusMinutes: 0,
    level: 0,
    isLoading: false,
  }),
}));

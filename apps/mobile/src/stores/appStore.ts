import { create } from 'zustand';

interface AppState {
  isOnboarded: boolean;
  isOffline: boolean;
  theme: 'dark';
  
  setOnboarded: (value: boolean) => void;
  setOffline: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboarded: false,
  isOffline: false,
  theme: 'dark',
  
  setOnboarded: (value) => set({ isOnboarded: value }),
  setOffline: (value) => set({ isOffline: value }),
}));

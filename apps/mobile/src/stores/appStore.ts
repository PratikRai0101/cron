import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  isOnboarded: boolean;
  isOffline: boolean;
  theme: 'dark';
  
  setOnboarded: (value: boolean) => void;
  setOffline: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      isOffline: false,
      theme: 'dark',
      
      setOnboarded: (value) => set({ isOnboarded: value }),
      setOffline: (value) => set({ isOffline: value }),
    }),
    {
      name: 'monolith-app',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isOnboarded: state.isOnboarded }),
    }
  )
);

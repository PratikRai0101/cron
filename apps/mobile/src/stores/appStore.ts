import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  isOnboarded: boolean;
  isOffline: boolean;
  theme: "system" | "light" | "dark";
  setTheme: (theme: "system" | "light" | "dark") => void;

  setOnboarded: (value: boolean) => void;
  setOffline: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      isOffline: false,
      theme: "system",
      setTheme: (theme) => set({ theme }),

      setOnboarded: (value) => set({ isOnboarded: value }),
      setOffline: (value) => set({ isOffline: value }),
    }),
    {
      name: "monolith-app",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isOnboarded: state.isOnboarded,
        theme: state.theme,
      }),
    },
  ),
);

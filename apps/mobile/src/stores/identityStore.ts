import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IdentityItem {
  id: string;
  name: string;
  color: string;
  isArchived: boolean;
  totalMinutes?: number;
  createdAt: string;
}

interface IdentityState {
  identities: IdentityItem[];
  addIdentity: (identity: Omit<IdentityItem, 'id' | 'isArchived' | 'createdAt'>) => void;
  updateIdentity: (id: string, patch: Partial<Omit<IdentityItem, 'id'>>) => void;
  deleteIdentity: (id: string) => void;
  archiveIdentity: (id: string) => void;
  seedFromPresets: (presets: Omit<IdentityItem, 'isArchived' | 'createdAt'>[]) => void;
  getById: (id: string | null) => IdentityItem | undefined;
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      identities: [],

      addIdentity: (identity) =>
        set((state) => ({
          identities: [
            ...state.identities,
            {
              ...identity,
              id: Date.now().toString(),
              isArchived: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateIdentity: (id, patch) =>
        set((state) => ({
          identities: state.identities.map((i) =>
            i.id === id ? { ...i, ...patch } : i
          ),
        })),

      deleteIdentity: (id) =>
        set((state) => ({
          identities: state.identities.filter((i) => i.id !== id),
        })),

      archiveIdentity: (id) =>
        set((state) => ({
          identities: state.identities.map((i) =>
            i.id === id ? { ...i, isArchived: true } : i
          ),
        })),

      seedFromPresets: (presets) =>
        set({
          identities: presets.map((p) => ({
            ...p,
            isArchived: false,
            createdAt: new Date().toISOString(),
          })),
        }),

      getById: (id) => get().identities.find((i) => i.id === id),
    }),
    {
      name: 'monolith-identities',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

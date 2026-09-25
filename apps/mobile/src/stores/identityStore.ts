import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uid } from '@/lib/id';

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
  restoreIdentity: (id: string) => void;
  seedFromPresets: (presets: Omit<IdentityItem, 'isArchived' | 'createdAt'>[]) => void;
  getById: (id: string | null) => IdentityItem | undefined;
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      identities: [],

      addIdentity: (identity) =>
        set((state) => {
          const name = identity.name.trim();
          if (!name || state.identities.some((item) => !item.isArchived && item.name.toLowerCase() === name.toLowerCase())) {
            return state;
          }
          return {
            identities: [
              ...state.identities,
              {
                ...identity,
                name,
                id: uid('identity-'),
                isArchived: false,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),

      updateIdentity: (id, patch) =>
        set((state) => {
          const nextName = patch.name?.trim();
          if (nextName && state.identities.some((item) => item.id !== id && !item.isArchived && item.name.toLowerCase() === nextName.toLowerCase())) return state;
          return {
            identities: state.identities.map((i) =>
              i.id === id ? { ...i, ...patch, ...(nextName ? { name: nextName } : {}) } : i
            ),
          };
        }),

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

      restoreIdentity: (id) =>
        set((state) => {
          const target = state.identities.find((i) => i.id === id);
          if (!target || state.identities.some((i) => !i.isArchived && i.name.toLowerCase() === target.name.toLowerCase())) return state;
          return { identities: state.identities.map((i) => i.id === id ? { ...i, isArchived: false } : i) };
        }),

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

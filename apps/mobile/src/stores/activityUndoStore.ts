import { create } from "zustand";
export const useActivityUndoStore = create<{
  message: string | null;
  undo: (() => boolean) | null;
  offer: (message: string, undo: () => boolean) => void;
  dismiss: () => void;
  restore: () => void;
}>((set, get) => ({
  message: null,
  undo: null,
  offer: (message, undo) => set({ message, undo }),
  dismiss: () => set({ message: null, undo: null }),
  restore: () => {
    const restored = get().undo?.();
    set({
      message: restored
        ? "Change undone."
        : "Record changed again. Nothing was overwritten.",
      undo: null,
    });
  },
}));

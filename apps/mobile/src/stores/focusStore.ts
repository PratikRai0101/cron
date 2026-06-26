import { create } from 'zustand';

export interface CompletedSession {
  id: string;
  duration: number;
  identityId: string;
  identityName: string;
  identityColor: string;
  taskId?: string;
  completedAt: string;
}

interface FocusState {
  isActive: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  currentIdentityId: string | null;
  currentTaskId: string | null;
  startTime: number | null;
  completedSessions: CompletedSession[];
  
  startFocus: (identityId: string, taskId?: string) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  stopFocus: () => { duration: number; identityId: string; taskId?: string } | null;
  cancelFocus: () => void;
  tick: () => void;
}

export const useFocusStore = create<FocusState>((set, get) => ({
  isActive: false,
  isPaused: false,
  elapsedSeconds: 0,
  currentIdentityId: null,
  currentTaskId: null,
  startTime: null,
  completedSessions: [],
  
  startFocus: (identityId, taskId) => set({
    isActive: true,
    isPaused: false,
    elapsedSeconds: 0,
    currentIdentityId: identityId,
    currentTaskId: taskId || null,
    startTime: Date.now(),
  }),
  
  pauseFocus: () => set({ isPaused: true }),
  
  resumeFocus: () => set({ isPaused: false }),
  
  stopFocus: () => {
    const state = get();
    if (!state.isActive || !state.currentIdentityId) return null;
    
    const result = {
      duration: state.elapsedSeconds,
      identityId: state.currentIdentityId,
      taskId: state.currentTaskId || undefined,
    };
    
    set({
      isActive: false,
      isPaused: false,
      elapsedSeconds: 0,
      currentIdentityId: null,
      currentTaskId: null,
      startTime: null,
    });
    
    return result;
  },
  
  cancelFocus: () => set({
    isActive: false,
    isPaused: false,
    elapsedSeconds: 0,
    currentIdentityId: null,
    currentTaskId: null,
    startTime: null,
  }),
  
  tick: () => {
    const state = get();
    if (state.isActive && !state.isPaused) {
      set({ elapsedSeconds: state.elapsedSeconds + 1 });
    }
  },

  logSession: (session: CompletedSession) => set((state) => ({
    completedSessions: [...state.completedSessions, session],
  })),
}));

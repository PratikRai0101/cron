import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  accumulatedSeconds: number;
  completedSessions: CompletedSession[];
  
  startFocus: (identityId: string, taskId?: string) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  stopFocus: () => { duration: number; identityId: string; taskId?: string } | null;
  cancelFocus: () => void;
  tick: () => void;
  logSession: (session: CompletedSession) => void;
}

function getElapsed(startTime: number | null, accumulatedSeconds: number): number {
  if (!startTime) return accumulatedSeconds;
  return accumulatedSeconds + (Date.now() - startTime) / 1000;
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      isActive: false,
  isPaused: false,
  elapsedSeconds: 0,
  currentIdentityId: null,
  currentTaskId: null,
  startTime: null,
  accumulatedSeconds: 0,
  completedSessions: [],
  
  startFocus: (identityId, taskId) => set({
    isActive: true,
    isPaused: false,
    elapsedSeconds: 0,
    accumulatedSeconds: 0,
    currentIdentityId: identityId,
    currentTaskId: taskId || null,
    startTime: Date.now(),
  }),
  
  pauseFocus: () => {
    const { startTime, accumulatedSeconds } = get();
    set({
      isPaused: true,
      startTime: null,
      accumulatedSeconds: getElapsed(startTime, accumulatedSeconds),
    });
  },
  
  resumeFocus: () => set({
    isPaused: false,
    startTime: Date.now(),
  }),
  
  stopFocus: () => {
    const state = get();
    if (!state.isActive || !state.currentIdentityId) return null;
    
    const result = {
      duration: Math.round(getElapsed(state.startTime, state.accumulatedSeconds)),
      identityId: state.currentIdentityId,
      taskId: state.currentTaskId || undefined,
    };
    
    set({
      isActive: false,
      isPaused: false,
      elapsedSeconds: 0,
      accumulatedSeconds: 0,
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
    accumulatedSeconds: 0,
    currentIdentityId: null,
    currentTaskId: null,
    startTime: null,
  }),
  
  tick: () => {
    const state = get();
    if (state.isActive && !state.isPaused) {
      set({
        elapsedSeconds: Math.floor(getElapsed(state.startTime, state.accumulatedSeconds)),
      });
    }
  },

  logSession: (session: CompletedSession) => set((state) => ({
    completedSessions: [...state.completedSessions, session],
  })),
    }),
    {
      name: 'monolith-focus',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        completedSessions: state.completedSessions,
        isActive: state.isActive,
        isPaused: state.isPaused,
        startTime: state.startTime,
        accumulatedSeconds: state.accumulatedSeconds,
        currentIdentityId: state.currentIdentityId,
        currentTaskId: state.currentTaskId,
      }),
    }
  )
);

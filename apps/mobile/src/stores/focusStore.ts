import { replaceRecord } from '@/lib/activityRecords';
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
  replaceSession: (id: string, expected: CompletedSession | null, next: CompletedSession | null, index?: number) => boolean;
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

const MAX_SESSION_SECONDS = 12 * 60 * 60;

function getElapsed(startTime: number | null, accumulatedSeconds: number): number {
  if (!startTime) return Math.min(accumulatedSeconds, MAX_SESSION_SECONDS);
  return Math.min(accumulatedSeconds + (Date.now() - startTime) / 1000, MAX_SESSION_SECONDS);
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      replaceSession: (id, expected, next, index) => {
        if (next && (!next.identityId || !next.identityName.trim() ||
          !Number.isInteger(next.duration) || next.duration < 60 || next.duration > MAX_SESSION_SECONDS)) return false;
        const records = replaceRecord(get().completedSessions, id, expected, next, index);
        if (!records) return false;
        set({ completedSessions: records });
        return true;
      },
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
      elapsedSeconds: Math.floor(getElapsed(startTime, accumulatedSeconds)),
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
    if (state.isActive) {
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
      name: 'monolith-focus-v2',
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

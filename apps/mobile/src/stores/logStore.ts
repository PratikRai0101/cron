import { replaceRecord } from "@/lib/activityRecords";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from "@/lib/id";

export interface RetroLog {
  id: string;
  date: string;
  identityId: string;
  identityName: string;
  identityColor: string;
  minutes: number;
}

interface LogState {
  replaceLog: (
    id: string,
    expected: RetroLog | null,
    next: RetroLog | null,
    index?: number,
  ) => boolean;
  retroLogs: RetroLog[];
  logRetroActivity: (log: Omit<RetroLog, "id">) => void;
  getLogsForDate: (date: string) => RetroLog[];
  getMinutesForDate: (date: string) => number;
}

export const useLogStore = create<LogState>()(
  persist(
    (set, get) => ({
      retroLogs: [],
      replaceLog: (id, expected, next, index) => {
        if (
          next &&
          (!next.identityId ||
            !next.identityName.trim() ||
            !(
              Number.isInteger(next.minutes) &&
              next.minutes > 0 &&
              next.minutes <= 720
            ))
        )
          return false;
        const records = replaceRecord(
          get().retroLogs,
          id,
          expected,
          next,
          index,
        );
        if (!records) return false;
        set({ retroLogs: records });
        return true;
      },

      logRetroActivity: (log) =>
        set((state) => ({
          retroLogs: [...state.retroLogs, { ...log, id: uid("retro-") }],
        })),

      getLogsForDate: (date) => get().retroLogs.filter((l) => l.date === date),

      getMinutesForDate: (date) =>
        get()
          .retroLogs.filter((l) => l.date === date)
          .reduce((sum, l) => sum + l.minutes, 0),
    }),
    {
      name: "monolith-retro-logs",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

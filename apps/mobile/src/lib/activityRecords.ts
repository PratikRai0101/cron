import type { CompletedSession } from "@/stores/focusStore";
import type { RetroLog } from "@/stores/logStore";
import { formatDate } from "@monolith/shared";

export type ActivityRecord = {
  id: string;
  source: "session" | "log";
  sourceId: string;
  date: string;
  durationSeconds: number;
  identityId: string;
  identityName: string;
  taskId?: string;
  completedAt?: string;
};
export function activityRecords(
  sessions: readonly CompletedSession[],
  logs: readonly RetroLog[],
): ActivityRecord[] {
  return [
    ...sessions.map(
      (s): ActivityRecord => ({
        ...s,
        id: `session:${s.id}`,
        sourceId: s.id,
        source: "session",
        date: formatDate(new Date(s.completedAt)),
        durationSeconds: s.duration,
      }),
    ),
    ...logs.map(
      (l): ActivityRecord => ({
        ...l,
        id: `log:${l.id}`,
        sourceId: l.id,
        source: "log",
        durationSeconds: l.minutes * 60,
      }),
    ),
  ];
}
// Compare-and-replace protects undo and an open editor from overwriting newer edits.
export function replaceRecord<T extends { id: string }>(
  records: T[],
  id: string,
  expected: T | null,
  next: T | null,
  index = records.length,
): T[] | null {
  const current = records.find((r) => r.id === id) ?? null;
  if (JSON.stringify(current) !== JSON.stringify(expected)) return null;
  if (next && next.id !== id) return null;
  if (!current)
    return next
      ? [...records.slice(0, index), next, ...records.slice(index)]
      : records;
  return next
    ? records.map((r) => (r.id === id ? next : r))
    : records.filter((r) => r.id !== id);
}
export function durationLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m${remainder ? ` ${remainder}s` : ""}`;
}
export function validDuration(
  minutes: string,
  seconds: string,
  manual = false,
): number | null {
  if (!/^\d+$/.test(minutes) || !/^\d+$/.test(seconds)) return null;
  const m = Number(minutes),
    s = Number(seconds),
    total = m * 60 + s;
  return Number.isInteger(total) &&
    s < 60 &&
    total >= 60 &&
    total <= 43200 &&
    (!manual || s === 0)
    ? total
    : null;
}

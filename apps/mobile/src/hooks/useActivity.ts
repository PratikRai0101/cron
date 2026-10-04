import { useMemo } from "react";
import { formatDate } from "@monolith/shared";
import { useFocusStore, useLogStore } from "@/stores";
import type { Stratum } from "@/lib/strata";

export function useActivity() {
  const sessions = useFocusStore((s) => s.completedSessions);
  const logs = useLogStore((s) => s.retroLogs);

  return useMemo(() => {
    const byDate: Record<string, number> = {};
    const byIdentity: Record<string, number> = {};
    const byIdentityDate: Record<string, Record<string, number>> = {};
    const add = (date: string, identityId: string, minutes: number) => {
      byDate[date] = (byDate[date] || 0) + minutes;
      byIdentity[identityId] = (byIdentity[identityId] || 0) + minutes;
      const dates =
        byIdentityDate[identityId] ?? (byIdentityDate[identityId] = {});
      dates[date] = (dates[date] || 0) + minutes;
    };
    sessions.forEach((s) =>
      add(
        formatDate(new Date(s.completedAt)),
        s.identityId,
        Math.floor(s.duration / 60),
      ),
    );
    logs.forEach((l) => add(l.date, l.identityId, l.minutes));
    const strata: Stratum[] = [
      ...sessions.map((s) => ({
        id: s.id,
        minutes: Math.floor(s.duration / 60),
        date: formatDate(new Date(s.completedAt)),
        recordedAt: new Date(s.completedAt).getTime(),
        identityId: s.identityId,
      })),
      ...logs.map((l) => ({
        id: l.id,
        minutes: l.minutes,
        date: l.date,
        // Manual logs have a day, not a completion time. Put them before
        // timed sessions that day so a newly finished session lands on top.
        recordedAt: 0,
        identityId: l.identityId,
      })),
    ];
    return { byDate, byIdentity, byIdentityDate, sessions, logs, strata };
  }, [sessions, logs]);
}

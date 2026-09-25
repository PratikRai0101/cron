import { useMemo } from 'react';
import { formatDate } from '@monolith/shared';
import { useFocusStore, useLogStore } from '@/stores';

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
      const dates = byIdentityDate[identityId] ?? (byIdentityDate[identityId] = {});
      dates[date] = (dates[date] || 0) + minutes;
    };
    sessions.forEach((s) => add(formatDate(new Date(s.completedAt)), s.identityId, Math.floor(s.duration / 60)));
    logs.forEach((l) => add(l.date, l.identityId, l.minutes));
    return { byDate, byIdentity, byIdentityDate, sessions, logs };
  }, [sessions, logs]);
}

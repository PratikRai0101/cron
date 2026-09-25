function asDate(date: Date | string): Date {
  if (typeof date === 'string') {
    const calendarDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (calendarDate) {
      return new Date(
        Number(calendarDate[1]),
        Number(calendarDate[2]) - 1,
        Number(calendarDate[3])
      );
    }
  }
  return new Date(date);
}

export function formatDate(date: Date | string): string {
  const d = asDate(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(date: Date | string, days: number): Date {
  const d = asDate(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function startOfWeek(date: Date | string): Date {
  const d = asDate(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export function isSameDay(a: Date | string, b: Date | string): boolean {
  const da = asDate(a);
  const db = asDate(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

import { formatDate } from '@monolith/shared';

export interface DemoDayData {
  date: string;
  minutes: number;
}

export interface DemoTask {
  id: string;
  title: string;
  identityName: string;
  identityColor: string;
  completed: boolean;
  loggedMinutes?: number;
  estimatedMinutes?: number;
}

export interface DemoIdentity {
  id: string;
  name: string;
  color: string;
  totalMinutes: number;
}

export function generateDemoGridData(days: number = 140): DemoDayData[] {
  const data: DemoDayData[] = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = formatDate(date);

    // Random activity with some patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasActivity = Math.random() > (isWeekend ? 0.6 : 0.15);

    if (hasActivity) {
      const minutes = Math.floor(Math.random() * 120) + 15;
      data.push({ date: dateStr, minutes });
    }
  }

  return data;
}

export const demoIdentities: DemoIdentity[] = [
  { id: '1', name: 'Code', color: '#ffffff', totalMinutes: 7440 },
  { id: '2', name: 'Write', color: '#a3a3a3', totalMinutes: 5160 },
  { id: '3', name: 'Design', color: '#a855f7', totalMinutes: 3120 },
  { id: '4', name: 'Exercise', color: '#737373', totalMinutes: 1860 },
];

export const demoTasks: DemoTask[] = [
  {
    id: '1',
    title: 'Review pull requests',
    identityName: 'Code',
    identityColor: '#ffffff',
    completed: false,
    estimatedMinutes: 30,
  },
  {
    id: '2',
    title: 'Draft blog post on Rust concurrency',
    identityName: 'Write',
    identityColor: '#a3a3a3',
    completed: false,
    estimatedMinutes: 60,
  },
  {
    id: '3',
    title: 'Morning run — 5k',
    identityName: 'Exercise',
    identityColor: '#737373',
    completed: true,
    loggedMinutes: 35,
  },
  {
    id: '4',
    title: 'Design system audit',
    identityName: 'Design',
    identityColor: '#a855f7',
    completed: false,
    estimatedMinutes: 45,
  },
];

export function getTodayMinutes(data: DemoDayData[]): number {
  const today = formatDate(new Date());
  const entry = data.find((d) => d.date === today);
  if (entry) return entry.minutes;
  // Ensure today always has some demo activity
  return 35;
}

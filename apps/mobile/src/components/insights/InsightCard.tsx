import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { formatMinutes } from '@monolith/shared';

interface InsightCardProps {
  thisWeekMinutes: number;
  lastWeekMinutes: number;
}

export function InsightCard({ thisWeekMinutes, lastWeekMinutes }: InsightCardProps) {
  let body: string;
  let meta: string | null = null;

  if (thisWeekMinutes === 0) {
    body = 'No deep work logged this week yet.';
    meta = 'Start a focus session to see insights.';
  } else {
    body = `You've done ${formatMinutes(thisWeekMinutes)} of deep work this week.`;
    if (lastWeekMinutes > 0) {
      const delta = Math.round(((thisWeekMinutes - lastWeekMinutes) / lastWeekMinutes) * 100);
      if (delta >= 0) {
        meta = `That's ${delta}% more than last week.`;
      } else {
        meta = `That's ${Math.abs(delta)}% less than last week.`;
      }
    } else {
      meta = 'Your first week on record.';
    }
  }

  return (
    <Card className="mx-5 p-4">
      <Text className="text-caption text-text-secondary uppercase font-sans">INSIGHT</Text>
      <Text className="text-body text-text-primary font-sans mt-1">{body}</Text>
      {meta && (
        <Text className="text-body-sm text-text-tertiary font-sans mt-0.5">{meta}</Text>
      )}
    </Card>
  );
}

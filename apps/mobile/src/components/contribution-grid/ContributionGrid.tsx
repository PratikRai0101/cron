import { useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { GridCell } from './GridCell';
import { formatDate, getGridIntensity } from '@monolith/shared';
import type { GridIntensity } from '@monolith/shared';

interface DayData {
  date: string;
  minutes: number;
}

interface ContributionGridProps {
  data: DayData[];
  dailyGoal?: number;
  weeksToShow?: number;
  cellSize?: number;
  gap?: number;
  onCellPress?: (date: string, minutes: number) => void;
  onCellLongPress?: (date: string, minutes: number) => void;
}

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export function ContributionGrid({
  data,
  dailyGoal = 60,
  weeksToShow = 20,
  cellSize = 12,
  gap = 3,
  onCellPress,
  onCellLongPress,
}: ContributionGridProps) {
  const scrollRef = useRef<ScrollView>(null);
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - startDate.getDay() - (weeksToShow - 1) * 7);

  // Build a map for quick lookup
  const dataMap = new Map<string, number>();
  data.forEach((d) => dataMap.set(d.date, d.minutes));

  // Build weeks
  const weeks: { date: string; intensity: GridIntensity; isToday: boolean }[][] = [];
  let currentWeek: { date: string; intensity: GridIntensity; isToday: boolean }[] = [];

  const current = new Date(startDate);

  const totalDays = weeksToShow * 7;

  for (let i = 0; i < totalDays; i++) {
    const dateStr = formatDate(current);
    const minutes = dataMap.get(dateStr) || 0;
    const intensity = getGridIntensity(minutes, dailyGoal);
    const isToday = formatDate(today) === dateStr;

    currentWeek.push({ date: dateStr, intensity, isToday });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    current.setDate(current.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Month labels
  const monthLabelPositions: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (firstDay) {
      const d = new Date(`${firstDay.date}T12:00:00`);
      const month = d.getMonth();
      if (month !== lastMonth) {
        monthLabelPositions.push({ label: MONTH_LABELS[month], index: weekIndex });
        lastMonth = month;
      }
    }
  });

  return (
    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false}
      onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
      <View>
        {/* Month labels */}
        <View className="flex-row mb-1" style={{ paddingLeft: gap / 2 }}>
          {weeks.map((_, weekIndex) => {
            const label = monthLabelPositions.find((m) => m.index === weekIndex);
            return (
              <View
                key={`month-${weekIndex}`}
                style={{ width: cellSize + gap }}
                className="items-center"
              >
                {label && (
                  <Text className="text-[9px] font-mono text-text-secondary">
                    {label.label}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Grid */}
        <View className="flex-row">
          {weeks.map((week, weekIndex) => (
            <View key={`week-${weekIndex}`} className="flex-col">
              {week.map((day) => (
                <GridCell
                  key={day.date}
                  intensity={day.intensity}
                  isToday={day.isToday}
                  size={cellSize}
                  gap={gap}
                  date={day.date}
                  minutes={dataMap.get(day.date) || 0}
                  disabled={day.date > formatDate(today)}
                  onPress={onCellPress ? () => onCellPress(day.date, dataMap.get(day.date) || 0) : undefined}
                  onLongPress={onCellLongPress ? () => onCellLongPress(day.date, dataMap.get(day.date) || 0) : undefined}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

import { View, Pressable } from "react-native";
import { formatDate, getGridIntensity } from "@monolith/shared";
import { useColors } from "@/theme/ThemeContext";
interface HistoryGridProps {
  dates: Record<string, number>;
  goal: number;
  onDay: (date: string) => void;
}
export function HistoryGrid({ dates, goal, onDay }: HistoryGridProps) {
  const c = useColors();
  const now = new Date();
  const today = formatDate(now);
  const start = new Date(now);
  start.setDate(start.getDate() - start.getDay() - 25 * 7);
  return (
    <View
      className="flex-row "
      accessibilityLabel="26 weeks of focus history"
      style={{ gap: 3 }}
    >
      {Array.from({ length: 26 }, (_, week) => (
        <View key={week} className="flex-1 " style={{ gap: 3 }}>
          {Array.from({ length: 7 }, (_, day) => {
            const d = new Date(start);
            d.setDate(d.getDate() + week * 7 + day);
            const date = formatDate(d);
            const minutes = dates[date] ?? 0;
            return (
              <Pressable
                key={date}
                disabled={date > today}
                accessibilityRole="button"
                accessibilityLabel={`${date}, ${minutes} minutes${date === today ? ", today" : ""}`}
                onPress={() => onDay(date)}
                onLongPress={() => onDay(date)}
                className="h-[9px] rounded-[1px]"
                style={{
                  backgroundColor: c.grid[getGridIntensity(minutes, goal)],
                  opacity: date > today ? 0.3 : 1,
                  borderWidth: date === today ? 1 : 0,
                  borderColor: c.text,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

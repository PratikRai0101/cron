import { Pressable } from 'react-native';
import { getGridColor } from '@monolith/shared';
import type { GridIntensity } from '@monolith/shared';

interface GridCellProps {
  intensity: GridIntensity;
  date: string;
  minutes: number;
  disabled?: boolean;
  isToday?: boolean;
  size?: number;
  gap?: number;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function GridCell({
  intensity,
  date,
  minutes,
  disabled = false,
  isToday = false,
  size = 12,
  gap = 3,
  onPress,
  onLongPress,
}: GridCellProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${date}, ${minutes} minutes of focus${isToday ? ', today' : ''}`}
      disabled={disabled || (!onPress && !onLongPress)}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        width: size,
        height: size,
        margin: gap / 2,
        borderRadius: 2,
        backgroundColor: getGridColor(intensity),
        borderWidth: isToday ? 1 : intensity === 0 ? 0.5 : 0,
        borderColor: isToday ? '#ffffff' : '#303030',
      }}
    />
  );
}

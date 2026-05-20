import { Pressable } from 'react-native';
import { getGridColor } from '@monolith/shared';
import type { GridIntensity } from '@monolith/shared';

interface GridCellProps {
  intensity: GridIntensity;
  isToday?: boolean;
  size?: number;
  gap?: number;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function GridCell({
  intensity,
  isToday = false,
  size = 12,
  gap = 3,
  onPress,
  onLongPress,
}: GridCellProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        width: size,
        height: size,
        margin: gap / 2,
        borderRadius: 2,
        backgroundColor: getGridColor(intensity),
        borderWidth: isToday ? 1 : 0,
        borderColor: '#ffffff',
      }}
    />
  );
}

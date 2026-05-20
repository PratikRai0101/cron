import { View, Text } from 'react-native';
import { formatDuration } from '@monolith/shared';

interface TimerProps {
  seconds: number;
  size?: 'large' | 'medium' | 'small';
  paused?: boolean;
}

export function Timer({ seconds, size = 'large', paused = false }: TimerProps) {
  const sizeClasses = {
    large: 'text-display font-mono',
    medium: 'text-mono-lg font-mono',
    small: 'text-mono-md font-mono',
  };

  return (
    <View className="items-center">
      <Text
        className={`${sizeClasses[size]} text-text-primary tabular-nums`}
        style={paused ? { opacity: 0.5 } : undefined}
      >
        {formatDuration(seconds)}
      </Text>
      {paused && (
        <Text className="text-caption text-text-tertiary uppercase mt-2 font-sans">
          Paused
        </Text>
      )}
    </View>
  );
}

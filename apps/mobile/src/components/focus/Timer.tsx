import { View, Text } from 'react-native';


interface TimerProps {
  seconds: number;
  size?: 'large' | 'medium' | 'small';
  paused?: boolean;
}

export function Timer({ seconds, size = 'large', paused = false }: TimerProps) {
  const sizeClasses = {
    large: 'text-[36px] font-mono',
    medium: 'text-mono-lg font-mono',
    small: 'text-mono-md font-mono',
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const value = [hours, minutes, secs].map((n) => String(n).padStart(2, '0')).join(':');

  return (
    <View className="items-center">
      <Text
        className={`${sizeClasses[size]} text-text-primary tabular-nums`}
        style={paused ? { opacity: 0.5 } : undefined}
      >
        {value}
      </Text>
      {paused && (
        <Text className="text-caption text-text-tertiary uppercase mt-2 font-sans">
          Paused
        </Text>
      )}
      {!paused && <View className="mt-2 h-[12px]" />}
    </View>
  );
}

import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, className = '', elevated = false, style }: CardProps) {
  const baseClass = 'rounded-monolith border border-border-subtle';
  const bgClass = elevated ? 'bg-surface-elevated' : 'bg-surface';

  return (
    <View className={`${baseClass} ${bgClass} ${className}`} style={[{ padding: 16 }, style]}>
      {children}
    </View>
  );
}

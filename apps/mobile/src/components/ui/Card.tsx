import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className = '', elevated = false }: CardProps) {
  const baseClass = 'rounded-monolith border border-border-subtle';
  const bgClass = elevated ? 'bg-surface-elevated' : 'bg-surface';

  return (
    <View className={`${baseClass} ${bgClass} ${className}`}>
      {children}
    </View>
  );
}

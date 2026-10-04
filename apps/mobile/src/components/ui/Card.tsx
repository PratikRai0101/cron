import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({
  children,
  className = "",
  elevated = false,
  style,
}: CardProps) {
  const baseClass = "border-b border-border dark:border-dark-rule";
  const bgClass = elevated
    ? "bg-surface dark:bg-dark-surface"
    : "bg-transparent";

  return (
    <View
      className={`${baseClass} ${bgClass} ${className}`}
      style={[{ padding: 16 }, style]}
    >
      {children}
    </View>
  );
}

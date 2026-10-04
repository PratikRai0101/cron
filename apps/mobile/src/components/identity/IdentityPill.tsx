import { MotionPressable } from "@/components/strata/MotionPressable";
import { Text } from "react-native";
import { useColors } from "@/theme/ThemeContext";
interface IdentityPillProps {
  name: string;
  color?: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}
export function IdentityPill({
  name,
  active = false,
  onPress,
  className = "",
}: IdentityPillProps) {
  const c = useColors();
  return (
    <MotionPressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityLabel={name}
      accessibilityState={onPress ? { selected: active } : undefined}
      className={`rounded-full min-h-[44px] px-3 items-center justify-center ${className}`}
      style={{ backgroundColor: active ? c.text : "transparent" }}
    >
      <Text
        className="text-[15px]"
        style={{ color: active ? c.background : c.text }}
      >
        {name}
      </Text>
    </MotionPressable>
  );
}

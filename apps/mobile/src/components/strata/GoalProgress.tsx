import { Animated, View } from "react-native";
import { useSpringValue } from "@/hooks/useMotion";
import { useColors } from "@/theme/ThemeContext";
export function GoalProgress({
  minutes,
  goal,
}: {
  minutes: number;
  goal: number;
}) {
  const c = useColors();
  const progress = useSpringValue(
    Math.max(0, Math.min(minutes / Math.max(goal, 1), 1)),
  );
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Daily goal progress"
      accessibilityValue={{ min: 0, max: goal, now: Math.min(minutes, goal) }}
      style={{ height: 3, width: "100%", overflow: "hidden" }}
    >
      <Animated.View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: c.primary,
          transformOrigin: "left center",
          transform: [{ scaleX: progress }],
        }}
      />
    </View>
  );
}

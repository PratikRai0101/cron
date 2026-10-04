import { useState } from "react";
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
  const [width, setWidth] = useState(0);
  const progress = useSpringValue(
    Math.max(0, Math.min(minutes / Math.max(goal, 1), 1)),
  );
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Daily goal progress"
      accessibilityValue={{ min: 0, max: goal, now: Math.min(minutes, goal) }}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ height: 3, width: "100%", overflow: "hidden" }}
    >
      <Animated.View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: c.primary,
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-width / 2, 0],
              }),
            },
            { scaleX: progress },
          ],
        }}
      />
    </View>
  );
}

import * as Haptics from "expo-haptics";
import { MotionPressable } from "@/components/strata/MotionPressable";
import { useReducedMotion, useSpringValue } from "@/hooks/useMotion";
import { Animated, Text, View } from "react-native";
import { formatMinutes } from "@monolith/shared";
import { useColors } from "@/theme/ThemeContext";
import { Icon } from "@/components/strata/Icon";
interface TaskRowProps {
  title: string;
  identityName: string;
  identityColor?: string;
  completed?: boolean;
  loggedMinutes?: number;
  estimatedMinutes?: number;
  metadata?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onLogTime?: () => void;
  onToggleComplete?: () => void;
}
export function TaskRow({
  title,
  identityName,
  completed = false,
  loggedMinutes,
  estimatedMinutes,
  metadata,
  onPress,
  onLongPress,
  onLogTime,
  onToggleComplete,
}: TaskRowProps) {
  const c = useColors();
  const reduced = useReducedMotion();
  const check = useSpringValue(completed ? 1 : 0);
  const minutes = loggedMinutes ?? estimatedMinutes;
  return (
    <View className="flex-row items-center border-b border-border dark:border-dark-rule min-h-[72px]">
      <MotionPressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        aria-checked={completed}
        accessibilityLabel={`Complete ${title}`}
        onPress={() => {
          if (!onToggleComplete) return;
          onToggleComplete();
          if (!completed && !reduced)
            void Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success,
            ).catch(() => {});
        }}
        className="w-11 h-11 justify-center"
      >
        <View
          className="w-[18px] h-[18px] rounded-full border items-center justify-center"
          style={{
            borderColor: c.secondaryText,
            backgroundColor: completed ? c.primary : "transparent",
          }}
        >
          <Animated.View
            pointerEvents="none"
            style={{
              opacity: check,
              transform: [
                {
                  scale: check.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.65, 1],
                  }),
                },
              ],
            }}
          >
            <Icon name="check" color={c.onPrimary} size={12} />
          </Animated.View>
        </View>
      </MotionPressable>
      <MotionPressable
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${identityName}. Tap to focus, hold to manage`}
        onPress={onPress}
        onLongPress={onLongPress}
        className="flex-1 py-3 pr-2 min-h-[44px]"
      >
        <Text
          className={`text-[15px] ${completed ? "text-text-secondary dark:text-dark-muted line-through" : "text-text-primary dark:text-dark-ink"}`}
        >
          {title}
        </Text>
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-1">
          {identityName}
          {metadata ? ` · ${metadata}` : ""}
        </Text>
      </MotionPressable>
      <MotionPressable
        accessibilityRole="button"
        accessibilityLabel={`Log time for ${title}`}
        onPress={onLogTime}
        className="min-w-[44px] min-h-[44px] items-end justify-center"
      >
        <Text className="text-[13px] text-text-primary dark:text-dark-ink">
          {minutes !== undefined ? formatMinutes(minutes) : "Log"}
        </Text>
      </MotionPressable>
    </View>
  );
}

import { Pressable, Text, View } from "react-native";
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
  const minutes = loggedMinutes ?? estimatedMinutes;
  return (
    <View className="flex-row items-center border-b border-border dark:border-dark-rule min-h-[72px]">
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        accessibilityLabel={`Complete ${title}`}
        onPress={onToggleComplete}
        className="w-11 h-11 justify-center"
      >
        <View
          className="w-[18px] h-[18px] rounded-full border items-center justify-center"
          style={{
            borderColor: c.secondaryText,
            backgroundColor: completed ? c.primary : "transparent",
          }}
        >
          {completed && <Icon name="check" color={c.onPrimary} size={12} />}
        </View>
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Log time for ${title}`}
        onPress={onLogTime}
        className="min-w-[44px] min-h-[44px] items-end justify-center"
      >
        <Text className="text-[13px] text-text-primary dark:text-dark-ink">
          {minutes !== undefined ? formatMinutes(minutes) : "Log"}
        </Text>
      </Pressable>
    </View>
  );
}

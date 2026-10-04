import { Text, View } from "react-native";
import { useActivityUndoStore } from "@/stores/activityUndoStore";
import { MotionPressable } from "./MotionPressable";
export function UndoNotice() {
  const { message, undo, restore, dismiss } = useActivityUndoStore();
  if (!message) return null;
  return (
    <View
      className="flex-row flex-wrap items-center border-b border-border dark:border-dark-rule mb-4"
      style={{ gap: 8 }}
    >
      <Text
        accessibilityLiveRegion="polite"
        className="flex-1 text-[13px] text-text-primary dark:text-dark-ink"
      >
        {message}
      </Text>
      <MotionPressable
        accessibilityRole="button"
        accessibilityLabel={
          undo ? "Undo last record change" : "Dismiss feedback"
        }
        onPress={undo ? restore : dismiss}
        className="min-h-[44px] justify-center px-2"
      >
        <Text className="text-[15px] font-semibold text-accent dark:text-dark-accent">
          {undo ? "Undo" : "Dismiss"}
        </Text>
      </MotionPressable>
    </View>
  );
}

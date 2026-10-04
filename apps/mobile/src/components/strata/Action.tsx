import { Pressable, Text } from "react-native";
interface ActionProps {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}
export function Action({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: ActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[52px] flex-1 rounded-full items-center justify-center px-4 ${secondary ? "bg-surface dark:bg-dark-surface border border-border dark:border-dark-rule" : "bg-accent dark:bg-dark-accent"} ${disabled ? "opacity-40" : ""}`}
    >
      <Text
        className={`text-[17px] font-semibold ${secondary ? "text-text-primary dark:text-dark-ink" : "text-text-inverse dark:text-dark-on-accent"}`}
      >
        {title}
      </Text>
    </Pressable>
  );
}

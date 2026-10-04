import { useColors } from "@/theme/ThemeContext";
import { TextInput, TextInputProps, View, Text } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
}

export function Input({
  label,
  error,
  containerClassName = "",
  className = "",
  ...props
}: InputProps) {
  const c = useColors();
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="text-caption text-text-secondary dark:text-dark-muted uppercase mb-2 ">
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        style={[{ minHeight: 48 }, props.style]}
        placeholderTextColor={c.tertiaryText}
        className={`bg-surface dark:bg-dark-surface border border-border dark:border-dark-rule rounded-monolith px-4 py-3 text-body text-text-primary dark:text-dark-ink  focus:border-accent ${className}`}
      />
      {error && (
        <Text className="text-caption text-error dark:text-[#F2A6A6] mt-1 ">
          {error}
        </Text>
      )}
    </View>
  );
}

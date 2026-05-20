import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
}

export function Input({
  label,
  error,
  containerClassName = '',
  className = '',
  ...props
}: InputProps) {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="text-caption text-text-secondary uppercase mb-2 font-sans">
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        placeholderTextColor="#525252"
        className={`bg-surface border border-border rounded-monolith px-4 py-3 text-body text-text-primary font-sans focus:border-accent ${className}`}
      />
      {error && (
        <Text className="text-caption text-error mt-1 font-sans">{error}</Text>
      )}
    </View>
  );
}

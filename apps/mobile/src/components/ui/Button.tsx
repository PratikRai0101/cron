import { Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  title,
  variant = 'primary',
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
}: ButtonProps) {
  const baseClass = 'rounded-monolith px-5 py-3 items-center justify-center active:scale-[0.97]';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-accent active:bg-accent-hover',
    secondary: 'bg-surface border border-border',
    ghost: 'bg-transparent',
    destructive: 'bg-error/10 border border-error/20',
  };

  const textBase = 'font-sans font-semibold';
  const textClasses: Record<ButtonVariant, string> = {
    primary: 'text-text-inverse',
    secondary: 'text-text-primary',
    ghost: 'text-text-secondary active:text-text-primary',
    destructive: 'text-error',
  };

  const combinedClass = `${baseClass} ${variantClasses[variant]} ${disabled ? 'opacity-40' : ''} ${className}`;
  const combinedTextClass = `${textBase} ${textClasses[variant]} ${textClassName}`;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={combinedClass}
    >
      <Text className={combinedTextClass}>{title}</Text>
    </Pressable>
  );
}

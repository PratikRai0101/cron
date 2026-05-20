import { Pressable, Text } from 'react-native';

interface PillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
  className?: string;
}

export function Pill({ label, active = false, onPress, color, className = '' }: PillProps) {
  const borderColor = color ? `${color}4D` : active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)';
  const textColor = color || (active ? '#ffffff' : '#737373');
  const bgColor = active && color ? `${color}26` : active ? 'rgba(255,255,255,0.15)' : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-3 py-1 border items-center justify-center active:scale-[0.97] ${className}`}
      style={{
        borderColor,
        backgroundColor: bgColor,
      }}
    >
      <Text
        className="text-caption uppercase font-sans"
        style={{ color: textColor }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

import { Pressable, Text } from 'react-native';

interface IdentityPillProps {
  name: string;
  color?: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}

export function IdentityPill({
  name,
  color = '#ffffff',
  active = false,
  onPress,
  className = '',
}: IdentityPillProps) {
  const borderColor = `${color}4D`;
  const bgColor = active ? `${color}26` : 'transparent';

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
        style={{ color: active ? color : '#737373' }}
      >
        {name}
      </Text>
    </Pressable>
  );
}

import { Pressable, Text, View } from 'react-native';
import { IdentityPill } from '@/components/identity';
import { formatMinutes } from '@monolith/shared';

interface TaskRowProps {
  title: string;
  identityName: string;
  identityColor?: string;
  completed?: boolean;
  loggedMinutes?: number;
  estimatedMinutes?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  onLogTime?: () => void;
  onToggleComplete?: () => void;
}

export function TaskRow({
  title,
  identityName,
  identityColor = '#ffffff',
  completed = false,
  loggedMinutes,
  estimatedMinutes,
  onPress,
  onLongPress,
  onLogTime,
  onToggleComplete,
}: TaskRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${identityName}${completed ? ', completed' : ''}. Tap to focus, long press to delete`}
      className="flex-row items-center py-3 border-b border-border-subtle active:bg-surface"
    >
      {/* Checkbox */}
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onToggleComplete?.();
        }}
        className="w-5 h-5 rounded-monolith border-2 items-center justify-center mr-3"
        style={{
          borderColor: completed ? '#ffffff' : '#262626',
          backgroundColor: completed ? '#ffffff' : 'transparent',
        }}
      >
        {completed && (
          <Text className="text-text-inverse text-[10px] font-mono">✓</Text>
        )}
      </Pressable>

      {/* Content */}
      <View className="flex-1">
        <Text
          className={`text-body font-sans ${completed ? 'text-text-tertiary line-through' : 'text-text-primary'}`}
        >
          {title}
        </Text>
        <View className="mt-1">
          <IdentityPill name={identityName} color={identityColor} className="self-start" />
        </View>
      </View>

      {onLogTime && (
        <Pressable onPress={(event) => { event.stopPropagation(); onLogTime(); }}
          accessibilityRole="button" accessibilityLabel={`Log time for ${title}`} hitSlop={8}
          className="w-11 h-11 items-center justify-center">
          <Text className="text-text-secondary text-base font-mono">◷</Text>
        </Pressable>
      )}
      {/* Duration */}
      <View className="items-end">
        {loggedMinutes !== undefined && (
          <Text className="text-mono-sm text-text-tertiary font-mono">
            {formatMinutes(loggedMinutes)}
          </Text>
        )}
        {estimatedMinutes !== undefined && loggedMinutes === undefined && (
          <Text className="text-mono-sm text-text-tertiary font-mono">
            {formatMinutes(estimatedMinutes)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

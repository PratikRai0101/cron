import { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/stores';

export default function DoneScreen() {
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const handleStart = useCallback(() => {
    setOnboarded(true);
    router.replace('/(tabs)/grid');
  }, [setOnboarded]);

  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 items-center">
        <View className="flex-row gap-1.5">
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-accent" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary font-sans text-center">You're all set</Text>
      <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px]">
        Start tracking your deep work, building momentum, and leveling up your skills.
      </Text>

      <Pressable
        onPress={handleStart}
        className="mt-10 bg-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse font-sans font-semibold text-body">Start Tracking</Text>
      </Pressable>
    </View>
  );
}

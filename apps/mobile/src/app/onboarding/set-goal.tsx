import { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useUserStore } from '@/stores';

export default function SetGoalScreen() {
  const [goal, setGoal] = useState(60);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);

  const adjustGoal = useCallback((delta: number) => {
    setGoal((g) => Math.max(15, Math.min(480, g + delta)));
  }, []);

  const handleNext = useCallback(() => {
    setDailyGoal(goal);
    router.replace('/onboarding/pick-identities');
  }, [goal, setDailyGoal]);

  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 items-center">
        <View className="flex-row gap-1.5">
          <View className="w-2 h-2 rounded-full bg-accent" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary font-sans text-center">Set your daily goal</Text>
      <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px]">
        How many focused minutes per day?
      </Text>

      <View className="flex-row items-center justify-center mt-10 gap-8">
        <Pressable
          onPress={() => adjustGoal(-15)}
          className="w-12 h-12 rounded-full border border-border items-center justify-center active:opacity-70"
        >
          <Text className="text-text-primary text-xl font-mono">−</Text>
        </Pressable>
        <View className="items-center">
          <Text className="text-display text-text-primary font-mono">{goal}</Text>
          <Text className="text-caption text-text-tertiary uppercase font-sans mt-1">min/day</Text>
        </View>
        <Pressable
          onPress={() => adjustGoal(15)}
          className="w-12 h-12 rounded-full border border-border items-center justify-center active:opacity-70"
        >
          <Text className="text-text-primary text-xl font-mono">+</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleNext}
        className="mt-12 bg-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse font-sans font-semibold text-body">Continue</Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace('/onboarding/pick-identities')}
        className="mt-4"
      >
        <Text className="text-caption text-text-tertiary font-sans">Skip</Text>
      </Pressable>
    </View>
  );
}

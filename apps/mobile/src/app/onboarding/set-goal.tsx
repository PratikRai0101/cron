import { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@/stores";

export default function SetGoalScreen() {
  const [goal, setGoal] = useState(60);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);

  const adjustGoal = useCallback((delta: number) => {
    setGoal((g) => Math.max(15, Math.min(240, g + delta)));
  }, []);

  const handleNext = useCallback(() => {
    setDailyGoal(goal);
    router.replace("/onboarding/pick-identities");
  }, [goal, setDailyGoal]);

  return (
    <View className="flex-1 bg-background dark:bg-dark-ground items-center justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 items-center">
        <View className="flex-row " style={{ gap: 6 }}>
          <View className="w-2 h-2 rounded-full bg-accent dark:bg-dark-accent" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary dark:text-dark-ink  text-center">
        Set your daily goal
      </Text>
      <Text className="text-body text-text-secondary dark:text-dark-muted  text-center mt-3 max-w-[280px]">
        How many focused minutes per day?
      </Text>

      <View
        className="flex-row items-center justify-center mt-10 "
        style={{ gap: 32 }}
      >
        <Pressable
          onPress={() => adjustGoal(-15)}
          accessibilityRole="button"
          accessibilityLabel="Decrease daily goal by 15 minutes"
          accessibilityState={{ disabled: goal <= 15 }}
          disabled={goal <= 15}
          className="w-12 h-12 rounded-full border border-border dark:border-dark-rule items-center justify-center active:opacity-70"
        >
          <Text className="text-text-primary dark:text-dark-ink text-xl ">
            −
          </Text>
        </Pressable>
        <View className="items-center">
          <Text className="text-display text-text-primary dark:text-dark-ink ">
            {goal}
          </Text>
          <Text className="text-caption text-text-secondary dark:text-dark-muted uppercase  mt-1">
            min/day
          </Text>
        </View>
        <Pressable
          onPress={() => adjustGoal(15)}
          accessibilityRole="button"
          accessibilityLabel="Increase daily goal by 15 minutes"
          accessibilityState={{ disabled: goal >= 240 }}
          disabled={goal >= 240}
          className="w-12 h-12 rounded-full border border-border dark:border-dark-rule items-center justify-center active:opacity-70"
        >
          <Text className="text-text-primary dark:text-dark-ink text-xl ">
            +
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleNext}
        className="mt-12 bg-accent dark:bg-dark-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold text-body">
          Continue
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace("/onboarding/pick-identities")}
        className="mt-4"
      >
        <Text className="text-caption text-text-tertiary dark:text-dark-tertiary ">
          Skip
        </Text>
      </Pressable>
    </View>
  );
}

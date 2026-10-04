import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useAppStore } from "@/stores";

export default function DoneScreen() {
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const handleStart = useCallback(() => {
    setOnboarded(true);
    router.replace("/(tabs)/grid");
  }, [setOnboarded]);

  return (
    <View className="flex-1 bg-background dark:bg-dark-ground items-center justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 items-center">
        <View className="flex-row " style={{ gap: 6 }}>
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-accent dark:bg-dark-accent" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary dark:text-dark-ink  text-center">
        You&apos;re all set
      </Text>
      <Text className="text-body text-text-secondary dark:text-dark-muted  text-center mt-3 max-w-[280px]">
        Start tracking your deep work, building momentum, and leveling up your
        skills.
      </Text>

      <Pressable
        onPress={handleStart}
        className="mt-10 bg-accent dark:bg-dark-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold text-body">
          Start Tracking
        </Text>
      </Pressable>
    </View>
  );
}

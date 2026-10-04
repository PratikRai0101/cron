import { Specimen } from "@/components/strata/Specimen";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useAppStore, useIdentityStore } from "@/stores";

export default function OnboardingScreen() {
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const seedFromPresets = useIdentityStore((s) => s.seedFromPresets);
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground items-center justify-center px-5">
      <View className="w-full mb-8">
        <Specimen height={140} empty />
      </View>
      <Text className="text-h1 text-text-primary dark:text-dark-ink  text-center">
        Track what matters.
      </Text>
      <Text className="text-body text-text-secondary dark:text-dark-muted  text-center mt-3 max-w-[280px]">
        A competence tracker for people who do deep work.
      </Text>
      <Pressable
        onPress={() => router.replace("/onboarding/set-goal")}
        className="mt-10 bg-accent dark:bg-dark-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold text-body">
          Get Started
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          seedFromPresets([
            { id: "1", name: "Focus", color: "#ffffff", totalMinutes: 0 },
          ]);
          setOnboarded(true);
          router.replace("/(tabs)/grid");
        }}
        accessibilityRole="button"
        accessibilityLabel="Skip setup"
        className="mt-4 px-6 py-3"
      >
        <Text className="text-body-sm text-text-secondary dark:text-dark-muted">
          Skip setup
        </Text>
      </Pressable>
    </View>
  );
}

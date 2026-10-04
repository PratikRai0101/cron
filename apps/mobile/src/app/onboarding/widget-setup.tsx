import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function WidgetSetupScreen() {
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground items-center justify-center px-5">
      <Text className="text-h1 text-text-primary dark:text-dark-ink  text-center">
        Widgets are coming later
      </Text>
      <Text className="text-body text-text-secondary dark:text-dark-muted  text-center mt-3 max-w-[280px]">
        For now, your grid and daily progress are available in the app.
      </Text>
      <Pressable
        onPress={() => router.replace("/onboarding/done")}
        accessibilityRole="button"
        accessibilityLabel="Continue onboarding"
        className="mt-10 bg-accent dark:bg-dark-accent px-8 py-3 rounded-monolith"
      >
        <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold text-body">
          Continue
        </Text>
      </Pressable>
    </View>
  );
}

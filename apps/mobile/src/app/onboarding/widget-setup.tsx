import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function WidgetSetupScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      <Text className="text-h1 text-text-primary font-sans text-center">Widgets are coming later</Text>
      <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px]">
        For now, your grid and daily progress are available in the app.
      </Text>
      <Pressable onPress={() => router.replace('/onboarding/done')} accessibilityRole="button" accessibilityLabel="Continue onboarding"
        className="mt-10 bg-accent px-8 py-3 rounded-monolith">
        <Text className="text-text-inverse font-sans font-semibold text-body">Continue</Text>
      </Pressable>
    </View>
  );
}

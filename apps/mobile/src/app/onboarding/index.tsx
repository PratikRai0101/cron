import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      <Text className="text-h1 text-text-primary font-sans text-center">Track what matters.</Text>
      <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px]">
        A competence tracker for people who do deep work.
      </Text>
      <Pressable
        onPress={() => router.replace('/(tabs)/grid')}
        className="mt-10 bg-accent px-8 py-3 rounded-monolith active:scale-[0.97]"
      >
        <Text className="text-text-inverse font-sans font-semibold text-body">Get Started</Text>
      </Pressable>
    </View>
  );
}

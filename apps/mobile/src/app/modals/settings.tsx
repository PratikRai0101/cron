import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/ui';
import { useUserStore } from '@/stores';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const dailyGoalMinutes = useUserStore((s) => s.dailyGoalMinutes);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);
  const adjustGoal = (delta: number) => setDailyGoal(Math.max(15, Math.min(240, dailyGoalMinutes + delta)));

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="px-5" contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }}>
        <Text className="text-h2 text-text-primary font-sans mb-6">Settings</Text>
        <Card className="p-4 mb-4">
          <Text className="text-h3 text-text-primary font-sans mb-4">Daily Goal</Text>
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => adjustGoal(-15)} disabled={dailyGoalMinutes <= 15} accessibilityRole="button" accessibilityLabel="Decrease daily goal"
              className="w-11 h-11 rounded-full border border-border items-center justify-center"><Text className="text-text-primary text-lg font-mono">−</Text></Pressable>
            <View className="items-center"><Text className="text-display text-text-primary font-mono">{dailyGoalMinutes}</Text><Text className="text-caption text-text-tertiary uppercase font-sans">minutes / day</Text></View>
            <Pressable onPress={() => adjustGoal(15)} disabled={dailyGoalMinutes >= 240} accessibilityRole="button" accessibilityLabel="Increase daily goal"
              className="w-11 h-11 rounded-full border border-border items-center justify-center"><Text className="text-text-primary text-lg font-mono">+</Text></Pressable>
          </View>
        </Card>
        <Card className="p-4 mb-8">
          <Text className="text-h3 text-text-primary font-sans mb-2">About</Text>
          <View className="flex-row items-center justify-between py-1"><Text className="text-body-sm text-text-secondary font-sans">Version</Text><Text className="text-body-sm text-text-primary font-mono">0.1.0</Text></View>
          <Text className="text-body-sm text-text-secondary font-sans mt-3">Your activity is stored on this device. Sync and export are not available yet.</Text>
        </Card>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close settings"
          className="py-3 rounded-monolith border border-border items-center"><Text className="text-text-primary font-sans font-semibold">Close</Text></Pressable>
      </ScrollView>
    </View>
  );
}

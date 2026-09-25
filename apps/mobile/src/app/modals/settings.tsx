import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/ui';
import { useAppStore, useFocusStore, useIdentityStore, useLogStore, useTaskStore, useUserStore } from '@/stores';
import { File, Paths } from 'expo-file-system';
import { isAvailableAsync, shareAsync } from 'expo-sharing';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);
  const dailyGoalMinutes = useUserStore((s) => s.dailyGoalMinutes);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);
  const adjustGoal = (delta: number) => setDailyGoal(Math.max(15, Math.min(240, dailyGoalMinutes + delta)));

  const exportData = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const payload = {
        format: 'monolith-export-v1',
        exportedAt: new Date().toISOString(),
        dailyGoalMinutes: useUserStore.getState().dailyGoalMinutes,
        identities: useIdentityStore.getState().identities,
        tasks: useTaskStore.getState().tasks,
        focusSessions: useFocusStore.getState().completedSessions,
        retroLogs: useLogStore.getState().retroLogs,
      };
      const file = new File(Paths.cache, `monolith-export-${Date.now()}.json`);
      file.create({ overwrite: true });
      file.write(JSON.stringify(payload, null, 2));
      if (!(await isAvailableAsync())) throw new Error('File sharing is unavailable on this device.');
      await shareAsync(file.uri, { mimeType: 'application/json', UTI: 'public.json', dialogTitle: 'Export Monolith data' });
    } catch (error) {
      Alert.alert('Export failed', error instanceof Error ? error.message : 'Your data could not be exported.');
    } finally {
      setBusy(false);
    }
  };

  const confirmDeleteData = () => Alert.alert('Delete all local data?', 'This permanently removes your identities, tasks, focus sessions, logs, and settings from this device.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete all data', style: 'destructive', onPress: () => {
      useIdentityStore.setState({ identities: [] });
      useTaskStore.setState({ tasks: [] });
      useFocusStore.setState({ isActive: false, isPaused: false, elapsedSeconds: 0, currentIdentityId: null, currentTaskId: null, startTime: null, accumulatedSeconds: 0, completedSessions: [] });
      useLogStore.setState({ retroLogs: [] });
      useUserStore.getState().clearUser();
      setDailyGoal(60);
      useAppStore.getState().setOnboarded(false);
      router.replace('/onboarding');
    } },
  ]);

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
        <Card className="mb-4">
          <Text className="text-h3 text-text-primary font-sans mb-3">Data</Text>
          <Pressable onPress={exportData} disabled={busy} accessibilityRole="button" accessibilityLabel="Export local data as JSON" className="py-3 border-b border-border-subtle">
            <Text className="text-body text-text-primary font-sans">{busy ? 'Preparing export…' : 'Export data as JSON'}</Text>
            <Text className="text-body-sm text-text-secondary font-sans mt-1">Share a copy of your identities, tasks, sessions, and logs.</Text>
          </Pressable>
          <Pressable onPress={confirmDeleteData} accessibilityRole="button" accessibilityLabel="Delete all local data" className="py-3">
            <Text className="text-body text-error font-sans">Delete all local data</Text>
          </Pressable>
        </Card>
        <Card className="mb-8">
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

import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/ui';
import { useUserStore } from '@/stores';

const ACCENT_COLORS = [
  { key: 'lime', color: '#ccff00', label: 'Lime' },
  { key: 'cyan', color: '#00e5ff', label: 'Cyan' },
  { key: 'coral', color: '#ff6b6b', label: 'Coral' },
] as const;

export default function SettingsScreen() {
  const dailyGoalMinutes = useUserStore((s) => s.dailyGoalMinutes);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);
  const accentColor = useUserStore((s) => s.accentColor);
  const setAccentColor = useUserStore((s) => s.setAccentColor);
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);

  const adjustGoal = (delta: number) => {
    const newVal = Math.max(15, Math.min(480, dailyGoalMinutes + delta));
    setDailyGoal(newVal);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-end">
        {/* Drag handle */}
        <View className="items-center py-3">
          <View className="w-10 h-1 rounded-full bg-border" />
        </View>

        <ScrollView className="px-5 pb-8">
          <Text className="text-h2 text-text-primary font-sans mb-6">Settings</Text>

          {/* Daily Goal */}
          <Card className="p-4 mb-4">
            <Text className="text-h3 text-text-primary font-sans mb-4">Daily Goal</Text>
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => adjustGoal(-15)}
                className="w-10 h-10 rounded-full border border-border items-center justify-center active:opacity-70"
              >
                <Text className="text-text-primary text-lg font-mono">−</Text>
              </Pressable>
              <View className="items-center">
                <Text className="text-display text-text-primary font-mono">
                  {dailyGoalMinutes}
                </Text>
                <Text className="text-caption text-text-tertiary uppercase font-sans">
                  minutes / day
                </Text>
              </View>
              <Pressable
                onPress={() => adjustGoal(15)}
                className="w-10 h-10 rounded-full border border-border items-center justify-center active:opacity-70"
              >
                <Text className="text-text-primary text-lg font-mono">+</Text>
              </Pressable>
            </View>
          </Card>

          {/* Accent Color */}
          <Card className="p-4 mb-4">
            <Text className="text-h3 text-text-primary font-sans mb-4">Accent Color</Text>
            <View className="flex-row gap-4 justify-center">
              {ACCENT_COLORS.map((c) => (
                <Pressable
                  key={c.key}
                  onPress={() => setAccentColor(c.key)}
                  className="items-center gap-2"
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: c.color,
                      borderWidth: accentColor === c.key ? 3 : 0,
                      borderColor: '#ffffff',
                    }}
                  >
                    {accentColor === c.key && (
                      <Text className="text-text-inverse text-lg font-mono">✓</Text>
                    )}
                  </View>
                  <Text className="text-caption text-text-tertiary font-sans">{c.label}</Text>
                </Pressable>
              ))}
            </View>
          </Card>

          {/* Subscription */}
          <Card className="p-4 mb-4">
            <Text className="text-h3 text-text-primary font-sans mb-2">Subscription</Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-body text-text-primary font-sans capitalize">
                  {subscriptionTier}
                </Text>
                <Text className="text-body-sm text-text-secondary font-sans mt-0.5">
                  {subscriptionTier === 'free'
                    ? '1 identity · 30 days history'
                    : subscriptionTier === 'pro'
                      ? 'Unlimited identities · Full history'
                      : 'Teams, challenges, and more'}
                </Text>
              </View>
              {subscriptionTier === 'free' && (
                <Pressable className="bg-accent px-4 py-2 rounded-monolith active:opacity-70">
                  <Text className="text-text-inverse text-body-sm font-semibold font-sans">
                    Upgrade
                  </Text>
                </Pressable>
              )}
            </View>
          </Card>

          {/* About */}
          <Card className="p-4 mb-8">
            <Text className="text-h3 text-text-primary font-sans mb-2">About</Text>
            <View className="flex-row items-center justify-between py-1">
              <Text className="text-body-sm text-text-secondary font-sans">Version</Text>
              <Text className="text-body-sm text-text-primary font-mono">0.1.0</Text>
            </View>
            <View className="flex-row items-center justify-between py-1">
              <Text className="text-body-sm text-text-secondary font-sans">Build</Text>
              <Text className="text-body-sm text-text-primary font-mono">2026.06</Text>
            </View>
          </Card>

          {/* Close */}
          <Pressable
            onPress={() => router.back()}
            className="py-3 rounded-monolith border border-border items-center active:opacity-70"
          >
            <Text className="text-text-primary font-sans font-semibold">Close</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

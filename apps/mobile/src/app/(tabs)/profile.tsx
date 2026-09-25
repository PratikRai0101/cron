import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/ui';
import { MomentumRing } from '@/components/insights';
import { useIdentities } from '@/hooks/useIdentities';
import { useActivity } from '@/hooks/useActivity';
import { formatDate, formatMinutes } from '@monolith/shared';
import { useUserStore } from '@/stores';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const identities = useIdentities();
  const { byDate, byIdentity, sessions } = useActivity();
  const goal = useUserStore((s) => s.dailyGoalMinutes);
  const total = Object.values(byDate).reduce((sum, minutes) => sum + minutes, 0);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const segments = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    const key = formatDate(date);
    return { filled: (byDate[key] || 0) >= goal, isRestDay: false, dayLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][index] };
  });
  const longest = sessions.reduce((max, session) => Math.max(max, session.duration), 0);
  const bestDay = Object.entries(byDate).reduce((best, [date, minutes]) => minutes > best.minutes ? { date, minutes } : best, { date: '', minutes: 0 });

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5 pb-2 flex-row items-center justify-between" style={{ paddingTop: insets.top + 8 }}>
          <Text className="text-h1 text-text-primary font-sans">Profile</Text>
          <Pressable onPress={() => router.push('/modals/settings')} accessibilityRole="button" accessibilityLabel="Settings"
            className="w-11 h-11 items-center justify-center"><Text className="text-text-secondary text-xl font-mono">⋯</Text></Pressable>
        </View>
        <View className="px-5 py-5">
          <Text className="text-caption text-text-secondary uppercase font-sans">Total focused time</Text>
          <Text className="text-display text-text-primary font-mono mt-2">{formatMinutes(total)}</Text>
          <Text className="text-body-sm text-text-secondary font-sans mt-2">Level {Math.floor(total / 600) + 1} · {sessions.length} focus sessions</Text>
        </View>
        <View className="items-center py-4">
          <MomentumRing segments={segments} size={100} strokeWidth={6}>
            <View className="items-center">
              <Text className="text-caption text-text-tertiary uppercase font-sans">WEEK</Text>
              <Text className="text-mono-md text-text-primary font-mono mt-0.5">{segments.filter((s) => s.filled).length}/7</Text>
            </View>
          </MomentumRing>
          <Text className="text-caption text-text-tertiary font-sans mt-3">Days meeting your goal this week</Text>
        </View>
        <View className="px-5 py-4">
          <Text className="text-h3 text-text-primary font-sans mb-3">Records</Text>
          <View className="flex-row gap-3">
            <Card style={{ flex: 1 }}><Text className="text-caption text-text-secondary uppercase font-sans">Longest session</Text><Text className="text-mono-md text-text-primary font-mono mt-2">{formatMinutes(Math.floor(longest / 60))}</Text></Card>
            <Card style={{ flex: 1 }}><Text className="text-caption text-text-secondary uppercase font-sans">Best day</Text><Text className="text-mono-md text-text-primary font-mono mt-2">{formatMinutes(bestDay.minutes)}</Text><Text className="text-caption text-text-tertiary font-sans">{bestDay.date}</Text></Card>
          </View>
        </View>
        <View className="px-5 py-4">
          <Text className="text-h3 text-text-primary font-sans mb-3">Where Your Time Goes</Text>
          {identities.length === 0 && <Text className="text-body text-text-secondary font-sans">No activity yet.</Text>}
          {identities.map((identity) => {
            const minutes = byIdentity[identity.id] || 0;
            const percent = total ? Math.round(minutes / total * 100) : 0;
            return <View key={identity.id} className="flex-row items-center mb-3">
              <Text className="text-body text-text-secondary font-sans w-20" numberOfLines={1}>{identity.name}</Text>
              <View className="flex-1 h-2 bg-surface mx-3 overflow-hidden"><View className="h-full" style={{ width: `${percent}%`, backgroundColor: identity.color }} /></View>
              <Text className="text-mono-sm text-text-tertiary font-mono w-10 text-right">{percent}%</Text>
            </View>;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

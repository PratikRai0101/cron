import { View, Text, ScrollView, Pressable } from 'react-native';
import { Card } from '@/components/ui';
import { MomentumRing } from '@/components/insights';
import { useIdentities } from '@/hooks/useIdentities';
import { formatMinutes } from '@monolith/shared';
import { useFocusStore } from '@/stores';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const identities = useIdentities();
  const completedSessions = useFocusStore((s) => s.completedSessions);

  // Compute session minutes per identity
  const sessionMinutesById = completedSessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.identityId] = (acc[s.identityId] || 0) + Math.floor(s.duration / 60);
    return acc;
  }, {});
  const user = {
    displayName: 'Pixel Ronin',
    username: '@pixelronin',
    initials: 'PR',
    level: 12,
    title: 'Architect',
    totalMinutes: 7440,
  };

  const weekSegments = [
    { filled: true, isRestDay: false, dayLabel: 'M' },
    { filled: true, isRestDay: false, dayLabel: 'T' },
    { filled: true, isRestDay: false, dayLabel: 'W' },
    { filled: false, isRestDay: false, dayLabel: 'T' },
    { filled: false, isRestDay: true, dayLabel: 'F' },
    { filled: false, isRestDay: true, dayLabel: 'S' },
    { filled: false, isRestDay: false, dayLabel: 'S' },
  ];

  const records = [
    { label: 'Longest Session', value: '3h 12m', date: 'Aug 14' },
    { label: 'Most Productive Day', value: '8h 45m', date: 'Jun 3' },
    { label: 'Best Week', value: '32h 10m', date: 'Feb 1–7' },
  ];

  const identityBreakdown = identities.map((id) => ({
    name: id.name,
    minutes: (id.totalMinutes || 0) + (sessionMinutesById[id.id] || 0),
    color: id.color,
  }));

  const totalBreakdownMinutes = identityBreakdown.reduce((s, i) => s + i.minutes, 0);
  const totalSessionMinutes = Object.values(sessionMinutesById).reduce((s, m) => s + m, 0);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-h1 text-text-primary font-sans">Profile</Text>
          <Pressable
            onPress={() => router.navigate('/modals/settings')}
            className="w-8 h-8 items-center justify-center active:opacity-70"
          >
            <Text className="text-text-secondary text-xl font-mono">⚙</Text>
          </Pressable>
        </View>

        {/* User Card */}
        <View className="px-5 py-4 flex-row items-center">
          {/* Avatar */}
          <View
            className="w-16 h-16 rounded-full border-2 items-center justify-center mr-4"
            style={{ borderColor: '#262626', backgroundColor: '#141414' }}
          >
            <Text className="text-[20px] text-text-primary font-mono">{user.initials}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-h3 text-text-primary font-sans">{user.displayName}</Text>
            <Text className="text-body-sm text-text-tertiary font-sans">{user.username}</Text>
            <View className="flex-row items-center mt-1.5">
              <View
                className="rounded-monolith px-2 py-0.5 mr-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Text className="text-mono-sm text-text-primary font-mono">
                  LVL {user.level}
                </Text>
              </View>
              <Text className="text-caption text-text-secondary uppercase font-sans">
                {user.title}
              </Text>
            </View>
          </View>
        </View>

        {/* Momentum Ring */}
        <View className="items-center py-4">
          <MomentumRing segments={weekSegments} size={100} strokeWidth={6}>
            <View className="items-center">
              <Text className="text-caption text-text-tertiary uppercase font-sans">WEEK</Text>
              <Text className="text-mono-md text-text-primary font-mono mt-0.5">
                {weekSegments.filter((s) => s.filled).length}/7
              </Text>
            </View>
          </MomentumRing>
        </View>

        {/* Skill Velocity */}
        <View className="px-5 py-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-h3 text-text-primary font-sans">Skill Velocity</Text>
            <View className="flex-row items-center">
              <Text className="text-mono-md text-text-primary font-mono mr-1">+12%</Text>
              <Text className="text-text-primary text-xs">↑</Text>
            </View>
          </View>
          {/* Simple sparkline representation */}
          <View className="flex-row items-end h-16 gap-1">
            {[40, 55, 45, 60, 70, 65, 80, 85].map((h, i) => (
              <View
                key={i}
                className="flex-1 rounded-t-monolith"
                style={{
                  height: `${h}%`,
                  backgroundColor: i === 7 ? '#ffffff' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </View>
        </View>

        {/* Personal Records */}
        <View className="px-5 py-4">
          <Text className="text-h3 text-text-primary font-sans mb-3">Records</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            <View className="flex-row gap-3">
              {records.map((record, index) => (
                <Card key={index} className="min-w-[140px] p-4">
                  <Text className="text-caption text-text-secondary uppercase font-sans">
                    {record.label}
                  </Text>
                  <Text className="text-mono-md text-text-primary font-mono mt-2">
                    {record.value}
                  </Text>
                  <Text className="text-caption text-text-tertiary font-sans mt-1">
                    {record.date}
                  </Text>
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Identity Breakdown */}
        <View className="px-5 py-4">
          <Text className="text-h3 text-text-primary font-sans mb-3">Where Your Time Goes</Text>
          <View className="gap-3">
            {identityBreakdown.map((identity) => {
              const percent = Math.round((identity.minutes / totalBreakdownMinutes) * 100);
              return (
                <View key={identity.name} className="flex-row items-center">
                  <Text className="text-body text-text-secondary font-sans w-16">
                    {identity.name}
                  </Text>
                  <View className="flex-1 h-2 bg-surface rounded-monolith mx-3 overflow-hidden">
                    <View
                      className="h-full rounded-monolith"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: identity.color,
                      }}
                    />
                  </View>
                  <Text className="text-mono-sm text-text-tertiary font-mono w-10 text-right">
                    {percent}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Subscription Card */}
        <View className="px-5 py-4">
          <Card className="p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-h3 text-text-primary font-sans">Free</Text>
                <Text className="text-body-sm text-text-secondary font-sans mt-0.5">
                  1 identity • 30 days history
                </Text>
              </View>
              <Pressable className="bg-accent px-4 py-2 rounded-monolith active:scale-[0.97]">
                <Text className="text-text-inverse text-body-sm font-semibold font-sans">
                  Upgrade
                </Text>
              </Pressable>
            </View>
          </Card>
        </View>

        {/* Bottom padding */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}

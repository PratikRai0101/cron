import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { ContributionGrid } from '@/components/contribution-grid';
import { MomentumRing } from '@/components/insights';
import { TaskRow } from '@/components/tasks';
import { IdentityPill } from '@/components/identity';
import { RingProgress } from '@/components/focus';
import {
  generateDemoGridData,
  demoIdentities,
  demoTasks,
  getTodayMinutes,
} from '@/lib/demo-data';
import { formatMinutes } from '@monolith/shared';
import { router } from 'expo-router';

const DAILY_GOAL = 60;

export default function GridScreen() {
  const [gridData] = useState(() => generateDemoGridData(140));
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const todayMinutes = getTodayMinutes(gridData);
  const todayProgress = Math.min(todayMinutes / DAILY_GOAL, 1);

  const weekSegments = [
    { filled: true, isRestDay: false, dayLabel: 'M' },
    { filled: true, isRestDay: false, dayLabel: 'T' },
    { filled: true, isRestDay: false, dayLabel: 'W' },
    { filled: false, isRestDay: false, dayLabel: 'T' },
    { filled: false, isRestDay: true, dayLabel: 'F' },
    { filled: false, isRestDay: true, dayLabel: 'S' },
    { filled: false, isRestDay: false, dayLabel: 'S' },
  ];

  const identities = [{ id: 'all', name: 'All', color: '#ffffff' }, ...demoIdentities];

  const handleStartFocus = useCallback(() => {
    router.navigate('/(tabs)/focus');
  }, []);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-6 pb-2 flex-row items-center justify-center">
          <Text className="text-caption text-text-secondary uppercase font-mono">
            MONOLITH
          </Text>
        </View>

        {/* Identity Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 py-3"
          contentContainerStyle={{ gap: 8 }}
        >
          {identities.map((identity) => (
            <IdentityPill
              key={identity.id}
              name={identity.name}
              color={identity.color}
              active={selectedIdentity === identity.id || (selectedIdentity === null && identity.id === 'all')}
              onPress={() => setSelectedIdentity(identity.id === 'all' ? null : identity.id)}
            />
          ))}
        </ScrollView>

        {/* Contribution Grid */}
        <View className="px-5 py-2">
          <ContributionGrid
            data={gridData}
            dailyGoal={DAILY_GOAL}
            weeksToShow={20}
          />
        </View>

        {/* Today's Ring */}
        <View className="px-5 py-6 items-center">
          <RingProgress progress={todayProgress} size={140} strokeWidth={8}>
            <View className="items-center">
              <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
              <Text className="text-mono-lg text-text-primary font-mono mt-1">
                {formatMinutes(todayMinutes)}
              </Text>
              <Text className="text-mono-sm text-text-tertiary font-mono">
                / {DAILY_GOAL}m
              </Text>
            </View>
          </RingProgress>
        </View>

        {/* Task List */}
        <View className="px-5 pb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-h3 text-text-primary font-sans">TODAY</Text>
            <Text className="text-mono-sm text-text-tertiary font-mono">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Text>
          </View>

          {demoTasks.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              identityName={task.identityName}
              identityColor={task.identityColor}
              completed={task.completed}
              loggedMinutes={task.loggedMinutes}
              estimatedMinutes={task.estimatedMinutes}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        onPress={handleStartFocus}
        className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-accent items-center justify-center active:scale-[0.97]"
        style={{ elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
      >
        <Text className="text-text-inverse text-2xl font-mono">+</Text>
      </Pressable>
    </View>
  );
}

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { ContributionGrid } from '@/components/contribution-grid';
import { TaskRow } from '@/components/tasks';
import { IdentityPill } from '@/components/identity';
import { RingProgress } from '@/components/focus';
import {
  generateDemoGridData,
  demoIdentities,
  demoTasks as initialTasks,
  getTodayMinutes,
  type DemoTask,
} from '@/lib/demo-data';
import { useFocusStore } from '@/stores';
import { formatMinutes } from '@monolith/shared';
import { formatDate } from '@monolith/shared';
import { router } from 'expo-router';

const DAILY_GOAL = 60;

export default function GridScreen() {
  const [gridData] = useState(() => generateDemoGridData(140));
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DemoTask[]>(initialTasks);
  const completedSessions = useFocusStore((s) => s.completedSessions);

  // Add completed session minutes to today's total
  const today = formatDate(new Date());
  const sessionMinutesToday = completedSessions
    .filter((s) => s.completedAt.startsWith(today))
    .reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);
  const baseTodayMinutes = getTodayMinutes(gridData);
  const totalTodayMinutes = baseTodayMinutes + sessionMinutesToday;

  const identities = [{ id: 'all', name: 'All', color: '#ffffff' }, ...demoIdentities];

  // Compute identity share for grid filtering
  const totalIdentityMinutes = demoIdentities.reduce((sum, i) => sum + i.totalMinutes, 0);
  const selectedIdentityData = selectedIdentity
    ? demoIdentities.find((i) => i.id === selectedIdentity)
    : null;
  const identityShare = selectedIdentityData
    ? selectedIdentityData.totalMinutes / totalIdentityMinutes
    : 1;

  // Filter grid data proportionally when an identity is selected
  const filteredGridData = selectedIdentityData
    ? gridData.map((d) => ({ ...d, minutes: Math.round(d.minutes * identityShare) }))
    : gridData;

  const filteredTodayMinutes = Math.round(totalTodayMinutes * identityShare);
  const filteredTodayProgress = Math.min(filteredTodayMinutes / DAILY_GOAL, 1);

  const filteredTasks = selectedIdentity
    ? tasks.filter((t) => {
        const identity = demoIdentities.find((i) => i.id === selectedIdentity);
        return identity && t.identityName === identity.name;
      })
    : tasks;

  const handleToggleTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }, []);

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
            data={filteredGridData}
            dailyGoal={DAILY_GOAL}
            weeksToShow={20}
          />
        </View>

        {/* Today's Ring */}
        <View className="px-5 py-6 items-center">
          <RingProgress progress={filteredTodayProgress} size={140} strokeWidth={8}>
            <View className="items-center">
              <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
              <Text className="text-mono-lg text-text-primary font-mono mt-1">
                {formatMinutes(filteredTodayMinutes)}
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

          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              identityName={task.identityName}
              identityColor={task.identityColor}
              completed={task.completed}
              loggedMinutes={task.loggedMinutes}
              estimatedMinutes={task.estimatedMinutes}
              onToggleComplete={() => handleToggleTask(task.id)}
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

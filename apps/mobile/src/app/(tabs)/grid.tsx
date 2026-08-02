import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContributionGrid } from '@/components/contribution-grid';
import { TaskRow } from '@/components/tasks';
import { IdentityPill } from '@/components/identity';
import { RingProgress } from '@/components/focus';
import { InsightCard } from '@/components/insights';
import {
  generateDemoGridData,
  getTodayMinutes,
  demoTasks,
} from '@/lib/demo-data';
import { useIdentities } from '@/hooks/useIdentities';
import { useFocusStore, useLogStore, useTaskStore, useUserStore } from '@/stores';
import { formatMinutes, formatDate } from '@monolith/shared';
import { router } from 'expo-router';

export default function GridScreen() {
  const insets = useSafeAreaInsets();
  const dailyGoal = useUserStore((s) => s.dailyGoalMinutes);
  const [gridData] = useState(() => generateDemoGridData(140));
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const completedSessions = useFocusStore((s) => s.completedSessions);
  const retroLogs = useLogStore((s) => s.retroLogs);

  // Merge retro logs into grid data for instant cell updates
  const retroMinutesByDate = useMemo(() => {
    const map: Record<string, number> = {};
    retroLogs.forEach((l) => {
      map[l.date] = (map[l.date] || 0) + l.minutes;
    });
    return map;
  }, [retroLogs]);

  const mergedGridData = useMemo(
    () =>
      gridData.map((d) => ({
        ...d,
        minutes: d.minutes + (retroMinutesByDate[d.date] || 0),
      })),
    [gridData, retroMinutesByDate]
  );

  // Seed demo tasks on first render if store is empty
  useEffect(() => {
    if (tasks.length === 0) {
      demoTasks.forEach((task) => {
        addTask({
          title: task.title,
          identityId: task.identityName,
          identityName: task.identityName,
          identityColor: task.identityColor,
          estimatedMinutes: task.estimatedMinutes,
        });
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Add completed session minutes to today's total
  const today = formatDate(new Date());
  const sessionMinutesToday = completedSessions
    .filter((s) => s.completedAt.startsWith(today))
    .reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);
  const baseTodayMinutes = getTodayMinutes(gridData);
  const totalTodayMinutes =
    baseTodayMinutes +
    sessionMinutesToday +
    (retroMinutesByDate[today] || 0);

  const handleCellPress = useCallback((date: string) => {
    router.navigate({ pathname: '/modals/retro-log', params: { date } });
  }, []);

  // Weekly insight: sum focus sessions + retro logs for this week vs last week
  const weekMinutes = useMemo(() => {
    const startOfThisWeek = new Date();
    startOfThisWeek.setHours(0, 0, 0, 0);
    startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let thisWeek = 0;
    let lastWeek = 0;

    completedSessions.forEach((s) => {
      const sessionDate = new Date(s.completedAt);
      const minutes = Math.floor(s.duration / 60);
      if (sessionDate >= startOfThisWeek) thisWeek += minutes;
      else if (sessionDate >= startOfLastWeek) lastWeek += minutes;
    });

    retroLogs.forEach((l) => {
      const logDate = new Date(`${l.date}T12:00:00`);
      if (logDate >= startOfThisWeek && logDate < startOfToday) thisWeek += l.minutes;
      else if (logDate >= startOfLastWeek && logDate < startOfThisWeek) lastWeek += l.minutes;
    });

    return { thisWeek, lastWeek };
  }, [completedSessions, retroLogs]);

  const identities = [{ id: 'all', name: 'All', color: '#ffffff', totalMinutes: 0 }, ...useIdentities()];

  // Compute identity share for grid filtering
  const totalIdentityMinutes = identities.reduce(
    (sum, i) => sum + (i.totalMinutes || 0),
    0
  );
  const selectedIdentityData = selectedIdentity
    ? identities.find((i) => i.id === selectedIdentity)
    : null;
  const identityShare = selectedIdentityData
    ? (selectedIdentityData.totalMinutes || 0) / Math.max(totalIdentityMinutes, 1)
    : 1;

  // Filter grid data proportionally when an identity is selected
  const filteredGridData = selectedIdentityData
    ? mergedGridData.map((d) => ({ ...d, minutes: Math.round(d.minutes * identityShare) }))
    : mergedGridData;

  const filteredTodayMinutes = Math.round(totalTodayMinutes * identityShare);
  const filteredTodayProgress = Math.min(filteredTodayMinutes / dailyGoal, 1);

  const filteredTasks = selectedIdentity
    ? tasks.filter((t) => {
        const identity = identities.find((i) => i.id === selectedIdentity);
        return identity && t.identityName === identity.name;
      })
    : tasks;

  const handleToggleTask = useCallback((taskId: string) => {
    toggleTask(taskId);
  }, [toggleTask]);

  const handleOpenLogTask = useCallback(() => {
    router.navigate('/modals/log-task');
  }, []);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pb-2 flex-row items-center justify-center" style={{ paddingTop: insets.top + 8 }}>
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
            dailyGoal={dailyGoal}
            weeksToShow={20}
            onCellPress={handleCellPress}
            onCellLongPress={handleCellPress}
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
                / {dailyGoal}m
              </Text>
            </View>
          </RingProgress>
        </View>

        {/* Insight Card */}
        <View className="pb-6">
          <InsightCard
            thisWeekMinutes={weekMinutes.thisWeek}
            lastWeekMinutes={weekMinutes.lastWeek}
          />
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
              estimatedMinutes={task.estimatedMinutes}
              onToggleComplete={() => handleToggleTask(task.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        onPress={handleOpenLogTask}
        className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-accent items-center justify-center active:scale-[0.97]"
        style={{ elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
      >
        <Text className="text-text-inverse text-2xl font-mono">+</Text>
      </Pressable>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { formatDate, formatMinutes } from '@monolith/shared';
import { ContributionGrid } from '@/components/contribution-grid';
import { TaskRow } from '@/components/tasks';
import { IdentityPill } from '@/components/identity';
import { RingProgress } from '@/components/focus';
import { InsightCard } from '@/components/insights';
import { useIdentities } from '@/hooks/useIdentities';
import { useActivity } from '@/hooks/useActivity';
import { useFocusStore, useTaskStore, useUserStore } from '@/stores';

export default function GridScreen() {
  const insets = useSafeAreaInsets();
  const dailyGoal = useUserStore((s) => s.dailyGoalMinutes);
  const identities = useIdentities();
  const { byDate, byIdentityDate } = useActivity();
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const startFocus = useFocusStore((s) => s.startFocus);
  const isActive = useFocusStore((s) => s.isActive);
  const today = formatDate(new Date());
  const filteredDates = selectedIdentity ? byIdentityDate[selectedIdentity] ?? {} : byDate;
  const gridData = Object.entries(filteredDates).map(([date, minutes]) => ({ date, minutes }));
  const todayMinutes = filteredDates[today] || 0;
  const todaysTasks = tasks.filter((task) => !task.dueDate || task.dueDate === today);
  const filteredTasks = selectedIdentity ? todaysTasks.filter((task) => task.identityId === selectedIdentity) : todaysTasks;

  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const lastWeekStart = new Date(weekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  let thisWeek = 0;
  let lastWeek = 0;
  Object.entries(byDate).forEach(([date, minutes]) => {
    if (date >= formatDate(weekStart)) thisWeek += minutes;
    else if (date >= formatDate(lastWeekStart)) lastWeek += minutes;
  });

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 96 }}>
        <View className="px-5 pb-2 flex-row items-center justify-center" style={{ paddingTop: insets.top + 8 }}>
          <Text className="text-caption text-text-secondary uppercase font-mono">MONOLITH</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-3" contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          <IdentityPill name="All" color="#ffffff" active={!selectedIdentity} onPress={() => setSelectedIdentity(null)} />
          {identities.map((identity) => (
            <IdentityPill key={identity.id} name={identity.name} color={identity.color}
              active={selectedIdentity === identity.id} onPress={() => setSelectedIdentity(identity.id)} />
          ))}
        </ScrollView>
        <View className="px-5 py-2">
          <ContributionGrid data={gridData} dailyGoal={dailyGoal} weeksToShow={26}
            onCellPress={(date, minutes) => Alert.alert(date, `${formatMinutes(minutes)} logged`, [
              { text: 'Close', style: 'cancel' },
              { text: 'Log activity', onPress: () => router.push({ pathname: '/modals/retro-log', params: { date } }) },
            ])}
            onCellLongPress={(date) => { if (date <= today) router.push({ pathname: '/modals/retro-log', params: { date } }); }} />
          <Text className="text-caption text-text-tertiary mt-2 font-sans">Long press a day to log activity</Text>
        </View>
        <View className="px-5 py-6 items-center">
          <RingProgress progress={Math.min(todayMinutes / dailyGoal, 1)} size={140} strokeWidth={8}>
            <View className="items-center">
              <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
              <Text className="text-mono-lg text-text-primary font-mono mt-1">{formatMinutes(todayMinutes)}</Text>
              <Text className="text-mono-sm text-text-tertiary font-mono">/ {dailyGoal}m</Text>
            </View>
          </RingProgress>
        </View>
        <View className="pb-6"><InsightCard thisWeekMinutes={thisWeek} lastWeekMinutes={lastWeek} /></View>
        <View className="px-5 pb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-h3 text-text-primary font-sans">TASKS</Text>
            <Text className="text-mono-sm text-text-tertiary font-mono">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
          </View>
          {filteredTasks.length === 0 && <Text className="text-body text-text-secondary font-sans">No tasks yet. Add one to get started.</Text>}
          {filteredTasks.map((task) => (
            <TaskRow key={task.id} title={task.title} identityName={task.identityName} identityColor={task.identityColor}
              completed={task.completed} estimatedMinutes={task.estimatedMinutes}
              onLogTime={() => router.push({ pathname: '/modals/retro-log', params: { date: today, identityId: task.identityId } })}
              onToggleComplete={() => toggleTask(task.id)}
              onLongPress={() => Alert.alert(task.title, 'Manage task', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Edit', onPress: () => router.push({ pathname: '/modals/log-task', params: { id: task.id } }) },
                { text: 'Delete', style: 'destructive', onPress: () => deleteTask(task.id) },
              ])}
              onPress={() => { if (!isActive) startFocus(task.identityId, task.id); router.navigate('/(tabs)/focus'); }} />
          ))}
        </View>
      </ScrollView>
      <Pressable onPress={() => router.push('/modals/log-task')} accessibilityRole="button" accessibilityLabel="Add task"
        className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-accent items-center justify-center">
        <Text className="text-text-inverse text-2xl font-mono">+</Text>
      </Pressable>
    </View>
  );
}

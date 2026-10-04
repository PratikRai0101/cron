import { useFloatingNavigation } from "@/components/strata/FloatingNavigation";
import { AnimatedTotal } from "@/components/strata/AnimatedTotal";
import { GoalProgress } from "@/components/strata/GoalProgress";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  useWindowDimensions,
} from "react-native";
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import { formatDate, formatMinutes } from "@monolith/shared";
import { TaskRow } from "@/components/tasks";
import { IdentityPill } from "@/components/identity";
import { InspectableSpecimen } from "@/components/strata/InspectableSpecimen";
import { UndoNotice } from "@/components/strata/UndoNotice";
import { HistoryGrid } from "@/components/strata/HistoryGrid";
import { Action } from "@/components/strata/Action";
import { useIdentities } from "@/hooks/useIdentities";
import { useActivity } from "@/hooks/useActivity";
import { useFocusStore, useTaskStore, useUserStore } from "@/stores";

export default function GridScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const floating = useFloatingNavigation();
  const dailyGoal = useUserStore((s) => s.dailyGoalMinutes);
  const identities = useIdentities();
  const { byDate, byIdentityDate, strata } = useActivity();
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const startFocus = useFocusStore((s) => s.startFocus);
  const isActive = useFocusStore((s) => s.isActive);
  const today = formatDate(new Date());
  const filteredDates = selectedIdentity
    ? (byIdentityDate[selectedIdentity] ?? {})
    : byDate;
  const todayMinutes = filteredDates[today] || 0;
  const todaysTasks = tasks.filter(
    (task) => !task.dueDate || task.dueDate <= today,
  );
  const filteredTasks = selectedIdentity
    ? todaysTasks.filter((task) => task.identityId === selectedIdentity)
    : todaysTasks;

  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const lastWeekStart = new Date(weekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  let thisWeek = 0;
  let lastWeek = 0;
  Object.entries(byDate).forEach(([date, minutes]) => {
    if (date >= formatDate(weekStart) && date <= today) thisWeek += minutes;
    else if (date >= formatDate(lastWeekStart) && date < formatDate(weekStart))
      lastWeek += minutes;
  });

  const empty = Object.keys(byDate).length === 0;
  const worked = Object.values(filteredDates).filter(
    (minutes) => minutes > 0,
  ).length;
  const openDay = (date: string) =>
    router.push({
      pathname: "/modals/day",
      params: { date, identityId: selectedIdentity ?? undefined },
    });
  const start = () => {
    const identity =
      identities.find((i) => i.id === selectedIdentity) ?? identities[0];
    if (!isActive && identity) startFocus(identity.id);
    router.navigate("/(tabs)/focus");
  };
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:
            Math.max(insets.top, initialWindowMetrics?.insets.top ?? 0) + 16,
          paddingBottom: floating.contentPaddingBottom,
          paddingHorizontal: 24,
        }}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[13px] font-bold text-text-primary dark:text-dark-ink">
            Monolith
          </Text>
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </Text>
        </View>
        <UndoNotice />
        {empty ? (
          <>
            <Text
              style={{ paddingBottom: 6 }}
              className={`font-serif text-text-primary dark:text-dark-ink mt-4 mb-8 ${height < 720 ? "text-[28px] leading-[36px]" : "text-[56px] leading-[70px]"}`}
            >
              No work recorded yet.
            </Text>
            <InspectableSpecimen height={110} empty />
            <Text className="text-[15px] text-text-secondary dark:text-dark-muted mt-6 mb-6">
              Choose an identity, then start your first session.
            </Text>
          </>
        ) : (
          <Text className="text-[20px] font-bold text-text-primary dark:text-dark-ink mb-2">
            Today
          </Text>
        )}
        {empty ? (
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              0 minutes today
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit daily goal"
              onPress={() => router.push("/modals/settings")}
              className="min-h-[44px] justify-center"
            >
              <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
                Daily goal · {dailyGoal} min
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="flex-row items-end " style={{ gap: 16 }}>
              <AnimatedTotal
                value={todayMinutes}
                className="font-serif text-[76px] leading-[80px] text-text-primary dark:text-dark-ink"
                accessibilityLabel={`${todayMinutes} minutes today`}
              />
              <View className="pb-1 flex-1">
                <Text className="text-[20px] text-text-primary dark:text-dark-ink">
                  minutes today
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Edit daily goal"
                  onPress={() => router.push("/modals/settings")}
                  className="min-h-[44px] justify-center"
                >
                  <Text className="text-[15px] text-text-secondary dark:text-dark-muted">
                    {Math.max(0, dailyGoal - todayMinutes) > 0
                      ? `${dailyGoal - todayMinutes} to your ${dailyGoal} min goal`
                      : `${dailyGoal} min goal met`}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className="h-[3px] mt-3 mb-4 bg-border dark:bg-dark-rule">
              <GoalProgress minutes={todayMinutes} goal={dailyGoal} />
            </View>
          </>
        )}
        {!empty && (
          <>
            <InspectableSpecimen
              height={110}
              identityId={selectedIdentity}
              records={
                selectedIdentity
                  ? strata.filter((r) => r.identityId === selectedIdentity)
                  : strata
              }
            />
            <View className="mt-4">
              <HistoryGrid
                dates={filteredDates}
                goal={dailyGoal}
                onDay={openDay}
              />
            </View>
            <View className="flex-row justify-between mt-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open focus history"
                onPress={() => openDay(today)}
                className="min-h-[44px] justify-center"
              >
                <Text className="text-[11px] text-accent dark:text-dark-accent">
                  History
                </Text>
              </Pressable>
              <Text className="text-[11px] text-text-secondary dark:text-dark-muted mt-4">
                {worked} {worked === 1 ? "day" : "days"} worked · 26 weeks
              </Text>
            </View>
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted mb-3">
              {formatMinutes(thisWeek)} this week ·{" "}
              {formatMinutes(Math.abs(thisWeek - lastWeek))}{" "}
              {thisWeek >= lastWeek ? "more" : "less"} than last week.
            </Text>
          </>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 3 }}
          className="mb-3"
        >
          <IdentityPill
            name="All"
            active={!selectedIdentity}
            onPress={() => setSelectedIdentity(null)}
          />
          {identities.map((identity) => (
            <IdentityPill
              key={identity.id}
              name={identity.name}
              active={selectedIdentity === identity.id}
              onPress={() => setSelectedIdentity(identity.id)}
            />
          ))}
        </ScrollView>
        <View className="flex-row items-center justify-between">
          <Text className="text-[15px] font-bold text-text-primary dark:text-dark-ink">
            Today’s work
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task"
            onPress={() => router.push("/modals/log-task")}
            className="min-h-[44px] justify-center"
          >
            <Text className="text-[13px] font-semibold text-accent dark:text-dark-accent">
              Add task
            </Text>
          </Pressable>
        </View>
        <Text className="text-[11px] text-text-secondary dark:text-dark-muted mb-2">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}{" "}
          · {filteredTasks.filter((t) => t.completed).length} done
        </Text>
        {filteredTasks.length === 0 && (
          <Text className="text-[15px] text-text-secondary dark:text-dark-muted py-4">
            No tasks yet. Add one to get started.
          </Text>
        )}
        {[...filteredTasks]
          .sort((a, b) => Number(a.completed) - Number(b.completed))
          .map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              identityName={task.identityName}
              completed={task.completed}
              estimatedMinutes={task.estimatedMinutes}
              metadata={
                task.dueDate && task.dueDate < today ? "Overdue" : undefined
              }
              onLogTime={() =>
                router.push({
                  pathname: "/modals/retro-log",
                  params: { date: today, identityId: task.identityId },
                })
              }
              onToggleComplete={() => toggleTask(task.id)}
              onLongPress={() =>
                Alert.alert(task.title, "Manage task", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Edit",
                    onPress: () =>
                      router.push({
                        pathname: "/modals/log-task",
                        params: { id: task.id },
                      }),
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteTask(task.id),
                  },
                ])
              }
              onPress={() => {
                if (!isActive) startFocus(task.identityId, task.id);
                router.navigate("/(tabs)/focus");
              }}
            />
          ))}
        <Text className="text-[11px] text-text-secondary dark:text-dark-muted mt-4">
          Hold a task to edit or delete. Tap its time to log activity.
        </Text>
      </ScrollView>
      <View
        className="absolute left-6 right-6 flex-row"
        style={{ bottom: floating.actionBottom }}
      >
        <Action
          title={isActive ? "Return to focus" : "Start focus"}
          onPress={start}
        />
      </View>
    </View>
  );
}

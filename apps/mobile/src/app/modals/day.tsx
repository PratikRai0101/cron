import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { formatDate, formatMinutes } from "@monolith/shared";
import { useTaskStore } from "@/stores";
import { useActivity } from "@/hooks/useActivity";
import { Specimen } from "@/components/strata/Specimen";
import { Icon } from "@/components/strata/Icon";
import { Action } from "@/components/strata/Action";
import { useColors } from "@/theme/ThemeContext";
export default function DayScreen() {
  const tasks = useTaskStore((s) => s.tasks);
  const insets = useSafeAreaInsets();
  const c = useColors();
  const { date, identityId } = useLocalSearchParams<{
    date: string;
    identityId?: string;
  }>();
  const activity = useActivity();
  const today = formatDate(new Date());
  const parsed = new Date(`${date}T12:00:00`);
  const valid =
    !!date &&
    !Number.isNaN(parsed.getTime()) &&
    formatDate(parsed) === date &&
    date <= today;
  const day = valid ? date : today;
  const sessions = activity.sessions.filter(
    (s) =>
      formatDate(new Date(s.completedAt)) === day &&
      (!identityId || s.identityId === identityId),
  );
  const logs = activity.logs.filter(
    (l) => l.date === day && (!identityId || l.identityId === identityId),
  );
  const total =
    sessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0) +
    logs.reduce((sum, l) => sum + l.minutes, 0);
  const identities = new Set([...sessions, ...logs].map((s) => s.identityId));
  const shift = (amount: number) => {
    const d = new Date(`${day}T12:00:00`);
    d.setDate(d.getDate() + amount);
    router.setParams({ date: formatDate(d) });
  };
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 100,
        }}
      >
        <View className="flex-row items-center " style={{ gap: 12 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.back()}
            className="rounded-full bg-surface dark:bg-dark-surface w-11 h-11 items-center justify-center"
          >
            <Icon name="back" color={c.text} />
          </Pressable>
          <Text className="text-[28px] font-bold text-text-primary dark:text-dark-ink">
            History
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            {new Date(`${day}T12:00:00`).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </Text>
          <View className="flex-row " style={{ gap: 12 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous day"
              onPress={() => shift(-1)}
              className="min-h-[44px] justify-center"
            >
              <Text className="text-[13px] text-accent dark:text-dark-accent">
                Previous
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next day"
              disabled={day === today}
              onPress={() => shift(1)}
              className="min-h-[44px] justify-center"
              style={{ opacity: day === today ? 0.4 : 1 }}
            >
              <Text className="text-[13px] text-accent dark:text-dark-accent">
                Next
              </Text>
            </Pressable>
          </View>
        </View>
        <Text
          className="font-serif text-[76px] leading-[80px] text-text-primary dark:text-dark-ink"
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {formatMinutes(total)}
        </Text>
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-3">
          Across {identities.size}{" "}
          {identities.size === 1 ? "identity" : "identities"}
        </Text>
        <View className="my-6">
          <Specimen
            height={140}
            records={activity.strata.filter(
              (r) =>
                r.date.slice(0, 10) === day &&
                (!identityId || r.identityId === identityId),
            )}
          />
        </View>
        <View className="flex-row justify-between">
          <Text className="text-[15px] font-bold text-text-primary dark:text-dark-ink">
            Sessions
          </Text>
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            {sessions.length + logs.length} recorded
          </Text>
        </View>
        {sessions
          .sort((a, b) => a.completedAt.localeCompare(b.completedAt))
          .map((s) => (
            <View
              key={s.id}
              className="min-h-[80px] flex-row items-center border-b border-border dark:border-dark-rule "
              style={{ gap: 12 }}
            >
              <Text className="text-[13px] text-text-secondary dark:text-dark-muted w-12">
                {new Date(s.completedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <View className="flex-1">
                <Text className="text-[15px] text-text-primary dark:text-dark-ink">
                  {tasks.find((task) => task.id === s.taskId)?.title ??
                    "Focused work"}
                </Text>
                <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-1">
                  {s.identityName}
                </Text>
              </View>
              <Text className="text-[13px] text-text-primary dark:text-dark-ink">
                {formatMinutes(Math.floor(s.duration / 60))}
              </Text>
            </View>
          ))}
        {logs.map((l) => (
          <View
            key={l.id}
            className="min-h-[80px] flex-row items-center border-b border-border dark:border-dark-rule "
            style={{ gap: 12 }}
          >
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted w-12">
              Log
            </Text>
            <View className="flex-1">
              <Text className="text-[15px] text-text-primary dark:text-dark-ink">
                Recorded activity
              </Text>
              <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-1">
                {l.identityName}
              </Text>
            </View>
            <Text className="text-[13px] text-text-primary dark:text-dark-ink">
              {formatMinutes(l.minutes)}
            </Text>
          </View>
        ))}
        {total === 0 && (
          <Text className="text-[15px] text-text-secondary dark:text-dark-muted my-5">
            No work recorded on this day.
          </Text>
        )}
      </ScrollView>
      <View
        className="absolute left-6 right-6 flex-row"
        style={{ bottom: insets.bottom + 12 }}
      >
        <Action
          title="Log time"
          onPress={() =>
            router.push({
              pathname: "/modals/retro-log",
              params: { date: day, identityId },
            })
          }
        />
      </View>
    </View>
  );
}

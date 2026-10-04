import { View, Text, ScrollView, Pressable } from "react-native";
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import { Specimen } from "@/components/strata/Specimen";
import { useColors } from "@/theme/ThemeContext";
import { useIdentities } from "@/hooks/useIdentities";
import { useActivity } from "@/hooks/useActivity";
import { formatDate, formatMinutes } from "@monolith/shared";
import { useUserStore } from "@/stores";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const identities = useIdentities();
  const { byDate, byIdentity, sessions, strata } = useActivity();
  const goal = useUserStore((s) => s.dailyGoalMinutes);
  const total = Object.values(byDate).reduce(
    (sum, minutes) => sum + minutes,
    0,
  );
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const segments = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    const key = formatDate(date);
    return {
      filled: (byDate[key] || 0) >= goal,
      isRestDay: false,
      dayLabel: ["M", "T", "W", "T", "F", "S", "S"][index],
    };
  });
  const longest = sessions.reduce(
    (max, session) => Math.max(max, session.duration),
    0,
  );
  const bestDay = Object.entries(byDate).reduce(
    (best, [date, minutes]) =>
      minutes > best.minutes ? { date, minutes } : best,
    { date: "", minutes: 0 },
  );

  const c = useColors();
  const daysWorked = Object.values(byDate).filter((m) => m > 0).length;
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:
            Math.max(insets.top, initialWindowMetrics?.insets.top ?? 0) + 16,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 112,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-[28px] font-bold text-text-primary dark:text-dark-ink">
            Profile
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Settings"
            onPress={() => router.push("/modals/settings")}
            className="min-h-[44px] justify-center"
          >
            <Text className="text-[13px] font-semibold text-accent dark:text-dark-accent">
              Settings
            </Text>
          </Pressable>
        </View>
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-6">
          Total focused time
        </Text>
        <View className="flex-row items-end  mt-3" style={{ gap: 8 }}>
          <Text className="font-serif text-[76px] leading-[80px] text-text-primary dark:text-dark-ink">
            {Math.floor(total / 60)}h
          </Text>
          <Text className="text-[20px] text-text-primary dark:text-dark-ink mb-2">
            {total % 60}m
          </Text>
        </View>
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-3">
          Level {Math.floor(total / 600) + 1} · {sessions.length} focus{" "}
          {sessions.length === 1 ? "session" : "sessions"}· {daysWorked} days
          worked
        </Text>
        <View className="my-6">
          <Specimen height={120} records={strata} />
        </View>
        <View className="flex-row justify-between " style={{ gap: 12 }}>
          <Text className="text-[15px] font-bold text-text-primary dark:text-dark-ink">
            This week
          </Text>
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted flex-1 text-right">
            {segments.filter((s) => s.filled).length} of 7 days met your goal
          </Text>
        </View>
        <View className="flex-row  my-3" style={{ gap: 12 }}>
          {segments.map((segment, index) => (
            <View key={index} className="flex-1 items-center">
              <Text className="text-[11px] text-text-secondary dark:text-dark-muted">
                {segment.dayLabel}
              </Text>
              <View
                className="h-[6px] w-full mt-2"
                style={{
                  backgroundColor: segment.filled ? c.primary : c.separator,
                }}
              />
            </View>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change daily goal"
          onPress={() => router.push("/modals/settings")}
          className="min-h-[44px] justify-center"
        >
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            Daily goal · {goal} min
          </Text>
        </Pressable>
        <View
          className="flex-row  border-t border-border dark:border-dark-rule pt-5 mt-4"
          style={{ gap: 24 }}
        >
          <View className="flex-1">
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              Longest session
            </Text>
            <Text className="text-[20px] font-semibold text-text-primary dark:text-dark-ink mt-2">
              {formatMinutes(Math.floor(longest / 60))}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              Best day
            </Text>
            <Text className="text-[20px] font-semibold text-text-primary dark:text-dark-ink mt-2">
              {formatMinutes(bestDay.minutes)}
            </Text>
            {bestDay.date && (
              <Text className="text-[11px] text-text-secondary dark:text-dark-muted mt-1">
                {bestDay.date}
              </Text>
            )}
          </View>
        </View>
        <Text className="text-[20px] font-bold text-text-primary dark:text-dark-ink mt-8 mb-3">
          Where your time goes
        </Text>
        {identities.length === 0 && (
          <Text className="text-[15px] text-text-secondary dark:text-dark-muted">
            No activity yet.
          </Text>
        )}
        {identities.map((identity) => {
          const minutes = byIdentity[identity.id] ?? 0;
          return (
            <View
              key={identity.id}
              className="flex-row items-center min-h-[44px] "
              style={{ gap: 12 }}
            >
              <Text
                className="text-[13px] text-text-primary dark:text-dark-ink w-16"
                numberOfLines={1}
              >
                {identity.name}
              </Text>
              <View className="flex-1 h-1 bg-border">
                <View
                  className="h-full"
                  style={{
                    width: `${total ? (minutes / total) * 100 : 0}%`,
                    backgroundColor: c.primary,
                  }}
                />
              </View>
              <Text className="text-[13px] text-text-secondary dark:text-dark-muted text-right w-20">
                {formatMinutes(minutes)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

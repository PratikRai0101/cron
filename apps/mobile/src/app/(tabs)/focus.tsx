import { useFloatingNavigation } from "@/components/strata/FloatingNavigation";
import { AnimatedTotal } from "@/components/strata/AnimatedTotal";
import { useEffect, useRef, useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  AppState,
  ScrollView,
} from "react-native";
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { useFocusStore, useTaskStore, useUserStore } from "@/stores";
import { Specimen } from "@/components/strata/Specimen";
import { Action } from "@/components/strata/Action";
import { useActivity } from "@/hooks/useActivity";
import { IdentityPill } from "@/components/identity";
import { useIdentities } from "@/hooks/useIdentities";
import { formatMinutes, formatDate } from "@monolith/shared";
import { uid } from "@/lib/id";
import { useKeepAwake } from "expo-keep-awake";

function SessionAwake() {
  useKeepAwake("monolith-focus-session");
  return null;
}

export default function FocusTabScreen() {
  const { byDate, strata } = useActivity();
  const [savedLayerId, setSavedLayerId] = useState<string | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const insets = useSafeAreaInsets();
  const floating = useFloatingNavigation();
  const identities = useIdentities();
  const {
    isActive,
    isPaused,
    elapsedSeconds,
    currentIdentityId,
    currentTaskId,
    startFocus,
    pauseFocus,
    resumeFocus,
    stopFocus,
    cancelFocus,
    tick,
    logSession,
  } = useFocusStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Restore the persisted clock immediately, including a paused session.
  useEffect(() => {
    if (isActive) tick();
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, isPaused, tick]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && isActive && !isPaused) tick();
    });
    return () => subscription.remove();
  }, [isActive, isPaused, tick]);

  const handleStart = useCallback(() => {
    if (!isActive) {
      if (identities[0]) startFocus(identities[0].id);
    } else if (isPaused) {
      resumeFocus();
    } else {
      pauseFocus();
    }
  }, [identities, isActive, isPaused, startFocus, resumeFocus, pauseFocus]);

  const handleStop = useCallback(() => {
    if (elapsedSeconds >= 12 * 60 * 60) {
      Alert.alert(
        "Session limit reached",
        "Focus sessions are capped at 12 hours. This session will be saved at the limit.",
      );
    }
    if (elapsedSeconds < 60) {
      Alert.alert(
        "Session too short",
        "Focus for at least one minute to save a session. Cancel to discard it.",
      );
      return;
    }
    const result = stopFocus();
    if (result && result.duration >= 60) {
      const identity = identities.find((i) => i.id === result.identityId);
      setSaved(Math.floor(result.duration / 60));
      const id = uid("session-");
      setSavedLayerId(id);
      logSession({
        id,
        duration: result.duration,
        identityId: result.identityId,
        identityName: identity?.name || "Focus",
        identityColor: identity?.color || "#ffffff",
        taskId: result.taskId,
        completedAt: new Date().toISOString(),
      });
    }
  }, [elapsedSeconds, identities, stopFocus, logSession]);

  const handleCancel = useCallback(() => {
    Alert.alert("Discard session?", "Elapsed time will not be saved.", [
      { text: "Keep focusing", style: "cancel" },
      { text: "Discard", style: "destructive", onPress: cancelFocus },
    ]);
  }, [cancelFocus]);

  const currentIdentity = identities.find((i) => i.id === currentIdentityId);
  const taskTitle = useTaskStore(
    (s) => s.tasks.find((t) => t.id === currentTaskId)?.title,
  );
  const sessionGoal = useUserStore((s) => s.dailyGoalMinutes);
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | null>(
    null,
  );
  const identityToStart =
    identities.find((i) => i.id === selectedIdentityId) ?? identities[0];

  const handleStartWithIdentity = useCallback(() => {
    if (identityToStart) {
      setSaved(null);
      setSavedLayerId(null);
      startFocus(identityToStart.id);
    }
  }, [identityToStart, startFocus]);

  const todaySaved = byDate[formatDate(new Date())] ?? 0;
  const seconds = Math.floor(elapsedSeconds);
  const timer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <View className="flex-1 bg-background dark:bg-dark-ground">
      {isActive && !isPaused && <SessionAwake />}
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:
            Math.max(insets.top, initialWindowMetrics?.insets.top ?? 0) + 20,
          paddingHorizontal: 24,
          paddingBottom: isActive
            ? insets.bottom + 100
            : floating.contentPaddingBottom,
        }}
      >
        <Text className="text-[28px] font-bold text-text-primary dark:text-dark-ink mb-5">
          {saved !== null ? "Recorded" : "Focus"}
        </Text>
        <View className="flex-row justify-between">
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </Text>
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
            {isPaused ? "Paused" : isActive ? "Counting up" : "Ready"}
          </Text>
        </View>
        {saved !== null ? (
          <AnimatedTotal
            animateOnMount
            value={todaySaved}
            className="font-serif text-[76px] leading-[86px] text-text-primary dark:text-dark-ink mt-4"
            style={{ fontVariant: ["tabular-nums"], letterSpacing: -2 }}
            accessibilityLabel={`${todaySaved} minutes today, ${saved} minutes recorded`}
          />
        ) : (
          <Text
            className="text-[76px] leading-[86px] text-text-primary dark:text-dark-ink mt-4"
            style={{ fontVariant: ["tabular-nums"], letterSpacing: -2 }}
            accessibilityLabel={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds elapsed`}
          >
            {timer}
          </Text>
        )}
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mb-6">
          {saved !== null ? `minutes today · ${saved} min added` : "elapsed"}
        </Text>
        <Specimen
          height={130}
          records={strata}
          previewMinutes={isActive ? elapsedSeconds / 60 : 0}
          animatedLayerId={savedLayerId}
        />
        <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-5">
          {saved !== null
            ? "A new layer recorded."
            : `${Math.floor(elapsedSeconds / 60)} min in this layer`}
        </Text>
        <Text className="text-[20px] font-bold text-text-primary dark:text-dark-ink mt-6 mb-3">
          {taskTitle ??
            (saved !== null
              ? "Today’s work is permanent."
              : "Choose your work")}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 3 }}
        >
          {identities.map((identity) => (
            <IdentityPill
              key={identity.id}
              name={identity.name}
              active={
                (isActive ? currentIdentity?.id : identityToStart?.id) ===
                identity.id
              }
              onPress={
                isActive ? undefined : () => setSelectedIdentityId(identity.id)
              }
            />
          ))}
        </ScrollView>
        {identities.length === 0 && (
          <Text className="text-[15px] text-text-secondary dark:text-dark-muted my-3">
            Add an identity from the Identity tab to start.
          </Text>
        )}
        <View className="border-t border-border dark:border-dark-rule mt-6 pt-4">
          <View className="flex-row justify-between">
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              Today’s saved effort
            </Text>
            <Text className="text-[15px] font-semibold text-text-primary dark:text-dark-ink">
              {formatMinutes(todaySaved)}
            </Text>
          </View>
          <Text className="text-[13px] text-text-secondary dark:text-dark-muted mt-3">
            {isActive
              ? "This session is added when you finish."
              : `Daily goal · ${sessionGoal} min`}
          </Text>
        </View>
        {isActive && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Discard session"
            onPress={handleCancel}
            className="min-h-[44px] justify-center mt-4"
          >
            <Text className="text-[13px] text-text-secondary dark:text-dark-muted">
              Discard session
            </Text>
          </Pressable>
        )}
      </ScrollView>
      <View
        className="absolute left-6 right-6 flex-row "
        style={{
          gap: 12,
          bottom: isActive ? insets.bottom + 12 : floating.actionBottom,
        }}
      >
        {isActive && (
          <Action
            title={isPaused ? "Resume" : "Pause"}
            secondary
            onPress={handleStart}
          />
        )}
        {isActive && <Action title="Finish" onPress={handleStop} />}
        {!isActive && (
          <Action
            title="Start focus"
            onPress={handleStartWithIdentity}
            disabled={!identityToStart}
          />
        )}
      </View>
    </View>
  );
}

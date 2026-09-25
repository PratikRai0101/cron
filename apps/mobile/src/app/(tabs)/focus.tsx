import { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  AppState,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusStore, useTaskStore, useUserStore } from '@/stores';
import { Timer, RingProgress } from '@/components/focus';
import { IdentityPill } from '@/components/identity';
import { useIdentities } from '@/hooks/useIdentities';
import { formatMinutes } from '@monolith/shared';
import { uid } from '@/lib/id';
import { useKeepAwake } from 'expo-keep-awake';

export default function FocusTabScreen() {
  const insets = useSafeAreaInsets();
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
  useKeepAwake(isActive && !isPaused ? 'monolith-focus-session' : undefined);

  // Timer tick effect
  useEffect(() => {
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
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && isActive && !isPaused) tick();
    });
    return () => subscription.remove();
  }, [isActive, isPaused, tick]);

  const handleStart = useCallback(() => {
    if (!isActive) {
      startFocus(identities[0].id);
    } else if (isPaused) {
      resumeFocus();
    } else {
      pauseFocus();
    }
  }, [isActive, isPaused, startFocus, resumeFocus, pauseFocus]);

  const handleStop = useCallback(() => {
    if (elapsedSeconds >= 12 * 60 * 60) {
      Alert.alert('Session limit reached', 'Focus sessions are capped at 12 hours. This session will be saved at the limit.');
    }
    if (elapsedSeconds < 60) {
      Alert.alert('Session too short', 'Focus for at least one minute to save a session. Cancel to discard it.');
      return;
    }
    const result = stopFocus();
    if (result && result.duration >= 60) {
      const identity = identities.find((i) => i.id === result.identityId);
      logSession({
        id: uid('session-'),
        duration: result.duration,
        identityId: result.identityId,
        identityName: identity?.name || 'Focus',
        identityColor: identity?.color || '#ffffff',
        taskId: result.taskId,
        completedAt: new Date().toISOString(),
      });
    }
  }, [elapsedSeconds, identities, stopFocus, logSession]);

  const handleCancel = useCallback(() => {
    Alert.alert('Discard session?', 'Elapsed time will not be saved.', [
      { text: 'Keep focusing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: cancelFocus },
    ]);
  }, [cancelFocus]);

  const currentIdentity = identities.find((i) => i.id === currentIdentityId);
  const taskTitle = useTaskStore((s) => s.tasks.find((t) => t.id === currentTaskId)?.title);
  const sessionGoal = useUserStore((s) => s.dailyGoalMinutes);
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | null>(null);
  const identityToStart = identities.find((i) => i.id === selectedIdentityId) ?? identities[0];

  const handleStartWithIdentity = useCallback(() => {
    if (identityToStart) startFocus(identityToStart.id);
  }, [identityToStart, startFocus]);

  // If no active session, show idle state with start prompt
  if (!isActive) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-5">
        {/* Identity Picker */}
        <View className="absolute items-center" style={{ top: insets.top + 8 }}>
          <Text className="text-caption text-text-secondary uppercase mb-3 font-sans">
            Tracking
          </Text>
          <View className="flex-row gap-2">
            {identities.map((identity) => (
              <IdentityPill
                key={identity.id}
                name={identity.name}
                color={identity.color}
                active={identityToStart?.id === identity.id}
                onPress={() => setSelectedIdentityId(identity.id)}
              />
            ))}
          </View>
        </View>

        {/* Timer */}
        <Timer seconds={0} size="large" />

        {/* Hint */}
        <Text className="text-caption text-text-tertiary uppercase mt-4 font-sans">
          Press play to start
        </Text>

        {/* Start Button */}
        <Pressable
          onPress={handleStartWithIdentity}
          disabled={!identityToStart}
          accessibilityRole="button"
          accessibilityLabel="Start focus session"
          className="mt-12 w-20 h-20 rounded-full bg-accent items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-inverse text-2xl font-mono">▶</Text>
        </Pressable>
      </View>
    );
  }

  // Active focus mode
  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      {/* Identity Pill */}
      <View className="absolute items-center" style={{ top: insets.top + 8 }}>
        <View
          className="rounded-full px-4 py-1.5 border"
          style={{ borderColor: currentIdentity ? `${currentIdentity.color}4D` : 'rgba(255,255,255,0.12)' }}
        >
          <Text
            className="text-caption uppercase font-sans"
            style={{ color: currentIdentity?.color || '#ffffff' }}
          >
            {currentIdentity?.name || 'Focus'}
          </Text>
        </View>
      </View>

      {/* Timer with Ring */}
      <Pressable onPress={handleStart}>
        <RingProgress
          progress={Math.min(elapsedSeconds / (sessionGoal * 60), 1)}
          size={220}
          strokeWidth={6}
        >
          <Timer seconds={elapsedSeconds} size="large" paused={isPaused} />
        </RingProgress>
      </Pressable>

      {taskTitle && <Text className="text-body text-text-primary mt-3 font-sans" numberOfLines={2}>{taskTitle}</Text>}
      <Text className="text-body-sm text-text-secondary mt-2 font-sans">
        {formatMinutes(Math.floor(elapsedSeconds / 60))} / {sessionGoal}m
      </Text>

      {/* Controls */}
      <View className="absolute bottom-24 flex-row items-center gap-8">
        {/* Pause / Resume */}
        <Pressable
          onPress={handleStart}
          accessibilityRole="button"
          accessibilityLabel={isPaused ? 'Resume focus' : 'Pause focus'}
          className="w-11 h-11 rounded-full border border-border items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-primary text-sm font-mono">
            {isPaused ? '▶' : 'Ⅱ'}
          </Text>
        </Pressable>

        {/* Stop */}
        <Pressable
          onPress={handleStop}
          accessibilityRole="button"
          accessibilityLabel="Save and end focus session"
          className="w-16 h-16 rounded-full bg-accent items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-inverse text-lg font-mono">■</Text>
        </Pressable>

        {/* Cancel */}
        <Pressable
          onPress={handleCancel}
          accessibilityRole="button"
          accessibilityLabel="Discard focus session"
          className="w-11 h-11 rounded-full border border-border items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-secondary text-sm font-sans">✕</Text>
        </Pressable>
      </View>


    </View>
  );
}

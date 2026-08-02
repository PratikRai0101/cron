import { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusStore } from '@/stores';
import { Timer, RingProgress } from '@/components/focus';
import { IdentityPill } from '@/components/identity';
import { useIdentities } from '@/hooks/useIdentities';
import { formatMinutes } from '@monolith/shared';

const SESSION_GOAL_MINUTES = 60;

export default function FocusTabScreen() {
  const insets = useSafeAreaInsets();
  const identities = useIdentities();  const {
    isActive,
    isPaused,
    elapsedSeconds,
    currentIdentityId,
    startFocus,
    pauseFocus,
    resumeFocus,
    stopFocus,
    cancelFocus,
    tick,
    logSession,
  } = useFocusStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    const result = stopFocus();
    if (result && result.duration >= 60) {
      const identity = identities.find((i) => i.id === result.identityId);
      logSession({
        id: Date.now().toString(),
        duration: result.duration,
        identityId: result.identityId,
        identityName: identity?.name || 'Focus',
        identityColor: identity?.color || '#ffffff',
        taskId: result.taskId,
        completedAt: new Date().toISOString(),
      });
    }
  }, [stopFocus, logSession]);

  const handleCancel = useCallback(() => {
    cancelFocus();
  }, [cancelFocus]);

  const currentIdentity = identities.find((i) => i.id === currentIdentityId);
  const [selectedIdentityId, setSelectedIdentityId] = useState(identities[0].id);
  const selectedIdentity = identities.find((i) => i.id === selectedIdentityId) || identities[0];

  const handleStartWithIdentity = useCallback(() => {
    startFocus(selectedIdentityId);
  }, [selectedIdentityId, startFocus]);

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
                active={selectedIdentityId === identity.id}
                onPress={() => setSelectedIdentityId(identity.id)}
              />
            ))}
          </View>
        </View>

        {/* Timer */}
        <Timer seconds={0} size="large" />

        {/* Hint */}
        <Text className="text-caption text-text-tertiary uppercase mt-4 font-sans">
          Tap to start
        </Text>

        {/* Start Button */}
        <Pressable
          onPress={handleStartWithIdentity}
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
          progress={Math.min(elapsedSeconds / (SESSION_GOAL_MINUTES * 60), 1)}
          size={220}
          strokeWidth={6}
        >
          <Timer seconds={elapsedSeconds} size="large" paused={isPaused} />
        </RingProgress>
      </Pressable>

      {/* Task name placeholder */}
      <Text className="text-body-sm text-text-secondary mt-2 font-sans">
        {formatMinutes(Math.floor(elapsedSeconds / 60))} / {SESSION_GOAL_MINUTES}m
      </Text>

      {/* Controls */}
      <View className="absolute bottom-24 flex-row items-center gap-8">
        {/* Pause / Resume */}
        <Pressable
          onPress={handleStart}
          className="w-11 h-11 rounded-full border border-border items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-primary text-sm font-mono">
            {isPaused ? '▶' : '⏸'}
          </Text>
        </Pressable>

        {/* Stop */}
        <Pressable
          onPress={handleStop}
          className="w-16 h-16 rounded-full bg-accent items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-inverse text-lg font-mono">■</Text>
        </Pressable>

        {/* Cancel */}
        <Pressable
          onPress={handleCancel}
          className="w-11 h-11 rounded-full border border-border items-center justify-center active:scale-[0.97]"
        >
          <Text className="text-text-secondary text-sm font-sans">✕</Text>
        </Pressable>
      </View>

      {/* Cancel hint */}
      <Text className="absolute bottom-8 text-caption text-text-tertiary font-sans">
        Swipe up to cancel
      </Text>
    </View>
  );
}

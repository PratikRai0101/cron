import { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { useFocusStore } from '@/stores';
import { Timer, RingProgress } from '@/components/focus';
import { IdentityPill } from '@/components/identity';
import { demoIdentities } from '@/lib/demo-data';
import { formatMinutes } from '@monolith/shared';

const SESSION_GOAL_MINUTES = 60;

export default function FocusTabScreen() {
  const {
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
      startFocus(demoIdentities[0].id);
    } else if (isPaused) {
      resumeFocus();
    } else {
      pauseFocus();
    }
  }, [isActive, isPaused, startFocus, resumeFocus, pauseFocus]);

  const handleStop = useCallback(() => {
    const result = stopFocus();
    if (result) {
      // Would log session here
      console.log('Session completed:', result);
    }
  }, [stopFocus]);

  const handleCancel = useCallback(() => {
    cancelFocus();
  }, [cancelFocus]);

  const currentIdentity = demoIdentities.find((i) => i.id === currentIdentityId);

  // If no active session, show idle state with start prompt
  if (!isActive) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-5">
        {/* Identity Pill */}
        <View className="absolute top-16 items-center">
          <View
            className="rounded-full px-4 py-1.5 border"
            style={{ borderColor: `${demoIdentities[0].color}4D` }}
          >
            <Text
              className="text-caption uppercase font-sans"
              style={{ color: demoIdentities[0].color }}
            >
              {demoIdentities[0].name}
            </Text>
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
          onPress={handleStart}
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
      <View className="absolute top-16 items-center">
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

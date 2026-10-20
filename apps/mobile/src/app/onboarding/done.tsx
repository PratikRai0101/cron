import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors, useTheme } from "@/theme/ThemeContext";
import { useAppStore, useIdentityStore, useUserStore } from "@/stores";
import { CoreColumn } from "@/components/strata/CoreColumn";
import { Action } from "@/components/strata/Action";
import { MotionPressable } from "@/components/strata/MotionPressable";
import { Icon } from "@/components/strata/Icon";
import { layerRamp, type CoreBand } from "@/lib/coreColumn";
import { AREA_PRESETS } from "@/lib/presets";

/**
 * The last screen before the app: your core, with today's slot waiting, and
 * one button that starts your first session.
 */
export default function CoreScreen() {
  const c = useColors();
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const identities = useIdentityStore((s) => s.identities);
  const dailyGoal = useUserStore((s) => s.dailyGoalMinutes);
  const [room, setRoom] = useState(0);

  const identity = identities[0];
  const name = identity?.name ?? "Your work";

  const bands = useMemo<CoreBand[]>(() => {
    const ramp = layerRamp(c, dark);
    let used = 0;
    return AREA_PRESETS.map((area) => {
      const on = area.name === name;
      const fill = on ? c.primary : ramp[used++ % ramp.length];
      return { key: area.key, title: area.name, fill, accent: on };
    });
  }, [name, c, dark]);

  const handleStart = useCallback(() => {
    setOnboarded(true);
    router.replace("/(tabs)/grid");
  }, [setOnboarded]);

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top + 4,
        }}
      >
        <View style={{ height: 44, justifyContent: "center" }}>
          <MotionPressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back to the goal step"
            style={{
              position: "absolute",
              left: -12,
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="back" color={c.text} size={22} />
          </MotionPressable>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: -0.2,
              color: c.text,
              textAlign: "center",
            }}
          >
            Monolith
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "InstrumentSerif",
            fontSize: 34,
            lineHeight: 37,
            letterSpacing: -0.6,
            color: c.text,
            marginTop: 26,
          }}
        >
          {name}, {dailyGoal} minutes a day.
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: c.secondaryText,
            marginTop: 10,
          }}
        >
          Every session adds a band to your core.
        </Text>
        <View
          style={{ flex: 1, justifyContent: "flex-start" }}
          onLayout={(event) =>
            setRoom(event.nativeEvent.layout.height - 16)
          }
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 1.6,
              color: c.primary,
              textAlign: "center",
              marginTop: 16,
              marginBottom: 10,
            }}
          >
            TODAY
          </Text>
          <CoreColumn bands={bands} availableHeight={room - 40} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 34 }}>
        <MotionPressable
          onPress={() => router.push("/onboarding/set-goal")}
          accessibilityRole="button"
          accessibilityLabel="Change identity or goal"
          style={{ paddingVertical: 12 }}
        >
          <Text
            style={{
              fontSize: 13,
              color: c.tertiaryText,
              textAlign: "center",
            }}
          >
            Change identity or goal
          </Text>
        </MotionPressable>
        <Action title="Start your first session" onPress={handleStart} />
      </View>
    </View>
  );
}

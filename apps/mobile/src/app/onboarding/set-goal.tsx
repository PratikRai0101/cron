import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/theme/ThemeContext";
import { useIdentityStore, useUserStore } from "@/stores";
import { CoreSection } from "@/components/strata/CoreSection";
import { DepthRuler } from "@/components/strata/DepthRuler";
import { Action } from "@/components/strata/Action";
import { AnimatedTotal } from "@/components/strata/AnimatedTotal";
import { MotionPressable } from "@/components/strata/MotionPressable";
import { Icon } from "@/components/strata/Icon";

/**
 * The second decision: how much a day? The goal is not a number on a slider,
 * it is how deep one day of work is cut into the core.
 */
export default function GoalScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const dailyGoal = useUserStore((s) => s.dailyGoalMinutes);
  const setDailyGoal = useUserStore((s) => s.setDailyGoal);
  const identities = useIdentityStore((s) => s.identities);
  const [goal, setGoal] = useState(
    Math.min(120, Math.max(15, Math.round(dailyGoal / 15) * 15)),
  );
  const [room, setRoom] = useState(0);

  const identity = identities[0];
  const label = identity?.name ?? "Your work";

  useEffect(() => {
    setDailyGoal(goal);
  }, [goal, setDailyGoal]);

  const handleContinue = useCallback(() => {
    setDailyGoal(goal);
    router.push("/onboarding/done");
  }, [goal, setDailyGoal]);

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
            accessibilityLabel="Back to the area step"
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
            lineHeight: 36,
            letterSpacing: -0.6,
            color: c.text,
            marginTop: 26,
          }}
        >
          How much a day?
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: c.secondaryText,
            marginTop: 10,
          }}
        >
          Minutes of focused work each day.{"\n"}Change it anytime in
          Settings.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 28,
          }}
        >
          <AnimatedTotal
            value={goal}
            style={{
              fontSize: 76,
              lineHeight: 70,
              fontWeight: "600",
              letterSpacing: -2.4,
              color: c.text,
              fontVariant: ["tabular-nums"],
            }}
          />
          <Text
            style={{
              fontFamily: "InstrumentSerif",
              fontSize: 26,
              lineHeight: 26,
              color: c.secondaryText,
              letterSpacing: -0.2,
              marginLeft: 6,
            }}
          >
            min a day
          </Text>
        </View>
        <View style={{ marginTop: 18 }}>
          <DepthRuler value={goal} onChange={setGoal} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-start" }}
          onLayout={(event) => setRoom(event.nativeEvent.layout.height)}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 1.6,
              color: c.primary,
              textAlign: "center",
              marginTop: 14,
              marginBottom: 10,
            }}
          >
            TODAY
          </Text>
          <CoreSection
            minutes={goal}
            label={label}
            availableHeight={room - 40}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            lineHeight: 18,
            color: c.tertiaryText,
            marginTop: 16,
          }}
        >
          {label}, one day of work, cut to this depth.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 34 }}>
        <Action title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}

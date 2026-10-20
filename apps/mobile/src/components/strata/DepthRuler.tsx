import React, { useMemo, useState } from "react";
import {
  PanResponder,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/theme/ThemeContext";
import { useReducedMotion } from "@/hooks/useMotion";

interface Props {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  step?: number;
}

const INSET = 14;

/**
 * A depth scale, not a slider: the stops are the measurement and the thumb
 * rides them. Drag it, tap a stop, or nudge it from the accessibility
 * actions. The value snaps to the step, so it always means a real depth.
 */
export function DepthRuler({ value, onChange, max = 120, step = 15 }: Props) {
  const { colors } = useTheme();
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const stops = useMemo(
    () => Array.from({ length: max / step + 1 }, (_, i) => i * step),
    [max, step],
  );

  const position = (v: number) =>
    width ? INSET + (v / max) * (width - INSET * 2) : INSET;

  const valueFromX = (x: number) => {
    const usable = Math.max(1, width - INSET * 2);
    const raw = ((x - INSET) / usable) * max;
    return Math.min(max, Math.max(step, Math.round(raw / step) * step));
  };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          const next = valueFromX(event.nativeEvent.locationX);
          if (next !== value) {
            if (!reduced) void Haptics.selectionAsync().catch(() => {});
            onChange(next);
          }
        },
        onPanResponderMove: (event) => {
          const next = valueFromX(event.nativeEvent.locationX);
          if (next !== value) {
            if (!reduced) void Haptics.selectionAsync().catch(() => {});
            onChange(next);
          }
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, width, reduced, max, step],
  );

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  return (
    <View
      onLayout={onLayout}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Daily goal in minutes"
      accessibilityValue={{ min: step, max, now: value }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(event) => {
        const next =
          event.nativeEvent.actionName === "increment"
            ? Math.min(max, value + step)
            : Math.max(step, value - step);
        if (next !== value) {
          if (!reduced) void Haptics.selectionAsync().catch(() => {});
          onChange(next);
        }
      }}
      style={{ height: 62 }}
      {...pan.panHandlers}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: INSET,
          right: INSET,
          top: 13,
          height: 2,
          backgroundColor: colors.separator,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: INSET,
          top: 13,
          height: 2,
          width: Math.max(0, position(value) - INSET),
          backgroundColor: colors.primary,
        }}
      />
      {stops.map((stop) => (
        <View
          key={stop}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: position(stop),
            top: stop === value ? 2 : 5,
            width: 1,
            height: stop === value ? 11 : 8,
            backgroundColor:
              stop === value ? colors.primary : colors.tertiaryText,
            opacity: stop === value ? 1 : 0.55,
          }}
        />
      ))}
      {stops.slice(1).map((stop) => (
        <Text
          key={`label-${stop}`}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: position(stop),
            top: 31,
            fontSize: 11,
            lineHeight: 13,
            color: stop === value ? colors.primary : colors.tertiaryText,
            fontWeight: stop === value ? "600" : "400",
            transform: [{ translateX: -12 }],
            width: 24,
            textAlign: "center",
          }}
        >
          {stop}
        </Text>
      ))}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: position(value) - 11,
          top: 3,
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
}

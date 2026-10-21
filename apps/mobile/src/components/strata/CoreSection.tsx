import React, { useEffect, useRef, useState } from "react";
import { Animated, View, type LayoutChangeEvent } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/theme/ThemeContext";
import { useReducedMotion } from "@/hooks/useMotion";
import {
  coreBand,
  coreEdge,
  layerRamp,
  CORE_MINUTES,
  COLUMN_TOP,
  COLUMN_WIDTH,
} from "@/lib/coreColumn";

interface Props {
  /** Minutes of focused work: how deep today's band is cut. */
  minutes: number;
  /** The name of the band being cut. */
  label: string;
  /** Room the section has to work with, in points. */
  availableHeight?: number;
}

/**
 * One day of work, cut to a depth. The whole core is 120 minutes deep, so a
 * 60-minute goal is exactly half of it and a 120-minute goal fills it.
 *
 * The band re-cuts itself when the goal moves: a critically damped spring,
 * 230 stiffness / 25 damping, no bounce, interruptible mid-drag, and one
 * light impact when it settles. With Reduce Motion on, the band re-cuts in
 * place over 120 ms and the impact is dropped.
 */
export function CoreSection({ minutes, label, availableHeight }: Props) {
  const { colors, dark } = useTheme();
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(minutes);
  const [depthValue] = useState(() => new Animated.Value(minutes));
  const previous = useRef(minutes);

  useEffect(() => {
    if (previous.current === minutes) return;
    previous.current = minutes;
    if (reduced) {
      // Reduced motion: the band re-cuts in place over 120 ms, no spring.
      const listener = depthValue.addListener(({ value }) => setShown(value));
      const animation = Animated.timing(depthValue, {
        toValue: minutes,
        duration: 120,
        useNativeDriver: false,
      });
      animation.start();
      return () => {
        depthValue.removeListener(listener);
        animation.stop();
      };
    }
    const listener = depthValue.addListener(({ value }) => setShown(value));
    const animation = Animated.spring(depthValue, {
      toValue: minutes,
      stiffness: 230,
      damping: 25,
      mass: 1,
      useNativeDriver: false,
    });
    animation.start(() => {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
        () => {},
      );
    });
    return () => {
      depthValue.removeListener(listener);
      animation.stop();
    };
  }, [minutes, reduced, depthValue]);

  const [width, setWidth] = useState(0);
  const scale = width ? width / COLUMN_WIDTH : 1;
  const bevelHi = dark ? "rgba(237,243,244,0.16)" : "rgba(255,255,255,0.24)";
  const bevelLo = dark ? "rgba(8,14,19,0.5)" : "rgba(24,44,59,0.2)";
  const onAccent = colors.onPrimary;
  const ramp = layerRamp(colors, dark);

  // The section is a slice of the same 354-wide drawing as the column.
  const height = availableHeight && availableHeight > 0 ? availableHeight / scale : 280;
  const depth = height - COLUMN_TOP;
  const band = Math.round((shown / CORE_MINUTES) * depth);
  const mid = Math.round(depth * 0.72);
  const foot = depth - 14;

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);
  // Nothing to draw until the section has been measured.
  if (!width) return <View onLayout={onLayout} style={{ width: "100%" }} />;

  return (
    <View
      onLayout={onLayout}
      style={{ width: "100%" }}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${label}. One day of work cut to ${minutes} minutes deep, on a core ${CORE_MINUTES} minutes deep.`}
    >
      <Svg
        width={width}
        height={height * scale}
        viewBox={`0 0 354 ${height}`}
      >
        <Path d={coreBand(0, band)} fill={colors.primary} />
        {band < mid ? (
          <Path d={coreBand(band, mid)} fill={ramp[1]} />
        ) : null}
        {mid < foot ? (
          <Path d={coreBand(mid, foot)} fill={ramp[2]} />
        ) : null}
        <Path
          d={coreEdge(0, -0.6)}
          fill="none"
          stroke={bevelHi}
          strokeWidth={1}
        />
        <Path
          d={coreEdge(band, 0.6)}
          fill="none"
          stroke={bevelLo}
          strokeWidth={1}
        />
        {band > 30 ? (
          <SvgText
            x={22}
            y={COLUMN_TOP + Math.min(band / 2 + 8, band - 20)}
            fontFamily="InstrumentSerif"
            fontSize={28}
            fill={onAccent}
          >
            {label}
          </SvgText>
        ) : null}
      </Svg>
    </View>
  );
}

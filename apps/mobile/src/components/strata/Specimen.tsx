import * as Haptics from "expo-haptics";
import Svg, { G, Path } from "react-native-svg";
import { Animated, AccessibilityInfo, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { useColors } from "@/theme/ThemeContext";
interface SpecimenProps {
  height?: number;
  empty?: boolean;
  landing?: boolean;
}
const AnimatedG = Animated.createAnimatedComponent(G);
export function Specimen({
  height = 100,
  empty = false,
  landing = false,
}: SpecimenProps) {
  const c = useColors();
  const opacity = useRef(new Animated.Value(landing ? 0 : 1)).current;
  const y = useRef(new Animated.Value(landing ? -40 : 0)).current;
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (active && landing) {
        y.setValue(reduced ? 0 : -40);
        opacity.setValue(reduced ? 0 : 1);
        if (reduced)
          Animated.timing(opacity, {
            toValue: 1,
            duration: 120,
            useNativeDriver: false,
          }).start();
        Animated.timing(y, {
          toValue: 0,
          duration: reduced ? 120 : 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished && !reduced)
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
              () => {},
            );
        });
      }
    });
    return () => {
      active = false;
      y.stopAnimation();
      opacity.stopAnimation();
    };
  }, [landing, y, opacity]);
  const fill = (value: string) => (empty ? "none" : value);
  return (
    <Svg
      width="100%"
      height={height}
      viewBox={landing ? "0 -45 354 185" : "0 0 354 140"}
      accessibilityLabel={
        empty ? "An unworked mineral sample" : "Layers of accumulated effort"
      }
    >
      <G
        stroke={empty ? c.rockSide : c.background}
        strokeWidth={1}
        opacity={empty ? 0.6 : 1}
      >
        <Path fill={fill(c.rockTop)} d="m18 18 266-15 55 23-269 17Z" />
        <Path fill={fill(c.rockSide)} d="m18 18 52 25v87l-52-28Z" />
        <Path fill={fill(c.rockMain)} d="m70 43 269-17v85L70 130Z" />
        <Path
          fill={fill(c.rockPale)}
          d="m18 33 52 25 54-5 49 3 51-10 63 2 52-10v21l-52 4-64-3-51 11-48-3-54 10-52-29Z"
        />
        <Path
          fill={fill(c.rockMid)}
          d="m18 66 52 27 56-12 42 7 60-13 59 5 52-11v11l-52 10-59-5-60 14-42-6-56 12-52-28Z"
        />
        <Path
          fill={fill(c.primary)}
          d="m18 85 52 25 52-10 48 6 58-12 65 5 46-10v22L70 130l-52-28Z"
        />
      </G>
      {landing && (
        <AnimatedG y={y} opacity={opacity}>
          <Path
            fill={c.primary}
            stroke={c.background}
            d="m18 18 266-15 55 23-269 17-52-25Z"
          />
        </AnimatedG>
      )}
    </Svg>
  );
}

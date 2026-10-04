import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated } from "react-native";

export function useReducedMotion() {
  // Keep movement off until the preference has been read.
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (active) setReduced(value);
      })
      .catch(() => {});
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduced,
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return reduced;
}

export function useSpringValue(target: number, native = true) {
  const reduced = useReducedMotion();
  const [value] = useState(() => new Animated.Value(target));
  useEffect(() => {
    value.stopAnimation();
    if (reduced) value.setValue(target);
    else
      Animated.spring(value, {
        toValue: target,
        stiffness: 360,
        damping: 36,
        mass: 1,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
        useNativeDriver: native,
      }).start();
    return () => value.stopAnimation();
  }, [target, reduced, native, value]);
  return value;
}

import { useEffect, useRef, useState } from "react";
import { Animated, type TextProps } from "react-native";
import { cssInterop } from "nativewind";
import { useReducedMotion } from "@/hooks/useMotion";
const MotionText = Animated.Text;
cssInterop(MotionText, { className: "style" });
export function AnimatedTotal({
  value,
  animateOnMount = false,
  ...props
}: TextProps & {
  className?: string;
  value: number;
  animateOnMount?: boolean;
}) {
  const reduced = useReducedMotion();
  const previous = useRef<number | null>(animateOnMount ? null : value);
  const [opacity] = useState(() => new Animated.Value(1));
  const [offset] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (previous.current === value) {
      offset.setValue(0);
      // A preference change may interrupt a fade. Finish it in place.
      const fade = Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      });
      fade.start();
      return () => fade.stop();
    }
    previous.current = value;
    opacity.setValue(0.4);
    offset.setValue(reduced ? 0 : 6);
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.spring(offset, {
        toValue: 0,
        stiffness: 360,
        damping: 36,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [value, reduced, opacity, offset]);
  return (
    <MotionText
      {...props}
      style={[props.style, { opacity, transform: [{ translateY: offset }] }]}
    >
      {value}
    </MotionText>
  );
}

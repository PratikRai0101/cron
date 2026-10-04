import { useState } from "react";
import {
  Animated,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { styled } from "nativewind";
import { useReducedMotion, useSpringValue } from "@/hooks/useMotion";
const AnimatedPressable = styled(Animated.createAnimatedComponent(Pressable));
type Props = Omit<PressableProps, "style"> & {
  className?: string;
  style?: StyleProp<ViewStyle>;
};
export function MotionPressable({
  onPressIn,
  onPressOut,
  style,
  disabled,
  ...props
}: Props) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();
  const scale = useSpringValue(pressed && !disabled && !reduced ? 0.97 : 1);
  return (
    <AnimatedPressable
      {...props}
      disabled={disabled}
      onPressIn={(event) => {
        setPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        onPressOut?.(event);
      }}
      style={[
        style,
        {
          transform: [{ scale }],
          ...(pressed && reduced && !disabled ? { opacity: 0.8 } : {}),
        },
      ]}
    />
  );
}

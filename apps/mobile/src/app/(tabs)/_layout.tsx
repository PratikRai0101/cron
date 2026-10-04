import * as Haptics from "expo-haptics";
import { useSpringValue } from "@/hooks/useMotion";
import { MotionPressable } from "@/components/strata/MotionPressable";
import { Tabs } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import {
  GlassView,
  isLiquidGlassAvailable,
  isGlassEffectAPIAvailable,
} from "expo-glass-effect";
import { Animated, Text, View, AccessibilityInfo } from "react-native";
import {
  FloatingNavigationProvider,
  useFloatingNavigation,
} from "@/components/strata/FloatingNavigation";
import { useFocusStore } from "@/stores";
import { useTheme } from "@/theme/ThemeContext";
import { Icon } from "@/components/strata/Icon";
type BottomTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];
function StrataTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors: c, dark } = useTheme();
  const [opaque, setOpaque] = useState(false);
  const [width, setWidth] = useState(0);
  const selection = useSpringValue(state.index);
  const tabWidth = Math.max(0, (width - 10) / state.routes.length);
  useEffect(() => {
    AccessibilityInfo.isReduceTransparencyEnabled?.().then(setOpaque);
    const subscription = AccessibilityInfo.addEventListener(
      "reduceTransparencyChanged",
      setOpaque,
    );
    return () => subscription?.remove();
  }, []);
  const glass =
    !opaque && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();
  const floating = useFloatingNavigation();
  const active = useFocusStore((s) => s.isActive);
  if (active && state.routes[state.index].name === "focus") return null;
  return (
    <View
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
        floating.setHeight(event.nativeEvent.layout.height);
      }}
      className="absolute left-4 right-4 rounded-full border flex-row p-1"
      style={{
        bottom: floating.bottom,
        backgroundColor: glass ? "transparent" : c.glass,
        borderColor: c.background,
        shadowColor: c.text,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
      }}
    >
      {glass && (
        <GlassView
          pointerEvents="none"
          glassEffectStyle="regular"
          colorScheme={dark ? "dark" : "light"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 36,
          }}
        />
      )}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          bottom: 5,
          width: tabWidth,
          borderRadius: 32,
          backgroundColor: c.selected,
          transform: [{ translateX: Animated.multiply(selection, tabWidth) }],
        }}
      />
      {state.routes.map((route, index) => {
        const selected = state.index === index;
        const name = route.name as "grid" | "focus" | "identity" | "profile";
        const title = descriptors[route.key].options.title ?? route.name;
        return (
          <MotionPressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            aria-selected={selected}
            accessibilityLabel={title}
            onLongPress={() =>
              navigation.emit({ type: "tabLongPress", target: route.key })
            }
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!selected && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
                void Haptics.selectionAsync().catch(() => {});
              }
            }}
            className="flex-1 rounded-full items-center justify-center py-2 gap-1 min-h-[54px]"
          >
            <Icon name={name} color={selected ? c.primary : c.text} />
            <Text
              className="text-[11px]"
              style={{ color: selected ? c.primary : c.text }}
            >
              {title}
            </Text>
          </MotionPressable>
        );
      })}
    </View>
  );
}
export default function TabLayout() {
  return (
    <FloatingNavigationProvider>
      <Tabs
        tabBar={(props) => <StrataTabs {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="grid" options={{ title: "Grid" }} />
        <Tabs.Screen name="focus" options={{ title: "Focus" }} />
        <Tabs.Screen name="identity" options={{ title: "Identity" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </FloatingNavigationProvider>
  );
}

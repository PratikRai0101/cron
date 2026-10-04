import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import {
  GlassView,
  isLiquidGlassAvailable,
  isGlassEffectAPIAvailable,
} from "expo-glass-effect";
import { Pressable, Text, View, AccessibilityInfo } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusStore } from "@/stores";
import { useTheme } from "@/theme/ThemeContext";
import { Icon } from "@/components/strata/Icon";
function StrataTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors: c, dark } = useTheme();
  const [opaque, setOpaque] = useState(false);
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
  const inset = useSafeAreaInsets();
  const active = useFocusStore((s) => s.isActive);
  if (active && state.routes[state.index].name === "focus") return null;
  return (
    <View
      className="absolute left-4 right-4 rounded-full border flex-row p-1"
      style={{
        bottom: Math.max(inset.bottom, 16),
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
      {state.routes.map((route, index) => {
        const selected = state.index === index;
        const name = route.name as "grid" | "focus" | "identity" | "profile";
        const title = descriptors[route.key].options.title ?? route.name;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
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
              if (!selected && !event.defaultPrevented)
                navigation.navigate(route.name, route.params);
            }}
            className="flex-1 rounded-full items-center justify-center py-2 gap-1 min-h-[54px]"
            style={{ backgroundColor: selected ? c.selected : "transparent" }}
          >
            <Icon name={name} color={selected ? c.primary : c.text} />
            <Text
              className="text-[11px]"
              style={{ color: selected ? c.primary : c.text }}
            >
              {title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <StrataTabs {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="grid" options={{ title: "Grid" }} />
      <Tabs.Screen name="focus" options={{ title: "Focus" }} />
      <Tabs.Screen name="identity" options={{ title: "Identity" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

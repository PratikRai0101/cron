import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors, useTheme } from "@/theme/ThemeContext";
import { useIdentityStore } from "@/stores";
import { CoreColumn } from "@/components/strata/CoreColumn";
import { Action } from "@/components/strata/Action";
import { layerRamp, type CoreBand } from "@/lib/coreColumn";
import { AREA_PRESETS } from "@/lib/presets";

const AREAS = AREA_PRESETS;

/**
 * The first decision: what are you working on? The four identities are four
 * layers of rock and the one you pick is dyed with the accent.
 */
export default function AreaScreen() {
  const c = useColors();
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const seedFromPresets = useIdentityStore((s) => s.seedFromPresets);
  const [selected, setSelected] = useState(AREAS[0].key);
  const [room, setRoom] = useState(0);

  const bands = useMemo<CoreBand[]>(() => {
    const ramp = layerRamp(c, dark);
    let used = 0;
    return AREAS.map((area) => {
      const on = area.key === selected;
      const fill = on ? c.primary : ramp[used++ % ramp.length];
      return {
        key: area.key,
        title: area.name,
        subtitle: area.description,
        fill,
        accent: on,
      };
    });
  }, [c, dark, selected]);

  const handleContinue = useCallback(() => {
    const area = AREAS.find((a) => a.key === selected);
    if (!area) return;
    seedFromPresets([
      { id: area.key, name: area.name, color: area.color, totalMinutes: 0 },
    ]);
    router.push("/onboarding/set-goal");
  }, [selected, seedFromPresets]);

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top + 4,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "700",
            letterSpacing: -0.2,
            color: c.text,
          }}
        >
          Monolith
        </Text>
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
          What are you{"\n"}working on?
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: c.secondaryText,
            marginTop: 10,
          }}
        >
          Pick one identity to start with.
        </Text>
        <View
          style={{ flex: 1, justifyContent: "flex-start" }}
          onLayout={(event) => setRoom(event.nativeEvent.layout.height)}
        >
          <CoreColumn
            bands={bands}
            availableHeight={room}
            onSelect={setSelected}
            selectedKeys={[selected]}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 34 }}>
        <Action title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}

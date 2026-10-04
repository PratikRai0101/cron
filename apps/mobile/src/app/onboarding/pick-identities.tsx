import { useColors } from "@/theme/ThemeContext";
import { Icon } from "@/components/strata/Icon";
import { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useIdentityStore } from "@/stores";

const ALL_IDENTITIES = [
  {
    id: "1",
    name: "Code",
    color: "#ffffff",
    description: "Programming, development, engineering",
  },
  {
    id: "2",
    name: "Write",
    color: "#a3a3a3",
    description: "Writing, blogging, documentation",
  },
  {
    id: "3",
    name: "Design",
    color: "#a855f7",
    description: "UI/UX, graphic design, creative",
  },
  {
    id: "4",
    name: "Exercise",
    color: "#737373",
    description: "Fitness, sports, movement",
  },
];

const FALLBACK_IDS = ["1"];

export default function PickIdentitiesScreen() {
  const c = useColors();
  const seedFromPresets = useIdentityStore((s) => s.seedFromPresets);
  const [selected, setSelected] = useState<Set<string>>(new Set(FALLBACK_IDS));

  const toggle = useCallback((id: string) => {
    setSelected((previous) => (previous.has(id) ? previous : new Set([id])));
  }, []);

  const commit = useCallback(
    (ids: string[]) => {
      seedFromPresets(
        ALL_IDENTITIES.filter((i) => ids.includes(i.id)).map(
          ({ description: _description, ...rest }) => rest,
        ),
      );
      router.replace("/onboarding/widget-setup");
    },
    [seedFromPresets],
  );

  const handleNext = useCallback(() => {
    commit([...selected]);
  }, [commit, selected]);

  const handleSkip = useCallback(() => {
    commit(FALLBACK_IDS);
  }, [commit]);

  return (
    <View className="flex-1 bg-background dark:bg-dark-ground justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 self-center items-center">
        <View className="flex-row " style={{ gap: 6 }}>
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-accent dark:bg-dark-accent" />
          <View className="w-2 h-2 rounded-full bg-border" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary dark:text-dark-ink  text-center">
        Pick your identities
      </Text>
      <Text className="text-body text-text-secondary dark:text-dark-muted  text-center mt-3 max-w-[280px] self-center">
        Choose one area to start. The Free plan supports one active identity.
      </Text>

      <View className="mt-8 " style={{ gap: 12 }}>
        {ALL_IDENTITIES.map((identity) => {
          const isSelected = selected.has(identity.id);
          return (
            <Pressable
              key={identity.id}
              onPress={() => toggle(identity.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${identity.name}. ${identity.description}`}
              className="flex-row items-center p-4 rounded-monolith border"
              style={{
                borderColor: isSelected ? c.primary : c.separator,
                backgroundColor: isSelected ? c.selected : "transparent",
              }}
            >
              {/* Checkbox */}
              <View
                className="w-5 h-5 rounded-monolith border-2 items-center justify-center mr-3"
                style={{
                  borderColor: isSelected ? c.primary : c.secondaryText,
                  backgroundColor: isSelected ? c.primary : "transparent",
                }}
              >
                {isSelected && (
                  <Icon name="check" color={c.onPrimary} size={12} />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-body " style={{ color: c.text }}>
                  {identity.name}
                </Text>
                <Text className="text-caption text-text-secondary dark:text-dark-muted  mt-0.5">
                  {identity.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handleNext}
        className="mt-8 bg-accent dark:bg-dark-accent px-8 py-3 rounded-monolith self-center active:scale-[0.97]"
        style={{ opacity: selected.size > 0 ? 1 : 0.5 }}
        disabled={selected.size === 0}
      >
        <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold text-body">
          Continue
        </Text>
      </Pressable>
      <Pressable onPress={handleSkip} className="mt-4 self-center">
        <Text className="text-caption text-text-tertiary dark:text-dark-tertiary ">
          Skip
        </Text>
      </Pressable>
    </View>
  );
}

import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Input } from "@/components/ui";
import { useIdentityStore, useUserStore } from "@/stores";

const IDENTITY_COLORS = [
  "#ffffff",
  "#a3a3a3",
  "#a855f7",
  "#737373",
  "#00e5ff",
  "#ff6b6b",
  "#ffb020",
  "#7cf29c",
];

export default function AddIdentityScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const identities = useIdentityStore((s) => s.identities);
  const updateIdentity = useIdentityStore((s) => s.updateIdentity);
  const tier = useUserStore((s) => s.subscriptionTier);
  const addIdentity = useIdentityStore((s) => s.addIdentity);
  const existing = identities.find((identity) => identity.id === id);
  const [name, setName] = useState(existing?.name ?? "");
  const [color, setColor] = useState(existing?.color ?? IDENTITY_COLORS[0]);
  const duplicate = identities.some(
    (identity) =>
      identity.id !== id &&
      !identity.isArchived &&
      identity.name.toLowerCase() === name.trim().toLowerCase(),
  );
  const atFreeLimit =
    !existing &&
    tier === "free" &&
    identities.filter((identity) => !identity.isArchived).length >= 1;
  const canSave = !!name.trim() && !duplicate && !atFreeLimit;

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed || duplicate || atFreeLimit) return;

    if (existing) updateIdentity(existing.id, { name: trimmed, color });
    else addIdentity({ name: trimmed, color });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background dark:bg-dark-ground"
    >
      <View className="flex-1">
        <ScrollView
          keyboardDismissMode="on-drag"
          className="px-5"
          contentContainerStyle={{
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 32,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-h2 text-text-primary dark:text-dark-ink  mb-6">
            {existing ? "Edit Identity" : "New Identity"}
          </Text>

          {/* Name Input */}
          <Input
            label="Name"
            placeholder="e.g. Music"
            value={name}
            onChangeText={setName}
            maxLength={24}
            error={
              duplicate
                ? "An active identity already uses this name."
                : atFreeLimit
                  ? "The Free plan supports one active identity."
                  : undefined
            }
          />

          {/* Color Picker */}
          <Text className="text-caption text-text-secondary dark:text-dark-muted uppercase  mt-6 mb-3">
            Color
          </Text>
          <View className="flex-row  flex-wrap" style={{ gap: 12 }}>
            {IDENTITY_COLORS.map((c) => (
              <Pressable
                key={c}
                onPress={() => setColor(c)}
                accessibilityRole="button"
                accessibilityLabel={`${c === color ? "Selected " : ""}color ${c}`}
                accessibilityState={{ selected: color === c }}
                className="w-11 h-11 rounded-full items-center justify-center"
                style={{
                  backgroundColor: c,
                  borderWidth: color === c ? 3 : 0,
                  borderColor: "#ffffff",
                  opacity: color === c ? 1 : 0.45,
                }}
              >
                {color === c && (
                  <Text className="text-text-inverse dark:text-dark-on-accent text-sm ">
                    ✓
                  </Text>
                )}
              </Pressable>
            ))}
          </View>

          {/* Actions */}
          <View className="flex-row  mt-8" style={{ gap: 12 }}>
            <Pressable
              onPress={() => router.back()}
              className="flex-1 py-3 rounded-monolith border border-border dark:border-dark-rule items-center active:opacity-70"
            >
              <Text className="text-text-primary dark:text-dark-ink  font-semibold">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="flex-1 py-3 rounded-monolith bg-accent dark:bg-dark-accent items-center active:opacity-70"
              style={{ opacity: canSave ? 1 : 0.5 }}
              disabled={!canSave}
            >
              <Text className="text-text-inverse dark:text-dark-on-accent  font-semibold">
                {existing ? "Save Changes" : "Save"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

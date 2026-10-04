import { useColors } from "@/theme/ThemeContext";
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
import { useTaskStore } from "@/stores";
import { useIdentities } from "@/hooks/useIdentities";
import { formatDate } from "@monolith/shared";

export default function LogTaskScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const identities = useIdentities();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = useTaskStore((s) => s.tasks.find((item) => item.id === id));
  const [title, setTitle] = useState(task?.title ?? "");
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | null>(
    task?.identityId ?? null,
  );
  const [estimatedMinutes, setEstimatedMinutes] = useState(
    task?.estimatedMinutes?.toString() ?? "",
  );
  const [recurrenceRule, setRecurrenceRule] = useState(
    task?.recurrenceRule ?? "",
  );
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const selectedIdentity =
    identities.find((i) => i.id === selectedIdentityId) ?? identities[0];
  const estimate = estimatedMinutes ? Number(estimatedMinutes) : undefined;
  const canSave =
    !!title.trim() &&
    !!selectedIdentity &&
    (estimate === undefined ||
      (Number.isInteger(estimate) && estimate > 0 && estimate <= 720));

  const handleSave = () => {
    if (!canSave || !selectedIdentity) return;

    const fields = {
      title: title.trim(),
      identityId: selectedIdentity.id,
      identityName: selectedIdentity.name,
      identityColor: selectedIdentity.color,
      estimatedMinutes: estimate,
      recurrenceRule: recurrenceRule || undefined,
    };
    if (task) updateTask(task.id, fields);
    else addTask({ ...fields, dueDate: formatDate(new Date()) });

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
            {task ? "Edit Task" : "New Task"}
          </Text>

          {/* Title Input */}
          <Input
            label="Task"
            placeholder="What are you working on?"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          {/* Identity Picker */}
          <Text className="text-caption text-text-secondary dark:text-dark-muted uppercase  mt-6 mb-3">
            Identity
          </Text>
          <View className="flex-row  flex-wrap" style={{ gap: 8 }}>
            {identities.map((identity) => (
              <Pressable
                key={identity.id}
                onPress={() => setSelectedIdentityId(identity.id)}
                className="rounded-full px-4 min-h-[44px] justify-center border"
                style={{
                  borderColor: c.separator,
                  backgroundColor:
                    selectedIdentity?.id === identity.id
                      ? c.selected
                      : "transparent",
                }}
              >
                <Text
                  className="text-caption uppercase "
                  style={{
                    color:
                      selectedIdentity?.id === identity.id
                        ? c.text
                        : c.secondaryText,
                  }}
                >
                  {identity.name}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Estimated Time Input */}
          <View className="mt-6">
            <Input
              label="Estimated time (minutes)"
              placeholder="e.g. 30"
              value={estimatedMinutes}
              onChangeText={setEstimatedMinutes}
              keyboardType="number-pad"
            />
          </View>

          <Text className="text-caption text-text-secondary dark:text-dark-muted uppercase  mt-6 mb-3">
            Repeat
          </Text>
          <View className="flex-row  flex-wrap" style={{ gap: 8 }}>
            {[
              { label: "Never", value: "" },
              { label: "Daily", value: "FREQ=DAILY" },
              { label: "Weekly", value: "FREQ=WEEKLY" },
              { label: "Monthly", value: "FREQ=MONTHLY" },
            ].map((option) => (
              <Pressable
                key={option.value || "never"}
                onPress={() => setRecurrenceRule(option.value)}
                accessibilityRole="button"
                accessibilityState={{
                  selected: recurrenceRule === option.value,
                }}
                className={`rounded-full px-4 py-2 border ${recurrenceRule === option.value ? "border-accent bg-surface dark:bg-dark-surface" : "border-border dark:border-dark-rule"}`}
              >
                <Text
                  className={`text-caption  ${recurrenceRule === option.value ? "text-accent dark:text-dark-accent" : "text-text-secondary dark:text-dark-muted"}`}
                >
                  {option.label}
                </Text>
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
                {task ? "Save Changes" : "Save"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

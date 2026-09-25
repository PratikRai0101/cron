import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input } from '@/components/ui';
import { useTaskStore } from '@/stores';
import { useIdentities } from '@/hooks/useIdentities';
import { formatDate } from '@monolith/shared';

export default function LogTaskScreen() {
  const insets = useSafeAreaInsets();
  const identities = useIdentities();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = useTaskStore((s) => s.tasks.find((item) => item.id === id));
  const [title, setTitle] = useState(task?.title ?? '');
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | null>(task?.identityId ?? null);
  const [estimatedMinutes, setEstimatedMinutes] = useState(task?.estimatedMinutes?.toString() ?? '');
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const selectedIdentity = identities.find((i) => i.id === selectedIdentityId) ?? identities[0];
  const estimate = estimatedMinutes ? Number(estimatedMinutes) : undefined;
  const canSave = !!title.trim() && !!selectedIdentity && (estimate === undefined || (Number.isInteger(estimate) && estimate > 0 && estimate <= 720));

  const handleSave = () => {
    if (!canSave || !selectedIdentity) return;

    const fields = {
      title: title.trim(),
      identityId: selectedIdentity.id,
      identityName: selectedIdentity.name,
      identityColor: selectedIdentity.color,
      estimatedMinutes: estimate,
    };
    if (task) updateTask(task.id, fields);
    else addTask({ ...fields, dueDate: formatDate(new Date()) });

    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="px-5" contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }} keyboardShouldPersistTaps="handled">
          <Text className="text-h2 text-text-primary font-sans mb-6">{task ? 'Edit Task' : 'New Task'}</Text>

          {/* Title Input */}
          <Input
            label="Task"
            placeholder="What are you working on?"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          {/* Identity Picker */}
          <Text className="text-caption text-text-secondary uppercase font-sans mt-6 mb-3">
            Identity
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            {identities.map((identity) => (
              <Pressable
                key={identity.id}
                onPress={() => setSelectedIdentityId(identity.id)}
                className="rounded-full px-4 py-1.5 border"
                style={{
                  borderColor: `${identity.color}4D`,
                  backgroundColor:
                    selectedIdentity?.id === identity.id
                      ? `${identity.color}26`
                      : 'transparent',
                }}
              >
                <Text
                  className="text-caption uppercase font-sans"
                  style={{
                    color:
                      selectedIdentity?.id === identity.id
                        ? identity.color
                        : '#737373',
                  }}
                >
                  {identity.name}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Estimated Time Input */}
          <View className="mt-6"><Input
            label="Estimated time (minutes)"
            placeholder="e.g. 30"
            value={estimatedMinutes}
            onChangeText={setEstimatedMinutes}
            keyboardType="number-pad"
          /></View>

          {/* Actions */}
          <View className="flex-row gap-3 mt-8">
            <Pressable
              onPress={() => router.back()}
              className="flex-1 py-3 rounded-monolith border border-border items-center active:opacity-70"
            >
              <Text className="text-text-primary font-sans font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="flex-1 py-3 rounded-monolith bg-accent items-center active:opacity-70"
              style={{ opacity: canSave ? 1 : 0.5 }}
              disabled={!canSave}
            >
              <Text className="text-text-inverse font-sans font-semibold">{task ? 'Save Changes' : 'Save'}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

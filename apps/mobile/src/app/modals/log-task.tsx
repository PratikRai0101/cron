import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Input } from '@/components/ui';
import { useTaskStore } from '@/stores';
import { useIdentities } from '@/hooks/useIdentities';

export default function LogTaskScreen() {
  const identities = useIdentities();
  const [title, setTitle] = useState('');
  const [selectedIdentityId, setSelectedIdentityId] = useState(identities[0].id);
  const [estimatedMinutes, setEstimatedMinutes] = useState('');
  const addTask = useTaskStore((s) => s.addTask);

  const selectedIdentity = identities.find((i) => i.id === selectedIdentityId);

  const handleSave = () => {
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      identityId: selectedIdentityId,
      identityName: selectedIdentity?.name || 'Focus',
      identityColor: selectedIdentity?.color || '#ffffff',
      estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes, 10) : undefined,
    });

    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-end">
        {/* Drag handle */}
        <View className="items-center py-3">
          <View className="w-10 h-1 rounded-full bg-border" />
        </View>

        <ScrollView className="px-5 pb-8">
          <Text className="text-h2 text-text-primary font-sans mb-6">Log Task</Text>

          {/* Title Input */}
          <Input
            label="Task"
            placeholder="What are you working on?"
            value={title}
            onChangeText={setTitle}
            autoFocus
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
                    selectedIdentityId === identity.id
                      ? `${identity.color}26`
                      : 'transparent',
                }}
              >
                <Text
                  className="text-caption uppercase font-sans"
                  style={{
                    color:
                      selectedIdentityId === identity.id
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
          <Input
            label="Estimated time (minutes)"
            placeholder="e.g. 30"
            value={estimatedMinutes}
            onChangeText={setEstimatedMinutes}
            keyboardType="number-pad"
            className="mt-6"
          />

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
              style={{ opacity: title.trim() ? 1 : 0.5 }}
              disabled={!title.trim()}
            >
              <Text className="text-text-inverse font-sans font-semibold">Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

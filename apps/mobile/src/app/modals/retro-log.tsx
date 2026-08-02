import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input } from '@/components/ui';
import { useLogStore } from '@/stores';
import { useIdentities } from '@/hooks/useIdentities';
import { formatMinutes } from '@monolith/shared';

export default function RetroLogScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const dateStr = date || new Date().toISOString().split('T')[0];

  const identities = useIdentities();
  const retroLogs = useLogStore((s) => s.retroLogs);
  const logRetroActivity = useLogStore((s) => s.logRetroActivity);

  const [minutes, setMinutes] = useState('');
  const [selectedIdentityId, setSelectedIdentityId] = useState(identities[0].id);

  const selectedIdentity = identities.find((i) => i.id === selectedIdentityId);

  const dateLabel = new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const existingMinutes = retroLogs
    .filter((l) => l.date === dateStr)
    .reduce((sum, l) => sum + l.minutes, 0);

  const handleSave = () => {
    const parsed = parseInt(minutes, 10);
    if (!minutes || isNaN(parsed) || parsed <= 0) return;

    logRetroActivity({
      date: dateStr,
      minutes: parsed,
      identityId: selectedIdentityId,
      identityName: selectedIdentity?.name || 'Focus',
      identityColor: selectedIdentity?.color || '#ffffff',
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
          <Text className="text-h2 text-text-primary font-sans mb-1">Log Activity</Text>
          <Text className="text-mono-sm text-text-tertiary font-mono mb-6">
            {dateLabel} · {formatMinutes(existingMinutes)} logged
          </Text>

          {/* Duration Input */}
          <Input
            label="Duration (minutes)"
            placeholder="e.g. 45"
            value={minutes}
            onChangeText={setMinutes}
            keyboardType="number-pad"
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
              style={{ opacity: minutes.trim() && parseInt(minutes, 10) > 0 ? 1 : 0.5 }}
              disabled={!minutes.trim() || parseInt(minutes, 10) <= 0}
            >
              <Text className="text-text-inverse font-sans font-semibold">Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

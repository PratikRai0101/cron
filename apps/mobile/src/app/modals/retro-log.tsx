import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Input } from '@/components/ui';
import { useLogStore } from '@/stores';
import { useIdentities } from '@/hooks/useIdentities';
import { formatDate, formatMinutes } from '@monolith/shared';

export default function RetroLogScreen() {
  const insets = useSafeAreaInsets();
  const { date, identityId } = useLocalSearchParams<{ date: string; identityId?: string }>();
  const dateStr = date || formatDate(new Date());
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) &&
    !Number.isNaN(new Date(`${dateStr}T12:00:00`).getTime()) &&
    formatDate(new Date(`${dateStr}T12:00:00`)) === dateStr &&
    dateStr <= formatDate(new Date());

  const identities = useIdentities();
  const retroLogs = useLogStore((s) => s.retroLogs);
  const logRetroActivity = useLogStore((s) => s.logRetroActivity);

  const [minutes, setMinutes] = useState('');
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | null>(identityId ?? identities[0]?.id ?? null);

  const selectedIdentity = identities.find((i) => i.id === selectedIdentityId) ?? identities[0];

  const dateLabel = validDate ? new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }) : 'Invalid date';
  const existingMinutes = retroLogs
    .filter((l) => l.date === dateStr)
    .reduce((sum, l) => sum + l.minutes, 0);

  const handleSave = () => {
    const parsed = Number(minutes);
    if (!validDate || !Number.isInteger(parsed) || parsed <= 0 || parsed > 720 || !selectedIdentity) return;

    logRetroActivity({
      date: dateStr,
      minutes: parsed,
      identityId: selectedIdentity.id,
      identityName: selectedIdentity.name,
      identityColor: selectedIdentity.color,
    });

    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="px-5" contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }} keyboardShouldPersistTaps="handled">
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
              style={{ opacity: validDate && Number.isInteger(Number(minutes)) && Number(minutes) > 0 && Number(minutes) <= 720 && selectedIdentity ? 1 : 0.5 }}
              disabled={!validDate || !minutes.trim() || !Number.isInteger(Number(minutes)) || Number(minutes) <= 0 || Number(minutes) > 720 || !selectedIdentity}
            >
              <Text className="text-text-inverse font-sans font-semibold">Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

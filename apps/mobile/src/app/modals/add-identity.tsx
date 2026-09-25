import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Input } from '@/components/ui';
import { useIdentityStore } from '@/stores';

const IDENTITY_COLORS = [
  '#ffffff',
  '#a3a3a3',
  '#a855f7',
  '#737373',
  '#00e5ff',
  '#ff6b6b',
  '#ffb020',
  '#7cf29c',
];

export default function AddIdentityScreen() {
  const insets = useSafeAreaInsets();
  const addIdentity = useIdentityStore((s) => s.addIdentity);
  const [name, setName] = useState('');
  const [color, setColor] = useState(IDENTITY_COLORS[0]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    addIdentity({ name: trimmed, color });
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="px-5" contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }} keyboardShouldPersistTaps="handled">
          <Text className="text-h2 text-text-primary font-sans mb-6">New Identity</Text>

          {/* Name Input */}
          <Input
            label="Name"
            placeholder="e.g. Music"
            value={name}
            onChangeText={setName}
            maxLength={24}
          />

          {/* Color Picker */}
          <Text className="text-caption text-text-secondary uppercase font-sans mt-6 mb-3">
            Color
          </Text>
          <View className="flex-row gap-3 flex-wrap">
            {IDENTITY_COLORS.map((c) => (
              <Pressable
                key={c}
                onPress={() => setColor(c)}
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{
                  backgroundColor: c,
                  borderWidth: color === c ? 3 : 0,
                  borderColor: '#ffffff',
                  opacity: color === c ? 1 : 0.45,
                }}
              >
                {color === c && (
                  <Text className="text-text-inverse text-sm font-mono">✓</Text>
                )}
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
              style={{ opacity: name.trim() ? 1 : 0.5 }}
              disabled={!name.trim()}
            >
              <Text className="text-text-inverse font-sans font-semibold">Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

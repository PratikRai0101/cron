import { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useIdentityStore } from '@/stores';

const ALL_IDENTITIES = [
  { id: '1', name: 'Code', color: '#ffffff', description: 'Programming, development, engineering' },
  { id: '2', name: 'Write', color: '#a3a3a3', description: 'Writing, blogging, documentation' },
  { id: '3', name: 'Design', color: '#a855f7', description: 'UI/UX, graphic design, creative' },
  { id: '4', name: 'Exercise', color: '#737373', description: 'Fitness, sports, movement' },
];

const FALLBACK_IDS = ['1', '2', '3'];

export default function PickIdentitiesScreen() {
  const seedFromPresets = useIdentityStore((s) => s.seedFromPresets);
  const [selected, setSelected] = useState<Set<string>>(new Set(FALLBACK_IDS));

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const commit = useCallback((ids: string[]) => {
    seedFromPresets(
      ALL_IDENTITIES.filter((i) => ids.includes(i.id)).map(({ description: _description, ...rest }) => rest)
    );
    router.replace('/onboarding/done');
  }, [seedFromPresets]);

  const handleNext = useCallback(() => {
    commit([...selected]);
  }, [commit, selected]);

  const handleSkip = useCallback(() => {
    commit(FALLBACK_IDS);
  }, [commit]);

  return (
    <View className="flex-1 bg-background justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 self-center items-center">
        <View className="flex-row gap-1.5">
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-accent" />
          <View className="w-2 h-2 rounded-full bg-border" />
        </View>
      </View>

      <Text className="text-h1 text-text-primary font-sans text-center">Pick your identities</Text>
      <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px] self-center">
        What areas do you want to track?
      </Text>

      <View className="mt-8 gap-3">
        {ALL_IDENTITIES.map((identity) => {
          const isSelected = selected.has(identity.id);
          return (
            <Pressable
              key={identity.id}
              onPress={() => toggle(identity.id)}
              className="flex-row items-center p-4 rounded-monolith border"
              style={{
                borderColor: isSelected ? identity.color : '#262626',
                backgroundColor: isSelected ? `${identity.color}12` : 'transparent',
              }}
            >
              {/* Checkbox */}
              <View
                className="w-5 h-5 rounded-monolith border-2 items-center justify-center mr-3"
                style={{
                  borderColor: isSelected ? identity.color : '#525252',
                  backgroundColor: isSelected ? identity.color : 'transparent',
                }}
              >
                {isSelected && (
                  <Text className="text-text-inverse text-[10px] font-mono">✓</Text>
                )}
              </View>

              <View className="flex-1">
                <Text
                  className="text-body font-sans"
                  style={{ color: isSelected ? '#f5f5f0' : '#737373' }}
                >
                  {identity.name}
                </Text>
                <Text className="text-caption text-text-tertiary font-sans mt-0.5">
                  {identity.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handleNext}
        className="mt-8 bg-accent px-8 py-3 rounded-monolith self-center active:scale-[0.97]"
        style={{ opacity: selected.size > 0 ? 1 : 0.5 }}
        disabled={selected.size === 0}
      >
        <Text className="text-text-inverse font-sans font-semibold text-body">Continue</Text>
      </Pressable>
      <Pressable
        onPress={handleSkip}
        className="mt-4 self-center"
      >
        <Text className="text-caption text-text-tertiary font-sans">Skip</Text>
      </Pressable>
    </View>
  );
}

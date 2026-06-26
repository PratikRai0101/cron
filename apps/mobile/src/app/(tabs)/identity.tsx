import { View, Text, ScrollView, Pressable } from 'react-native';
import { demoIdentities } from '@/lib/demo-data';
import { Card } from '@/components/ui';
import { ContributionGrid } from '@/components/contribution-grid';
import { formatMinutes } from '@monolith/shared';
import { useState, useMemo } from 'react';
import { generateDemoGridData } from '@/lib/demo-data';
import { useFocusStore } from '@/stores';

// Deterministic grid seed per identity
function seededGridData(identityId: string, days: number) {
  let seed = 0;
  for (let i = 0; i < identityId.length; i++) {
    seed = ((seed << 5) - seed + identityId.charCodeAt(i)) | 0;
  }
  const data = generateDemoGridData(days);
  return data.map((d, i) => ({
    ...d,
    minutes: Math.round(d.minutes * (0.5 + (((seed + i) % 100) / 200))),
  }));
}

export default function IdentityScreen() {
  const [identities] = useState(demoIdentities);
  const completedSessions = useFocusStore((s) => s.completedSessions);

  // Pre-compute grids once per identity
  const grids = useMemo(() => {
    const map: Record<string, ReturnType<typeof seededGridData>> = {};
    identities.forEach((id) => {
      map[id.id] = seededGridData(id.id, 35);
    });
    return map;
  }, [identities]);

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-6 pb-2 flex-row items-center justify-between">
        <Text className="text-h1 text-text-primary font-sans">Identities</Text>
        <Pressable className="w-8 h-8 items-center justify-center">
          <Text className="text-text-primary text-xl font-mono">+</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {identities.map((identity) => {
          const gridData = grids[identity.id] || [];

          // Compute session minutes for this identity
          const sessionMinutes = completedSessions
            .filter((s) => s.identityId === identity.id)
            .reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);

          const totalMinutes = identity.totalMinutes + sessionMinutes;

          // Deterministic consistency from identity id
          const consistency = 40 + (identity.id.charCodeAt(0) * 7) % 40;
          const avgMinutes = 20 + (identity.id.charCodeAt(0) * 3) % 60;

          return (
            <Card key={identity.id} className="mb-4 p-4">
              {/* Top row */}
              <View className="flex-row items-start">
                {/* Color bar */}
                <View
                  className="w-1 rounded-full mr-3 self-stretch"
                  style={{ backgroundColor: identity.color }}
                />

                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-h3 text-text-primary font-sans">{identity.name}</Text>
                    <Pressable>
                      <Text className="text-text-tertiary text-lg">⋯</Text>
                    </Pressable>
                  </View>

                  <Text className="text-mono-sm text-text-tertiary font-mono mt-0.5">
                    {formatMinutes(totalMinutes)} total
                  </Text>
                </View>
              </View>

              {/* Mini grid */}
              <View className="mt-3">
                <ContributionGrid
                  data={gridData}
                  dailyGoal={60}
                  weeksToShow={5}
                  cellSize={10}
                  gap={2}
                />
              </View>

              {/* Bottom stats */}
              <View className="flex-row items-center justify-between mt-3">
                <Text className="text-mono-sm text-text-secondary font-mono">
                  Consistency: {consistency}%
                </Text>
                <Text className="text-caption text-text-tertiary font-sans">
                  30d avg: {avgMinutes}m/day
                </Text>
              </View>
            </Card>
          );
        })}

        {/* Empty state padding */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}

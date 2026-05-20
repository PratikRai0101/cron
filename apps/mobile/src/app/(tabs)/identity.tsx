import { View, Text, ScrollView, Pressable } from 'react-native';
import { demoIdentities } from '@/lib/demo-data';
import { Card } from '@/components/ui';
import { ContributionGrid } from '@/components/contribution-grid';
import { formatMinutes } from '@monolith/shared';
import { useState } from 'react';
import { generateDemoGridData } from '@/lib/demo-data';

export default function IdentityScreen() {
  const [identities] = useState(demoIdentities);

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
          const gridData = generateDemoGridData(30);
          const consistency = Math.floor(Math.random() * 40) + 40; // 40-80%

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
                    {formatMinutes(identity.totalMinutes)} total
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
                  30d avg: {Math.floor(Math.random() * 60 + 20)}m/day
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

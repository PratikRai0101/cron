import { useCallback } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function WidgetSetupScreen() {
  const handleNext = useCallback(() => {
    router.replace('/onboarding/done');
  }, []);

  return (
    <View className="flex-1 bg-background justify-center px-5">
      {/* Step indicator */}
      <View className="absolute top-16 self-center items-center">
        <View className="flex-row gap-1.5">
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-border" />
          <View className="w-2 h-2 rounded-full bg-accent" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-h1 text-text-primary font-sans text-center">
          Add Monolith to your home screen
        </Text>
        <Text className="text-body text-text-secondary font-sans text-center mt-3 max-w-[280px] self-center">
          Keep your ring one glance away with a widget.
        </Text>

        {/* Widget previews */}
        <View className="flex-row items-end justify-center gap-3 mt-8">
          {/* Small widget */}
          <View className="rounded-monolith p-3" style={{ backgroundColor: '#141414', borderColor: '#262626', borderWidth: 1 }}>
            <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
            <Text className="text-mono-md text-text-primary font-mono mt-1">45m</Text>
            <View className="mt-2" style={{ width: 44, height: 44 }}>
              <View className="flex-1 rounded-full border-2 items-center justify-center" style={{ borderColor: '#ffffff' }}>
                <View className="w-1 h-1 rounded-full bg-white" />
              </View>
            </View>
          </View>

          {/* Medium widget */}
          <View className="rounded-monolith p-3" style={{ backgroundColor: '#141414', borderColor: '#262626', borderWidth: 1 }}>
            <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
            <Text className="text-mono-md text-text-primary font-mono mt-1">45m / 60m</Text>
            <View className="flex-row gap-1 mt-2">
              {[1, 1, 0.6, 0.3, 0.6, 0.8, 0.2].map((level, i) => (
                <View
                  key={i}
                  className="flex-1 rounded-[2px]"
                  style={{ height: 28 * level, backgroundColor: i === 6 ? '#ffffff' : '#4a4a4a' }}
                />
              ))}
            </View>
            <View className="mt-2 h-2 rounded-full" style={{ backgroundColor: '#262626' }} />
          </View>

          {/* Large widget */}
          <View className="rounded-monolith p-3" style={{ backgroundColor: '#141414', borderColor: '#262626', borderWidth: 1 }}>
            <Text className="text-caption text-text-tertiary uppercase font-sans">TODAY</Text>
            <Text className="text-mono-md text-text-primary font-mono mt-1">45m</Text>
            <View className="flex-row flex-wrap gap-1 mt-2" style={{ width: 96 }}>
              {Array.from({ length: 21 }).map((_, i) => (
                <View
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: i % 4 === 0 ? '#ffffff' : i % 3 === 0 ? '#6a6a6a' : '#2a2a2a',
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        <Text className="text-caption text-text-tertiary font-sans text-center mt-6 leading-4">
          Press and hold your home screen, tap +, search Monolith.
          {'\n'}Widgets arrive in a future update.
        </Text>
      </ScrollView>

      <Pressable
        onPress={handleNext}
        className="mt-8 bg-accent px-8 py-3 rounded-monolith self-center active:scale-[0.97]"
      >
        <Text className="text-text-inverse font-sans font-semibold text-body">Continue</Text>
      </Pressable>
      <Pressable onPress={handleNext} className="mt-4 self-center">
        <Text className="text-caption text-text-tertiary font-sans">Skip</Text>
      </Pressable>
    </View>
  );
}

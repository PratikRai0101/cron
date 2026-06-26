import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ModalsIndex() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-5">
      <Text className="text-h2 text-text-primary font-sans mb-6">Menu</Text>

      <Pressable
        onPress={() => router.replace('/(tabs)/grid')}
        className="w-full py-3 border-b border-border items-center active:opacity-70"
      >
        <Text className="text-body text-text-primary font-sans">Close</Text>
      </Pressable>
    </View>
  );
}

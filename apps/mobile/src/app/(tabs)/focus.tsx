import { View, Text } from 'react-native';

export default function FocusTabScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-lg font-semibold">Focus</Text>
      <Text className="text-text-secondary text-sm mt-2">Tap to start a focus session.</Text>
    </View>
  );
}

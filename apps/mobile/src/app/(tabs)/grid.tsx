import { View, Text, ScrollView } from 'react-native';

export default function GridScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="px-5 pt-4">
          <Text className="text-text-primary text-lg font-semibold">Grid</Text>
          <Text className="text-text-secondary text-sm mt-1">Your contribution grid will appear here.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

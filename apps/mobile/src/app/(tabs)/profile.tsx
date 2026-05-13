import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-lg font-semibold">Profile</Text>
      <Text className="text-text-secondary text-sm mt-2">Your stats and settings.</Text>
    </View>
  );
}

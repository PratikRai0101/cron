import { View, Text } from 'react-native';

export default function IdentityScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-lg font-semibold">Identities</Text>
      <Text className="text-text-secondary text-sm mt-2">Manage your tracked identities.</Text>
    </View>
  );
}

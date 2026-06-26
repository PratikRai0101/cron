import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="log-task"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="settings"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}

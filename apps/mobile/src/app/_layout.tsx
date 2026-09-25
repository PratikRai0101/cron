import '../../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ JetBrainsMono_400Regular, PlusJakartaSans_400Regular });
  if (!fontsLoaded) return null;
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modals" options={{ presentation: 'modal' }} />
        <Stack.Screen name="onboarding" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

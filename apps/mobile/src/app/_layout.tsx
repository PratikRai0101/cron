import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@react-navigation/native";
import { ColorsProvider, useTheme } from "@/theme/ThemeContext";
import { getNavigationTheme } from "@/theme/colors";
function Navigation() {
  const { dark, colors } = useTheme();
  return (
    <ThemeProvider value={getNavigationTheme(dark)}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modals" options={{ presentation: "modal" }} />
        <Stack.Screen name="onboarding" />
      </Stack>
      <StatusBar style={dark ? "light" : "dark"} />
    </ThemeProvider>
  );
}
export default function RootLayout() {
  const [loaded, error] = useFonts({
    InstrumentSerif: require("../../assets/fonts/InstrumentSerif-Regular.ttf"),
  });
  if (!loaded && !error) return null;
  return (
    <ColorsProvider>
      <Navigation />
    </ColorsProvider>
  );
}

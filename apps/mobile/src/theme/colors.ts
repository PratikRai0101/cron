import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { light, dark as basalt } from "./config";
export function getColors(dark: boolean) {
  return dark ? basalt : light;
}
// Navigation and component providers share the same resolved appearance.
export function getNavigationTheme(dark: boolean) {
  const base = dark ? DarkTheme : DefaultTheme;
  const c = getColors(dark);
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: c.primary,
      background: c.background,
      card: c.secondaryBackground,
      text: c.text,
      border: c.separator,
      notification: c.primary,
    },
  };
}

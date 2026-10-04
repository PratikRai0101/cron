import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { useAppStore } from "@/stores";
import { getColors } from "./colors";
const Context = createContext<{
  colors: ReturnType<typeof getColors>;
  dark: boolean;
} | null>(null);
export function ColorsProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const preference = useAppStore((s) => s.theme);
  const dark =
    preference === "system" ? system === "dark" : preference === "dark";
  // An explicit scheme dependency re-renders SVGs and navigation as well as text.
  useEffect(() => {
    NativeWindStyleSheet.setColorScheme(dark ? "dark" : "light");
    if (typeof document !== "undefined")
      document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <Context.Provider value={{ colors: getColors(dark), dark }}>
      {children}
    </Context.Provider>
  );
}
export function useTheme() {
  const value = useContext(Context);
  if (!value) throw new Error("ColorsProvider missing");
  return value;
}
export function useColors() {
  return useTheme().colors;
}

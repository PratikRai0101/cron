import { createContext, useContext, useState, type ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Context = createContext<{
  height: number;
  setHeight: (height: number) => void;
} | null>(null);

export function FloatingNavigationProvider({ children }: { children: ReactNode }) {
  const [height, setHeight] = useState(64);
  return (
    <Context.Provider value={{ height, setHeight }}>{children}</Context.Provider>
  );
}

export function useFloatingNavigation() {
  const value = useContext(Context);
  const insets = useSafeAreaInsets();
  if (!value) throw new Error("FloatingNavigationProvider missing");
  const bottom = Math.max(insets.bottom, 16);
  // Use the measured navigation height, including larger accessibility labels.
  const actionBottom = bottom + value.height + 20;
  return {
    ...value,
    bottom,
    actionBottom,
    contentPaddingBottom: actionBottom + 52 + 24,
  };
}

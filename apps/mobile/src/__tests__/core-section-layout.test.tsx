import React from "react";
import { act, create } from "react-test-renderer";
import { CoreSection } from "../components/strata/CoreSection";

jest.mock("@/theme/ThemeContext", () => ({
  useTheme: () => ({
    dark: false,
    colors: { primary: "#28597b", onPrimary: "#ffffff" },
  }),
}));
jest.mock("@/hooks/useMotion", () => ({ useReducedMotion: () => true }));

test("the unmeasured section mounts a layout target and draws after measurement", () => {
  let tree: ReturnType<typeof create>;
  act(() => {
    tree = create(<CoreSection minutes={60} label="Code" availableHeight={280} />);
  });
  const target = tree!.root.findAll((node) => typeof node.props.onLayout === "function")[0];
  expect(target).toBeDefined();
  expect(tree!.root.findAllByProps({ accessibilityRole: "image" })).toHaveLength(0);
  act(() => {
    target.props.onLayout({ nativeEvent: { layout: { width: 354 } } });
  });
  expect(tree!.root.findAllByProps({ accessibilityRole: "image" }).length).toBeGreaterThan(0);
  expect(tree!.root.findAllByProps({ viewBox: "0 0 354 280" }).length).toBeGreaterThan(0);
  act(() => tree!.unmount());
});

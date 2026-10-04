const { light, dark } = require("./src/theme/config");
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/shared/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: light.background,
        surface: {
          DEFAULT: light.secondaryBackground,
          elevated: light.secondaryBackground,
        },
        border: { DEFAULT: light.separator, subtle: light.separator },
        "text-primary": light.text,
        "text-secondary": light.secondaryText,
        "text-tertiary": light.tertiaryText,
        "text-inverse": light.onPrimary,
        accent: {
          DEFAULT: light.primary,
          hover: light.primary,
          dim: light.selected,
        },
        "dark-ground": dark.background,
        "dark-surface": dark.secondaryBackground,
        "dark-ink": dark.text,
        "dark-muted": dark.secondaryText,
        "dark-tertiary": dark.tertiaryText,
        "dark-rule": dark.separator,
        "dark-accent": dark.primary,
        "dark-on-accent": dark.onPrimary,
        error: "#B13232",
        warning: "#89652A",
      },
      fontFamily: { serif: ["InstrumentSerif"] },
      fontSize: {
        display: ["76px", { lineHeight: "1.0", fontWeight: "700" }],
        h1: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["11px", { lineHeight: "1.4", fontWeight: "500" }],
        "mono-lg": ["32px", { lineHeight: "1.0", fontWeight: "500" }],
        "mono-md": ["18px", { lineHeight: "1.2", fontWeight: "500" }],
        "mono-sm": ["12px", { lineHeight: "1.2", fontWeight: "400" }],
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
      },
      borderRadius: {
        monolith: "16px",
      },
    },
  },
  plugins: [],
};

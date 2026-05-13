export const colors = {
  background: '#0a0a0a',
  surface: {
    DEFAULT: '#141414',
    elevated: '#1a1a1a',
  },
  border: {
    DEFAULT: '#262626',
    subtle: '#1f1f1f',
  },
  text: {
    primary: '#f5f5f0',
    secondary: '#737373',
    tertiary: '#525252',
    inverse: '#0a0a0a',
  },
  accent: {
    DEFAULT: '#ccff00',
    hover: '#b8e600',
    dim: 'rgba(204, 255, 0, 0.15)',
  },
  secondaryAccent: '#00f0ff',
  tertiaryAccent: '#ff6b6b',
  grid: [
    '#141414',
    '#2a3311',
    '#4d6600',
    '#7a9900',
    '#a3cc00',
    '#ccff00',
  ],
} as const;

export type GridIntensity = 0 | 1 | 2 | 3 | 4 | 5;

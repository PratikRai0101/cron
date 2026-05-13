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
    DEFAULT: '#ffffff',
    hover: '#e0e0e0',
    dim: 'rgba(255, 255, 255, 0.15)',
  },
  secondaryAccent: '#737373',
  tertiaryAccent: '#ff6b6b',
  grid: [
    '#141414',
    '#2a2a2a',
    '#4a4a4a',
    '#6a6a6a',
    '#8a8a8a',
    '#ffffff',
  ],
} as const;

export type GridIntensity = 0 | 1 | 2 | 3 | 4 | 5;

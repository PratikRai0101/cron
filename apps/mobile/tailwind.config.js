/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/shared/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: {
          DEFAULT: '#141414',
          elevated: '#1a1a1a',
        },
        border: {
          DEFAULT: '#262626',
          subtle: '#1f1f1f',
        },
        'text-primary': '#f5f5f0',
        'text-secondary': '#737373',
        'text-tertiary': '#525252',
        'text-inverse': '#0a0a0a',
        accent: {
          DEFAULT: '#ffffff',
          hover: '#e0e0e0',
          dim: 'rgba(255, 255, 255, 0.15)',
        },
        'secondary-accent': '#737373',
        'tertiary-accent': '#ff6b6b',
        grid: {
          0: '#141414',
          1: '#2a2a2a',
          2: '#4a4a4a',
          3: '#6a6a6a',
          4: '#8a8a8a',
          5: '#ffffff',
        },
      },
      fontFamily: {
        mono: ['JetBrainsMono', 'monospace'],
        sans: ['PlusJakartaSans', 'system-ui'],
      },
      borderRadius: {
        monolith: '2px',
      },
    },
  },
  plugins: [],
};

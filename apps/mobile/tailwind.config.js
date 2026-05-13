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
          DEFAULT: '#ccff00',
          hover: '#b8e600',
          dim: 'rgba(204, 255, 0, 0.15)',
        },
        'secondary-accent': '#00f0ff',
        'tertiary-accent': '#ff6b6b',
        grid: {
          0: '#141414',
          1: '#2a3311',
          2: '#4d6600',
          3: '#7a9900',
          4: '#a3cc00',
          5: '#ccff00',
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

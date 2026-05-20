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
        error: '#ff4444',
        warning: '#ffaa00',
      },
      fontFamily: {
        mono: ['JetBrainsMono', 'ui-monospace', 'monospace'],
        sans: ['PlusJakartaSans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['11px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'mono-lg': ['32px', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '500' }],
        'mono-md': ['18px', { lineHeight: '1.2', fontWeight: '500' }],
        'mono-sm': ['12px', { lineHeight: '1.2', fontWeight: '400' }],
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '20px',
        'space-6': '24px',
        'space-8': '32px',
        'space-10': '40px',
        'space-12': '48px',
      },
      borderRadius: {
        monolith: '2px',
      },
    },
  },
  plugins: [],
};

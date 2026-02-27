import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#7c3aed',
        panel: '#111827',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,58,237,.4), 0 8px 40px rgba(124,58,237,.2)',
      },
    },
  },
  plugins: [],
};

export default config;

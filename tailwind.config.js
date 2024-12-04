/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          dark: '#111827',
          darker: '#0f172a',
          lighter: '#1f2937',
        },
        text: {
          primary: '#f3f4f6',
          secondary: '#9ca3af',
        },
        accent: {
          primary: '#22d3ee',
          secondary: '#818cf8',
        },
        'call-color': '#22c55e',
        'put-color': '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
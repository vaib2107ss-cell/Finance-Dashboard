/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#0B0F14',
          card: '#11161F',
          cardHover: '#161D29',
          cardSubtle: '#0E131A',
          border: '#1E2633',
          borderHover: '#2A3547',
          borderLight: '#18202C',
          accent: '#10B981',
          accentHover: '#059669',
          accentMuted: 'rgba(16, 185, 129, 0.12)',
          danger: '#F43F5E',
          dangerMuted: 'rgba(244, 63, 94, 0.12)',
          warning: '#F59E0B',
          info: '#3B82F6',
          purple: '#8B5CF6',
          textPrimary: '#F8FAFC',
          textSecondary: '#94A3B8',
          textMuted: '#64748B',
        }
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.6), 0 4px 10px -2px rgba(0, 0, 0, 0.4)',
        'glow-green': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}

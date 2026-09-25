/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        hitam: {
          green: '#10b981',
          emerald: '#059669',
          yellow: '#fbbf24',
          orange: '#f97316',
          sky: '#0ea5e9',
          indigo: '#6366f1',
          pink: '#ec4899',
          cream: '#fef3c7',
          skyBg: '#e0f2fe',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cartoon': '0 8px 0 0 rgba(15, 23, 42, 0.15)',
        'cartoon-lg': '0 12px 0 0 rgba(15, 23, 42, 0.2)',
        'cartoon-hover': '0 14px 0 0 rgba(15, 23, 42, 0.25)',
        'cartoon-active': '0 4px 0 0 rgba(15, 23, 42, 0.2)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        walkBob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-6px) rotate(-4deg)' },
          '75%': { transform: 'translateY(-6px) rotate(4deg)' },
        },
        treeSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        cloudFloat: {
          '0%': { transform: 'translateX(-50px)' },
          '100%': { transform: 'translateX(1050px)' },
        },
        dash: {
          to: { strokeDashoffset: '-40' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out',
        'walk-bob': 'walkBob 0.4s infinite ease-in-out',
        'tree-sway': 'treeSway 4s infinite ease-in-out',
        'cloud-float': 'cloudFloat 35s linear infinite',
        'path-dash': 'dash 1.2s linear infinite',
      }
    },
  },
  plugins: [],
}

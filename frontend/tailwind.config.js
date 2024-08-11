/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        'ring-ping': {
          '0%': { boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)' }, // Starts from below the view
          '100%': { transform: 'translateY(0)' }, // Moves to the original position
        },
      },
      animation: {
        'ring-ping': 'ring-ping 1s infinite',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-up': 'slide-in-up 0.5s ease-out', // Corrected the typo here
      },
    },
  },
  plugins: [],
}

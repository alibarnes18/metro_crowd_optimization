/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        metro: {
          red: '#ef4444',
          green: '#22c55e',
          blue: '#3b82f6',
          yellow: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}

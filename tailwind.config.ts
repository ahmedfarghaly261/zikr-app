import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf9f7',
        primary: '#2f855a',
        card: {
          DEFAULT: '#ffffff',
          text: '#374151',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
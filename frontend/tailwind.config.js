/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#fdfef4',
          100: '#f8fcdb',
          200: '#eff9b8',
          300: '#def28b',
          400: '#c7e65b',
          500: '#abd432',
          600: '#89b224',
          700: '#698a1f',
          800: '#556e1e',
          900: '#485d1d',
          950: '#26340b',
        },
        earth: {
          50: '#f8f6f4',
          100: '#ece5df',
          200: '#d9cbbe',
          300: '#c0a996',
          400: '#a7856f',
          500: '#946f5a',
          600: '#83594b',
          700: '#6d4740',
          800: '#593c37',
          900: '#4a3430',
          950: '#271917',
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        maritime: {
          DEFAULT: '#1E3A5F',
          50: '#EEF3F8',
          100: '#D6E4F0',
          200: '#B0CBDF',
          300: '#89B1CE',
          400: '#6298BD',
          500: '#3C7FAC',
          600: '#2F5F7F',
          700: '#1E3A5F',
          800: '#162943',
          900: '#0E1826',
        },
        ocean: {
          light: '#B8DDE5',
          DEFAULT: '#4A90A4',
          dark: '#2A5F6F',
        },
        coastal: {
          sand: '#F4E8D8',
          fog: '#E8EFF2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
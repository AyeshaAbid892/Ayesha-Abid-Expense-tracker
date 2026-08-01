/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        surface: {
          light: '#F6F7FB',
          card: '#FFFFFF',
          dark: '#0B0F17',
          darkcard: '#131A26',
        },
        ink: {
          50: '#f4f6f8',
          100: '#e7ebef',
          200: '#d3d9e0',
          400: '#7c8a9a',
          600: '#4a5768',
          800: '#232e3d',
          900: '#0f1720',
        },
        brand: {
          50: '#f1efff',
          100: '#e3dfff',
          400: '#8b7bfa',
          500: '#6d5ef9',
          600: '#5645e0',
          700: '#4634b8',
        },
        positive: '#10b981',
        negative: '#f43f5e',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 32, 0.04), 0 8px 24px rgba(15, 23, 32, 0.06)',
      },
    },
  },
  plugins: [],
};

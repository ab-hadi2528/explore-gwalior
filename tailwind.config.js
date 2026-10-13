/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1b2a4a',
          dark: '#152039',
          light: '#243760',
        },
        sandstone: {
          DEFAULT: '#d4a574',
          light: '#e6c9a0',
          dark: '#b8865a',
        },
        cream: {
          DEFAULT: '#faf6ef',
          dark: '#f0e9dc',
        },
        gold: {
          DEFAULT: '#c9a24b',
          dark: '#b08d3a',
          light: '#dab966',
        },
      },
    },
  },
  plugins: [],
};

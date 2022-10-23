/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login': 'url(\'assets/bg.png\')',
      },
      width: {
        128: '32rem',
      },
    },
  },
  plugins: [],
};

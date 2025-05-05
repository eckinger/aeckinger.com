/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'highlight': '#537D8D',
      },
      fontFamily: {
        'signika': ['Signika', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    './main.js',
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      colors: {
        primary: colors.cyan
      }
    },
  },
  plugins: [],
}

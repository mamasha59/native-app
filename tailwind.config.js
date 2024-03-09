/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'main-blue' : '#4BAAC5',
      'purple-button' : '#9966AA',
      'black': '#101010',
      'grey': '#77787B',
      'border-color': '#4babc563',
      'error': '#d63031',
      'warning' : '#EA3737',
    }
  },
  plugins: [],
}
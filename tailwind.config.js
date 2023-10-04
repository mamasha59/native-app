/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./Layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'main-blue' : '#4BAAC5',
      'purple-button' : '#9966AA',
      'black': '#101010',
      'grey': '#77787B',
      'border-color': '#4babc563'
    }
  },
  plugins: [],
}
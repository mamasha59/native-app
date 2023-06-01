/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geometrica: ['Geometria'],
      },
      backgroundColor:{
        'bg-main' : 'linear-gradient(90.21deg, #4BAAC5 0.16%, #7076B0 101.13%)'
      },
    },
  },
  plugins: [],
}


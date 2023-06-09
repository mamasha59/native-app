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
      // boxShadow: {
      //   // 'main-button': '0px 7px 11px -3px rgba(131, 183, 89, 0.47)',
      // }
    },
  },
  plugins: [],
}


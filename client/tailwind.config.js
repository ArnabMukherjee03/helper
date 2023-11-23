/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        primary: ['Rozha One', 'serif'],
        secondary: ['Domine','serif'],
        logo:['League Spartan', 'sans-serif'],
        sublogo:['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
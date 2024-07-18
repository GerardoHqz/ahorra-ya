/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark-blue": "#023047",
        "secondary-text":"#BABABA",
        "pink" : "#F9546B",
        "orange":"#FC7551"
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(249, 84, 107, 1)',
      }
    },
  },
  plugins: [],
}


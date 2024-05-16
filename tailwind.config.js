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
      },
    },
  },
  plugins: [],
}


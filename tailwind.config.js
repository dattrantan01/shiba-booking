/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bungee: ["Bungee", "sans-serif"],
    },
    colors: {
      primary: "#fb923c",
      cyan: colors.cyan,
      orange: colors.orange,
      white: colors.white,
      slate: colors.slate,
    },
    extend: {},
  },
  plugins: [],
};

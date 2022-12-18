/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bungee: ["Bungee", "sans-serif"],
    },
    colors: {
      primary: "#ff385c",
      secondary: "#FF9AAD",
      transparent: "transparent",
      backgroundSidebar: "white",
      cyan: colors.cyan,
      orange: colors.orange,
      white: "#FFFFFF",
      slate: colors.slate,
      black: colors.black,
      red: colors.red,
      purple: colors.purple,
      gray: colors.gray,
      pink: colors.pink,
      green: colors.green,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
};

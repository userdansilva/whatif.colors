/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["inter", "sans-serif"],
    },
    colors: {
      primary: colors.violet,
      secondary: colors.slate,
      white: colors.white,
      transparent: "transparent",
      warning: colors.amber,
      danger: colors.rose,
    },
    extend: {},
  },
  plugins: [],
};

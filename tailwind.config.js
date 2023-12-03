/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.amber["300"],
        "primary-light": colors.amber["200"],
        secondary: colors.green["900"],
        "secondary-light": colors.green["800"],
      },
      fontFamily: {
        main: '"Proximanova"',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#febf00",
        secondary: "#00542e",
        third: "#b0c600",
      },
    },
  },
  plugins: [],
};

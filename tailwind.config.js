/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#febf00",
        "primary-light": "#facc43",
        secondary: "#00542e",
        "secondary-light": "#b0c600",
      },
    },
  },
  plugins: [],
};

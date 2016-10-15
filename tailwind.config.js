/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        up: "#31d0aa",
        down: "#ed4b9e",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
});

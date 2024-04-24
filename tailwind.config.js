/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#0046cc",
    },
    fontFamily: {
      sans: "Gilroy",
    },
    extend: {},
  },
  plugins: [],
};

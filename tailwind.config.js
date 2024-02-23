/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: "#3886EF",
        secondary: "#E0EDEF",
        accent: "#262262",
        lightBlue: "#E0EDFE",
        headers: "#CBE0FB",
        yellow: "#FAE90B",
      },
      fontFamily: {
        regular: "Agrandi-Regular",
        boldText: "Agrandi-TextBold",
      },
    },
  },
  plugins: [],
};

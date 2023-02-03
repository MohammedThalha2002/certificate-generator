/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },
    },
    extend: {
      colors: {
        bgGrey: "#2C2C2C",
        greyHighlight: "#3D3D3D",
        stroke: "#A6A6A6",
        bgWhite: "#F0F2F4",
        white: "#FFFFFF",
        highlight: "#10AB71",
        bgBlack: "#1b1f24",
        bgPink: "#F16279",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  // darkMode: "media",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "320px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {},
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        poppins: ["Poppins", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        protest: ["Protest Strike", "sans-serif"],
        "open-sans": ["Open Sans"],
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};

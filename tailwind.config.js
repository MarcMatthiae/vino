/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the HTML file in the root
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/React files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/container-queries")],
};

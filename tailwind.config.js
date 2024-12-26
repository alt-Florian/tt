/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...require("tailwindcss/defaultTheme").fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

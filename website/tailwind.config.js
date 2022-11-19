module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "../../ansuz/packages/nexi/dist/**/*.js",
    // "./node_modules/@ansuzdev/nexi/**/*.js",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
    },
    extend: {
      colors: {
        primary: {
          30: "#123D934D",
          50: "#123D9380",
          80: "#123D93CC",
          100: "#123D93",
        },
        secondary: {
          30: "#9B27B04D",
          50: "#9B27B080",
          80: "#9B27B0CC",
          100: "#9B27B0",
        },
        text: {
          30: "#2626264D",
          50: "#26262680",
          80: "#262626CC",
          100: "#262626",
        },
        gray: {
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          500: "#667085",
          800: "#1D2939",
        },
        black: "#000000",
        surface: "#F8F8F8",
        white: "#FFFFFF",
        transparent: "#FFFFFF00",
      },
      spacing: {},
      fontSize: {},
      minWidth: {},
      maxWidth: {},
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = {
  content: [
    "./src/**/*.js",
    "./node_modules/@ansuzdev/nexi/**/*.js",
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
          50: "#fef2e1",
          100: "#fddfb4",
          200: "#fbca84",
          300: "#fab454",
          400: "#f9a433",
          500: "#f7951d",
          600: "#f3891b",
          700: "#ec7a19",
          800: "#e66b17",
          900: "#db5315",
        },
        secondary: {
          50: "#e2f1ff",
          100: "#badcff",
          200: "#8dc6ff",
          300: "#5cb0ff",
          400: "#369eff",
          500: "#0f8eff",
          600: "#1d7ff7",
          700: "#226de3",
          800: "#245bd0",
          900: "#253ab1",
        },
        white: {
          DEFAULT: "#ffffff",
          secondary: "#ffffffbd",
          tertiary: "#ffffff61",
        },
        black: {
          DEFAULT: "#000000",
          secondary: "#444545",
          tertiary: "#9f9f9f",
        },
      },
      spacing: {},
      fontSize: {},
      minWidth: {},
      maxWidth: {},
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

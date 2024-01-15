/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "400px",
        xs: "500px",
      },
      colors: {
        "custom-dark-gren": "#395556",
        "custom-black": "#212121",
        "custom-button-color": "#F4D06F",
        "custom-offwhite": "#f1f1f1",
        "custom-accent": "#BFD7EA",
        "custom-neutral-04100": "#6C7275",
        "custom-dark-grey-400": "#212B36",
        "custom-black-600": "#605F5F",
        "custom-black-900": "#121212",
        "custom-neutral-07": "#141718",
        "custom-neutral-04": "#6C7275",
        "custom-red": "#7A1315",
        "custom-golden": "#DEBB5B"
      },

      fontFamily: {
        sans: [
          "Montserrat",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],

        Merriweather: ["Merriweather", "serif"],
        Inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [],
};

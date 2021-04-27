module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      text: {
        light: "#627d98",
        DEFAULT: "#243b53",
        hover: "#f5f7fa",
      },
      white: {
        DEFAULT: "#d9e2ec",
      },
      error: {
        DEFAULT: "#e63946",
      },
      button: {
        light: "#22303c",
        DEFAULT: "#243b53",
        hover: "#102a43",
      },
      background: {
        semilight: "102a43",
        DEFAULT: "#121212",
        light: "#181818",
        hover: "#242526",
      },
      message: {
        DEFAULT: "#003049",
        hover: "#22223b",
        me: "#f72585",
        other: "#4cc9f0",
        text: "#f8edeb",
      },
    },
    extend: {},
  },
  fontFamily: {
    sans: ["ui-sans-serif", "system-ui"],
    serif: ["ui-serif", "Georgia"],
    mono: ["ui-monospace", "SFMono-Regular"],
    display: ["Oswald"],
    body: ["Open Sans"],
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};

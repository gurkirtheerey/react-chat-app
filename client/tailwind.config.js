module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: {
        light: "#85d7ff",
        DEFAULT: "#1fb6ff",
        dark: "#009eeb",
      },
      pink: {
        light: "#ff7ce5",
        DEFAULT: "#F84AA7",
        dark: "#ff16d1",
      },
      purple: {
        dark: "480ca8",
        DEFAULT: "#560bad",
        light: "#7209b7",
      },
      gray: {
        DEFAULT: "#14213d",
        light: "#011627",
        lightest: "#f9fafc",
      },
      input: {
        DEFAULT: "#274156",
      },
      text: {
        DEFAULT: "#f1faee",
        button: "#A53860",
        hover: "#f72585",
      },
      white: {
        DEFAULT: "#f1faee",
      },
      error: {
        DEFAULT: "#e63946",
      },
      button: {
        DEFAULT: "#A53860",
        hover: "#f72585",
      },
      background: {
        DEFAULT: "#A53860",
        hover: "#3a0ca3",
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

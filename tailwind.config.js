/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#319795",
        modal: "rgba(0, 0, 0, 0.2)",
        "dark-visible": "rgba(11, 11, 11, 0.8)",
        text: {
          primary: "#292929",
          secondary: "#757575",
          "primary-dark": "#cbd5e0",
          "secondary-dark": "#a0aec0",
        },
        border: "#F2F2F2",
        "border-dark": "#2D3748",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

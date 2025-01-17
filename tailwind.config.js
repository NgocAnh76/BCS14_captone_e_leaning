/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: {
          DEFAULT: "#f5c000",
        },
        secondary: {
          DEFAULT: "#000",
        },
        danger: {
          DEFAULT: "#DB2828",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        textDark: {
          DEFAULT: "#667085",
        },
        dark: {
          DEFAULT: "#eee",
        },
        "dark-2": {
          DEFAULT: "#515151",
        },
      },
      backgroundImage: {
        "detail-course": "url('/public/learning-path-detail-background.png')",
        bannerEvaluate: 'url("./public/banner_evaluate.avif")',
        bannerLogin: 'url("./public/banner.evaluate3.avif")',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redBlog: "#f01543",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dark', 'light'],
  },
};


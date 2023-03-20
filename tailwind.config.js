/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#29e8b8",

          "secondary": "#cea210",

          "accent": "#ddda0b",

          "neutral": "#251E2A",

          "base-100": "#372753",

          "info": "#A9BDE5",

          "success": "#0D733C",

          "warning": "#8E740B",

          "error": "#FB3768",
        },
      },
    ],
  }, 
}

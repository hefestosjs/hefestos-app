/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/resources/**/*.nj"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};

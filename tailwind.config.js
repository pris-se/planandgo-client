/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
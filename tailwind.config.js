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
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    colors: {
      "white": "#F5F5F5",
      "primary": "#4F26E9",
      "primary-light": "#E5DEFF",
      "secondary": "#c6c2fb",
      "success": "#019c23",
      "warning": "#E9E526",
      "danger": "#FC0000",
      "danger-light": "#F7E8E8",
      "grey-30": "#8D8D8D",
      "grey-20": "#E1E1E1",
      "grey-10": "#F2F2F2",
      "placeholder-color": "#8D99AE",
      "border-color": "#8D8D8D",
    }
  },
  plugins: [],
}
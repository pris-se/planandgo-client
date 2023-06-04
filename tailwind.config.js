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
<<<<<<< HEAD
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    colors: {
      "defaultTextColor": "#0F0F0F",
      "bg-color": "#F5F5F5",
      "white": "#F5F5F5",
      "primary": "#4F26E9",
      "secondary": "#c6c2fb",
      "success": "#019c23",
      "warning": "yellow",
      "danger": "#FC0000",
      "gray-30": "#8D8D8D;",
      "gray-20": "#E1E1E1",
      "gray-10": "#F2F2F2",
      "input-bg-danger":"#F7E8E8",
    }
=======
    extend: {},
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
  },
  plugins: [],
}
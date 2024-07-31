/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          light1:'#f6f5f2',
          greyBg: "#1A202C"
        },
        boxShadow: {
          'custom': "10px 10px 6px -3px rgba(0,0,0,0.1)",
        }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          darker: '#010409',
          border: '#30363d',
        }
      }
    },
  },
  plugins: [],
}
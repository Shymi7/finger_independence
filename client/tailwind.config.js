/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-dark': '#005744',
        'accent': '#00866c',
        'accent-light': '#00cea9',
      },
    },
  },
  plugins: [],
}


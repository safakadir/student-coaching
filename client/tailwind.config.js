/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      screens: {
        'lg': '1048px'
      },
      animation: {
        indeterminate: 'indeterminate 1s infinite linear'
      },
      keyframes: {
        indeterminate: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '50%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(1)' }
        }
      }
    },
  },
  plugins: [],
}

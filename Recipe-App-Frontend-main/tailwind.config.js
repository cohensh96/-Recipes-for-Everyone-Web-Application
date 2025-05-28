/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins'],
        'body': ['Montserrat'],
      },
      keyframes: {
        enter: {
          '0%': { transform: '-translateX(100%)' },
          '25%': { transform: '' },
          '50%': { transform: '' },
          '75%': { transform: '' },
          '100%': { transform: '0' }
        },
        leave: {
          '0%': { transform: '0' },
          '25%': { transform: '' },
          '50%': { transform: '' },
          '75%': { transform: '' },
          '100%': { transform: '-translateX(100%)' }
        },
        dasharray: {
          '0%': { strokeDashArray: '0' },
          '100%': { strokeDashArray: '600' }
        },
      },
      animation: {
        'menu-enter': 'enter 1s forwards',
        'menu-leave': 'leave 1s forwards',
        'dasharray': 'dasharray  600ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
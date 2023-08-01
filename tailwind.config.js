/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
   
    extend: {
      fontFamily: {
          'f1display': ['Formula1Display'],
          'f1display-bold': ['Formula1DisplayBold']
        },
        colors: {
          f1darkGray: '#15151e',
          f1red: '#e10600',
          f1lightGray: '#b4b4b4',
          f1purple: '#C761D6',
          f1yellow: '#F8D500'
        },
        animation: {
          horizontal: 'horizontal 30s ease-out infinite',
          drawBorder: 'drawBorder 1s ease-out',
          deleteBorder: 'deleteBorder 1s ease-out'
        },
        keyframes: {
          horizontal: {
            '0%, 100%': { transform: 'translate(0%, 0%) scale(110%)' },
            '50%': { transform: 'translate(10%, -7%) scale(120%)' },
          },
          drawBorder: {
            '0%': {
              transform: 'scaleX(0%)'
            },
            '100%': {
              transform: 'scaleX(100%)'
            }
          },
        }
      },
  },
  plugins: [],
}

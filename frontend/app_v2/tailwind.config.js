module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'fv-red': {
          light: '#b36e54',
          DEFAULT: '#A04A29',
          dark: '#803b21',
        },
        'fv-orange': {
          light: '#cf9354',
          DEFAULT: '#C37829',
          dark: '#9c6021',
        },
        'fv-blue': {
          light: '#618699',
          DEFAULT: '#3A6880',
          dark: '#2e5366',
        },
        'fv-turquoise': {
          light: '#5da8a1',
          DEFAULT: '#35928A',
          dark: '#2a756e',
        },
        'fv-purple': {
          light: '#785d72',
          DEFAULT: '#56354f',
          dark: '#452a3f',
        },
        'fv-charcoal': {
          DEFAULT: '#313133',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

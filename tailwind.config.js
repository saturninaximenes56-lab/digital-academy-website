module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#e8dfff',
          200: '#d1bfff',
          300: '#b89fff',
          400: '#9e7fff',
          500: '#6C3CE1',
          600: '#5531b5',
          700: '#3e248a',
          800: '#28185e',
          900: '#120c2f'
        },
        secondary: {
          50: '#e6fbf5',
          100: '#ccf7ec',
          200: '#99f0d9',
          300: '#66e8c5',
          400: '#33e1b2',
          500: '#00D4AA',
          600: '#00a988',
          700: '#007f66',
          800: '#005444',
          900: '#002a22'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 20px 60px rgba(108, 60, 225, 0.15)',
        'hover': '0 30px 80px rgba(108, 60, 225, 0.25)',
      },
      borderRadius: {
        'card': '20px',
        'card-sm': '12px',
      }
    },
  },
  plugins: [],
}
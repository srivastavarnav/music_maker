module.exports = {
  //[TODO: Clean this file]
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      tablet: { min: '768px', max: '1024px' },
      // => @media (min-width: 768px) && (max-width: 1024px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      colors: {
        purple: {
          DEFAULT: '#8025FB',
          light: '#D294FF',
          dark: '#4E00B7',
        },
        green: {
          DEFAULT: '#00F46E',
        },
        blue: {
          DEFAULT: '#91C1F2',
          telegram: '#0088CC',
        },
        gray: {
          DEFAULT: '#f5f5f5'
        },
        black: {
          DEFAULT: '#000000',
          1: '#221F45',
        },
        flime: {
          DEFAULT: '#23FFB0',
        },
      },
      height: {
        content: 'fit-content',
      },
    },
  },
  variants: {},
  plugins: [],
};

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
      backgroundSize: {
        gradient: '200% 200%',
      },
    },
  },
  plugins: [],
};

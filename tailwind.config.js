/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        'audiowide': ['"Audiowide"', 'cursive'],
      },
      // Add custom keyframes and animation for the flicker effect
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            textShadow: `
              0 0 5px #ff4b2b,
              0 0 10px #ff4b2b,
              0 0 20px #ff4b2b,
              0 0 40px #ff4b2b
            `,
          },
          '20%, 24%, 55%': {
            opacity: '0.4',
            textShadow: 'none',
          },
        },
      },
      animation: {
        'flicker': 'flicker 1.5s infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-glow': {
          'text-shadow': `
            0 0 5px #ff4b2b,
            0 0 10px #ff4b2b,
            0 0 20px #ff4b2b,
            0 0 40px #ff4b2b
          `,
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Opera */
        },
      });
    },
  ],
};

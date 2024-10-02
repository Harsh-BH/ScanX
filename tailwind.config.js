/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      blur: {
        xs: '2px',  // Custom small blur
        sm: '4px',  // Small blur
        md: '8px',  // Medium blur
        lg: '16px', // Large blur
        xl: '24px',
        main: '70px', // Extra large blur
      },
      // Extend the background image utilities
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, rgba(255, 0, 100, 1) 0%, rgba(0, 0, 200, 1) 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
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



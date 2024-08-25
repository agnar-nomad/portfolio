/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        animation: {
        backgroundGradient: 'backgroundGradient 1.2s ease-out forwards',
        fullSpin: 'fullSpin 3s linear infinite',
        animateBorder: 'animateBorder 5s linear infinite'
        },
        keyframes: {
          backgroundGradient: {
            '0%': {
              backgroundPosition: '0% 30%',
              backgroundSize: '200% 200%'
            },
            '100%': {
              backgroundPosition: '100% 70%',
              backgroundSize: '200% 200%'
            },
          },
          animateBorder: {
            '0%': {backgroundPosition: '50% 0%'},
            '25%': {backgroundPosition: '100% 40%'},
            '50%': {backgroundPosition: '60% 100%'},
            '75%': {backgroundPosition: '0% 50%'},
            '100%': {backgroundPosition: '50% 0%'}
          },
          fullSpin: {
            '100%': {transform: 'rotate(-360deg)'}
          }
        },
      },
    },

  // daisyUI config (optional)
  daisyui: {
    themes: [
      'bumblebee', 'halloween',      
    ],
    darkTheme: 'halloween',
  },

  plugins: [
    // add daisyUI plugin
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
};

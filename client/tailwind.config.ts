/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js', // flowbite module
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // flowbite plugin
  ],
};

// infinite scroll credit:- https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/

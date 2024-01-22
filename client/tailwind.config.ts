/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js', // flowbite module
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // flowbite plugin
  ],
};

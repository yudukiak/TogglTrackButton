const flowbite = require('flowbite-react/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/src/**/*.{vue,js,ts,jsx,tsx}',
    './src/renderer/index.html',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}


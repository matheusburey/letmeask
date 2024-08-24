/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.vue",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        poppins: 'Poppins, sans-serif',
      },
    },
  },
  plugins: [require('preline/plugin'), ["./plugins/preline.client.ts"],],
}


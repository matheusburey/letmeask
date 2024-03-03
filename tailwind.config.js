/** @type {import('tailwindcss').Config} */
module.exports = {
  content: { files: ["./src/**/*.rs"] },
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        poppins: 'Poppins, sans-serif',
      },
    },
  },
  plugins: [],
}

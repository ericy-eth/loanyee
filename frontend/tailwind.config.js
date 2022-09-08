/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}',
'./components/**/*.{js,jsx, ts, tsx}',
'./public/image/**/*.{js,jsx, ts, tsx}'],
  theme: {
    extend: {
      gridTemplateColumns:{
        '13': 'repeat(13, minmax(0, 1fr))',

      }
    },
  },
  plugins: [],
}

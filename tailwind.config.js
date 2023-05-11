/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      flex: {
        '1-auto': '1'
      },
      colors: {
        gray: {
          90: '#7D7D7D',
          80: '#E5E5E5',
          70: '#F3F3F3'
        }
      },
      gridTemplateRows: {
        gallery: '1fr 0.81fr 1fr 0.81fr 1fr'
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        gold: '#8B6F47',
        'deep-brown': '#5C4432',
        'border-light': '#EAE4DB',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
      },
      maxWidth: {
        'site': '1200px',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
    },
  },
  plugins: [],
}

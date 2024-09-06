/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    colors:{
      'red':'#db0000',
      'black':'#000000',
      'white':'#ffffff',
      'gray':'#564d4d',
      'dark-red':'#831010'
    },
    extend: {
      backgroundImage:{
        'Background-Netflix': "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.3)),url('/src/assets/Netflix-Background.jpg')"
      },
      maxWidth:{
        160:"40rem"
      },
      fontFamily:{
        BlackHanSans: ['"Black Han Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}


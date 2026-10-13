/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#F7F3E9',
          200: '#EFE7D5',
          300: '#DCCBA8',
          400: '#C5A973',
          500: '#B08C4A',
          600: '#946E35',
          700: '#735229',
          800: '#5A3F23',
          900: '#3A2715',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE4E8',
          200: '#F7CAD2',
          300: '#EFA1B0',
          400: '#E36D86',
          500: '#C73859',
          600: '#A32442',
          700: '#851A34',
          800: '#6B1B2F',
          900: '#4C1322',
          950: '#310813',
        },
        emerald: {
          50: '#F2F9F6',
          100: '#DFEFE8',
          200: '#C2DFD4',
          300: '#98C7B7',
          400: '#69A996',
          500: '#468D7B',
          600: '#337162',
          700: '#2A5A4F',
          800: '#234941',
          900: '#1F3E38',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#E7DDD0',
          300: '#D5C4B0',
          400: '#C1AA90',
          500: '#A98F73',
          600: '#8D7359',
          700: '#6F5945',
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        heading: ['Cairo', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif']
      },
      boxShadow: {
        'book': '0 15px 30px -10px rgba(76, 19, 34, 0.25), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 15px rgba(197, 169, 115, 0.15)',
        'glow': '0 0 25px rgba(197, 169, 115, 0.35)',
      }
    },
  },
  plugins: [],
}

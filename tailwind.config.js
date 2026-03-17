/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { 500: '#C0603A', 600: '#A04D2E' },
        sable: { 100: '#F5ECD7', 200: '#EDD9B0' },
        menthe: { 500: '#4A9B7F', 600: '#3A7D65' },
        ocre: { 400: '#D4A843', 500: '#B8912E' },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-moroccan':
          'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
      },
      backgroundSize: {
        'moroccan-sm': '24px 24px',
      },
      boxShadow: {
        card: '0 12px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}


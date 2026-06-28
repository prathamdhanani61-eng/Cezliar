/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F4D3C',
        gold: '#C9A227',
        background: '#F8F6F1',
        section: '#F4EFE6',
        text: '#2D2D2D',
        footer: '#1A1A1A',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'luxury-hover': '0 20px 40px -10px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}

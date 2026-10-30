/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        cream: '#F8F6F1',
        sand: '#EFE7DA',
        placeholder: '#F4EEE4',
        line: '#DDD3C3',
        'line-soft': '#EDE5D8',
        'header-line': '#E6DED0',
        forest: '#0F4D3C',
        'forest-deep': '#0B3A2D',
        'forest-ink': '#0F2E25',
        'forest-line': '#3C6E5F',
        mist: '#C9D3CC',
        ink: '#1B1F1D',
        body: '#4A4F4B',
        muted: '#5E625C',
        saffron: '#98511D',
        gold: '#C9A227',
        'gold-light': '#E2C46A',
        'ivory-on-forest': '#F3EBDD',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(44px, 5.4vw, 80px)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(36px, 4vw, 58px)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(30px, 3.2vw, 46px)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        site: '1360px',
      },
      borderRadius: {
        card: '20px',
        tile: '24px',
        panel: '28px',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '3/2': '3 / 2',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)' },
          '60%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        pop: 'pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['clother', 'sans-serif'],
      },
      colors: {
        base: '#0a0a0a',
        surface: '#121212',
        card: '#1a1a1a',
        hover: '#232323',
        borderline: '#2c2c2c',
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
        muted: '#FFFFFF',
        accent: '#ff6a00',
      },
      fontSize: {
        'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      }
    },
  },
  plugins: [],
}

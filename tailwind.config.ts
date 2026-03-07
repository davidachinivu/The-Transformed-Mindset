import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#1e3a8a',
        'accent-dark': '#1a2847',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        'source-serif': ['Source Serif Pro', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937',
            a: {
              color: '#1e3a8a',
              '&:hover': {
                color: '#1a2847',
              },
            },
            h1: {
              fontFamily: 'Georgia, serif',
              fontWeight: '700',
              color: '#111827',
            },
            h2: {
              fontFamily: 'Georgia, serif',
              fontWeight: '700',
              color: '#111827',
            },
            h3: {
              fontFamily: 'Georgia, serif',
              fontWeight: '700',
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

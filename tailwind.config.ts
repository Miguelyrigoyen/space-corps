import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#08080f',
        cosmos: '#0d0d1a',
        nebula: '#13132a',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e4c97a',
          dark: '#8a6f2e',
        },
        silver: '#c8d6e5',
        star: '#f0f4ff',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'star-field': 'radial-gradient(ellipse at top, #1a1a3e 0%, #08080f 70%)',
        'gold-shimmer': 'linear-gradient(135deg, #8a6f2e 0%, #c9a84c 50%, #e4c97a 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'star-drift': 'starDrift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        starDrift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.4)',
        'inner-void': 'inset 0 0 60px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}

export default config

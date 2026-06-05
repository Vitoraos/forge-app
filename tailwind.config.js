/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080808',
        surface: '#111111',
        border: '#1f1f1f',
        accent: '#2563EB',
        'accent-glow': '#2563eb33',
        secondary: '#F0F0F0',
        danger: '#dc2626',
        success: '#06b6d4',
        muted: '#555555',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      boxShadow: {
        glow: '0 0 12px #2563eb33',
        'glow-sm': '0 0 6px #2563eb22',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 150ms ease forwards',
        'slide-in': 'slideIn 150ms ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

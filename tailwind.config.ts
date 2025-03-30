import type { Config } from 'tailwindcss'
const config: Config = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
          playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
          samarkan: ['Samarkan', 'serif'],
        },
        colors: {
          // Primary Colors (Divine Essence)
          'mystic-indigo': '#3D348B',
          'deep-saffron': '#F18701',
          'himalayan-white': '#F5F5F5',
          'sacred-gold': '#F7B801',
          
          // Secondary Colors (Accent & Interaction)
          'deep-teal': '#086375',
          'tranquil-sky-blue': '#7CAFC4',
          'lotus-pink': '#E63946',
          'ashram-gray': '#6B7280',
          
          // Special Effect Colors (Mystic Glow & Energy)
          'celestial-purple': '#7B2CBF',
          'glowing-cyan': '#00B4D8',
          'fiery-crimson': '#D32F2F',
        },
        backgroundImage: {
          'gradient-divine': 'linear-gradient(135deg, #3D348B, #086375)',
          'gradient-button': 'radial-gradient(circle, #F18701, #E63946)',
        },
        boxShadow: {
          'divine-glow': '0 0 15px rgba(247, 184, 1, 0.3)',
        },
      },
    },
    plugins: [
      function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
        const newUtilities = {
          '.text-shadow-divine': {
            textShadow: '0px 0px 10px rgba(247, 184, 1, 0.5)',
          },
        }
        addUtilities(newUtilities)
      },    ],
  }
  

export default config
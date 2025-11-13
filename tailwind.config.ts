import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#F8F6F0',
        card: '#FFFFFF',
        ink: '#3A3A3A',
        muted: '#4A4A4A',
        heading: '#3A5A40',
        secondary: '#DAD7CD',
        primary: {
          DEFAULT: '#6B9080',
          50: '#F2F6F4',
          100: '#E0EAE5',
          200: '#C2D5CC',
          300: '#A4C1B3',
          400: '#87AC9B',
          500: '#6B9080',
          600: '#547366',
          700: '#3D564C',
          800: '#273A32',
          900: '#112017',
        },
        accent: '#C67C48',
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(17, 17, 19, 0.06)',
        hover: '0 12px 28px rgba(17, 17, 19, 0.10)'
      },
      fontFamily: {
        heading: ['Montserrat', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Open Sans"', 'Roboto', 'Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 500ms ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;



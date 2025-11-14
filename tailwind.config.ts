import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8f3',
          100: '#e2ecda',
          200: '#c3d9b2',
          300: '#9fc88c',
          400: '#7eb967',
          500: '#5aa942',
          600: '#459037',
          700: '#356f2c',
          800: '#255022',
          900: '#153216'
        }
      }
    }
  },
  plugins: []
};

export default config;

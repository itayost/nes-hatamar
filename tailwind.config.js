/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A961',
          light: '#E5D3A6',
        },
        cream: '#FFFEF7',
        dark: '#2C2416',
        accent: '#E8B4D9',
        purple: '#8B5CF6',
        border: 'rgba(201, 169, 97, 0.3)',
      },
      fontFamily: {
        hebrew: ['Frank Ruhl Libre', 'Times New Roman', 'serif'],
        english: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};

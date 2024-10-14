/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        transparent: '#FFFFFF12',
        secondary: '#00C572',
      },
      minHeight: {
        'mobile-screen': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [],
};

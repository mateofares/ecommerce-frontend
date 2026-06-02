/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        verde: {
          DEFAULT: '#1a5c3a',
          light:   '#c8e6d0',
          dark:    '#0f3d27',
        },
      },
    },
  },
  plugins: [],
}

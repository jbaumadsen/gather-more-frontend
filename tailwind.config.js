/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind can purge CSS properly
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
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

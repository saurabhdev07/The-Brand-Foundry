/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
      },
      fontFamily: {
        'bebas-neue': ['bebas-neue', 'sans-serif'],
        'creato-display': ['creato-display', 'sans-serif'],
        'creato-display-regular': ['creato-display-regular', 'sans-serif'],
        'creato-display-regular-italic': ['creato-display-regular-italic', 'sans-serif'],
        'creato-display-bold': ['creato-display-bold', 'sans-serif'],
        vogue: ['vogue', 'serif'],
      }
    },
  },
  plugins: [],
};

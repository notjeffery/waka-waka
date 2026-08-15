import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B2E2A",       // deep teal-black — overlay/background base
        teal: "#146356",      // mid teal — panels/cards
        mint: "#2DD4BF",      // bright teal accent — primary CTA/highlight
        clay: "#B84A34",      // warm accent, used sparingly
        paper: "#F3EEE2",     // warm off-white, light sections
        charcoal: "#211D18",  // body text on light backgrounds
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        wordmark: ["var(--font-wordmark)"],
        cursive: ["var(--font-cursive)"],
      },
    },
  },
  plugins: [],
};
export default config;
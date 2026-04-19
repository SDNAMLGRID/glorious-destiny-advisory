/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Authority + warmth: ink, antique gold, ivory (WFG-adjacent, not WFG-owned) */
        ink: "#0B0B0F",
        charcoal: "#14141A",
        gold: "#C4A352",
        "gold-deep": "#9A7B30",
        ivory: "#FAF8F3",
        sand: "#EFEBE4",
        muted: "#6E6E78",
        body: "#2C2C34"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"]
      },
      boxShadow: {
        lift: "0 20px 50px rgba(11, 11, 15, 0.12)",
        glow: "0 0 0 1px rgba(196, 163, 82, 0.25)"
      }
    }
  },
  plugins: []
};

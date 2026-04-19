/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0C",
        charcoal: "#121218",
        panel: "#16161E",
        gold: "#C9A54A",
        "gold-bright": "#E8D49A",
        "gold-deep": "#8A6F2A",
        ivory: "#FAF8F3",
        sand: "#EDE8DF",
        muted: "#6E6E78",
        body: "#2A2A32"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        brand: ["Cinzel", "Georgia", "serif"],
        script: ["Great Vibes", "cursive"],
        sans: ["DM Sans", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "gold-shine": "linear-gradient(135deg, #F3E6C4 0%, #C9A54A 42%, #9A7B30 100%)",
        "dark-radial": "radial-gradient(ellipse 120% 80% at 80% 0%, rgba(201, 165, 74, 0.14) 0%, transparent 55%)"
      },
      boxShadow: {
        lift: "0 24px 60px rgba(6, 6, 10, 0.35)",
        card: "0 4px 24px rgba(10, 10, 12, 0.08)",
        goldring: "0 0 0 1px rgba(201, 165, 74, 0.35), 0 12px 40px rgba(0,0,0,0.15)"
      }
    }
  },
  plugins: []
};

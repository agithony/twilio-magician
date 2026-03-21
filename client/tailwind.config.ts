import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        magic: {
          dark: "#0a0a0f",
          deeper: "#12101f",
          purple: "#7C3AED",
          emerald: "#047857",
          ruby: "#DC2626",
          sapphire: "#1D4ED8",
          gold: "#D97706",
          "gold-light": "#F59E0B",
          twilio: "#F22F46",
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', "serif"],
        heading: ['"Playfair Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
        "curtain-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "curtain-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "card-flip": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "curtain-left": "curtain-left 1s ease-in-out forwards",
        "curtain-right": "curtain-right 1s ease-in-out forwards",
        "card-flip": "card-flip 0.6s ease-in-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "magic-gradient":
          "linear-gradient(135deg, #0a0a0f 0%, #1a103a 50%, #0a0a0f 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #D97706 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

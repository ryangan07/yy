import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F5",
        surface: "#FFFFFF",
        ink: "#1C1917",
        body: "#57534E",
        muted: "#78716C",
        camel: "#B08152",
        cta: "#292524",
        line: "#E7E2DB",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        measure: "68ch",
      },
      borderRadius: {
        DEFAULT: "2px",
      },
      fontSize: {
        hero: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15" }],
        stat: ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        section: "112px",
        "section-mobile": "56px",
      },
      transitionDuration: {
        reveal: "350ms",
      },
      // Hero entrance: starts at 1% opacity (not 0) so the browser counts the text as painted
      // straight away for Largest Contentful Paint, while it still looks like a fade-in.
      keyframes: {
        "hero-in": {
          from: { opacity: "0.01", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "hero-in": "hero-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
export default config;

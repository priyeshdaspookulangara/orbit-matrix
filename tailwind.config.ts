import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f19",
        card: "rgba(17, 24, 39, 0.7)",
        primary: "#06b6d4", // Neon Cyan
        "primary-hover": "#0891b2",
        accent: "#3b82f6", // Electric Blue
        surface: "#111827",
      },
    },
  },
  plugins: [],
};
export default config;

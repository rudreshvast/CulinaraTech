// tailwind.config.ts
// Tailwind v4 is CSS-first — all tokens live in globals.css under @theme.
// This file is kept for tooling compatibility only.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
};

export default config;
// tailwind.config.ts — amebogist-web
//
// Migrated to Tailwind v4. Design tokens now live in globals.css as plain
// :root custom properties + @source directives (see the note there) —
// this file is minimal, matching boldmind-web's pattern: darkMode
// strategy, the shared preset, and any plugin/theme.extend this app needs
// beyond what the preset already covers.
//
// tailwindcss-animate and @tailwindcss/typography used to be required
// directly here — they're now registered by @boldmindng/tailwind-config's
// own plugins array, so presets: [preset] is enough; the local requires
// and the corresponding package.json dependencies can come out.

import type { Config } from "tailwindcss";
import preset from "@boldmindng/tailwind-config";

const config: Config = {
  presets: [preset],

  // Matches every app's globals.css `[data-theme="dark"] { ... }` block.
  darkMode: ["selector", '[data-theme="dark"]'],

  // Defensive fallback only — v4 auto-detects these paths, and
  // globals.css's @source directives cover @boldmindng/ui + auth.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // AmeboGist-specific tokens — kept from the original config.
      colors: {
        amebogreen: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          900: "#14532D",
        },
        "ecosystem-blue": "#065F46",
        "ecosystem-gold": "#E9A825",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};

export default config;

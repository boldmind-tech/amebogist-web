// postcss.config.mjs
//
// Tailwind v4's PostCSS integration is a single plugin — @tailwindcss/postcss.
// Unlike v3, autoprefixer is NOT needed: v4 uses Lightning CSS internally,
// which handles vendor prefixing itself. If your postcss.config still lists
// `tailwindcss` + `autoprefixer` as separate plugins (the v3 pattern), that's
// the mismatch to fix alongside package.json.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

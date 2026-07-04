/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@boldmindng/ui",
    "@boldmindng/auth",
    "@boldmindng/utils",
    "@boldmindng/api-client",
    "@boldmindng/analytics", 
    "@boldmindng/pwa", 
  ],

  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.boldmind.ng" },
      { protocol: "https", hostname: "**.amebogist.ng" },
      { protocol: "https", hostname: "**.educenter.com.ng" },
      { protocol: "https", hostname: "**.villagecircle.ng" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    externalDir: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // NEW — required for AmeboGist's AdSense units (components/AdBanner.tsx) and
          // the planai/educenter cross-promo iframes if any future embed is added.
          // Kept permissive on purpose: AmeboGist is the only app in the ecosystem
          // serving 3rd-party ad scripts, so this CSP is scoped to this repo only.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.googlesyndication.com https://*.gstatic.com https://*.boldmind.ng https://*.amebogist.ng https://*.r2.cloudflarestorage.com",
              "frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net",
              "connect-src 'self' https://api.boldmind.ng https://*.google-analytics.com https://*.googlesyndication.com",
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

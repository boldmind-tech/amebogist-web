/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

  transpilePackages: [
    '@boldmind-tech/auth',
    '@boldmind-tech/api-client',
    '@boldmind-tech/ui',
    '@boldmind-tech/utils',
  ],

  // @boldmind-tech/auth@4.0.0 exports point to index.mjs but ships index.js
  turbopack: {
    resolveAlias: {
      '@boldmind-tech/auth': './node_modules/@boldmind-tech/auth/dist/index.js',
    },
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  output: 'standalone',
};

export default nextConfig;

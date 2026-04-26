/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

  transpilePackages: [
    '@boldmind-tech/auth',
    '@boldmind-tech/api-client',
    '@boldmind-tech/ui',
    '@boldmind-tech/utils',
  ],

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  // other configurations
  experimental: {
    apiRoutes: true,
    // Use the edge runtime
    runtime: 'edge',
  },
}

module.exports = nextConfig

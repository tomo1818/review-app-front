/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // default: true
  swcMinify: true,
  images: {
    domains: [
      'user-images.githubusercontent.com'
    ],
  },
}

module.exports = nextConfig

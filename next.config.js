/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standard output for better client component compatibility
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com', 'ae01.alicdn.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */

// URL Backend theo từng môi trường:
// - Local:   để trống -> fallback http://localhost:5074
// - Preview (nhánh developer trên Vercel): set BACKEND_API_URL = URL backend dev
// - Production (nhánh main trên Vercel):   set BACKEND_API_URL = URL backend prod
const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5074'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig

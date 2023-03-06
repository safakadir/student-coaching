/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.NODE_ENV === 'production' ? 'https://student-coaching.vercel.app' : 'http://localhost:3000'
  }
}

module.exports = nextConfig

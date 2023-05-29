/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  scope: '/',
  skipWaiting: true
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}

module.exports = withPWA(nextConfig)

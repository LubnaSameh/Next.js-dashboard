// next.config.js

/** @type {import('next').NextConfig} */

// لازم تضيف الدومين بتاعك هنا
// you must add your domain here
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

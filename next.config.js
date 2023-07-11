/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  env: {
    SPACE_ID: process.env.SPACE_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/j5r17qwylq1j/**',
      },
    ],
  },
};

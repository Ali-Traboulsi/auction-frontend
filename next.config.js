/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.mzadat.om'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mazadat.om',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'mazadat.om',
        port: '',
        pathname: '/**',
      },
    ]
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;

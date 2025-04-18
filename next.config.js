/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.mzadat.om', 'backend.mzadat.om'], // ✅ add it here
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
      {
        protocol: 'http',
        hostname: 'backend.mzadat.om',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.mzadat.om',
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

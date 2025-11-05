/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '../../.env.local'),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  allowedDevOrigins: ['http://localhost:3000'],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/notes',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

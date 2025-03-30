import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vedvaani.vercel.app'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
};
export default nextConfig;

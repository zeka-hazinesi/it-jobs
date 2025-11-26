import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swissdevjobs.ch',
        pathname: '/company-logos/**',
      },
    ],
  },
};

export default nextConfig;

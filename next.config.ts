import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // prevent calling api's twice
  reactStrictMode: false,
  images: {
    domains: ['aws-hackathon-shop-items.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;

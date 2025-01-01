import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // prevent calling api's twice
  reactStrictMode: false,
  images: {
    domains: ['aws-hackathon-shop-items.s3.us-east-1.amazonaws.com'],
  },
  env: {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID_dynamo: process.env.AWS_ACCESS_KEY_ID_dynamo,
    AWS_SECRET_ACCESS_KEY_dynamo: process.env.AWS_SECRET_ACCESS_KEY_dynamo,
  },
};

export default nextConfig;

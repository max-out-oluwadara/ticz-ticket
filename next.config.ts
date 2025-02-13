import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // ✅ Allows Cloudinary-hosted images
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // ✅ Enables importing SVGs as React components
    });
    return config;
  },
};

export default nextConfig;

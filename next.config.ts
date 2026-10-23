import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de producto subidas a Shopify.
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;

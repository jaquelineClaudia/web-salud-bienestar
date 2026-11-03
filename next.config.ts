import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de producto subidas a Shopify y fotos libres del blog (Unsplash).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

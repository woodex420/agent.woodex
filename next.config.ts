import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sprint F — allow Sanity CDN for remote image optimization when CMS is live.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Security & compression defaults
  poweredByHeader: false,
  compress: true,
  // React strict mode for dev
  reactStrictMode: true,
};

export default nextConfig;

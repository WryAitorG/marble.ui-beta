import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;

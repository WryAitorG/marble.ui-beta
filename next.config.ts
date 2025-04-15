import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    domains: [
      "randomuser.me",
      "images.unsplash.com",
      "api.uifaces.co",]
  },
};

export default nextConfig;

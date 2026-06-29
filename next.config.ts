import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
    allowedDevOrigins: ['10.10.13.5', 'visulara.de'],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "[::1]"],
  async redirects() {
    return [
      {
        source: "/terms-of-service",
        destination: "/terms-and-conditions",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

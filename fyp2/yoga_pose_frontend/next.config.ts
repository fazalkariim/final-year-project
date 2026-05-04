import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
 
module.exports = {
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Content-Type', value: 'image/x-icon' },
        ],
      },
    ];
  },
};

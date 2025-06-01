// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ui-avatars.com'],  // <-- domains inside images object
  },
  // other config options
};

export default nextConfig;

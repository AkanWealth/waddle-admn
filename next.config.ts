// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ui-avatars.com", "waddleapp-bucket.s3.eu-north-1.amazonaws.com"],
  },
  // other config options
};

export default nextConfig;

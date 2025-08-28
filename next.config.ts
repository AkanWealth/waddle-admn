// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ui-avatars.com",
      "waddleapp-bucket.s3.eu-north-1.amazonaws.com",
      "pub-42f91b17061547449f97974510335219.r2.dev",
      "res.cloudinary.com",
    ],
  },
  // other config options
};

export default nextConfig;

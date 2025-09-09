import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.waddleapp.io";
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
        allow: [
          "/",
          "/contact-us",
          "/cookie-policy",
          "/privacy-policy",
          "/terms-of-use",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

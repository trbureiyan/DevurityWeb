// This manage the robots.txt file generation -> This help to improve SEO by guiding search engine crawlers on how to index the site.

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devurity.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/auth/", "/(protected)/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

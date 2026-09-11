// This manage the robots.txt file generation -> This help to improve SEO by guiding search engine crawlers on how to index the site.

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devurityweb.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/profile/",
        "/leader_proyect/",
        "/content_manager/",
        "/access-denied",
        "/forgot-password",
        "/recovery-password/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

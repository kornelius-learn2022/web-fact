import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/contributor", "/api/"],
    },
    sitemap: "https://mindmaze-chi.vercel.app/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    "http://localhost:3000";

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];
}

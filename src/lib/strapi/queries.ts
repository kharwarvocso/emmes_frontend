import "server-only";
import { Env } from "@/lib/Env";
import { SiteConfigResponseSchema, type SiteConfig } from "./schema";

const getStrapiBaseUrl = () =>
  Env.STRAPI_BASE_URL || Env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) return null;

  const url = new URL("/api/site-config", baseUrl);
  url.searchParams.set("populate", "*");

  const token = Env.STRAPI_ADMIN_TOKEN || Env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN;
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch site config: ${res.status}`);
    return null;
  }

  const json = await res.json();
  const parsed = SiteConfigResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error("Invalid site config payload:", parsed.error.flatten());
    return null;
  }

  return parsed.data ?? null;
};

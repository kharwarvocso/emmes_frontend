import { Env } from "@/lib/Env";

const strapiBase = (Env.STRAPI_URL || Env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");

export const getStrapiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${strapiBase}${normalizedPath}`;
};

export const withStrapiBase = (maybeUrl?: string | null) => {
  if (!maybeUrl) return null;
  if (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://")) return maybeUrl;
  return `${strapiBase}${maybeUrl.startsWith("/") ? "" : "/"}${maybeUrl}`;
};

export async function strapiFetch(
  path: string,
  query?: string,
  options?: { revalidate?: number; tags?: string[]; cache?: RequestCache },
) {
  const url = query ? `${getStrapiUrl(path)}?${query}` : getStrapiUrl(path);
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(Env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${Env.STRAPI_API_TOKEN}` } : {}),
  };

  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    headers,
    cache: options?.cache ?? "force-cache",
  };

  if (options?.revalidate !== undefined || options?.tags?.length) {
    init.next = {
      revalidate: options?.revalidate,
      tags: options?.tags,
    };
  }

  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

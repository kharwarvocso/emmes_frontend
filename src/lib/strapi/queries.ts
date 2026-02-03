import "server-only";
import { Env } from "@/lib/Env";
import qs from "qs";
import {
  OfferingsResponseSchema,
  SiteConfigResponseSchema,
  SiteConfigSchema,
  TestimonialsResponseSchema,
  type Offering,
  type SiteConfig,
  type Testimonial,
} from "./schema";

const getStrapiBaseUrl = () =>
  Env.STRAPI_BASE_URL || Env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  const baseUrl = getStrapiBaseUrl();
  console.log('baseUrhaskdh fgasdl', baseUrl)
  if (!baseUrl) return null;
  console.log('baseUrl enter', baseUrl)

  const queryString = qs.stringify(
    {
      populate: {
        logo: true,
        favicon: true,
        og_image: true,
        footer: {
          populate: {
            cta_button: {
              populate: "*",
            },
            footer_newsletter_cta: {
              populate: "*",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
  console.log('queryString', queryString)
  const url = new URL(`/api/site-config?${queryString}`, baseUrl);
  console.log('url', url)

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

  const json = await res.json().catch(() => null);
  if (!json || (typeof json === "object" && Object.keys(json).length === 0)) {
    return null;
  }
  const parsed = SiteConfigResponseSchema.safeParse(json);
  if (!parsed.success) {
    const fallback = (json as { data?: unknown })?.data ?? null;
    const fallbackParsed = SiteConfigSchema.safeParse(fallback);
    if (fallbackParsed.success) {
      return fallbackParsed.data ?? null;
    }
    if (typeof json === "object" && json !== null && Object.keys(json).length === 0) {
      return null;
    }
    console.error("Invalid site config payload:", parsed.error.flatten());
    return null;
  }

  return parsed.data ?? null;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) return [];

  const url = new URL("/api/testimonials", baseUrl);
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
    console.error(`Failed to fetch testimonials: ${res.status}`);
    return [];
  }

  const json = await res.json().catch(() => null);
  if (!json || (typeof json === "object" && Object.keys(json).length === 0)) {
    return [];
  }

  const parsed = TestimonialsResponseSchema.safeParse(json);

  if (!parsed.success) {
    console.error("Invalid testimonials payload:", parsed.error.flatten());
    return [];
  }

  return parsed.data ?? [];
};

export const getOfferings = async (): Promise<Offering[]> => {
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) return [];

  const url = new URL("/api/offerings", baseUrl);
  url.searchParams.set("populate", "*");
  url.searchParams.set("sort", "order:asc");

  const token = Env.STRAPI_ADMIN_TOKEN || Env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN;
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch offerings: ${res.status}`);
    return [];
  }

  const json = await res.json().catch(() => null);
  if (!json || (typeof json === "object" && Object.keys(json).length === 0)) {
    return [];
  }

  const parsed = OfferingsResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error("Invalid offerings payload:", parsed.error.flatten());
    return [];
  }

  return parsed.data ?? [];
};

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import qs from "qs";
import {
  SiteConfigResponseSchema,
  SiteConfigSchema,
  type SiteConfig,
} from "@/lib/strapi/schema";

export const fetchSiteConfig = async (): Promise<SiteConfig | null> => {
  try {
    console.log('fetchSiteConfig called')
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
    console.log('apiClient', await apiClient.get(`/api/site-config?${queryString}`))
    const { data } = await apiClient.get(`/api/site-config?${queryString}`);
    console.log('data show is here site config', data)
    const parsed = SiteConfigResponseSchema.safeParse(data.data);
    console.log('parsed', parsed)
    if (!parsed.success) {
      const fallback = (data as { data?: unknown })?.data ?? null;
      const fallbackParsed = SiteConfigSchema.safeParse(fallback);
      if (fallbackParsed.success) {
        return fallbackParsed.data ?? null;
      }
      if (typeof data === "object" && data !== null && Object.keys(data).length === 0) {
        return null;
      }
      console.error("Invalid site config payload:", parsed.error.flatten());
      return null;
    }
    return parsed.data ?? null;
  } catch (error) {
    console.error("Failed to fetch site config:", error);
    return null;
  }
};

export const useSiteConfig = () => {
  return useQuery({
    queryKey: ["siteConfig"],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};

export { getImageUrl } from "@/lib/strapi/utils";

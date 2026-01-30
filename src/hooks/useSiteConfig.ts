import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { SiteConfigResponseSchema, type SiteConfig } from "@/lib/strapi/schema";

export const fetchSiteConfig = async (): Promise<SiteConfig | null> => {
  try {
    const { data } = await apiClient.get("/api/site-config", {
      params: {
        populate: "*",
      },
    });
    const parsed = SiteConfigResponseSchema.safeParse(data);
    if (!parsed.success) {
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

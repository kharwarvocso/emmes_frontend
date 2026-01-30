import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { Env } from "@/lib/Env";

export interface MediaFile {
    id: number;
    documentId: string;
    url: string;
    width: number;
    height: number;
    alternativeText: string | null;
}

export interface SiteConfig {
    id: number;
    documentId: string;
    site_name: string;
    tagline: string | null;
    site_description: string | null;
    meta_title: string;
    meta_description: string;
    logo?: MediaFile;
    favicon?: MediaFile;
    og_image?: MediaFile;
}

export const fetchSiteConfig = async (): Promise<SiteConfig | null> => {
    try {
        const { data } = await apiClient.get<SiteConfig>("/api/site-config", {
            params: {
                populate: "*"
            }
        });
        return data;
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

// Helper utility to get full image URL (if strapie returns relative path)
export const getImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    // Env.NEXT_PUBLIC_BACKEND_BASE_URL handles http://localhost:1337
    const baseUrl = Env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
    // Ensure no double slash
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
}

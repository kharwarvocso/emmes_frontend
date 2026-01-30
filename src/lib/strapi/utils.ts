import { Env } from "@/lib/Env";

export const getImageUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const baseUrl = Env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

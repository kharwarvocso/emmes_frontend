// env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    STRAPI_URL: z.url().default("http://localhost:1337"),
    STRAPI_API_TOKEN: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_STRAPI_URL: z.url().optional(),
    NEXT_PUBLIC_ADSENSE_CLIENT: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_SLOT_HOME: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_SLOT_STICKY: z.string().min(1).optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    NEXT_PUBLIC_ADSENSE_CLIENT: process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
    NEXT_PUBLIC_ADSENSE_SLOT_HOME: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME,
    NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST,
    NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST,
    NEXT_PUBLIC_ADSENSE_SLOT_STICKY: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY,
  },
});

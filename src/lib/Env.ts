// env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    // Strapi backend (server-to-server)
    STRAPI_BASE_URL: z.url().optional(),
    STRAPI_ADMIN_TOKEN: z.string().min(1).optional(),
    // Shared bearer for internal sync (optional). If not set, STRAPI_ADMIN_TOKEN is used.
    BETTER_AUTH_SYNC_TOKEN: z.string().min(1).optional(),
    // If "true", require successful Strapi sync to allow login/signup
    AUTH_REQUIRE_STRAPI_SYNC: z.enum(["true", "false"]).default("false"),
  },
  client: {
    NEXT_PUBLIC_FRONTEND_BASE_URL: z.url(),
    NEXT_PUBLIC_BACKEND_BASE_URL: z.url(),
    NEXT_PUBLIC_STRAPI_READONLY_TOKEN: z.string().optional(),
    // Optional: nothing else yet
  },
  runtimeEnv: {
    STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    STRAPI_ADMIN_TOKEN: process.env.STRAPI_ADMIN_TOKEN,
    BETTER_AUTH_SYNC_TOKEN: process.env.BETTER_AUTH_SYNC_TOKEN,
    AUTH_REQUIRE_STRAPI_SYNC: process.env.AUTH_REQUIRE_STRAPI_SYNC,
    NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
    NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    NEXT_PUBLIC_STRAPI_READONLY_TOKEN: process.env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN,
  },
});

// apiClient.ts
import axios from "axios";
import { Env } from "./Env";

const baseURL = (Env.NEXT_PUBLIC_BACKEND_BASE_URL || "").replace(/\/+$/, "");
const hostname = (() => { try { return new URL(baseURL).hostname; } catch { return ""; } })();
const isNgrok = /(^|\.)ngrok(-free)?\.app$/i.test(hostname);

const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(Env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN
            ? { Authorization: `Bearer ${Env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN}` }
            : {}),
    },
    timeout: 15000,
});

function extractPath(u?: string): string {
    if (!u) return "";
    try {
        const url = new URL(u, baseURL || "http://localhost");
        return url.pathname || "";
    } catch {
        // Treat relative paths as-is
        return u.startsWith("/") ? u : `/${u}`;
    }
}

// Add ngrok param when needed
apiClient.interceptors.request.use(async (config) => {
    // Add ngrok skip param
    if (isNgrok) {
        config.params = { ...(config.params || {}), "ngrok-skip-browser-warning": "true" };
    }

    // Attach Better Auth JWT for protected backend routes when running in the browser
    try {
        const PROTECTED_PREFIXES = [
            "/api/orders",
            "/api/carts",      // plural REST path for cart
            "/api/wishlists",  // plural REST path for wishlist
            "/api/reviews",
            "/api/checkout",
        ];
        const path = extractPath(config.url || "");
        const isProtected = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
        const isBrowser = typeof window !== "undefined";
        if (isProtected && isBrowser) {
            const res = await fetch("/api/auth/token", { method: "GET", credentials: "include", cache: "no-store" });
            if (res.ok) {
                const data = (await res.json()) as { token?: string };
                if (data?.token) {
                    config.headers = config.headers || {};
                    // Override any default read-only token with the Better Auth JWT
                    (config.headers as any)["Authorization"] = `Bearer ${data.token}`;
                }
            }
        }
    } catch {
        // Non-fatal: if token fetch fails, request proceeds (may 401)
    }

    return config;
});

// guard non-JSON (catches ngrok interstitials)
apiClient.interceptors.response.use(
    (res) => {
        const ct = String(res.headers?.["content-type"] || "");
        if (!ct.includes("application/json")) {
            throw new Error(`Unexpected non-JSON from ${res.config?.url} (${ct})`);
        }
        return res;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
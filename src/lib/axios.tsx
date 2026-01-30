// apiClient.ts
import axios from "axios";
import { Env } from "./Env";

const baseURL = (Env.NEXT_PUBLIC_BACKEND_BASE_URL || "").replace(/\/+$/, "");
const hostname = (() => { try { return new URL(baseURL).hostname; } catch { return ""; } })();

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

// guard non-JSON (catches ngrok interstitial)
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
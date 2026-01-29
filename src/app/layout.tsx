import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./css/globals.css";
import "./css/swiper.css";
import "./css/humMenu.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Env } from "@/lib/Env";
import { QueryClient } from "@tanstack/react-query";
import { fetchSiteConfig } from "@/hooks/useSiteConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const merriWeather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const metadataBase = (() => {
  try {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
      "http://localhost:3000";
    return new URL(base);
  } catch {
    return undefined;
  }
})();

export async function generateMetadata(): Promise<Metadata> {
  const queryClient = new QueryClient();
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["siteConfig"],
      queryFn: fetchSiteConfig,
      staleTime: 1000 * 60, // 1 minute cache
    });

    const { site_name, meta_title, meta_description, og_image, favicon } = data || {};

    const title = meta_title || site_name || "TheEmmesGroup";
    const description = meta_description || "Fraud prevention, cyber threat protection, and security solutions.";

    // Helper to resolve URL
    // Since we are using fetchSiteConfig (axios), result URLs might be relative.
    const backendUrl = Env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const resolveUrl = (url?: string) => {
      if (!url) return undefined;
      if (url.startsWith("http")) return url;
      // Remove trailing slash from base if present to avoid double slash
      const cleanBase = backendUrl.replace(/\/+$/, "");
      return `${cleanBase}${url}`;
    };

    return {
      metadataBase: new URL(Env.NEXT_PUBLIC_FRONTEND_BASE_URL),
      title: {
        default: title,
        template: `%s | ${site_name || "TheEmmesGroup"}`,
      },
      description,
      openGraph: {
        title,
        description,
        siteName: site_name,
        images: og_image?.url ? [resolveUrl(og_image.url)!] : [],
      },
      icons: {
        icon: favicon?.url ? resolveUrl(favicon.url) : "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("SEO Fetch Error:", error);
    return {
      title: "TheEmmesGroup",
      description: "Default description",
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriWeather.variable} relative scroll-smooth antialiased overflow-x-hidden `}
      >
        <ViewTransitions>
          <Providers>
            {/* <SiteHeader /> */}
            {children}
            <SiteFooter />
          </Providers>
          <Toaster richColors closeButton position="top-right" />
        </ViewTransitions>
      </body>
    </html>
  );
}

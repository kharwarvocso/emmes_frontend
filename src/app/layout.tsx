import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./css/globals.css";
import "./css/swiper.css";
import "./css/humMenu.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import Layout from "@/components/layout/Layout";
import { getSiteConfig } from "@/lib/strapi/queries";
import { getImageUrl } from "@/lib/strapi/utils";

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
  const siteConfig = await getSiteConfig();
  const siteName = siteConfig?.site_name || "TheEmmesGroup";
  const title = siteConfig?.meta_title || siteName;
  const extractText = (value: unknown) => {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
      return value
        .map((block) => {
          if (!block || typeof block !== "object") return "";
          const children = (block as { children?: Array<{ text?: string }> }).children;
          return Array.isArray(children)
            ? children.map((child) => child?.text || "").join(" ")
            : "";
        })
        .join(" ")
        .trim();
    }
    return undefined;
  };
  const siteDescriptionText = extractText(siteConfig?.site_description);
  const description =
    siteConfig?.meta_description ||
    siteDescriptionText ||
    "Fraud prevention, cyber threat protection, and security solutions for individuals and businesses.";
  const ogImageUrl = getImageUrl(siteConfig?.og_image?.url);
  const faviconUrl = getImageUrl(siteConfig?.favicon?.url);

  return {
    metadataBase,
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      type: "website",
      locale: "en_US",
      siteName,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriWeather.variable} relative scroll-smooth antialiased  overflow-x-hidden`}
      >
        <ViewTransitions>
          <Providers>
            <Layout>{children}</Layout>
            <Toaster richColors closeButton position="top-right" />
          </Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}

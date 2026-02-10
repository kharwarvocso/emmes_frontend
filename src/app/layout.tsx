import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./css/globals.css";
import "./css/swiper.css";
import "./css/humMenu.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import Layout from "@/components/layout/Layout";
import Script from "next/script";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const metadataBase = (() => {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return new URL(base);
  } catch {
    return undefined;
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description:
    "Thoughtful writing on building, design, and the web.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blog",
    type: "website",
    locale: "en_US",
    siteName: "Blog",
    description:
      "Thoughtful writing on building, design, and the web.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Thoughtful writing on building, design, and the web.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${fraunces.variable} relative scroll-smooth antialiased font-sans`}
      >
        {adsenseClient ? (
          <Script
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <ViewTransitions>
          <Layout>
            <Providers>{children}</Providers>
          </Layout>
          <Toaster richColors closeButton position="top-right" />
        </ViewTransitions>
      </body>
    </html>
  );
}


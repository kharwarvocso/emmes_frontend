import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./css/globals.css";
import "./css/swiper.css";
import "./css/humMenu.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import Layout from "@/components/layout/Layout";

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

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "TheEmmesGroup",
    template: "%s | TheEmmesGroup",
  },
  description:
    "Fraud prevention, cyber threat protection, and security solutions for individuals and businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TheEmmesGroup",
    type: "website",
    locale: "en_US",
    siteName: "TheEmmesGroup",
    description:
      "Fraud prevention, cyber threat protection, and security solutions for individuals and businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheEmmesGroup",
    description:
      "Fraud prevention, cyber threat protection, and security solutions for individuals and businesses.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriWeather.variable} relative scroll-smooth antialiased`}
      >
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


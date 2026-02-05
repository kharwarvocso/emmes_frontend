// import Wrapper from "@/components/Wrappers";
// import React from "react";
// import { Metadata } from "next";
// import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
// import { fetchHomepageData, homepageQueryOptions } from "./query";
// import PageRenderer from "../_common/PageRenderer";

// export const revalidate = 0;

// export default async function HomePage() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(homepageQueryOptions);
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Wrapper as="main" isTop className="h-[200vh]">
//         <PageRenderer  />
//       </Wrapper>
//     </HydrationBoundary>
//   );
// }

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const { data } = await fetchHomepageData();
//     const seo = data?.metaData;
//     const keywords = seo?.keywords.map((keyword: any) => (keyword.children || [])?.map((child: any) => child.text))?.join(", ");
//     const metaScripts = (seo?.metaScripts || []).map((script: any) => (script.children || [])?.map((child: any) => child.text))?.join("; ");
//     return {
//       title: seo?.metaTitle || "Default Title",
//       description: seo?.metaDescription || "Default Description",
//       keywords: keywords || undefined,
//       alternates: {
//         canonical: seo?.canonicalUrl || undefined,
//       },
//       other: seo?.metaScripts
//         ? {
//             "data-custom-scripts": metaScripts || undefined,
//           }
//         : {},
//     };
//   } catch (error) {
//     console.error("Error generating metadata in HomePage:", error);
//     return {
//       title: "E-commerce Store",
//       description: "Welcome to our amazing store",
//     };
//   }
// }


import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import TruthSection from "@/components/landing/TruthSection";
import ResourceCenter from "@/components/landing/ResourceCenter";
import StatsSection from "@/components/landing/StatsSection";
import PartnerSection from "@/components/landing/PartnerSection";
import LeadershipSection from "@/components/landing/LeadershipSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import CasesSection from "@/components/landing/CasesSection";
import { fetchHomepageData } from "./query";
import { getOfferings, getTestimonials } from "@/lib/strapi/queries";
import { getImageUrl } from "@/lib/strapi/utils";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 0;

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
  "http://localhost:3000";

const resolveAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  try {
    return new URL(value, getBaseUrl()).toString();
  } catch {
    return value;
  }
};

const resolveMediaUrl = (value?: unknown) => {
  if (!value) return undefined;
  if (typeof value === "string") return getImageUrl(value);
  if (typeof value === "object" && value !== null && "url" in value) {
    const media = value as {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
        thumbnail?: { url?: string };
      };
    };
    return getImageUrl(
      media.url ||
        media.formats?.large?.url ||
        media.formats?.medium?.url ||
        media.formats?.small?.url ||
        media.formats?.thumbnail?.url,
    );
  }
  if (typeof value === "object" && value !== null && "data" in value) {
    const data = (value as { data?: unknown }).data;
    if (Array.isArray(data)) return resolveMediaUrl(data[0]);
    return resolveMediaUrl(data);
  }
  return undefined;
};

export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await fetchHomepageData();
  const page = homepageData?.data?.[0];
  const seo = page?.seo;

  const baseUrl = getBaseUrl();
  const metadataBase = (() => {
    try {
      return new URL(baseUrl);
    } catch {
      return undefined;
    }
  })();

  const title = seo?.metaTitle || "TheEmmesGroup";
  const description = seo?.metaDescription || "TheEmmesGroup";
  const canonical = resolveAbsoluteUrl(seo?.canonicalURL || baseUrl);
  const ogImageUrl = resolveMediaUrl(seo?.ogImage);
  const twitterImageUrl = resolveMediaUrl(seo?.twitterImage) || ogImageUrl;

  return {
    metadataBase,
    title,
    description,
    keywords: seo?.metaKeywords || undefined,
    alternates: canonical ? { canonical } : undefined,
    robots: seo?.metaRobots || undefined,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      type: "website",
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
      card: "summary_large_image",
    },
  };
}

export default async function HomePage() {
  const homepageData = await fetchHomepageData();
  const testimonials = await getTestimonials();
  const offerings = await getOfferings();
  const page = homepageData?.data?.[0];

  const heroSection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.hero-section",
  );
  const textMediaSections = page?.hero_section?.filter(
    (section: { __component?: string }) =>
      section?.__component === "section.text-media-section",
  );
  const truthSection = textMediaSections?.[0];
  const resourceCenterSection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.blog-card-section",
  );
  const metrixSection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.metrix",
  );
  const servicesSection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.services-section",
  );
  const memberSection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.memeber-section",
  );
  const caseStudySection = page?.hero_section?.find(
    (section: { __component?: string }) =>
      section?.__component === "section.case-study",
  );
  const partnerSection = textMediaSections?.[1];
  const baseUrl = getBaseUrl();
  const structuredData = page?.seo?.structuredData;

  return (
    <main>
      {structuredData ? (
        <JsonLd id="jsonld-page" data={structuredData} />
      ) : null}
      <JsonLd
        id="jsonld-website"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TheEmmesGroup",
          url: baseUrl,
        }}
      />
      <JsonLd
        id="jsonld-organization"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TheEmmesGroup",
          url: baseUrl,
        }}
      />

      <Hero section={heroSection as any} />
      <TruthSection section={truthSection as any} />
      <ResourceCenter section={resourceCenterSection as any} />
      <StatsSection section={metrixSection as any} />
      <PartnerSection section={partnerSection as any} />
      <LeadershipSection section={memberSection as any} leaders={testimonials} />
      <SolutionsSection section={servicesSection as any} offerings={offerings} />
      <CasesSection section={caseStudySection as any} />
    </main>
  );
}

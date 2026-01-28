import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import TruthSection from "@/components/landing/TruthSection";
import ResourceCenter from "@/components/landing/ResourceCenter";
import StatsSection from "@/components/landing/StatsSection";
import PartnerSection from "@/components/landing/PartnerSection";
import LeadershipSection from "@/components/landing/LeadershipSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import CasesSection from "@/components/landing/CasesSection";

import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "TheEmmesGroup",
  description: "TheEmmesGroup",
};

export default function HomePage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    "http://localhost:3000";

  return (
    <main>
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
      {/* <JsonLd
        id="jsonld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }} */}
      {/* /> */}

      <Hero />
      <TruthSection />
      <ResourceCenter />
      <StatsSection />
      <PartnerSection />
      <LeadershipSection />
      <SolutionsSection />
      <CasesSection />
    </main>
  );
}

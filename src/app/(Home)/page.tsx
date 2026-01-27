import Wrapper from "@/components/Wrappers";
import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Faq, { faqItems } from "@/components/landing/Faq";
import Contact from "@/components/landing/Contact";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 3600;

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
      <JsonLd
        id="jsonld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <Faq />
      <Contact />
      <div className="py-10" />
    </main>
  );
}

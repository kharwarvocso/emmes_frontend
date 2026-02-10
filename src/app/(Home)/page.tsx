import Wrapper from "@/components/Wrappers";
import { Metadata } from "next";
import PageRenderer from "../_common/PageRenderer";
import JsonLd from "@/components/seo/JsonLd";
import { mockHomeSections, mockPosts } from "@/lib/mock/blog";
import { getBlogHome, getBlogPosts } from "@/lib/strapi/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [home, allPosts] = await Promise.all([getBlogHome(), getBlogPosts({ pageSize: 100 })]);
  const pageSections = home.pageSections ?? [];
  const useMockSections = pageSections.length === 0;
  const sectionsToRender = useMockSections ? mockHomeSections : pageSections;
  const fallbackPosts = allPosts.length ? allPosts : mockPosts;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = home.metaData?.metaTitle || "Blog";
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const homeAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/blog?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <Wrapper as="main" isTop className="space-y-4 md:space-y-6">
      <JsonLd data={jsonLd} />
      <PageRenderer
        sections={sectionsToRender}
        fallbackPosts={fallbackPosts}
        showInlineAd
        inlineAdSlot={homeAdSlot}
        adsenseClient={adsenseClient}
      />
    </Wrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { metaData } = await getBlogHome();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = metaData?.metaTitle || "Blog";
  const description = metaData?.metaDescription || "Read the latest articles, guides, and insights.";
  const canonical = metaData?.canonicalUrl || baseUrl;
  const ogImage = metaData?.ogImage?.url;
  const keywords = Array.isArray(metaData?.keywords)
    ? metaData?.keywords
        .map((item: any) => {
          if (typeof item === "string") return item;
          if (typeof item?.text === "string") return item.text;
          if (Array.isArray(item?.children)) {
            return item.children.map((child: any) => child?.text || "").join(" ").trim();
          }
          return null;
        })
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

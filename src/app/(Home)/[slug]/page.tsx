import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "../query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Wrapper from "@/components/Wrappers";
import PageRenderer from "@/app/sections/PageRenderer";

interface ProductPageProps {
  params: Promise<{ slug: string; filters?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);
    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }

    const { seo } = product;
    const brandName = typeof product.brand === "object" && product.brand
      ? product.brand.name
      : (product as any).brand; // if you ever mapped brand to string elsewhere

    const images = (product.media?.map((m) => m.image?.url).filter(Boolean) || []) as string[];

    const title = seo?.title || `${product.title} | Your Store`;
    const description = seo?.description || product.shortDescription || undefined;

    return {
      title,
      description,
      keywords:
        seo?.keywords ||
        [brandName, product.title, ...(product.categories?.map((c) => c.name) || [])]
          .filter(Boolean)
          .join(", "),
      openGraph: {
        title: seo?.ogTitle || product.title,
        description: seo?.ogDescription || product.shortDescription || description,
        images: seo?.ogImage ? [seo.ogImage] : images.slice(0, 4),
        type: "website",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.twitterTitle || product.title,
        description: seo?.twitterDescription || product.shortDescription || description,
        images: seo?.twitterImage ? [seo.twitterImage] : images[0] ? [images[0]] : [],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
      },
      robots: {
        index: Boolean(product.publishedAt),
        follow: true,
      },
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(homepageQueryOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wrapper as="main" isTop className="h-[200vh]">
        <PageRenderer />
      </Wrapper>
    </HydrationBoundary>
}
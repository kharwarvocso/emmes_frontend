import { Metadata } from "next";
import Wrapper from "@/components/Wrappers";

interface ProductPageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    "http://localhost:3000";

  return {
    title: `${slug} | Product`,
    description: "Product detail page placeholder.",
    alternates: {
      canonical: `${base}/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  return (
    <Wrapper as="main" isTop className="min-h-[60vh]">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Product</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">{slug}</h1>
        <p className="mt-2 text-sm text-zinc-600">
          This page is a starter template. Connect it to Strapi to render real product data.
        </p>
      </div>
    </Wrapper>
  );
}

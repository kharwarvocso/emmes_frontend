import Wrapper from "@/components/Wrappers";
import JsonLd from "@/components/seo/JsonLd";
import { getMockPostBySlug, mockSlugs } from "@/lib/mock/blog";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/strapi/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { getFallbackImage } from "@/lib/fallbackImages";
import AdSlot from "@/components/ads/AdSlot";

export const revalidate = 300;

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  const list = slugs.length ? slugs : mockSlugs;
  return list.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = (await getBlogPostBySlug(params.slug)) ?? getMockPostBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!post) {
    return {
      title: "Post not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = post.seo as any;
  const title = seo?.metaTitle || post.title;
  const description = seo?.metaDescription || post.excerpt || "Blog post";
  const canonical = seo?.canonicalUrl || `${baseUrl}/blog/${post.slug}`;
  const ogImage = seo?.ogImage?.url || post.coverImage?.url;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
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

const renderContent = (content: unknown) => {
  if (!content) return null;

  if (typeof content === "string") {
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);
    if (looksLikeHtml) {
      return <div className="space-y-6" dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return (
      <div className="space-y-6">
        {content.split("\n").map((line, index) => (
          <p key={index} className="text-base text-zinc-700">
            {line}
          </p>
        ))}
      </div>
    );
  }

  if (Array.isArray(content)) {
    return (
      <div className="space-y-6">
        {content.map((block: any, index) => {
          const text = Array.isArray(block?.children)
            ? block.children.map((child: any) => child?.text || "").join("")
            : "";

          if (block?.type === "heading") {
            return (
              <h2 key={index} className="text-2xl font-semibold text-zinc-900 font-display">
                {text}
              </h2>
            );
          }

          return (
            <p key={index} className="text-base text-zinc-700">
              {text || ""}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = (await getBlogPostBySlug(params.slug)) ?? getMockPostBySlug(params.slug);
  if (!post) notFound();

  const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMMM D, YYYY") : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    image: post.coverImage?.url ? [post.coverImage.url] : undefined,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  const isMock = post.id?.startsWith("mock-");
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const postAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST;

  return (
    <Wrapper as="main" isTop className="space-y-10 md:space-y-16">
      <JsonLd data={jsonLd} />
      <article className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500">
            {post.category?.name && (
              <span className="rounded-full border border-zinc-200 px-2.5 py-0.5">{post.category.name}</span>
            )}
            {dateLabel && <span>{dateLabel}</span>}
            {post.author?.name && <span>By {post.author.name}</span>}
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-zinc-900 md:text-4xl font-display">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-base text-zinc-600">{post.excerpt}</p>}
        </div>
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={post.coverImage?.url || getFallbackImage(post.slug, "hero")}
            alt={post.coverImage?.alternativeText || post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          <AdSlot client={adsenseClient} slot={postAdSlot} minHeight={140} />
        </div>
        <div className="mx-auto mt-8 max-w-3xl text-[1.05rem] leading-8 text-zinc-700">
          {renderContent(post.content)}
        </div>
      </article>
    </Wrapper>
  );
}

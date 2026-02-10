import Wrapper from "@/components/Wrappers";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { mockPosts } from "@/lib/mock/blog";
import { getBlogPosts } from "@/lib/strapi/queries";
import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts({ pageSize: 12 });
  const useMockPosts = posts.length === 0;
  const list = useMockPosts ? mockPosts : posts;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const listAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST;

  const categories = list
    .map((post) => post.category?.name)
    .filter((value, index, self) => value && self.indexOf(value) === index)
    .slice(0, 6)
    .map((categoryName) => {
      const post = list.find((item) => item.category?.name === categoryName);
      return {
        name: categoryName as string,
        slug: post?.category?.slug || "#",
      };
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    url: `${siteUrl}/blog`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 text-white">
        <Wrapper as="div" isTop className="py-8 md:py-10">
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl font-display text-white">Blog</h1>
          <p className="mt-3 max-w-2xl text-base text-white/75">
            Essays, guides, and stories from the team. Discover new ideas, tutorials, and behind-the-scenes notes.
          </p>
        </Wrapper>
      </section>

      <Wrapper as="main"  className="space-y-12 md:space-y-16 mt-10 ">
        <div className="grid gap-10 lg:grid-cols-[1.8fr_0.8fr]">
        <div>
          {list.length ? (
            <div className="flex flex-col gap-6">
              {list.map((post, index) => {
                const shouldShowInlineAd = (index + 1) % 4 === 0 && index + 1 < list.length;
                return (
                  <Fragment key={post.id || post.slug}>
                    <PostCard post={post} layout="horizontal" />
                    {shouldShowInlineAd && (
                      <AdSlot
                        client={adsenseClient}
                        slot={listAdSlot}
                        label="Sponsored"
                        minHeight={120}
                        className="mx-auto w-full"
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-6 text-sm text-zinc-600">
              Add blog posts in Strapi to populate this list.
            </div>
          )}
        </div>

        <aside className="space-y-6">
            <AdSlot
            client={adsenseClient}
            slot={listAdSlot}
            label="Sponsored"
            minHeight={250}
            className="mx-auto w-full "
          />
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-zinc-900">Categories</h3>
            <div className="relative mt-3 h-px bg-zinc-200">
              <span className="absolute left-0 top-0 h-1 w-10 bg-rose-400" />
            </div>
            <div className="mt-4 space-y-2">
              {categories.length ? (
                categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.slug ? `/category/${category.slug}` : "/blog"}
                    className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-zinc-400">Browse</span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-zinc-600">Add categories in Strapi to populate this list.</p>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-slate-900 p-5 text-white">
            <h3 className="text-lg font-semibold">Daily Newsletter</h3>
            <p className="mt-2 text-sm text-white/70">
              Get all the top stories from blogs to keep track.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-rose-400 px-3 py-2 text-sm text-white">
              <span className="flex-1">Enter your e-mail</span>
            </div>
          </div>

        
        </aside>
        </div>
      </Wrapper>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "Blog",
    description: "Read the latest posts, guides, and insights.",
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: "Blog",
      description: "Read the latest posts, guides, and insights.",
      url: `${siteUrl}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Blog",
      description: "Read the latest posts, guides, and insights.",
    },
  };
}

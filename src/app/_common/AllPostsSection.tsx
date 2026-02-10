import Wrapper from "@/components/Wrappers";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import type { BlogPost } from "@/lib/strapi/queries";
import AdSlot from "@/components/ads/AdSlot";

export default function AllPostsSection({
  title,
  posts,
  fallbackPosts,
  isLoading,
}: {
  title?: string;
  posts?: BlogPost[];
  fallbackPosts?: BlogPost[];
  isLoading?: boolean;
}) {
  const items = (posts?.length ? posts : fallbackPosts || []).slice(0, 10);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const sidebarAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;

  return (
    <Wrapper className="py-6">
      <div className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Library
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 font-display">
              {title || "All Posts"}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900"
          >
            View all
          </Link>
        </div>
        <div className="relative mt-3 h-px bg-zinc-200">
          <span className="absolute left-0 top-0 h-1 w-12 bg-rose-400" />
        </div>

        {items.length ? (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
            <div className="flex flex-col gap-6">
              {items.map((post) => (
                <PostCard
                  key={post.id || post.slug}
                  post={post}
                  layout="horizontal"
                />
              ))}
            </div>
            <aside className="space-y-4">
              <div className="sticky top-24">
                <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/60 p-3">
                  <AdSlot
                    client={adsenseClient}
                    slot={sidebarAdSlot}
                    label="Sponsored"
                    minHeight={360}
                    className="mx-auto max-w-xs"
                  />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">
            Add blog posts in Strapi to populate this section.
          </p>
        )}
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading blog posts...</p>}
      </div>
    </Wrapper>
  );
}

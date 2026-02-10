import Wrapper from "@/components/Wrappers";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/strapi/queries";
import { getFallbackImage } from "@/lib/fallbackImages";

export default function FeaturedPostsSection({
  title,
  posts,
  isLoading,
}: {
  title?: string;
  posts?: BlogPost[];
  isLoading?: boolean;
}) {
  const items = posts?.length ? posts : [];

  return (
    <Wrapper className="py-6">
      <div className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900 font-display">
            {title || "Editors Choice"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative mt-3 h-px bg-zinc-200">
          <span className="absolute left-0 top-0 h-1 w-12 bg-rose-400" />
        </div>
        {items.length ? (
          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => {
              const href = post.slug ? `/blog/${post.slug}` : "/blog";
              const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;
              return (
                <article key={post.id || post.slug} className="flex items-center gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
                    <Image
                      src={post.coverImage?.url || getFallbackImage(post.slug, "card")}
                      alt={post.coverImage?.alternativeText || post.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    {post.category?.name && (
                      <span className="inline-flex items-center border border-zinc-200 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="mt-2 text-base font-semibold text-zinc-900">
                      <Link href={href} className="transition hover:text-zinc-700">
                        {post.title}
                      </Link>
                    </h3>
                    {dateLabel && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>{dateLabel}</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">
            Add featured posts in Strapi to highlight your best stories.
          </p>
        )}
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading featured posts...</p>}
      </div>
    </Wrapper>
  );
}

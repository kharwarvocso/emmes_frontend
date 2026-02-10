import Wrapper from "@/components/Wrappers";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import type { BlogPost } from "@/lib/strapi/queries";
import { getFallbackImage } from "@/lib/fallbackImages";

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  heroImage,
  featuredPost,
  trendingPosts,
  posts,
  fallbackPosts,
  isLoading,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImage?: { url?: string; alternativeText?: string } | null;
  featuredPost?: BlogPost | null;
  trendingPosts?: BlogPost[];
  posts?: BlogPost[];
  fallbackPosts?: BlogPost[];
  isLoading?: boolean;
}) {
  const primaryPost = featuredPost || posts?.[0] || fallbackPosts?.[0];
  const list =
    (trendingPosts && trendingPosts.length ? trendingPosts : posts?.slice(1, 4)) ||
    fallbackPosts?.slice(1, 4) ||
    [];
  const rightPosts = list.slice(0, 3);
  const cover = primaryPost?.coverImage?.url ? primaryPost.coverImage : heroImage;
  const fallbackHero = getFallbackImage(primaryPost?.slug || "hero", "hero");
  const heading = primaryPost?.title || title || "Read stories that help you think, build, and grow.";
  const description =
    primaryPost?.excerpt ||
    subtitle ||
    "Fresh essays, how-tos, and insights curated for curious builders.";
  const buttonLabel = ctaLabel || "Explore the blog";
  const buttonHref = ctaHref || "/blog";
  const estimateReadTime = (content: BlogPost["content"]) => {
    if (!content) return null;
    let text = "";
    if (typeof content === "string") {
      text = content;
    } else if (Array.isArray(content)) {
      text = content
        .map((block: any) =>
          Array.isArray(block?.children) ? block.children.map((child: any) => child?.text || "").join(" ") : "",
        )
        .join(" ");
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (!words) return null;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };
  const readTime = estimateReadTime(primaryPost?.content);

  return (
    <Wrapper className="py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="group relative overflow-hidden rounded-lg bg-zinc-900 shadow-sm">
          <div className="absolute inset-0">
            <Image
              src={cover?.url || fallbackHero}
              alt={cover?.alternativeText || heading}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
          </div>
          <div className="relative z-10 flex h-full min-h-[32rem] flex-col justify-end p-7 md:min-h-[38rem] md:p-12">
            <div className="flex items-center gap-2">
              {primaryPost?.category?.name && (
                <span className="inline-flex items-center bg-rose-400/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                  {primaryPost.category.name}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl lg:text-5xl font-display underline decoration-white/70 decoration-2 underline-offset-8">
              {heading}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
              {primaryPost?.author?.name && <span>By {primaryPost.author.name}</span>}
              {primaryPost?.publishedAt && <span>{dayjs(primaryPost.publishedAt).format("MMM D, YYYY")}</span>}
              {readTime && <span>{readTime}</span>}
            </div>
            {isLoading && <p className="mt-3 text-xs text-white/70">Loading hero content...</p>}
          </div>
        </article>

        <aside className="grid gap-4 lg:h-full lg:grid-rows-3">
          {rightPosts.length ? (
            rightPosts.map((post) => (
              <article
                key={post.id || post.slug}
                className="group relative overflow-hidden rounded-md border border-zinc-200 bg-zinc-900 min-h-[8.5rem] lg:min-h-0 lg:h-full"
              >
                <div className="absolute inset-0">
                  <Image
                    src={post.coverImage?.url || getFallbackImage(post.slug, "thumb")}
                    alt={post.coverImage?.alternativeText || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-end p-4">
                  {post.category?.name && (
                    <span className="inline-flex items-center self-start bg-sky-500/90 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="mt-3 text-base font-semibold text-white">{post.title}</h3>
                  <div className="mt-2 text-xs text-white/70">
                    {post.publishedAt && <span>{dayjs(post.publishedAt).format("MMM D, YYYY")}</span>}
                  </div>
                  <Link
                    href={post.slug ? `/blog/${post.slug}` : "/blog"}
                    className="absolute inset-0"
                    aria-label={post.title}
                  />
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-4 text-sm text-zinc-500">
              Add trending posts to this section.
            </div>
          )}
        </aside>
      </div>
    </Wrapper>
  );
}

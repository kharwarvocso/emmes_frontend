import Wrapper from "@/components/Wrappers";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Pin,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import type { BlogPost } from "@/lib/strapi/queries";
import { getFallbackImage } from "@/lib/fallbackImages";
import AdSlot from "@/components/ads/AdSlot";

export default function RecentPostsSection({
  title,
  posts,
  isLoading,
}: {
  title?: string;
  posts?: BlogPost[];
  isLoading?: boolean;
}) {
  const items = posts?.length ? posts : [];
  const primaryPost = items[0];
  const listPosts = items.slice(1, 4);
  const trendingPrimary = items[1] || items[0];
  const trendingPrimaryKey = trendingPrimary?.id ?? trendingPrimary?.slug;
  const trendingList = items.filter((post) => {
    const key = post.id ?? post.slug;
    if (trendingPrimaryKey) return key !== trendingPrimaryKey;
    return post !== trendingPrimary;
  });
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const sidebarAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  const bottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST;

  const socials = [
    { label: "Facebook", icon: Facebook },
    { label: "Twitter", icon: Twitter },
    { label: "Instagram", icon: Instagram },
    { label: "Youtube", icon: Youtube },
    { label: "LinkedIn", icon: Linkedin },
    { label: "Pinterest", icon: Pin },
  ];

  const categoryCards = items
    .map((post) => post.category?.name)
    .filter((value, index, self) => value && self.indexOf(value) === index)
    .slice(0, 4)
    .map((categoryName) => {
      const post = items.find((item) => item.category?.name === categoryName);
      return {
        name: categoryName as string,
        image: post?.coverImage?.url || getFallbackImage(categoryName as string, "thumb"),
        slug: post?.category?.slug || "#",
      };
    });

  const popularPosts = items.slice(0, 3);

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
    return `${minutes} mins`;
  };

  const readTime = estimateReadTime(primaryPost?.content);

  return (
    <Wrapper className="py-6">
      <div className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900 font-display">
            {title || "Recent Posts"}
          </h2>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900">
            View all
            <ArrowUpRight className="h-4 w-4 text-rose-400" />
          </Link>
        </div>
        <div className="relative mt-3 h-px bg-zinc-200">
          <span className="absolute left-0 top-0 h-1 w-12 bg-rose-400" />
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.8fr_0.8fr]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <article className="relative overflow-hidden rounded-lg bg-zinc-900 shadow-sm">
                <div className="absolute inset-0">
                  <Image
                    src={primaryPost?.coverImage?.url || getFallbackImage(primaryPost?.slug || "recent", "hero")}
                    alt={primaryPost?.coverImage?.alternativeText || primaryPost?.title || "Recent post"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                </div>
                <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-6 md:min-h-[26rem] md:p-8">
                  {primaryPost?.category?.name && (
                    <span className="inline-flex items-center self-start bg-rose-400 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                      {primaryPost.category.name}
                    </span>
                  )}
                  <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                    {primaryPost?.title || "Add a highlighted recent post"}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
                    {primaryPost?.author?.name && (
                      <span className="inline-flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {primaryPost.author.name}
                      </span>
                    )}
                    {primaryPost?.publishedAt && (
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {dayjs(primaryPost.publishedAt).format("MMM D, YYYY")}
                      </span>
                    )}
                    {readTime && (
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {readTime}
                      </span>
                    )}
                  </div>
                  {primaryPost?.slug && (
                    <Link href={`/blog/${primaryPost.slug}`} className="absolute inset-0" aria-label={primaryPost.title} />
                  )}
                </div>
              </article>

              <div className="space-y-6">
                {listPosts.length ? (
                  listPosts.map((post) => {
                    const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;
                    return (
                      <article key={post.id || post.slug} className="flex items-center gap-4">
                        <div className="min-w-0 flex-1">
                          {post.category?.name && (
                            <span className="inline-flex items-center self-start bg-rose-400 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                              {post.category.name}
                            </span>
                          )}
                          <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                            <Link href={post.slug ? `/blog/${post.slug}` : "/blog"} className="hover:text-zinc-700">
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
                        <div className="relative h-44 w-36 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                          <Image
                            src={post.coverImage?.url || getFallbackImage(post.slug, "card")}
                            alt={post.coverImage?.alternativeText || post.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className="text-sm text-zinc-600">Add recent posts in Strapi to populate this section.</p>
                )}
                {isLoading && <p className="text-xs text-zinc-500">Loading recent posts...</p>}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-zinc-900">Trending News</h3>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-700"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4 text-rose-400" />
                </Link>
              </div>
              <div className="relative mt-3 h-px bg-zinc-200">
                <span className="absolute left-0 top-0 h-1 w-10 bg-rose-400" />
              </div>

              <div className="mt-5 space-y-6">
                <article className="grid gap-5 bg-white md:grid-cols-[1.35fr_1fr] min-h-[18rem]">
                  <div className="relative h-96 w-full overflow-hidden rounded-md bg-zinc-100">
                    <Image
                      src={trendingPrimary?.coverImage?.url || getFallbackImage(trendingPrimary?.slug || "trend", "card")}
                      alt={trendingPrimary?.coverImage?.alternativeText || trendingPrimary?.title || "Trending post"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {trendingPrimary?.category?.name && (
                      <span className="absolute left-3 top-3 inline-flex items-center bg-rose-400 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">
                        {trendingPrimary.category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="mt-3 text-xl font-semibold text-zinc-900">
                      <Link
                        href={trendingPrimary?.slug ? `/blog/${trendingPrimary.slug}` : "/blog"}
                        className="hover:text-zinc-700"
                      >
                        {trendingPrimary?.title || "Add a trending post headline"}
                      </Link>
                    </h4>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      {trendingPrimary?.author?.name && (
                        <span className="inline-flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {trendingPrimary.author.name}
                        </span>
                      )}
                      {trendingPrimary?.publishedAt && (
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {dayjs(trendingPrimary.publishedAt).format("MMM D, YYYY")}
                        </span>
                      )}
                      {estimateReadTime(trendingPrimary?.content) && (
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {estimateReadTime(trendingPrimary?.content)}
                        </span>
                      )}
                    </div>
                    {trendingPrimary?.excerpt && (
                      <p className="mt-3 text-sm text-zinc-600">{trendingPrimary.excerpt}</p>
                    )}
                    <Link
                      href={trendingPrimary?.slug ? `/blog/${trendingPrimary.slug}` : "/blog"}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 hover:text-zinc-900"
                    >
                      Read more
                      <ArrowUpRight className="h-4 w-4 text-rose-400" />
                    </Link>
                  </div>
                </article>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {trendingList?.length ? (
                    trendingList?.map((post) => {
                      const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;
                      return (
                        <article key={post.id || post.slug} className="space-y-3">
                          <div className="relative h-64 w-full overflow-hidden rounded-md bg-zinc-100">
                            <Image
                              src={post.coverImage?.url || getFallbackImage(post.slug, "card")}
                              alt={post.coverImage?.alternativeText || post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover"
                            />
                            {post.category?.name && (
                              <span className="absolute left-3 top-3 inline-flex items-center bg-rose-400 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">
                                {post.category.name}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-semibold text-zinc-900">
                            <Link href={post.slug ? `/blog/${post.slug}` : "/blog"} className="hover:text-zinc-700">
                              {post.title}
                            </Link>
                          </h4>
                          {dateLabel && (
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <CalendarDays className="h-4 w-4" />
                              <span>{dateLabel}</span>
                            </div>
                          )}
                        </article>
                      );
                    })
                  ) : (
                    <p className="text-sm text-zinc-600">Add trending posts to populate this section.</p>
                  )}
                </div>
              </div>

              
            </div>
          </div>

          <aside className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Subscribe & Followers</h3>
              <div className="relative mt-3 h-px bg-zinc-200">
                <span className="absolute left-0 top-0 h-1 w-10 bg-rose-400" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-700"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

             <AdSlot
              client={adsenseClient}
              slot={sidebarAdSlot}
              label="Sponsored"
              minHeight={250}
              className="mx-auto max-w-xs"
            />

            <div className="rounded-lg bg-slate-900 p-5 text-white min-h-[10rem] flex flex-col justify-center">
              <h4 className="text-xl font-semibold">Daily Newsletter</h4>
              <p className="mt-2 text-sm text-white/70">
                Get all the top stories from blogs to keep track.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-md bg-rose-400 px-3 py-2 text-sm text-white">
                <span className="flex-1">Enter your e-mail</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

           

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Hot Categories</h3>
              <div className="relative mt-3 h-px bg-zinc-200">
                <span className="absolute left-0 top-0 h-1 w-10 bg-rose-400" />
              </div>
              <div className="mt-4 space-y-3">
                {categoryCards.length ? (
                  categoryCards.map((category) => (
                    <Link
                      key={category.name}
                      href={category.slug ? `/category/${category.slug}` : "/blog"}
                      className="relative flex items-center justify-between overflow-hidden rounded-md border border-zinc-200 bg-zinc-900 px-5 py-5 text-white min-h-[3.75rem]"
                    >
                      <span className="relative z-10 rounded-full bg-white/10 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em]">
                        {category.name}
                      </span>
                      <span className="relative z-10 text-sm font-semibold">↗</span>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="240px"
                        className="object-cover opacity-60"
                      />
                      <span className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent" />
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-zinc-600">Add categories in Strapi to populate this list.</p>
                )}
              </div>
            </div>

            <AdSlot
              client={adsenseClient}
              slot={sidebarAdSlot}
              label="Sponsored"
              minHeight={180}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Popular Posts</h3>
              <div className="relative mt-3 h-px bg-zinc-200">
                <span className="absolute left-0 top-0 h-1 w-10 bg-rose-400" />
              </div>
              <div className="mt-4 space-y-4">
                {popularPosts.length ? (
                  popularPosts.map((post) => {
                    const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;
                    return (
                      <article key={post.id || post.slug} className="flex items-start gap-3">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
                          <Image
                            src={post.coverImage?.url || getFallbackImage(post.slug, "thumb")}
                            alt={post.coverImage?.alternativeText || post.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          {post.category?.name && (
                            <span className="inline-flex items-center border border-zinc-200 px-2.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                              {post.category.name}
                            </span>
                          )}
                          <p className="mt-2 text-sm font-semibold text-zinc-900">{post.title}</p>
                          {dateLabel && (
                            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                              <CalendarDays className="h-4 w-4" />
                              <span>{dateLabel}</span>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className="text-sm text-zinc-600">Add posts to populate popular list.</p>
                )}
              </div>
            </div>

            
          </aside>
        </div>
        {/* <div className="mt-8 flex justify-center">
          <AdSlot
            client={adsenseClient}
            slot={bottomAdSlot}
            label="Sponsored"
            minHeight={160}
            className="w-full max-w-4xl"
          />
        </div> */}
      </div>
    </Wrapper>
  );
}

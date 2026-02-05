import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { getImageUrl } from "@/hooks/useSiteConfig";
import { BlogCardSectionSchema, type BlogCardSection } from "@/lib/strapi/schema";
import { HiArrowRight } from "react-icons/hi2";

type MediaItem = {
  url?: string;
  mime?: string;
  alternativeText?: string | null;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
};

const resolveMediaItem = (value?: unknown): MediaItem | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return { url: value };
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "string") return { url: first };
    return first as MediaItem;
  }
  if (typeof value === "object" && value !== null && "data" in value) {
    const data = (value as { data?: unknown }).data;
    if (Array.isArray(data)) return data[0] as MediaItem;
    return (data as MediaItem) ?? undefined;
  }
  return value as MediaItem;
};

const resolveArray = <T,>(value?: T[] | { data?: T[] } | null): T[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null && "data" in value && Array.isArray(value.data)) {
    return value.data;
  }
  return [];
};

const resolveMediaUrl = (media?: MediaItem) =>
  getImageUrl(
    media?.url ||
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url,
  );

const isVideoMedia = (media?: MediaItem, url?: string) => {
  const mediaUrl = url || resolveMediaUrl(media);
  if (!mediaUrl) return false;
  return (
    media?.mime?.startsWith("video/") ||
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(mediaUrl)
  );
};

const extractText = (value?: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const blocksText = value
      .map((block) => {
        if (!block || typeof block !== "object") return "";
        const children = (block as { children?: Array<{ text?: string }> }).children;
        return Array.isArray(children)
          ? children.map((child) => child?.text || "").join(" ")
          : "";
      })
      .join(" ");
    return blocksText || undefined;
  }
  if (typeof value === "object" && "text" in value) {
    return (value as { text?: string }).text;
  }
  return undefined;
};

const getBlogDate = (blog: { publishedAt?: string; createdAt?: string; updatedAt?: string }) => {
  const candidate = blog.publishedAt || blog.createdAt || blog.updatedAt;
  const timestamp = candidate ? Date.parse(candidate) : Number.NaN;
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export default function ResourceCenter({
  section,
}: {
  section?: BlogCardSection;
}) {
  const parsedSection = BlogCardSectionSchema.safeParse(section);
  const sectionData = parsedSection.success ? parsedSection.data : undefined;
  if (!sectionData || sectionData?.is_hidden) return null;

  const featuredCard = sectionData?.featured_card;

  const featureSubtitle =
    featuredCard?.sub_tittle;
  const featureTitle =
    featuredCard?.title || sectionData?.title;
  const featureDescription =
    extractText(featuredCard?.description) || sectionData?.description;

  const featuredButton = featuredCard?.button;
  const featuredButtonLabel = featuredButton?.name;
  const featuredButtonHref = featuredButton?.link;
  const featuredButtonIconPosition =
    featuredButton?.icon_position === "left" ? "left" : "right";
  const featuredButtonIconMedia = resolveMediaItem(featuredButton?.icon);
  const featuredButtonIconUrl = resolveMediaUrl(featuredButtonIconMedia);
  const hasFeatureContent = Boolean(
    featureSubtitle || featureTitle || featureDescription || featuredButtonLabel,
  );
  const showFeaturedCard = !featuredCard?.ishidden && hasFeatureContent;

  const sectionBgMedia = resolveMediaItem(sectionData?.bg_media);
  const sectionBgUrl = resolveMediaUrl(sectionBgMedia);
  const sectionBgIsVideo = isVideoMedia(sectionBgMedia, sectionBgUrl);

  const featureBgMedia = resolveMediaItem(featuredCard?.bg_media);
  const featureBgUrl = resolveMediaUrl(featureBgMedia);
  const featureBgIsVideo = isVideoMedia(featureBgMedia, featureBgUrl);

  const commonButtonLabel = sectionData?.common_btn_name;
  const commonButtonIconMedia = resolveMediaItem(sectionData?.common_btn_icon);
  const commonButtonIconUrl = resolveMediaUrl(commonButtonIconMedia);
  const commonButtonIconPosition =
    sectionData?.common_btn_position === "left" ? "left" : "right";

  const blogs = resolveArray(sectionData?.blogs);
  const orderedBlogs = sectionData?.is_latest_blog_required
    ? [...blogs].sort((a, b) => getBlogDate(b) - getBlogDate(a))
    : blogs;

  const cards = orderedBlogs
    .filter((blog) => blog?.title)
    .slice(0, 4)
    .map((blog) => {
      const categories = resolveArray(blog?.blog_categories);
      return {
        type: categories[0]?.name || "Article",
        title: blog?.title || "",
        slug: blog?.slug,
      };
    });

  const sectionClassName = sectionBgUrl
    ? "relative overflow-hidden rounded-b-4xl"
    : "relative overflow-hidden bg-[linear-gradient(135deg,#0a1b3b_0%,#0b2a6b_40%,#0a2f7c_70%,#0a3aa5_100%)] rounded-b-4xl";

  return (
    <section className={sectionClassName}>
      {sectionBgUrl ? (
        <div className="absolute inset-0 z-0">
          {sectionBgIsVideo ? (
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
              <source src={sectionBgUrl} type={sectionBgMedia?.mime || undefined} />
            </video>
          ) : (
            <Image
              src={sectionBgUrl}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-slate-900/40" aria-hidden="true" />
        </div>
      ) : null}

      <Wrapper as="div" className="relative py-20 md:py-28">
        <div className={showFeaturedCard ? "grid gap-6 lg:grid-cols-[1.15fr_2fr]" : "grid gap-6"}>
          {showFeaturedCard ? (
            <article
              className={`relative flex h-full min-h-[620px] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white shadow-[0_24px_60px_rgba(2,12,32,0.35)] ${featureBgUrl ? "" : "bg-[#0b66ff]"
                }`}
            >
              {featureBgUrl ? (
                <div className="absolute inset-0">
                  {featureBgIsVideo ? (
                    <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
                      <source src={featureBgUrl} type={featureBgMedia?.mime || undefined} />
                    </video>
                  ) : (
                    <Image
                      src={featureBgUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-slate-900/45" aria-hidden="true" />
                </div>
              ) : null}
              <div className="relative z-10">
                {featureSubtitle ? (
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                    {featureSubtitle}
                  </p>
                ) : null}
                {featureTitle ? (
                  <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
                    {featureTitle}
                  </h2>
                ) : null}
              </div>
              <div className="relative z-10">
                {featureDescription ? (
                  <p className="mt-6 text-sm text-white/85">{featureDescription}</p>
                ) : null}
                {featuredButtonLabel ? (
                  featuredButtonHref ? (
                    <Link
                      href={featuredButtonHref}
                      className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b66ff] shadow-sm"
                    >
                      {featuredButtonIconUrl && featuredButtonIconPosition === "left" ? (
                        <Image
                          src={featuredButtonIconUrl}
                          alt=""
                          width={28}
                          height={28}
                          
                          aria-hidden="true"
                          unoptimized
                        />
                      ) : null}
                      {featuredButtonLabel}
                      {featuredButtonIconUrl ? (
                        featuredButtonIconPosition === "right" ? (
                          <Image
                            src={featuredButtonIconUrl}
                            alt=""
                            width={28}
                            height={28}
                            
                            aria-hidden="true"
                            unoptimized
                          />
                        ) : null
                      ) : (
                        <HiArrowRight  aria-hidden="true" />
                      )}
                    </Link>
                  ) : (
                    <button className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b66ff] shadow-sm">
                      {featuredButtonIconUrl && featuredButtonIconPosition === "left" ? (
                        <Image
                          src={featuredButtonIconUrl}
                          alt=""
                          width={28}
                          height={28}
                          
                          aria-hidden="true"
                          unoptimized
                        />
                      ) : null}
                      {featuredButtonLabel}
                      {featuredButtonIconUrl ? (
                        featuredButtonIconPosition === "right" ? (
                          <Image
                            src={featuredButtonIconUrl}
                            alt=""
                            width={28}
                            height={28}
                            
                            aria-hidden="true"
                            unoptimized
                          />
                        ) : null
                      ) : (
                        <HiArrowRight  aria-hidden="true" />
                      )}
                    </button>
                  )
                ) : null}
              </div>
            </article>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((card) => {
              const href = card.slug ? `/blog/${card.slug}` : undefined;
              const buttonContent = commonButtonLabel ? (
                <>
                  {commonButtonIconUrl && commonButtonIconPosition === "left" ? (
                    <Image
                      src={commonButtonIconUrl}
                      alt=""
                      width={28}
                      height={28}
                      
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null}
                  {commonButtonLabel}
                  {commonButtonIconUrl ? (
                    commonButtonIconPosition === "right" ? (
                      <Image
                        src={commonButtonIconUrl}
                        alt=""
                        width={28}
                        height={28}
                        
                        aria-hidden="true"
                        unoptimized
                      />
                    ) : null
                  ) : (
                    <HiArrowRight  aria-hidden="true" />
                  )}
                </>
              ) : null;

              return (
                <article
                  key={card.title}
                  className="flex aspect-square w-full flex-col justify-between rounded-3xl bg-white p-6 text-slate-900 shadow-[0_24px_60px_rgba(2,12,32,0.2)]"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-[#5a6ddc] px-3 py-1 text-xs font-semibold text-white">
                      {card.type}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold leading-snug">
                      {card.title}
                    </h3>
                  </div>
                  {commonButtonLabel ? (
                    href ? (
                      <Link
                        href={href}
                        className="mt-8 inline-flex items-center justify-between rounded-full bg-[#24377a] px-5 py-2 text-sm font-semibold text-white"
                      >
                        {buttonContent}
                      </Link>
                    ) : (
                      <button className="mt-8 inline-flex items-center justify-between rounded-full bg-[#24377a] px-5 py-2 text-sm font-semibold text-white">
                        {buttonContent}
                      </button>
                    )
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

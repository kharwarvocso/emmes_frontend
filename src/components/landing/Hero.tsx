import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroCard from "@/components/landing/HeroCard";
import { getImageUrl } from "@/hooks/useSiteConfig";

type HeroCardContent = {
  id?: number;
  priority?: number;
  is_hidden?: boolean;
  title?: string;
  description?: string;
  ctaLabel?: string;
  cta_label?: string;
  blog?: {
    slug?: string;
    coverImage?: { url?: string } | { data?: { url?: string } };
  } | Array<{ slug?: string; coverImage?: { url?: string } | { data?: { url?: string } } }> | null;
  our_brand?: {
    slug?: string;
    coverImage?: { url?: string } | { data?: { url?: string } };
  } | Array<{ slug?: string; coverImage?: { url?: string } | { data?: { url?: string } } }> | null;
  icon?: string | { url?: string } | { data?: { url?: string } } | null;
};

type HeroSectionContent = {
  heading?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cards?: HeroCardContent[];
  background_media?:
    | string
    | {
        url?: string;
        mime?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
          thumbnail?: { url?: string };
        };
      }
    | { data?: { url?: string; mime?: string; formats?: { large?: { url?: string }; medium?: { url?: string }; small?: { url?: string }; thumbnail?: { url?: string } } } };
  button?: {
    name?: string;
    link?: string;
    icon?: string | { url?: string };
    icon_position?: string;
    // iconName?: string;
  };
};

function EmmesMark() {
  return (
    <span className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-7 w-7 text-[#1d3173]"
      >
        <path
          d="M12 2.25C13.7 4.2 14.75 6.1 14.75 8.1C14.75 10.6 12.9 12.4 10.4 12.4C9.2 12.4 8.05 12 7.15 11.25C7.45 14.6 9.6 16.9 12.9 16.9C16.6 16.9 19.2 14.2 19.2 10.5C19.2 6.45 15.9 3.35 12 2.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.2 14.6C6.4 13.45 5.2 11.4 5.2 9.1C5.2 7.15 6.1 5.4 7.5 4.05"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.2 19.75H16.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1d3173] via-[#2b6cb0] to-[#5aa7ff]">
        Emmes
      </span>
    </span>
  );
}

function VeridixMark() {
  return (
    <span className="flex items-center gap-2">
      <svg
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="h-7 w-7 text-[#1d3173]"
      >
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
      </svg>
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1d3173] via-[#2b6cb0] to-[#5aa7ff]">
        Veridix
      </span>
    </span>
  );
}


const defaultHeading =
  "Delivering Global Health Impact Through People, Science and Technology";

const defaultCards: HeroCardContent[] = [
  {
    title: "Emmes",
    description:
      "Founded as Emmes more than 47 years ago, Emmes Group has grown",
    ctaLabel: "Explore Emmes",
  },
  {
    title: "Veridix",
    description:
      "Transforming clinical development with intelligent, connected systems",
    ctaLabel: "Explore Veridix",
  },
];

export default function Hero({ section }: { section?: HeroSectionContent }) {
  const sectionTitle =
    section?.title || section?.heading || defaultHeading;
  const subtitle = section?.subtitle;
  const description = section?.description;
  const button = section?.button;
  const buttonLabel = button?.name;
  const buttonHref = button?.link;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl =
    typeof button?.icon === "string"
      ? getImageUrl(button.icon)
      : getImageUrl(button?.icon?.url);
  const backgroundMedia =
    typeof section?.background_media === "string"
      ? { url: section.background_media }
      : section?.background_media && "data" in section.background_media
        ? section.background_media.data
        : section?.background_media;
  const backgroundUrl = getImageUrl(
    backgroundMedia?.url ||
      backgroundMedia?.formats?.large?.url ||
      backgroundMedia?.formats?.medium?.url ||
      backgroundMedia?.formats?.small?.url ||
      backgroundMedia?.formats?.thumbnail?.url,
  );
  const isRemoteBackground = Boolean(backgroundUrl?.startsWith("http"));
  const backgroundMime = backgroundMedia?.mime || "";
  const isVideo =
    backgroundMime.startsWith("video/") ||
    (backgroundUrl ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(backgroundUrl) : false);

  const rawCards = Array.isArray(section?.cards) ? section?.cards : [];
  const visibleCards = rawCards
    .filter((card) => !card?.is_hidden)
    .sort(
      (a, b) =>
        (a?.priority ?? Number.MAX_SAFE_INTEGER) -
        (b?.priority ?? Number.MAX_SAFE_INTEGER),
    );
  const resolvedCards = visibleCards.length > 0 ? visibleCards : defaultCards;

  const getSlug = (
    value?: { slug?: string } | Array<{ slug?: string }> | null,
  ) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value[0]?.slug;
    return value.slug;
  };
  const getCoverUrl = (
    value?:
      | { coverImage?: { url?: string } | { data?: { url?: string } } }
      | Array<{ coverImage?: { url?: string } | { data?: { url?: string } } }>
      | null,
  ) => {
    if (!value) return undefined;
    const item = Array.isArray(value) ? value[0] : value;
    const cover = item?.coverImage;
    return getImageUrl(
      typeof cover === "string"
        ? cover
        : cover?.url || cover?.data?.url,
    );
  };

  const containerClassName = backgroundUrl
    ? "rounded-b-4xl relative overflow-hidden px-0 xl:px-0"
    : "emmes-hero-bottom rounded-b-4xl relative overflow-hidden px-0 xl:px-0";

  return (
    <Wrapper
      as="section"
      containerClassName={containerClassName}
      isMaxWidthChangeRequired="max-w-none"
      className="relative"
    >
      <div className="relative z-10">
        <SiteHeader />
      </div>
      {backgroundUrl ? (
        <div className="absolute inset-0 z-0">
          {isVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={backgroundUrl} type={backgroundMime || undefined} />
            </video>
          ) : (
            <Image
              src={backgroundUrl}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              unoptimized={isRemoteBackground}
            />
          )}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)]" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(13,120,255,0.35),rgba(13,120,255,0)_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-3 py-16 text-white xl:px-5 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          {subtitle ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              {subtitle}
            </p>
          ) : null}
          <h1 className="emmes-heading">{sectionTitle}</h1>
          {description ? (
            <p className="mt-4 text-base text-white/85">{description}</p>
          ) : null}
          {buttonLabel && buttonHref ? (
            <div className="mt-6 flex justify-center">
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d3173] transition hover:bg-white/90"
              >
                {buttonIconUrl && buttonIconPosition === "left" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
                {buttonLabel}
                {buttonIconUrl && buttonIconPosition === "right" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="max-w-screen-xl mx-auto mt-10 grid gap-6 md:grid-cols-2">
          {resolvedCards.map((card, index) => {
            const title =
              card.title || defaultCards[index]?.title || "Explore";
            const descriptionText =
              card.description || defaultCards[index]?.description || "";
            const iconUrl = getImageUrl(
              typeof card.icon === "string"
                ? card.icon
                : card.icon?.url || card.icon?.data?.url,
            );
            const hrefSlug = getSlug(card.blog) || getSlug(card.our_brand);
            const href = hrefSlug ? `/${hrefSlug}` : undefined;
            const coverUrl = getCoverUrl(card.blog) || getCoverUrl(card.our_brand);
            const logo = iconUrl ? (
              <div className="flex items-center gap-2 text-black">
                <Image
                  src={iconUrl}
                  alt=""
                  width={192}
                  height={192}
                  className="h-32 w-32 object-contain"
                  aria-hidden="true"
                  unoptimized
                />
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1d3173] via-[#2b6cb0] to-[#5aa7ff]">
                  {title}
                </span>
              </div>
            ) : index === 0 ? (
              <EmmesMark />
            ) : index === 1 ? (
              <VeridixMark />
            ) : undefined;

            const cardContent = (
              <HeroCard
                title={title}
                logo={logo}
                description={descriptionText}
                mediaClassName={
                  coverUrl
                    ? "bg-cover bg-center"
                    : index === 0
                      ? "bg-[radial-gradient(circle_at_30%_20%,rgba(83,210,255,0.5),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(120,255,214,0.35),transparent_50%),linear-gradient(120deg,#0c0f18_10%,#0c1524_45%,#0e2238_100%)]"
                      : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),rgba(255,255,255,0)),linear-gradient(120deg,#d8d6d1_0%,#ece9e4_50%,#f5f6f8_100%)]"
                }
                mediaStyle={
                  coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined
                }
                mediaOverlayClassName={
                  index === 0
                    ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_55%)]"
                    : "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15),transparent_60%)]"
                }
                arrowLabel={
                  card.ctaLabel ||
                  card.cta_label ||
                  defaultCards[index]?.ctaLabel ||
                  "Learn more"
                }
                revealDescriptionOnHover
                raiseTextOnHover
                arrowRotateOnHover
              />
            );

            return href ? (
              <Link key={card.id ?? index} href={href} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={card.id ?? index}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

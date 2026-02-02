"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { Slider } from "@/components/sliders/Slider";
import { HiArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/hooks/useSiteConfig";
import {
  ServicesSectionSchema,
  type Offering,
  type ServicesSection,
} from "@/lib/strapi/schema";

type SolutionCard = {
  id?: number;
  title?: string;
  description?: string;
  bg: string;
  imageUrl?: string;
};

const cardBackgrounds = [
  "bg-[linear-gradient(135deg,#1a3d6f_0%,#2d5f8f_35%,#5176a6_70%,#87a6c8_100%)]",
  "bg-[linear-gradient(135deg,#1a4a6c_0%,#2f6f89_35%,#5a93a6_70%,#8fb7c3_100%)]",
  "bg-[linear-gradient(135deg,#163a73_0%,#2b4f98_35%,#5e72b7_70%,#93a6cf_100%)]",
  "bg-[linear-gradient(135deg,#2f4c58_0%,#456f77_35%,#7caab1_70%,#a8cad2_100%)]",
];

const resolveMediaUrl = (value?: unknown) => {
  if (!value) return undefined;
  if (typeof value === "string") return getImageUrl(value);
  if (typeof value === "object" && value !== null && "url" in value) {
    const media = value as {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
        thumbnail?: { url?: string };
      };
    };
    return getImageUrl(
      media.url ||
        media.formats?.large?.url ||
        media.formats?.medium?.url ||
        media.formats?.small?.url ||
        media.formats?.thumbnail?.url,
    );
  }
  if (typeof value === "object" && value !== null && "data" in value) {
    const data = (value as { data?: unknown }).data;
    if (Array.isArray(data)) return resolveMediaUrl(data[0]);
    return resolveMediaUrl(data);
  }
  return undefined;
};

export default function SolutionsSection({
  section,
  offerings,
}: {
  section?: ServicesSection;
  offerings?: Offering[] | { data?: Offering[] };
}) {
  const parsedSection = ServicesSectionSchema.safeParse(section);
  const sectionData = parsedSection.success ? parsedSection.data : undefined;
  if (sectionData?.is_hidden) return null;

  const title = sectionData?.title;
  const description = sectionData?.description;
  const button = sectionData?.button;
  const buttonLabel = button?.name || undefined;
  const buttonHref = button?.link || undefined;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl = resolveMediaUrl(button?.icon);

  const rawOfferings = Array.isArray(offerings)
    ? offerings
    : Array.isArray(offerings?.data)
      ? offerings.data
      : [];

  const orderedOfferings = [...rawOfferings].sort((a, b) => {
    const aOrder = a?.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b?.order ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });

  const solutionCards: SolutionCard[] = orderedOfferings
    .filter((item) => item?.title || item?.short_description)
    .map((item, index) => ({
      id: item?.id,
      title: item?.title || "Offering",
      description: item?.short_description || "",
      imageUrl: resolveMediaUrl(item?.image),
      bg: cardBackgrounds[index % cardBackgrounds.length],
    }));

  if (!title && !description && !buttonLabel && solutionCards.length === 0) {
    return null;
  }

  const sliderId = "solutions-slider";
  return (
    <section className="rounded-b-4xl bg-[#d7dccb]">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {title ? (
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base text-slate-700">{description}</p>
            ) : null}
          </div>

          {buttonLabel ? (
            buttonHref ? (
              <Link
                href={buttonHref}
                className="inline-flex min-w-[200px] items-center justify-between gap-3 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white"
              >
                {buttonIconUrl && buttonIconPosition === "left" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
                {buttonLabel}
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
                )}
              </Link>
            ) : (
              <button className="inline-flex min-w-[200px] items-center justify-between gap-3 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white">
                {buttonIconUrl && buttonIconPosition === "left" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
                {buttonLabel}
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            )
          ) : null}
        </div>

        {solutionCards.length > 0 ? (
          <div className="mt-10">
            <Slider
              data={solutionCards}
              uniqueId={sliderId}
              showPagination={false}
              showNavigation={false}
              className="pr-4 sm:pr-6"
              externalNavigation={{
                nextEl: ".solutions-next",
                prevEl: ".solutions-prev",
              }}
              defaultSlidesPerView={1.05}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                1024: { slidesPerView: 1.8 },
                1280: { slidesPerView: 2.2 },
              }}
              options={{
                loop: false,
                autoplay: false,
                spaceBetween: 22,
                slidesOffsetAfter: 24,
              }}
              swiperClassName="pb-14"
              renderItem={(card) => (
                <article
                  className={cn(
                    "relative flex min-h-[320px] items-end overflow-hidden rounded-3xl p-6 sm:min-h-[380px]",
                    card.imageUrl ? "" : card.bg,
                  )}
                  style={
                    card.imageUrl
                      ? {
                          backgroundImage: `url(${card.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.08))]" />
                  <div className="relative w-full max-w-[340px] rounded-2xl bg-white p-4 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.2)]">
                    <p className="text-base font-semibold text-[#1d3173]">{card.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                  </div>
                </article>
              )}
            />

            <div className="mt-2 flex items-center justify-end">
              <div className="flex items-center gap-6 rounded-full bg-[#ececec] px-7 py-3">
                <button className="solutions-prev text-slate-500 transition hover:text-slate-900">
                  <HiArrowLongRight
                    className="h-6 w-6 rotate-180"
                    aria-hidden="true"
                  />
                </button>
                <button className="solutions-next text-slate-900 transition hover:text-slate-900">
                  <HiArrowLongRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Wrapper>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { Slider } from "@/components/sliders/Slider";
import { HiArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/hooks/useSiteConfig";
import {
  CaseStudySectionSchema,
  type CaseStudySection,
} from "@/lib/strapi/schema";

type CaseCard = {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  bg: string;
};

const cardBackgrounds = [
  "bg-[linear-gradient(135deg,#cfd7e6_0%,#9fb0c8_45%,#6a80a6_100%)]",
  "bg-[linear-gradient(135deg,#9a6a3b_0%,#d18b45_40%,#f4c57a_100%)]",
  "bg-[linear-gradient(135deg,#4b566c_0%,#7c879b_45%,#aeb7c6_100%)]",
  "bg-[linear-gradient(135deg,#29467d_0%,#375d9b_40%,#7294d6_100%)]",
];

function ArrowCircle() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white">
      <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

const resolveIconUrl = (icon?: unknown) => {
  if (!icon) return undefined;
  if (typeof icon === "string") return getImageUrl(icon);
  if (typeof icon === "object" && icon !== null && "url" in icon) {
    return getImageUrl((icon as { url?: string }).url);
  }
  if (typeof icon === "object" && icon !== null && "data" in icon) {
    const data = (icon as { data?: unknown }).data;
    if (typeof data === "object" && data !== null && "url" in data) {
      return getImageUrl((data as { url?: string }).url);
    }
  }
  return undefined;
};

export default function CasesSection({ section }: { section?: CaseStudySection }) {
  const parsedSection = CaseStudySectionSchema.safeParse(section);
  const sectionData = parsedSection.success ? parsedSection.data : undefined;
  if (!sectionData || sectionData.ishidden) return null;

  const subtitle = sectionData.subtitle;
  const title = sectionData.title;
  const sectionDescription = sectionData.description;
  const button = sectionData.button;
  const buttonLabel = button?.name || undefined;
  const buttonHref = button?.link || undefined;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl = resolveIconUrl(button?.icon);

  const rawCases = Array.isArray(sectionData.case_studies)
    ? sectionData.case_studies
    : [];

  const caseCards: CaseCard[] = rawCases
    .filter((item) => item?.title || item?.description)
    .map((item, index) => ({
      id: item?.id,
      title: item?.title || "Case Study",
      description: item?.description || "",
      slug: item?.slug || undefined,
      bg: cardBackgrounds[index % cardBackgrounds.length],
    }));

  if (!subtitle && !title && !sectionDescription && !buttonLabel && caseCards.length === 0) {
    return null;
  }

  const sliderId = "cases-slider";
  return (
    <section className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            {subtitle ? (
              <p className="text-sm font-semibold text-slate-500">{subtitle}</p>
            ) : null}
            {title ? (
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
                {title}
              </h2>
            ) : null}
            {sectionDescription ? (
              <p className="mt-4 text-base text-slate-600">{sectionDescription}</p>
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

        {caseCards.length > 0 ? (
          <div className="mt-10">
            <Slider
              data={caseCards}
              uniqueId={sliderId}
              showPagination={false}
              showNavigation={false}
              className="overflow-visible"
              externalNavigation={{
                nextEl: ".cases-next",
                prevEl: ".cases-prev",
              }}
              defaultSlidesPerView={1.05}
              breakpoints={{
                640: { slidesPerView: 1.4 },
                1024: { slidesPerView: 2.2 },
                1280: { slidesPerView: 2.6 },
              }}
              options={{
                loop: false,
                autoplay: false,
                spaceBetween: 52,
                slidesOffsetAfter: 60,
              }}
              swiperClassName="pb-14 !overflow-visible"
              renderItem={(card) => (
                <div className="group relative h-[340px]">
                  <article
                    className={cn(
                      "absolute left-0 top-0 flex h-[340px] w-full items-end overflow-hidden rounded-3xl p-6 text-white transition-[height] duration-300 group-hover:h-[450px] group-hover:z-10",
                      card.bg,
                    )}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.35))]" />
                    <span className="absolute left-6 top-6 rounded-full bg-[#4f6fdc] px-4 py-1 text-xs font-semibold">
                      Case Study
                    </span>

                    <div className="relative w-full">
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <p className="text-lg font-semibold">{card.title}</p>
                          <p className="mt-2 max-w-sm text-sm text-white/90 opacity-0 transition duration-300 group-hover:opacity-100">
                            {card.description || " "}
                          </p>
                        </div>
                        <ArrowCircle />
                      </div>
                    </div>
                  </article>
                </div>
              )}
            />

            <div className="mt-2 flex items-center justify-end">
              <div className="flex items-center gap-6 rounded-full bg-[#ececec] px-7 py-3">
                <button className="cases-prev text-slate-500 transition hover:text-slate-900">
                  <HiArrowLongRight
                    className="h-6 w-6 rotate-180"
                    aria-hidden="true"
                  />
                </button>
                <button className="cases-next text-slate-900 transition hover:text-slate-900">
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

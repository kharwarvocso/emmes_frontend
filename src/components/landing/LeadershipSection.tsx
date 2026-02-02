"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { HiArrowLongRight, HiArrowRight } from "react-icons/hi2";
import { Slider } from "@/components/sliders/Slider";
import { getImageUrl } from "@/hooks/useSiteConfig";
import {
  MemeberSectionSchema,
  type MemeberSection,
  type Testimonial,
} from "@/lib/strapi/schema";

const defaultAccents = [
  "from-[#172b6b] via-[#1e3a8a] to-[#1e40af]",
  "from-[#1d3d8f] via-[#2146a3] to-[#1f3b8a]",
  "from-[#1b347a] via-[#1c3c8d] to-[#234aa6]",
  "from-[#203a86] via-[#1c3d92] to-[#2d55b8]",
];

export default function LeadershipSection({
  section,
  leaders,
}: {
  section?: MemeberSection;
  leaders?: Testimonial[] | { data?: Testimonial[] };
}) {
  const parsedSection = MemeberSectionSchema.safeParse(section);
  const sectionData = parsedSection.success ? parsedSection.data : undefined;
  if (sectionData?.ishidden) return null;

  const subtitle = sectionData?.subtitle;
  const description = sectionData?.description;
  const button = sectionData?.button;
  const buttonLabel = button?.name || undefined;
  const buttonHref = button?.link || undefined;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl =
    typeof button?.icon === "string"
      ? getImageUrl(button.icon)
      : getImageUrl(button?.icon?.url || button?.icon?.data?.url);

  const safeLeaders = Array.isArray(leaders)
    ? leaders
    : Array.isArray(leaders?.data)
      ? leaders.data
      : [];
  const orderedLeaders = [...safeLeaders].sort((a, b) => {
    const aOrder = a?.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b?.order ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });

  if (!subtitle && !description && !buttonLabel && orderedLeaders.length === 0) {
    return null;
  }

  const sliderId = "leadership-slider";
  return (
    <section className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            {subtitle ? (
              <p className="text-sm font-semibold text-slate-500">{subtitle}</p>
            ) : null}
            {description ? (
              <h2 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
                {description}
              </h2>
            ) : null}
          </div>
          {buttonLabel ? (
            buttonHref ? (
              <Link
                href={buttonHref}
                className="inline-flex min-w-[220px] justify-between gap-3 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white"
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
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Link>
            ) : (
              <button className="inline-flex min-w-[220px] justify-between gap-3 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white">
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
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )
          ) : null}
        </div>

        {orderedLeaders.length > 0 ? (
          <div className="mt-10 -mr-[max(0px,calc((100vw-100%)/2))]">
            <Slider
              data={orderedLeaders}
              uniqueId={sliderId}
              showPagination={false}
              showNavigation={false}
              className="overflow-visible pr-6"
              externalNavigation={{
                nextEl: ".leadership-next",
                prevEl: ".leadership-prev",
              }}
              defaultSlidesPerView={1.15}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3.2 },
                1280: { slidesPerView: 3.6 },
              }}
              options={{
                loop: false,
                autoplay: false,
                spaceBetween: 16,
                slidesOffsetAfter: 24,
              }}
              swiperClassName="pb-12 !overflow-visible"
              renderItem={(leader, index) => {
                const accent = defaultAccents[index % defaultAccents.length];
                const imageUrl = getImageUrl(
                  typeof leader?.image === "string"
                    ? leader.image
                    : leader?.image?.url || leader?.image?.data?.url,
                );
                return (
                  <article
                    className={`relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl p-6 text-white sm:min-h-[320px] ${
                      imageUrl ? "" : `bg-gradient-to-br ${accent}`
                    }`}
                    style={
                      imageUrl
                        ? {
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                    <div className="relative">
                      {leader?.name ? (
                        <p className="text-lg font-semibold">{leader.name}</p>
                      ) : null}
                      {leader?.profession ? (
                        <p className="mt-1 text-sm text-white/80">
                          {leader.profession}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              }}
            />

            <div className="mt-6 flex items-center justify-end">
              <div className="flex items-center gap-6 rounded-full bg-[#ececec] px-7 py-3">
                <button className="leadership-prev text-slate-500 transition hover:text-slate-900">
                  <HiArrowLongRight className="h-6 w-6 rotate-180" aria-hidden="true" />
                </button>
                <button className="leadership-next text-slate-900 transition hover:text-slate-900">
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

"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { getImageUrl } from "@/hooks/useSiteConfig";
import { MetrixSectionSchema, type MetrixSection } from "@/lib/strapi/schema";
import { HiArrowRight } from "react-icons/hi2";

type MediaItem = {
  url?: string | null;
  mime?: string | null;
  alternativeText?: string | null;
  formats?: {
    large?: { url?: string | null };
    medium?: { url?: string | null };
    small?: { url?: string | null };
    thumbnail?: { url?: string | null };
  };
};

const resolveMediaUrl = (media?: unknown) => {
  if (!media) return undefined;
  if (typeof media === "string") return getImageUrl(media);
  if (typeof media === "object" && media !== null && "url" in media) {
    const item = media as MediaItem;
    return getImageUrl(
      item.url ||
      item.formats?.large?.url ||
      item.formats?.medium?.url ||
      item.formats?.small?.url ||
      item.formats?.thumbnail?.url,
    );
  }
  if (typeof media === "object" && media !== null && "data" in media) {
    const data = (media as { data?: unknown }).data;
    if (Array.isArray(data)) return resolveMediaUrl(data[0]);
    return resolveMediaUrl(data);
  }
  return undefined;
};

const formatValue = (value?: string | number | null, suffix?: string | null) => {
  if (value === null || value === undefined) return undefined;
  const base =
    typeof value === "number"
      ? value.toLocaleString()
      : String(value).trim();
  if (!base) return undefined;
  return `${base}${suffix || ""}`;
};



function AnimatedCounter({
  value,
  suffix,
}: {
  value: string | number;
  suffix?: string | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Try to parse number from the value
      const numericValue =
        typeof value === "number"
          ? value
          : parseFloat(String(value).replace(/,/g, ""));

      if (!isNaN(numericValue)) {
        motionValue.set(numericValue);
      }
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format the number with commas/locale
        const formattedNumber = Math.floor(latest).toLocaleString();
        ref.current.textContent = `${formattedNumber}${suffix || ""}`;
      }
    });
  }, [springValue, suffix]);

  // Initial render content to avoid layout shift or empty space mechanism if needed
  // But we want it to animate from 0.
  // We can just render the span.

  return <span ref={ref} className="text-4xl font-semibold text-[#1d3173] sm:text-5xl" />;
}

export default function StatsSection({ section }: { section?: MetrixSection }) {
  const parsedSection = MetrixSectionSchema.safeParse(section);
  const sectionData = parsedSection.success ? parsedSection.data : undefined;
  if (!sectionData || sectionData.ishidden) return null;

  const subtitle = sectionData.subtitle;
  const title = sectionData.title;
  const description = sectionData.description;
  const button = sectionData.button;
  const buttonLabel = button?.name || undefined;
  const buttonHref = button?.link || undefined;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl = resolveMediaUrl(button?.icon);

  const stats =
    sectionData.metrix?.filter(
      (item) =>
        Boolean(item?.description) ||
        (item?.value !== null && item?.value !== undefined),
    ) || [];
  const hasContent =
    Boolean(subtitle || title || description || buttonLabel) || stats.length > 0;
  if (!hasContent) return null;

  return (
    <section className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr]">
          <div>
            {subtitle ? (
              <p className="text-base font-semibold text-slate-500">{subtitle}</p>
            ) : null}
            {title ? (
              <h2 className="mt-3 text-3xl font-semibold text-[#1d3173] sm:text-4xl md:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base text-slate-600">{description}</p>
            ) : null}
            {buttonLabel ? (
              buttonHref ? (
                <Link
                  href={buttonHref}
                  className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-[#1d3173]"
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
                <button className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-[#1d3173]">
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

          <div className="divide-y divide-slate-200">
            {stats.map((stat, index) => {
              // const value = formatValue(stat?.value, stat?.suffix);
              const iconUrl = resolveMediaUrl(stat?.icon);
              return (
                <div
                  key={`${index}-stat`}
                  className="flex items-center justify-between gap-6 py-6"
                >
                  <div>
                    {stat?.value !== null && stat?.value !== undefined ? (
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    ) : null}
                    {stat?.description ? (
                      <p className="mt-2 text-base font-medium text-slate-600">
                        {stat.description}
                      </p>
                    ) : null}
                  </div>
                  {iconUrl ? (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-[#1d3173]">
                      <Image
                        src={iconUrl}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                        aria-hidden="true"
                        unoptimized
                      />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

"use client";

import React, { useEffect, useId, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";
import type { Swiper as SwiperInstance, SwiperOptions } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps<T> {
  data: T[];
  /** Optional: provide a deterministic id suffix; otherwise a unique one is derived via useId() */
  uniqueId?: string;
  navigationButtonStyle?: string;
  renderItem: (item: T, index: number, state?: SlideRenderState) => React.ReactNode;
  breakpoints?: Record<number, { slidesPerView: number }>;
  options?: SwiperOptions;
  showNavigation?: boolean;
  /** Optional CSS selectors for external navigation controls */
  externalNavigation?: { nextEl: string; prevEl: string };
  showPagination?: boolean;
  className?: string;
  swiperClassName?: string;
  defaultSlidesPerView?: number;
  /** Number of slides to mark active starting from the current active index. */
  activeCount?: number;
}

type SlideRenderState = {
  isActive: boolean;
  activeIndex: number;
};

export const Slider = <T,>({
  data = [],
  uniqueId,
  navigationButtonStyle = "",
  renderItem,
  breakpoints = { 640: { slidesPerView: 1 }, 768: { slidesPerView: 1 }, 1024: { slidesPerView: 1 } },
  options = {},
  showNavigation = true,
  externalNavigation,
  showPagination = true,
  className,
  swiperClassName,
  defaultSlidesPerView = 1,
  activeCount = 1,
}: SliderProps<T>) => {
  // Ensure stable, SSR-safe id; strip ":" to keep clean CSS selectors across React versions.
  const autoId = useId().replace(/[:]/g, "");
  const uid = uniqueId ?? `slider-${autoId}`;
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const safeLen = data.length;

  const getSlidesPerView = (base?: number) => {
    const b = typeof base === "number" && base > 0 ? base : 1;
    return Math.max(1, Math.min(b, safeLen));
  };

  const nextSelector = externalNavigation?.nextEl ?? `.${uid}-next`;
  const prevSelector = externalNavigation?.prevEl ?? `.${uid}-prev`;
  const effectiveShowPagination = showPagination && safeLen > 1;
  const enableNavigation = safeLen > 1 && (showNavigation || !!externalNavigation);
  const effectiveShowNavigationButtons = showNavigation && safeLen > 1 && !externalNavigation;
  const enableLoop = safeLen > 1;

  const pagination = useMemo<NonNullable<SwiperOptions["pagination"]>>(
    () => ({
      clickable: true,
      el: `.swiper-pagination-${uid}`,
      renderBullet: (index: number, className: string) => `<span class="${className}" aria-label="Go to slide ${index + 1}">${index + 1}</span>`,
    }),
    [uid],
  );

  const mobileSpaceBetween = 10;
  const desktopSpaceBetween = 20;
  const allowAutoplay = options?.autoplay !== false;

  const baseOptions: SwiperOptions = useMemo(
    () => ({
      slidesPerView: getSlidesPerView(defaultSlidesPerView),
      spaceBetween: mobileSpaceBetween,
      autoplay: allowAutoplay ? { delay: 2000, disableOnInteraction: false } : false,
      loop: enableLoop,
      navigation: enableNavigation
        ? {
            nextEl: nextSelector,
            prevEl: prevSelector,
          }
        : undefined,
      modules: [Autoplay, Navigation, Pagination],
      pagination: effectiveShowPagination ? pagination : undefined,
      breakpoints: {
        640: { slidesPerView: getSlidesPerView(breakpoints?.[640]?.slidesPerView), spaceBetween: desktopSpaceBetween },
        768: { slidesPerView: getSlidesPerView(breakpoints?.[768]?.slidesPerView), spaceBetween: desktopSpaceBetween },
        1024: { slidesPerView: getSlidesPerView(breakpoints?.[1024]?.slidesPerView), spaceBetween: desktopSpaceBetween },
      },
    }),
    [
      enableLoop,
      enableNavigation,
      effectiveShowPagination,
      uid,
      pagination,
      breakpoints?.[640]?.slidesPerView,
      breakpoints?.[768]?.slidesPerView,
      breakpoints?.[1024]?.slidesPerView,
      safeLen,
      nextSelector,
      prevSelector,
      mobileSpaceBetween,
      desktopSpaceBetween,
      allowAutoplay,
    ],
  );

  // Respect user-provided options last (shallow merge)
  const swiperOptions: SwiperOptions = useMemo(() => ({ ...baseOptions, ...options }), [baseOptions, options]);

  const activeIndices = useMemo(() => {
    const count = Math.max(1, Math.min(activeCount, safeLen || 1));
    const indices = new Set<number>();
    if (safeLen === 0) return indices;
    for (let i = 0; i < count; i += 1) {
      indices.add((activeIndex + i) % safeLen);
    }
    return indices;
  }, [activeIndex, activeCount, safeLen]);

  const handleMouseEnter = () => {
    if (!allowAutoplay) return;
    const autoplay = swiperRef.current?.autoplay;
    if (autoplay?.running) {
      autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (!allowAutoplay) return;
    const autoplay = swiperRef.current?.autoplay;
    if (autoplay && !autoplay.running) {
      autoplay.start();
    }
  };

  useEffect(() => {
    if (!externalNavigation || !swiperRef.current) return;
    const nextEl = document.querySelector(nextSelector);
    const prevEl = document.querySelector(prevSelector);
    if (!nextEl || !prevEl) return;
    swiperRef.current.params.navigation = {
      ...(swiperRef.current.params.navigation || {}),
      nextEl,
      prevEl,
    };
    swiperRef.current.navigation?.init();
    swiperRef.current.navigation?.update();
  }, [externalNavigation, nextSelector, prevSelector]);

  return (
    <div className={cn("relative w-full", className)} aria-label="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        {...swiperOptions}
        onSwiper={(instance) => {
          swiperRef.current = instance;
          setActiveIndex(instance.realIndex ?? instance.activeIndex ?? 0);
          if (externalNavigation) {
            const nextEl = document.querySelector(nextSelector);
            const prevEl = document.querySelector(prevSelector);
            if (nextEl && prevEl) {
              instance.params.navigation = {
                ...(instance.params.navigation || {}),
                nextEl,
                prevEl,
              };
              instance.navigation?.init();
              instance.navigation?.update();
            }
          }
          (swiperOptions as any).onSwiper?.(instance);
        }}
        onSlideChange={(instance) => {
          setActiveIndex(instance.realIndex ?? instance.activeIndex ?? 0);
          (swiperOptions as any).onSlideChange?.(instance);
        }}
        className={cn("w-full", swiperClassName)}
      >
        {safeLen > 0 &&
          data.map((item, index) => {
            const key = (item as unknown as { id?: string | number })?.id ?? index;
            return (
              <SwiperSlide key={key}>
                {renderItem(item, index, { isActive: activeIndices.has(index), activeIndex })}
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Pagination */}
      {effectiveShowPagination && (
        <div className={cn(`swiper-pagination-${uid}`, "mt-5 flex justify-center gap-3")} aria-label="carousel pagination" />
      )}

      {/* Navigation */}
      {effectiveShowNavigationButtons && (
        <>
          <div className={cn(`${uid}-next`, "swiper-button-next", `${navigationButtonStyle}`)} aria-label="next slide">
            <ChevronRight />
          </div>
          <div className={cn(`${uid}-prev`, "swiper-button-prev", `${navigationButtonStyle}`)} aria-label="previous slide">
            <ChevronLeft />
          </div>
        </>
      )}
    </div>
  );
};

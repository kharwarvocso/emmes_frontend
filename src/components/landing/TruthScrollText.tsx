"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

function ScrollWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="opacity-20 will-change-transform"
    >
      {word}
    </motion.span>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function TruthScrollText({
  text,
  subtitle,
  title,
  className,
  wrapperClassName,
  buttonLabel,
  buttonHref,
  buttonIconUrl,
  buttonIconPosition,
}: {
  text: string;
  subtitle?: string;
  title?: string;
  className?: string;
  wrapperClassName?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonIconUrl?: string; // or null
  buttonIconPosition?: "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <div>
        {subtitle ? (
          <p className="text-md font-bold text-[#1d3173] sm:text-xl md:text-2xl">
            {subtitle}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-4 mx-auto text-2xl font-semibold leading-relaxed text-[#1d3173] sm:text-3xl md:text-4xl">
            {title}
          </h2>
        ) : null}
        <p className={cn("mt-6 text-2xl font-semibold leading-relaxed", className)}>
          {text}
        </p>

        {buttonLabel && buttonHref ? (
          <div className="mt-8 flex justify-start">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16265a]"
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
    );
  }

  return (
    <div ref={containerRef} className={cn("h-[400vh]", wrapperClassName)}>
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="mx-auto w-full px-6">
          <div className="mx-auto text-center md:text-left">
            {subtitle ? (
              <p className="text-md font-bold text-[#1d3173] sm:text-xl md:text-2xl">
                {subtitle}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-4 mx-auto text-2xl font-semibold leading-relaxed text-[#1d3173] sm:text-3xl md:text-4xl">
                {title}
              </h2>
            ) : null}
            <p
              className={cn(
                "mt-6 mx-auto text-2xl font-semibold leading-relaxed text-[#1d3173] sm:text-3xl md:text-4xl",
                "flex flex-wrap justify-center gap-x-3 gap-y-2 md:justify-start",
                className,
              )}
            >
              {words.map((word, index) => {
                const start = index / words.length;
                const end = (index + 1) / words.length;
                return (
                  <ScrollWord
                    key={`${word}-${index}`}
                    word={word}
                    start={start}
                    end={end}
                    progress={scrollYProgress}
                  />
                );
              })}
            </p>

            {buttonLabel && buttonHref ? (
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href={buttonHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16265a]"
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
        </div>
      </div>
    </div>
  );
}

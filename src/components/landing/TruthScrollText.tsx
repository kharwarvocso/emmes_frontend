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

export default function TruthScrollText({
  text,
  className,
  wrapperClassName,
}: {
  text: string;
  className?: string;
  wrapperClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (reduceMotion) {
    return (
      <p className={cn("text-2xl font-semibold leading-relaxed", className)}>
        {text}
      </p>
    );
  }

  return (
    <div ref={containerRef} className={cn("h-[180vh]", wrapperClassName)}>
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="mx-auto w-full px-6">
          <div className="mx-auto  text-center md:text-left">
            <p
              className={cn(
                "mt-4 mx-auto text-2xl font-semibold leading-relaxed text-[#1d3173] sm:text-3xl md:text-4xl",
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
          </div>
        </div>
      </div>
    </div>
  );
}

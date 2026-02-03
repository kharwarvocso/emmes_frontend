"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function TruthVideoScroll({
  src = "/default/emmesgroup.mp4",
  poster = "/default/video-placeholder.jpg",
}: {
  src?: string;
  poster?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    ["80%", "100vw", "100vw"],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    ["60vh", "100vh", "100vh"],
  );
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], ["24px", "0px", "0px"]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.08]);

  if (reduceMotion) {
    return (
      <div className="relative h-[140vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <article
            id="videoCard"
            className="group relative mx-auto h-[60vh] w-[80%] overflow-hidden rounded-2xl bg-black/5 shadow-sm ring-1 ring-black/5"
          >
            <div className="relative h-full w-full overflow-hidden">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={poster}
              >
                <source src={src} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <motion.article
          id="videoCard"
          className="group relative mx-auto overflow-hidden rounded-2xl bg-black/5 shadow-sm ring-1 ring-black/5 transition-[width] duration-100 ease-linear will-change-transform"
          style={{ width, height, borderRadius: radius, maxWidth: "100vw", maxHeight: "100vh" }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <motion.video
              className="h-full w-full object-cover"
              style={{ scale: videoScale }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
            >
              <source src={src} type="video/mp4" />
            </motion.video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          </div>
        </motion.article>
      </div>
    </div>
  );
}

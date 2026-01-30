import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";
import { HiArrowRight } from "react-icons/hi2";

type HeroCardProps = {
  title: string;
  description: string;
  logo?: ReactNode;
  mediaClassName?: string;
  mediaOverlayClassName?: string;
  mediaStyle?: CSSProperties;
  arrowLabel?: string;
  arrowClassName?: string;
  showDescription?: boolean;
  revealDescriptionOnHover?: boolean;
  raiseTextOnHover?: boolean;
  arrowDirection?: "right" | "up-right";
  arrowRotateOnHover?: boolean;
};

function ArrowCircle({
  label = "Learn more",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("emmes-arrow-button", className)} aria-label={label}>
      <HiArrowRight className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

export default function HeroCard({
  title,
  description,
  logo,
  mediaClassName,
  mediaOverlayClassName,
  mediaStyle,
  arrowLabel,
  arrowClassName,
  showDescription = true,
  revealDescriptionOnHover = false,
  raiseTextOnHover = false,
  arrowDirection = "up-right",
  arrowRotateOnHover = true,
}: HeroCardProps) {
  const hasDescription = Boolean(description) && showDescription;
  const shouldReveal = hasDescription && revealDescriptionOnHover;
  const textShiftClass = raiseTextOnHover
    ? "transition duration-300 ease-out group-hover:-translate-y-2"
    : "";
  const descriptionClass = shouldReveal
    ? "opacity-0 translate-y-3 transition duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
    : "";
  const arrowBaseRotation =
    arrowDirection === "up-right" ? "rotate-[-45deg]" : "";
  const arrowHoverRotation = arrowRotateOnHover
    ? "transition duration-300 ease-out group-hover:rotate-0"
    : "";
  return (
    <article className="emmes-card group cursor-pointer">
      <div
        className={cn(
          "relative h-72 overflow-hidden sm:h-80 lg:h-96 ",
          mediaClassName,
        )}
        style={mediaStyle}
      >
        {mediaOverlayClassName && (
          <div className={cn("absolute inset-0", mediaOverlayClassName)} />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent px-6 pb-5 pt-16 text-slate-900 sm:px-7">
          <div className={cn("space-y-2", textShiftClass)}>
            <div className="flex items-center justify-between gap-6">
              {logo ? (
                <div className="flex items-center text-black gap-2">{logo}</div>
              ) : (
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1d3173] via-[#2b6cb0] to-[#5aa7ff]">
                  {title}
                </p>
              )}
              <ArrowCircle
                label={arrowLabel}
                className={cn(
                  "border-[#1d3173] text-[#1d3173]",
                  arrowBaseRotation,
                  arrowHoverRotation,
                  arrowClassName,
                )}
              />
            </div>
            {hasDescription && (
              <p className={cn("text-sm text-slate-900/80", descriptionClass)}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

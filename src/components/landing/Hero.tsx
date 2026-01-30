import Wrapper from "@/components/Wrappers";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroCard from "@/components/landing/HeroCard";

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

export default function Hero() {
  return (
    <Wrapper
      as="section"
      containerClassName="emmes-hero-bottom rounded-b-4xl relative overflow-hidden px-0 xl:px-0"
      isMaxWidthChangeRequired="max-w-none"
      className="relative"
    >
      <SiteHeader />
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)]" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(13,120,255,0.35),rgba(13,120,255,0)_70%)]" />
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-3 py-16 text-white xl:px-5 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
            <h1 className="emmes-heading">
              Delivering Global Health Impact Through People, Science and
              Technology
            </h1>
          </div>

        <div className="max-w-screen-xl mx-auto mt-10 grid gap-6 md:grid-cols-2">
          <HeroCard
            title="Emmes"
            logo={<EmmesMark />}
            description="Founded as Emmes more than 47 years ago, Emmes Group has grown"
            mediaClassName="bg-[radial-gradient(circle_at_30%_20%,rgba(83,210,255,0.5),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(120,255,214,0.35),transparent_50%),linear-gradient(120deg,#0c0f18_10%,#0c1524_45%,#0e2238_100%)]"
            mediaOverlayClassName="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_55%)]"
            arrowLabel="Explore Emmes"
            revealDescriptionOnHover
            raiseTextOnHover
            arrowRotateOnHover
          />
          <HeroCard
            title="Veridix"
            logo={<VeridixMark />}
            description="Transforming clinical development with intelligent, connected systems"
            mediaClassName="bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),rgba(255,255,255,0)),linear-gradient(120deg,#d8d6d1_0%,#ece9e4_50%,#f5f6f8_100%)]"
            mediaOverlayClassName="bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15),transparent_60%)]"
            arrowLabel="Explore Veridix"
            revealDescriptionOnHover
            raiseTextOnHover
            arrowRotateOnHover
          />
        </div>
      </div>
    </Wrapper>
  );
}

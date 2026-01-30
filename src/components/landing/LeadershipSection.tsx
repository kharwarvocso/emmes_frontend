"use client";

import Wrapper from "@/components/Wrappers";
import { HiArrowLongRight, HiArrowRight } from "react-icons/hi2";
import { Slider } from "@/components/sliders/Slider";

const leaders = [
  {
    name: "Sastry Chilukuri",
    title: "Chief Executive Officer",
    accent: "from-[#172b6b] via-[#1e3a8a] to-[#1e40af]",
  },
  {
    name: "Peter Ronco",
    title: "Senior Advisor",
    accent: "from-[#1d3d8f] via-[#2146a3] to-[#1f3b8a]",
  },
  {
    name: "Rama Kondru",
    title: "Chief Executive Officer",
    accent: "from-[#1b347a] via-[#1c3c8d] to-[#234aa6]",
  },
  {
    name: "Kelli Miller",
    title: "Chief People Officer",
    accent: "from-[#203a86] via-[#1c3d92] to-[#2d55b8]",
  },
];

export default function LeadershipSection() {
  const sliderId = "leadership-slider";
  return (
    <section className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20" >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">Leadership</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
              Through the knowledge of our leadership team, Emmes Group
              envisions a future where clinical research is not only advanced,
              but transformed.
            </h2>
          </div>
          <button className="inline-flex min-w-[220px] justify-between gap-3 rounded-full bg-[#1d3173] px-6 py-3 text-sm font-semibold text-white ">
            Meet The Team
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 -mr-[max(0px,calc((100vw-100%)/2))]">
          <Slider
            data={leaders}
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
            renderItem={(leader) => (
              <article
                className={`relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${leader.accent} p-6 text-white sm:min-h-[320px]`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                <div className="relative">
                  <p className="text-lg font-semibold">{leader.name}</p>
                  <p className="mt-1 text-sm text-white/80">{leader.title}</p>
                </div>
              </article>
            )}
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
      </Wrapper>
    </section>
  );
}

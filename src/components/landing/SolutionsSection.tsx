"use client";

import Wrapper from "@/components/Wrappers";
import { Slider } from "@/components/sliders/Slider";
import { HiArrowLongRight } from "react-icons/hi2";

const solutionCards = [
  {
    title: "Expertise",
    description:
      "We are transforming clinical trial workflows, improving patient and site experience, and delivering better outcomes.",
    bg: "bg-[linear-gradient(135deg,#1a3d6f_0%,#2d5f8f_35%,#5176a6_70%,#87a6c8_100%)]",
  },
  {
    title: "Flexibility",
    description:
      "We are transforming clinical trial workflows, improving patient and site experience, and delivering better outcomes.",
    bg: "bg-[linear-gradient(135deg,#1a4a6c_0%,#2f6f89_35%,#5a93a6_70%,#8fb7c3_100%)]",
  },
  {
    title: "Transparency",
    description:
      "We are transforming clinical trial workflows, improving patient and site experience, and delivering better outcomes.",
    bg: "bg-[linear-gradient(135deg,#163a73_0%,#2b4f98_35%,#5e72b7_70%,#93a6cf_100%)]",
  },
];

export default function SolutionsSection() {
  const sliderId = "solutions-slider";
  return (
    <section className="bg-[#d7dccb] rounded-b-4xl">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Supporting your research with solutions tailored to your needs
          </h2>
        </div>

        <div className="mt-10">
          <Slider
            data={solutionCards}
            uniqueId={sliderId}
            showPagination={false}
            showNavigation={false}
            className="pr-4 sm:pr-6"
            externalNavigation={{
              nextEl: ".solutions-next",
              prevEl: ".solutions-prev",
            }}
            defaultSlidesPerView={1.05}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              1024: { slidesPerView: 1.8 },
              1280: { slidesPerView: 2.2 },
            }}
            options={{
              loop: false,
              autoplay: false,
              spaceBetween: 22,
              slidesOffsetAfter: 24,
            }}
            swiperClassName="pb-14"
            renderItem={(card) => (
              <article
                className={`relative flex min-h-[320px] items-end overflow-hidden rounded-3xl ${card.bg} p-6 sm:min-h-[380px]`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0))]" />
                <div className="relative w-full max-w-[340px] rounded-2xl bg-white p-4 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.2)]">
                  <p className="text-base font-semibold text-[#1d3173]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {card.description}
                  </p>
                </div>
              </article>
            )}
          />

          <div className="mt-2 flex items-center justify-end">
            <div className="flex items-center gap-6 rounded-full bg-[#ececec] px-7 py-3">
              <button className="solutions-prev text-slate-500 transition hover:text-slate-900">
                <HiArrowLongRight
                  className="h-6 w-6 rotate-180"
                  aria-hidden="true"
                />
              </button>
              <button className="solutions-next text-slate-900 transition hover:text-slate-900">
                <HiArrowLongRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

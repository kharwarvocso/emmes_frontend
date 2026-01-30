import Wrapper from "@/components/Wrappers";
import { HiArrowRight, HiOutlineSpeakerWave } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { PiMapPin } from "react-icons/pi";

const stats = [
  {
    value: "2,150+",
    label: "Phase I–IV trials in 90+ countries",
    icon: TbWorld,
  },
  {
    value: "434+",
    label: "Publications in scientific journals since 2016",
    icon: HiOutlineSpeakerWave,
  },
  {
    value: "32,000+",
    label: "Clinical trial sites",
    icon: PiMapPin,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr]">
          <div>
            <p className="text-base font-semibold text-slate-500">Stats</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1d3173] sm:text-4xl md:text-4xl">
              Our numbers speak for themselves
            </h2>
            <button className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-[#1d3173]">
              Explore All
              <HiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-slate-200">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="flex items-center justify-between gap-6 py-6"
                >
                  <div>
                    <p className="text-4xl font-semibold text-[#1d3173] sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-base font-medium text-slate-600">
                      {stat.label}
                    </p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-[#1d3173]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

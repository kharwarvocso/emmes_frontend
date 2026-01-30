import Wrapper from "@/components/Wrappers";
import { HiArrowRight } from "react-icons/hi2";

const resourceCards = [
  {
    type: "Article",
    title: "FDA Approves First Cellular Therapy to Treat Patients with Severe…",
  },
  {
    type: "Article",
    title: "Essex Management Appoints David Loose as Chief Executive Officer…",
  },
  {
    type: "News",
    title: "Navigating Funding Freezes and AI Frontiers…",
  },
  {
    type: "Press Release",
    title: "Mesoblast and BMT CTN to initiate pivotal trial of Ryoncil®",
  },
];

export default function ResourceCenter() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a1b3b_0%,#0b2a6b_40%,#0a2f7c_70%,#0a3aa5_100%)] rounded-b-4xl">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.35),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_center,rgba(0,190,255,0.45),transparent_70%)]" />
      </div>

      <Wrapper as="div" className="relative py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_2fr]">
          <article className="flex h-full min-h-[620px] flex-col justify-between rounded-3xl bg-[#0b66ff] p-7 text-white shadow-[0_24px_60px_rgba(2,12,32,0.35)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Resource Center
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
                Your hub for insights, evidence, and expertise — from
                peer‑reviewed publications to practical solutions
              </h2>
            </div>
            <div>
              <p className="mt-6 text-sm text-white/85">
                Browse a wide range of content including white papers, webinars,
                journal articles, conference presentations, and solution briefs
                — all developed in collaboration with our partners and backed by
                real‑world experience.
              </p>
              <button className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b66ff] shadow-sm">
                Explore All
                <HiArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          <div className="grid gap-6 sm:grid-cols-2">
            {resourceCards.map((card) => (
              <article
                key={card.title}
                className="flex aspect-square w-full flex-col justify-between rounded-3xl bg-white p-6 text-slate-900 shadow-[0_24px_60px_rgba(2,12,32,0.2)]"
              >
                <div>
                  <span className="inline-flex rounded-full bg-[#5a6ddc] px-3 py-1 text-xs font-semibold text-white">
                    {card.type}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug">
                    {card.title}
                  </h3>
                </div>
                <button className="mt-8 inline-flex items-center justify-between rounded-full bg-[#24377a] px-5 py-2 text-sm font-semibold text-white">
                  Read more
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

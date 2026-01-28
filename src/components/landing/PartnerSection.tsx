import Wrapper from "@/components/Wrappers";
import { HiArrowRight } from "react-icons/hi2";

export default function PartnerSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#101f4f_0%,#143b86_45%,#1f59c7_75%,#a8c8ff_100%)] rounded-b-4xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_70%)]" />
        <div className="absolute right-0 top-0 h-full w-2/5 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_70%)] opacity-80" />
        <div className="absolute right-[-10%] top-[-10%] h-[140%] w-[60%] bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
      </div>

      <Wrapper as="div" className="relative py-16 md:py-20">
        <div className="max-w-4xl text-white">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Partner With Experts Who Advance Clinical Research
          </h2>
          <p className="mt-5 text-base text-white/85 sm:text-lg">
            At Emmes Group, we collaborate closely with sponsors and research
            teams to deliver high-quality, data-driven clinical solutions. Our
            proven expertise, scientific rigor, and commitment to excellence
            help bring innovative therapies to patients faster. Let&apos;s
            connect to discuss how we can support your next clinical program.
          </p>
          <button className="mt-8 inline-flex min-w-[320px] items-center justify-between gap-3 rounded-full bg-[#0b66ff] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(2,12,32,0.35)]">
            Request a meeting
            <HiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Wrapper>
    </section>
  );
}

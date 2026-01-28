import Wrapper from "@/components/Wrappers";

export default function TruthSection() {
  return (
    <section id="about" className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="mx-auto w-full text-center">
          <p className="text-md font-bold text-[#1d3173] sm:text-xl md:text-2xl">
            The Emmes Group
          </p>
          <h2 className="mt-4 mx-auto text-2xl font-semibold leading-relaxed text-[#1d3173] sm:text-3xl md:text-4xl">
            At Emmes Group, our work is driven by a simple but profound belief:
            truth matters. Since our founding in 1977, we've been committed to
            uncovering truth in clinical research - through scientific rigor,
            operational excellence, and deep collaboration with our clients and
            partners. That truth fuels better decisions, faster treatments, and
            more confident health outcomes.
          </h2>
        </div>

        <div className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#f5f2ef] shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <video
              className="h-[240px] w-full object-cover sm:h-[320px] md:h-[380px]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/default/video-placeholder.jpg"
            >
              <source src="/default/emmesgroup.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

import Wrapper from "@/components/Wrappers";

const features = [
  { title: "Fast onboarding", description: "Start with a 1–2 week discovery and a prioritized plan." },
  { title: "Measurable outcomes", description: "Track KPIs like fraud loss, MTTD/MTTR, and control coverage." },
  { title: "Low process overhead", description: "Templates and automation over meetings and docs." },
  { title: "Security-by-design", description: "Practical controls that engineers can adopt quickly." },
];

export default function Features() {
  return (
    <section id="features" className="bg-zinc-50">
      <Wrapper as="div" className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          What you get
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold text-zinc-950">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{f.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}


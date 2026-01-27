import Wrapper from "@/components/Wrappers";

const testimonials = [
  {
    quote:
      "They helped us cut fraud loss while improving customer experience—without adding friction.",
    name: "Head of Risk",
    company: "Fintech",
  },
  {
    quote:
      "Clear, actionable recommendations and a delivery plan our team could execute.",
    name: "Security Lead",
    company: "SaaS",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          Testimonials
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border bg-white p-6">
              <blockquote className="text-zinc-800">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-zinc-600">
                {t.name} — {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}


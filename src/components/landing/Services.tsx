import Wrapper from "@/components/Wrappers";

const services = [
  {
    title: "Fraud Prevention",
    description:
      "Reduce chargebacks and account takeovers with layered controls and clear playbooks.",
  },
  {
    title: "Cyber Threat Protection",
    description:
      "Harden surfaces, improve detection, and operationalize incident response.",
  },
  {
    title: "Security Program Delivery",
    description:
      "Ship policies, training, and governance that teams actually follow.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          Services
        </h2>
        <p className="mt-3 max-w-prose text-zinc-600">
          Engagements scoped for outcomes. Built to integrate with your existing
          tools and teams.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-950">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}


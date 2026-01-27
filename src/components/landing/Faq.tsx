import Wrapper from "@/components/Wrappers";

export const faqItems = [
  {
    q: "Do you work with small teams?",
    a: "Yes. We scope engagements to match team size and maturity, focusing on the highest ROI controls first.",
  },
  {
    q: "Do you provide implementation support?",
    a: "Yes. We can pair with engineering and operations to implement controls, dashboards, and playbooks.",
  },
  {
    q: "Can you integrate with existing tools?",
    a: "Yes. We aim to use what you already have (SIEM, ticketing, IAM) and fill gaps only where necessary.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-zinc-50">
      <Wrapper as="div" className="py-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          FAQ
        </h2>
        <div className="mt-8 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border bg-white p-5"
            >
              <summary className="cursor-pointer text-sm font-medium text-zinc-950">
                {item.q}
              </summary>
              <p className="mt-3 text-sm text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}


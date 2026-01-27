import Wrapper from "@/components/Wrappers";

export default function Contact() {
  return (
    <section id="contact" className="bg-white">
      <Wrapper as="div" className="py-16 md:py-20">
        <div className="rounded-2xl border bg-zinc-50 p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
            Contact
          </h2>
          <p className="mt-3 max-w-prose text-zinc-600">
            Send a message and we’ll respond within 1–2 business days.
          </p>
          <p className="mt-6 text-sm text-zinc-700">
            Email:{" "}
            <a className="underline" href="mailto:hello@theemmesgroup.com">
              hello@theemmesgroup.com
            </a>
          </p>
        </div>
      </Wrapper>
    </section>
  );
}


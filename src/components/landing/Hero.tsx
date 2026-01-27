import Link from "next/link";
import Wrapper from "@/components/Wrappers";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-50">
      <Wrapper as="div" isTop className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-zinc-600">
            Security & risk programs that ship
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
            Protect revenue, reputation, and customers—without slowing growth.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-zinc-600">
            TheEmmesGroup helps teams reduce fraud and cyber risk with pragmatic,
            measurable programs built for real-world constraints.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Talk to an expert
            </Link>
            <Link
              href="#services"
              className="rounded-md border px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-white"
            >
              Explore services
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}


import Wrapper from "@/components/Wrappers";
import type { Metadata } from "next";

export const revalidate = 300;

export default function AboutPage() {
  return (
    <Wrapper as="main" isTop className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">About Tech Blog</h1>
        <p className="mt-4 text-base text-zinc-600">
          Tech Blog is a clean, focused publication for builders. We share practical essays,
          tutorials, and product insights with a clear, technical voice.
        </p>
      </section>
    </Wrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "About",
    description: "Learn more about Tech Blog and our editorial mission.",
    alternates: {
      canonical: `${siteUrl}/about`,
    },
  };
}

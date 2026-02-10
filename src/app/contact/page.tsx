import Wrapper from "@/components/Wrappers";
import type { Metadata } from "next";

export const revalidate = 300;

export default function ContactPage() {
  return (
    <Wrapper as="main" isTop className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">Contact</h1>
        <p className="mt-4 text-base text-zinc-600">
          Have a question, suggestion, or partnership idea? Reach us at
          <span className="font-medium text-zinc-900"> hello@example.com</span>.
        </p>
      </section>
    </Wrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "Contact",
    description: "Contact the Tech Blog team.",
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
  };
}

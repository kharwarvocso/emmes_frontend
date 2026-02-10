import Wrapper from "@/components/Wrappers";
import type { Metadata } from "next";

export const revalidate = 300;

export default function TermsPage() {
  return (
    <Wrapper as="main" isTop className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">Terms & Conditions</h1>
        <p className="mt-4 text-base text-zinc-600">
          These terms govern the use of Tech Blog. Replace this content with your final terms and
          conditions.
        </p>
      </section>
    </Wrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "Terms & Conditions",
    description: "Terms and conditions for Tech Blog.",
    alternates: {
      canonical: `${siteUrl}/terms-and-conditions`,
    },
  };
}

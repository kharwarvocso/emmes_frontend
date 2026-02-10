import Wrapper from "@/components/Wrappers";
import type { Metadata } from "next";

export const revalidate = 300;

export default function PrivacyPolicyPage() {
  return (
    <Wrapper as="main" isTop className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-base text-zinc-600">
          We respect your privacy. This page outlines how we collect, use, and protect personal
          information. Replace this content with your final policy text.
        </p>
      </section>
    </Wrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: "Privacy Policy",
    description: "Privacy policy for Tech Blog.",
    alternates: {
      canonical: `${siteUrl}/privacy-policy`,
    },
  };
}

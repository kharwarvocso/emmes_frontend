import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: false },
};

export default function CatchAllSlugPage() {
  notFound();
}

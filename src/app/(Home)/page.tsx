import Wrapper from "@/components/Wrappers";
import React from "react";
import { Metadata } from "next";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchHomepageData, homepageQueryOptions } from "./query";
import PageRenderer from "../_common/PageRenderer";

export const revalidate = 0;

export default async function HomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(homepageQueryOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wrapper as="main" isTop className="h-[200vh]">
        <PageRenderer  />
      </Wrapper>
    </HydrationBoundary>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchHomepageData();
    const seo = data?.metaData;
    const keywords = seo?.keywords.map((keyword: any) => (keyword.children || [])?.map((child: any) => child.text))?.join(", ");
    const metaScripts = (seo?.metaScripts || []).map((script: any) => (script.children || [])?.map((child: any) => child.text))?.join("; ");
    return {
      title: seo?.metaTitle || "Default Title",
      description: seo?.metaDescription || "Default Description",
      keywords: keywords || undefined,
      alternates: {
        canonical: seo?.canonicalUrl || undefined,
      },
      other: seo?.metaScripts
        ? {
            "data-custom-scripts": metaScripts || undefined,
          }
        : {},
    };
  } catch (error) {
    console.error("Error generating metadata in HomePage:", error);
    return {
      title: "E-commerce Store",
      description: "Welcome to our amazing store",
    };
  }
}
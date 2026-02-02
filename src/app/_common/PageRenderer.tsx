"use client";
import { useQuery } from "@tanstack/react-query";
import { homepageQueryOptions } from "../(Home)/query";
import { sectionMap } from "./sectionMap";

export default function PageRenderer() {
  const { data, isLoading, error } = useQuery({
    ...homepageQueryOptions,
    enabled: false, // ✅ prevents re-fetching on client after hydration
  });
  const pageSectionsData = Array.isArray((data as any)?.data)
    ? ((data as any).data[0]?.hero_section ?? [])
    : [];
  //   console.log(pageSectionsData);
  return (
    <>
      {/* <pre>{JSON.stringify(pageSectionsData, null, 2)}</pre> */}
      {pageSectionsData.map((section: any, index: number) => {
        const Component = sectionMap[section.__component];
        if (!Component || section.isShown === false) return null;
        return <Component key={index} isLoading={isLoading} {...section} error={error} />;
      })}
    </>
  );
}

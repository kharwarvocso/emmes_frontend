"use client";
import { sectionMap } from "./sectionMap";

interface PageRendererProps {
  sections: any[];
  testimonials?: any;
  offerings?: any;
  isLoading?: boolean;
}

export default function PageRenderer({
  sections = [],
  testimonials,
  offerings,
  isLoading,
}: PageRendererProps) {
  console.log("PageRenderer sections:", sections);
  return (
    <>
      {sections.map((section: any, index: number) => {
        const Component = sectionMap[section.__component];
        if (!Component || section.isShown === false) return null;
        return (
          <Component
            key={index}
            section={section}
            leaders={testimonials} // For LeadershipSection (memeber-section)
            offerings={offerings} // For SolutionsSection (services-section)
            isLoading={isLoading}
            {...section} // Pass all other props just in case
          />
        );
      })}
    </>
  );
}

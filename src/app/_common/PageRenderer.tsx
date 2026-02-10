import { sectionMap } from "./sectionMap";
import type { BlogPost } from "@/lib/strapi/queries";
import { Fragment } from "react";
import Wrapper from "@/components/Wrappers";
import AdSlot from "@/components/ads/AdSlot";

export default function PageRenderer({
  sections = [],
  fallbackPosts = [],
  showInlineAd = false,
  inlineAdSlot,
  adsenseClient,
}: {
  sections?: any[];
  fallbackPosts?: BlogPost[];
  showInlineAd?: boolean;
  inlineAdSlot?: string;
  adsenseClient?: string;
}) {
  const pageSectionsData = sections ?? [];

  return (
    <>
      {pageSectionsData.map((section: any, index: number) => {
        const Component = sectionMap[section.__component];
        if (!Component || section.isShown === false) return null;
        const extraProps =
          section.__component === "page-components.blog-hero-section" ||
          section.__component === "page-components.blog-list-section"
            ? { fallbackPosts }
            : {};
        return (
          <Fragment key={index}>
            <Component {...section} {...extraProps} />
            {showInlineAd && index === 0 && (
              <Wrapper className="py-0">
                <AdSlot
                  client={adsenseClient}
                  slot={inlineAdSlot}
                  minHeight={120}
                  className="mx-auto max-w-5xl py-0"
                />
              </Wrapper>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

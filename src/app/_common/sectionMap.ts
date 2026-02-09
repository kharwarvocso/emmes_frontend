import BannerSection from "./BannerSection";
import ProductSliderSection from "./ProductSliderSection";
import OfferSection from "./OfferSection";
import MarqueeSection from "./MarqueeSection";
import Hero from "@/components/landing/Hero";
import TextMediaSectionWrapper from "@/components/landing/TextMediaSectionWrapper";
import ResourceCenter from "@/components/landing/ResourceCenter";
import StatsSection from "@/components/landing/StatsSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import LeadershipSection from "@/components/landing/LeadershipSection";
import CasesSection from "@/components/landing/CasesSection";

export const sectionMap: any = {
  "page-components.slider-section": BannerSection,
  "page-components.product-slider-section": ProductSliderSection,
  "page-components.offer-section": OfferSection,
  "page-components.marquee-section": MarqueeSection,

  // Home Page Sections
  "section.hero-section": Hero,
  "section.text-media-section": TextMediaSectionWrapper,
  "section.blog-card-section": ResourceCenter,
  "section.metrix": StatsSection,
  "section.services-section": SolutionsSection,
  "section.memeber-section": LeadershipSection,
  "section.case-study": CasesSection,
};

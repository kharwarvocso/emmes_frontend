"use client";

import Image from "next/image";
import Wrapper from "@/components/Wrappers";
import { HiArrowLongRight } from "react-icons/hi2";
import { RiLinkedinFill, RiTwitterXLine } from "react-icons/ri";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { useSiteConfig, getImageUrl } from "@/hooks/useSiteConfig";

export default function SiteFooter() {
  const { data: footerColumns = [] } = useNavigation('footer');
  const { data: siteConfig } = useSiteConfig();

  const footer = siteConfig?.footer;
  const ctaTitle = footer?.cta_title;
  const ctaDescription = footer?.cta_description;
  const ctaButton = footer?.cta_button;
  const footerTitle = footer?.footer_title;
  const footerDescription = footer?.footer_description;
  const newsletterCta = footer?.footer_newsletter_cta;
  const showCta =
    !footer?.is_ctahidden &&
    Boolean(ctaTitle || ctaDescription || ctaButton?.name);
  const resolveIconUrl = (icon?: unknown) => {
    if (!icon) return undefined;
    if (typeof icon === "string") return getImageUrl(icon);
    if (typeof icon === "object" && icon !== null && "url" in icon) {
      return getImageUrl((icon as { url?: string }).url);
    }
    if (typeof icon === "object" && icon !== null && "data" in icon) {
      const data = (icon as { data?: unknown }).data;
      if (typeof data === "object" && data !== null && "url" in data) {
        return getImageUrl((data as { url?: string }).url);
      }
    }
    return undefined;
  };

  const siteName = siteConfig?.site_name || "Emmes Group";
  const newsletterIconUrl = resolveIconUrl(newsletterCta?.icon);

  const renderButton = (
    button?: {
      name?: string | null;
      link?: string | null;
      icon?: unknown;
      icon_position?: string | null;
    } | null,
    className?: string,
  ) => {
    if (!button?.name) return null;
    const iconUrl = resolveIconUrl(button.icon);
    const iconPosition = button.icon_position === "left" ? "left" : "right";
    const content = (
      <>
        {iconUrl && iconPosition === "left" ? (
          <Image
            src={iconUrl}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
            aria-hidden="true"
            unoptimized
          />
        ) : null}
        {button.name}
        {iconUrl ? (
          iconPosition === "right" ? (
            <Image
              src={iconUrl}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
              unoptimized
            />
          ) : null
        ) : (
          <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
        )}
      </>
    );

    return button.link ? (
      <Link
        href={button.link}
        className={className}
      >
        {content}
      </Link>
    ) : (
      <button className={className}>{content}</button>
    );
  };

  return (
    <footer className="bg-[#d7dccb] text-[#1d3173] rounded-t-4xl">
      <Wrapper as="div" className="pt-16 md:pt-20">
        <div className="relative px-6 py-10">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_70%)]" />
            <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
          </div>

          {showCta ? (
            <div className="relative text-center">
              {ctaTitle ? (
                <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                  {ctaTitle}
                </h2>
              ) : null}
              {ctaDescription ? (
                <p className="mt-4 text-sm text-[#2a3f7a]/80 sm:text-base">
                  {ctaDescription}
                </p>
              ) : null}
              {renderButton(
                ctaButton,
                "mt-6 inline-flex min-w-[220px] items-center justify-between rounded-full bg-[#0b66ff] px-7 py-3 text-sm font-semibold text-white",
              )}
            </div>
          ) : null}

          <div className="mt-10 border-t border-[#7b88a8]/50" />

          <div className="border-b border-[#7b88a8]/50">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1.5fr] lg:divide-x lg:divide-[#7b88a8]/50">
              <div className="py-10 lg:pr-10">
                {footerTitle ? (
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {footerTitle}
                  </h3>
                ) : null}
                {footerDescription ? (
                  <p className="mt-4 text-sm text-[#2a3f7a]/80 sm:text-base">
                    {footerDescription}
                  </p>
                ) : null}
              </div>

              <div className="space-y-8 py-10 lg:pl-10">
                {newsletterCta?.name ? (
                  <div className="flex items-center justify-between border-b border-[#7b88a8]/50 pb-4">
                    {newsletterCta.link ? (
                      <Link
                        href={newsletterCta.link}
                        className="text-sm font-semibold"
                      >
                        {newsletterCta.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold">
                        {newsletterCta.name}
                      </span>
                    )}
                    {newsletterIconUrl ? (
                      <Image
                        src={newsletterIconUrl}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        aria-hidden="true"
                        unoptimized
                      />
                    ) : (
                      <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
                    )}
                  </div>
                ) : null}
                <div className="grid gap-6 text-sm text-[#2a3f7a]/80 sm:grid-cols-3">
                  {footerColumns.map((column) => (
                    <div key={column.id} className="space-y-2">
                      {/* Column Header handled conceptually or hidden if empty path? 
                           Based on design, the top level items (Company, etc) might be headers?
                           Or simpler: existing design just listed links. 
                           If 'Company' is a header, we might want to display it or just its children?
                           The original code: 
                           ["History", "Leadership", ...] -> simply links.
                           The API: "Company" (header) -> children: "History", "Leadership".
                           If we show the children, it matches the design.
                       */}
                      {column.items && column.items.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          className="block hover:text-[#0b66ff] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="pt-6">
            <div className="flex flex-col gap-4 text-xs text-[#2a3f7a]/80 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-[#1d3173]">
                <span className="text-lg font-semibold">{siteName}</span>
                <span>(c) {new Date().getFullYear()}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>External Privacy Notice</span>
                <span>FOCI</span>
                <span>Emmes EU-U.S. Data Privacy Framework</span>
                <span>Purchasing Terms & Conditions</span>
                <span>ISO Certification</span>
              </div>
              <div className="flex items-center gap-3 text-[#1d3173]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b88a8]/50">
                  <RiLinkedinFill className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b88a8]/50">
                  <RiTwitterXLine className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}

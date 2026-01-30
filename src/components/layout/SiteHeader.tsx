"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Wrapper from "@/components/Wrappers";
import { useNavigation } from "@/hooks/useNavigation";
import { useSiteConfig, getImageUrl } from "@/hooks/useSiteConfig";

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="9"
        cy="9"
        r="5.25"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M13.25 13.25L16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function SiteHeader() {
  const { data: topNavItems = [] } = useNavigation("top");
  const { data: primaryNavItems = [] } = useNavigation("primary");
  const { data: siteConfig } = useSiteConfig();

  const logoUrl = getImageUrl(siteConfig?.logo?.url);

  return (
    <header className="">
      <div className="">
        <div className="" />
        <Wrapper as="div" className="relative flex flex-col gap-2 py-4">
          <div className="flex items-center justify-end">
            <nav className="emmes-nav-top hidden items-center gap-6 lg:flex">
              {topNavItems.map((item, index) => (
                <Link
                  key={item.id ?? index}
                  href={item.href}
                  className="emmes-nav-top-link"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                aria-label="Search"
                className="emmes-icon-button"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
            </nav>

            <details className="relative lg:hidden">
              <summary className="list-none rounded-md border border-white/30 px-3 py-2 text-xs font-medium text-white">
                Menu
              </summary>
              <div className="absolute right-0 mt-3 w-64 rounded-lg border border-white/20 bg-white p-3 shadow-lg">
                <nav className="flex flex-col gap-1 text-sm text-slate-900">
                  {topNavItems.map((item, index) => (
                    <Link
                      key={item.id ?? index}
                      href={item.href}
                      className="rounded-md px-3 py-2 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 h-px bg-slate-200" />
                  {primaryNavItems.map((item, index) => (
                    <Link
                      key={item.id ?? index}
                      href={item.href}
                      className="rounded-md px-3 py-2 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </details>
          </div>

          <div className="flex items-center justify-between">
            <Logo
              className="h-10 md:h-12"
              src={logoUrl}
              width={siteConfig?.logo?.width}
              height={siteConfig?.logo?.height}
            />
            <nav className="emmes-nav-primary hidden items-center justify-end gap-8 pb-2 lg:flex">
              {primaryNavItems.map((item, index) => (
                <Link
                  key={item.id ?? index}
                  href={item.href}
                  className="emmes-nav-primary-link"
                >
                  {item.label}
                  <ChevronDownIcon className="h-4 w-4 text-white/70" />
                </Link>
              ))}
            </nav>
          </div>
        </Wrapper>
      </div>
    </header>
  );
}

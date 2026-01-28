import Wrapper from "@/components/Wrappers";
import { HiArrowLongRight } from "react-icons/hi2";
import { RiLinkedinFill, RiTwitterXLine } from "react-icons/ri";

const quickLinks = [
  ["History", "Leadership", "Clients and Collaborators", "By the Numbers"],
  ["Tech & AI", "CRO Services", "Resource Center"],
  ["Careers", "Contact Us", "Locations"],
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#d7dccb] text-[#1d3173] rounded-t-4xl">
      <Wrapper as="div" className="pt-16 md:pt-20">
        <div className="relative px-6 py-10">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_70%)]" />
            <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
          </div>

          <div className="relative text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Delivering Research That Makes a Real Impact
            </h2>
            <p className="mt-4 text-sm text-[#2a3f7a]/80 sm:text-base">
              At Emmes Group, we combine scientific expertise, advanced
              technology, and operational excellence to support complex clinical
              research programs. Our integrated approach helps organizations
              achieve reliable outcomes, maintain regulatory compliance, and
              accelerate progress from discovery to delivery.
            </p>
            <button className="mt-6 inline-flex min-w-[220px] items-center justify-between rounded-full bg-[#0b66ff] px-7 py-3 text-sm font-semibold text-white">
              Request a meeting
              <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 border-t border-[#7b88a8]/50" />

          <div className="border-b border-[#7b88a8]/50">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1.5fr] lg:divide-x lg:divide-[#7b88a8]/50">
              <div className="py-10 lg:pr-10">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  Delivering Global Health Impact Through People, Science and
                  Technology
                </h3>
                <p className="mt-4 text-sm text-[#2a3f7a]/80 sm:text-base">
                  Welcome to Emmes, a full-service clinical research organization
                  (CRO) dedicated to helping biopharmaceutical, government,
                  non-profit and academic partners achieve their development and
                  human health goals. At Emmes we are committed to delivering
                  programs faster, more efficiently, with higher quality through
                  the end-to-end use of technology and AI across all clinical
                  functions.
                </p>
              </div>

              <div className="space-y-8 py-10 lg:pl-10">
                <div className="flex items-center justify-between border-b border-[#7b88a8]/50 pb-4">
                  <p className="text-sm font-semibold">
                    Signup for newsletter
                  </p>
                  <HiArrowLongRight className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="grid gap-6 text-sm text-[#2a3f7a]/80 sm:grid-cols-3">
                  {quickLinks.map((column, index) => (
                    <div key={`footer-col-${index}`} className="space-y-2">
                      {column.map((link) => (
                        <p key={link}>{link}</p>
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
                <span className="text-lg font-semibold">Emmes Group</span>
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

"use client";

import { useState } from "react";
import { ChevronUp, X } from "lucide-react";
import AdSlot from "./AdSlot";
import Portal from "@/components/Portal";

export default function StickyFooterAd() {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const stickySlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY;
  const isDev = process.env.NODE_ENV !== "production";
  const isReady = Boolean(adsenseClient && stickySlot);
  const [isOpen, setIsOpen] = useState(true);

  if (!isReady && !isDev) return null;

  return (
    <Portal>
      <div className="fixed bottom-3 left-0 right-0 z-[9999] px-3">
        <div className="mx-auto w-full max-w-[320px] md:max-w-md">
          {isOpen ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Close ad"
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 right-2 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50"
              >
                <X className="h-4 w-4" />
              </button>
              <AdSlot
                client={adsenseClient}
                slot={stickySlot}
                label="Sponsored"
                minHeight={50}
                className="rounded-xl p-1 md:p-2 shadow-lg"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mx-auto flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-zinc-600 shadow-sm transition hover:bg-zinc-50"
            >
              <ChevronUp className="h-4 w-4" />
              Show ad
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
}

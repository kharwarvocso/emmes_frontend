"use client";

import Portal from "@/components/Portal";
import { useEffect } from "react";

export default function Search({ handleSearchModal }: { handleSearchModal: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleSearchModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSearchModal]);

  return (
    <Portal>
      <div className="fixed inset-0 z-[9998] bg-black/50" onClick={handleSearchModal} />
      <div className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-24">
        <div
          className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">Search</h3>
            <button className="text-sm text-zinc-500 hover:text-zinc-700" onClick={handleSearchModal}>
              Close
            </button>
          </div>
          <input
            autoFocus
            type="text"
            placeholder="Search the site"
            className="mt-4 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
          />
          <p className="mt-3 text-xs text-zinc-500">Hook this input to your search API when ready.</p>
        </div>
      </div>
    </Portal>
  );
}

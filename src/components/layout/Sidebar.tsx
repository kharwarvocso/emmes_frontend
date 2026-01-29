"use client";

import Portal from "@/components/Portal";

export default function Sidebar({
  isSidebar,
  handleSidebar,
}: {
  isSidebar: boolean;
  handleSidebar: () => void;
}) {
  if (!isSidebar) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9998] bg-black/40" onClick={handleSidebar} />
      <aside
        className="fixed right-0 top-0 z-[9999] h-full w-72 bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-zinc-900">Quick Panel</h3>
          <button className="text-sm text-zinc-500 hover:text-zinc-700" onClick={handleSidebar}>
            Close
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          <p>Use this area for sidebar content like filters, account links, or extra navigation.</p>
          <p>Wire it up to Strapi or your own data source as needed.</p>
        </div>
      </aside>
    </Portal>
  );
}

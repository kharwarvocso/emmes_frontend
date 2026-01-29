import Wrapper from "@/components/Wrappers";

export default function MarqueeSection({ items, isLoading }: any) {
  const marqueeItems = items?.length ? items : ["Trusted by teams", "Secure by design", "Fast setup"];

  return (
    <Wrapper className="py-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Marquee</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-700">
          {marqueeItems.map((item: any, index: number) => (
            <span key={index} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">
              {typeof item === "string" ? item : item?.label || `Item ${index + 1}`}
            </span>
          ))}
        </div>
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading items...</p>}
      </div>
    </Wrapper>
  );
}

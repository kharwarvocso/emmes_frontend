import Wrapper from "@/components/Wrappers";

export default function ProductSliderSection({ title, items, isLoading }: any) {
  const fallbackItems = items?.length ? items : ["Alpha", "Beta", "Gamma"];

  return (
    <Wrapper className="py-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Product Slider</p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-900">{title || "Featured products"}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {fallbackItems.map((item: any, index: number) => (
            <div key={index} className="rounded-md border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-700">
              {typeof item === "string" ? item : item?.title || `Item ${index + 1}`}
            </div>
          ))}
        </div>
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading products...</p>}
      </div>
    </Wrapper>
  );
}

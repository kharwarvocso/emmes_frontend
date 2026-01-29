import Wrapper from "@/components/Wrappers";

export default function OfferSection({ heading, description, ctaLabel, isLoading }: any) {
  return (
    <Wrapper className="py-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Offer Section</p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-900">{heading || "Launch offer"}</h2>
        <p className="mt-2 text-sm text-zinc-600">
          {description || "Add your Strapi content to showcase a highlighted offer or promotion."}
        </p>
        <button className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          {ctaLabel || "Learn more"}
        </button>
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading offer...</p>}
      </div>
    </Wrapper>
  );
}

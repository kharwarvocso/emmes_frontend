import Wrapper from "@/components/Wrappers";

export default function BannerSection({ title, subtitle, isLoading }: any) {
  return (
    <Wrapper className="py-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Banner Section</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          {title || "Starter hero content"}
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          {subtitle || "Connect Strapi data to replace this placeholder copy."}
        </p>
        {isLoading && <p className="mt-3 text-xs text-zinc-500">Loading data...</p>}
      </div>
    </Wrapper>
  );
}

import Link from "next/link";

const quickLinks = [
  { label: "All Posts", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Subscribe", href: "/subscribe" },
];

const topics = ["Writing", "Design", "Engineering", "Product", "Leadership"];

const trending = [
  { label: "Building a thoughtful blog with clarity and craft", href: "/blog/building-a-thoughtful-blog" },
  { label: "Designing for reading, not just aesthetics", href: "/blog/designing-for-reading" },
  { label: "Engineering a fast, SEO-first blog", href: "/blog/engineering-for-seo" },
];

export default function SearchMega({
  onClose,
  onOpenModal,
}: {
  onClose: () => void;
  onOpenModal: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-[112px] z-40 hidden md:block">
      <div className="mx-auto w-full max-w-screen-2xl px-3 xl:px-5">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-[260px] flex-1 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
              <input
                type="text"
                placeholder="Search articles"
                className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
            <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
              Search
            </button>
            <button
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
              onClick={onOpenModal}
              type="button"
            >
              Open full search
            </button>
            <button
              className="ml-auto text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Quick links</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-sky-700" onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Popular topics</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/blog?category=${topic.toLowerCase()}`}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-600 hover:border-sky-300 hover:text-sky-700"
                    onClick={onClose}
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Trending</p>
              <ul className="mt-3 space-y-3 text-sm text-zinc-700">
                {trending.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-sky-700" onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

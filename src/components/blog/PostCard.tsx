import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/strapi/queries";
import { getFallbackImage } from "@/lib/fallbackImages";

export default function PostCard({
  post,
  layout = "vertical",
  className,
}: {
  post: BlogPost;
  layout?: "vertical" | "horizontal";
  className?: string;
}) {
  const dateLabel = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;
  const href = post.slug ? `/blog/${post.slug}` : "/blog";
  const image = post.coverImage;
  const fallbackImage = getFallbackImage(post.slug, "card");
  const isHorizontal = layout === "horizontal";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl bg-white transition",
        isHorizontal ? "flex flex-col md:flex-row" : "flex flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-md",
          isHorizontal ? "h-48 w-full md:h-auto md:w-56" : "h-52 w-full",
        )}
      >
        <Image
          src={image?.url || fallbackImage}
          alt={image?.alternativeText || post.title}
          fill
          sizes={isHorizontal ? "(max-width: 768px) 100vw, 224px" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", isHorizontal ? "justify-center" : "")}>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-zinc-500">
          {post.category?.name && (
            <span className="rounded-full border border-zinc-200 px-2.5 py-0.5">{post.category.name}</span>
          )}
          {dateLabel && <span>{dateLabel}</span>}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-zinc-900 font-display">
          <Link href={href} className="transition group-hover:text-zinc-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-zinc-600">
          {post.excerpt || "Add an excerpt in Strapi for a quick preview."}
        </p>
        <Link href={href} className="mt-5 inline-flex text-sm font-medium text-sky-600 hover:text-sky-700">
          Read more
        </Link>
      </div>
    </article>
  );
}

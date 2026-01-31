import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import { getImageUrl } from "@/hooks/useSiteConfig";
import { HiArrowRight } from "react-icons/hi2";

type PartnerSectionContent = {
  subtitle?: string | null;
  title?: string | null;
  description?: string | null;
  is_hidden?: boolean | null;
  bg_media?:
    | string
    | { url?: string; mime?: string }
    | { data?: { url?: string; mime?: string } };
  button?: {
    name?: string | null;
    link?: string | null;
    icon?: string | { url?: string } | { data?: { url?: string } } | null;
    icon_position?: string | null;
  } | null;
};

const resolveMedia = (
  media?:
    | string
    | { url?: string; mime?: string }
    | { data?: { url?: string; mime?: string } },
) => {
  if (!media) return { url: undefined, mime: undefined };
  const item =
    typeof media === "string"
      ? { url: media }
      : "data" in media
        ? media.data
        : media;
  return { url: getImageUrl(item?.url), mime: item?.mime };
};

export default function PartnerSection({
  section,
}: {
  section?: PartnerSectionContent;
}) {
  if (!section || section?.is_hidden) return null;

  const subtitle = section?.subtitle;
  const title = section?.title;
  const description = section?.description;
  const button = section?.button;
  const buttonLabel = button?.name || undefined;
  const buttonHref = button?.link || undefined;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl =
    typeof button?.icon === "string"
      ? getImageUrl(button.icon)
      : getImageUrl(button?.icon?.url || button?.icon?.data?.url);

  const bgMedia = resolveMedia(section?.bg_media);
  const bgIsVideo =
    bgMedia.mime?.startsWith("video/") ||
    (bgMedia.url ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(bgMedia.url) : false);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#101f4f_0%,#143b86_45%,#1f59c7_75%,#a8c8ff_100%)] rounded-b-4xl">
      {bgMedia.url ? (
        <div className="absolute inset-0 z-0">
          {bgIsVideo ? (
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
              <source src={bgMedia.url} type={bgMedia.mime || undefined} />
            </video>
          ) : (
            <Image
              src={bgMedia.url}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-slate-900/45" aria-hidden="true" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_70%)]" />
        <div className="absolute right-0 top-0 h-full w-2/5 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_70%)] opacity-80" />
        <div className="absolute right-[-10%] top-[-10%] h-[140%] w-[60%] bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
      </div>

      <Wrapper as="div" className="relative py-16 md:py-20">
        <div className="max-w-4xl text-white">
          {subtitle ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-5 text-base text-white/85 sm:text-lg">{description}</p>
          ) : null}
          {buttonLabel ? (
            buttonHref ? (
              <Link
                href={buttonHref}
                className="mt-8 inline-flex min-w-[320px] items-center justify-between gap-3 rounded-full bg-[#0b66ff] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(2,12,32,0.35)]"
              >
                {buttonIconUrl && buttonIconPosition === "left" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
                {buttonLabel}
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Link>
            ) : (
              <button className="mt-8 inline-flex min-w-[320px] items-center justify-between gap-3 rounded-full bg-[#0b66ff] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(2,12,32,0.35)]">
                {buttonIconUrl && buttonIconPosition === "left" ? (
                  <Image
                    src={buttonIconUrl}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    aria-hidden="true"
                    unoptimized
                  />
                ) : null}
                {buttonLabel}
                {buttonIconUrl ? (
                  buttonIconPosition === "right" ? (
                    <Image
                      src={buttonIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden="true"
                      unoptimized
                    />
                  ) : null
                ) : (
                  <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )
          ) : null}
        </div>
      </Wrapper>
    </section>
  );
}

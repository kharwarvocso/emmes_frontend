import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrappers";
import TruthVideoScroll from "@/components/landing/TruthVideoScroll";
import TruthScrollText from "@/components/landing/TruthScrollText";
import { getImageUrl } from "@/hooks/useSiteConfig";

type TruthSectionContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  position?: "top" | "bottom";
  is_hidden?: boolean;
  media?: string | { url?: string; mime?: string } | { data?: { url?: string; mime?: string } };
  bg_media?: string | { url?: string; mime?: string } | { data?: { url?: string; mime?: string } };
  button?: {
    name?: string;
    link?: string;
    icon?: string | { url?: string };
    icon_position?: string;
  };
};

const defaultContent = {
  subtitle: "The Emmes Group",
  title:
    "At Emmes Group, our work is driven by a simple but profound belief: truth matters.",
  description:
    "Since our founding in 1977, we've been committed to uncovering truth in clinical research - through scientific rigor, operational excellence, and deep collaboration with our clients and partners. That truth fuels better decisions, faster treatments, and more confident health outcomes.",
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

export default function TruthSection({ section }: { section?: TruthSectionContent }) {
  if (section?.is_hidden) return null;

  const subtitle = section?.subtitle || defaultContent.subtitle;
  const title = section?.title || defaultContent.title;
  const description = section?.description || defaultContent.description;
  const position = section?.position || "top";
  const button = section?.button;
  const buttonLabel = button?.name;
  const buttonHref = button?.link;
  const buttonIconPosition = button?.icon_position === "left" ? "left" : "right";
  const buttonIconUrl =
    typeof button?.icon === "string"
      ? getImageUrl(button.icon)
      : getImageUrl(button?.icon?.url);

  const media = resolveMedia(section?.media);
  const bgMedia = resolveMedia(section?.bg_media);
  const mediaIsVideo =
    media.mime?.startsWith("video/") ||
    (media.url ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(media.url) : false);
  const bgIsVideo =
    bgMedia.mime?.startsWith("video/") ||
    (bgMedia.url ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(bgMedia.url) : false);

  const mediaBlock =
    media.url && !mediaIsVideo ? (
      <div className={position === "top" ? "mb-10" : "mt-10"}>
        <Image
          src={media.url}
          alt=""
          width={1400}
          height={800}
          className="w-full rounded-3xl object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>
    ) : null;

  return (
    <section id="about" className="bg-white">
      <div className={bgMedia.url ? "relative overflow-hidden" : ""}>
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
                priority={false}
              />
            )}
          </div>
        ) : null}

        <Wrapper as="div" className="relative z-10 py-16 md:py-20">
          {position === "top" ? mediaBlock : null}
          <div className="mx-auto w-full text-center">
            {description ? (
              <div className="mt-6">
                <TruthScrollText
                  subtitle={subtitle}
                  title={title}
                  text={description}
                  className="text-[#1d3173]"
                  buttonLabel={buttonLabel}
                  buttonHref={buttonHref}
                  buttonIconUrl={buttonIconUrl}
                  buttonIconPosition={buttonIconPosition}
                />
              </div>
            ) : null}


          </div>

          {position !== "top" ? mediaBlock : null}
        </Wrapper>
      </div>

      {mediaIsVideo ? (
        <div className="mt-12">
          <TruthVideoScroll src={media.url} />
        </div>
      ) : null}
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";

const fallbackLogo = "/default/emmes-group-logo_white.png";

type LogoProps = {
  mode?: "light" | "dark";
  className?: string;
  src?: string;
  width?: number;
  height?: number;
};

export default function Logo({
  mode = "dark",
  className,
  src,
  width,
  height,
}: LogoProps) {
  const resolvedSrc =
    typeof src === "string" && src.trim().length > 0 ? src : fallbackLogo;
  const isRemote = resolvedSrc.startsWith("http");
  const resolvedWidth = width && width > 0 ? width : 244;
  const resolvedHeight = height && height > 0 ? height : 84;

  console.log("Logo component - resolvedSrc:", resolvedSrc);
  console.log("Logo component - isRemote:", isRemote);


  return (
    <Link href="/" className="flex cursor-pointer items-center gap-2">
      <Image
        src={resolvedSrc}
        alt="logo"
        height={resolvedHeight}
        width={resolvedWidth}
        className={className || "h-10 w-auto object-contain"}
        priority={mode === "light"}
        unoptimized={isRemote}
        sizes="(max-width: 768px) 140px, 180px"
      />
      {/* <p className="cursor-pointer text-lg font-medium md:text-3xl">
        Cyber Security
      </p> */}
    </Link>
  );
}

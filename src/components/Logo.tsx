import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({
  mode = "dark",
  className,
}: {
  mode?: "light" | "dark";
  className?: string;
}) {
  const logoSrc = "/default/emmes-group-logo_white.png";
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-2">
      <Image
        src={logoSrc}
        alt="Emmes Group logo"
        height={120}
        width={420}
        priority
        className={cn(
          "h-9 w-auto object-contain md:h-10",
          mode === "dark" && "invert",
          className,
        )}
      />
    </Link>
  );
}

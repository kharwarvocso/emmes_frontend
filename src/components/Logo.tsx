import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ mode = "dark", className }: { mode?: "light" | "dark"; className?: string }) {
  let logoDark = "/default/logo.png";
  let logoWhite = "/default/logo.png";
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-2">
      <Image src={mode === "light" ? logoWhite : logoDark} alt="logo" height={300} width={500} className="max-h-14 w-min object-contain" />
      {/* <p className="cursor-pointer text-lg font-medium md:text-3xl">
        Cyber Security
      </p> */}
    </Link>
  );
}
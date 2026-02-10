import Link from "next/link";
import React from "react";

export default function Logo({ mode = "dark", className }: { mode?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-2">
      <span
        className={`text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text md:text-3xl ${className || ""}`}
      >
        Tech Blog
      </span>
    </Link>
  );
}

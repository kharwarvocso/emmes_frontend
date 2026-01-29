"use client";

import { useEffect } from "react";

export default function WebThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = "light";
  }, []);

  return <>{children}</>;
}

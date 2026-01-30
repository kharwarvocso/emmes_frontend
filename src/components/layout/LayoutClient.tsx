"use client";

import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type LayoutClientProps = {
  children: ReactNode;
  headerStyle?: number;
  footerStyle?: number;
  header1Data?: unknown;
  header2Data?: unknown;
  footerData?: unknown;
};

export default function LayoutClient({ children }: LayoutClientProps) {
  return (
    <>
      {/* <SiteHeader /> */}
      {children}
      <SiteFooter />
    </>
  );
}

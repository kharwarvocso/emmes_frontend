import React from "react";
import LayoutClient from "./LayoutClient";
import { header, header2, footer } from "@/data/layout";

export default async function Layout({ headerStyle = 1, footerStyle = 1, children }: any) {
  const headerData = {
    upperNav: header?.upperNav,
    middleNav: header?.middleNav,
    lowerNav: header?.lowerNav,
  };
  const footerData = {
    ...footer,
  };

  return (
    <LayoutClient
      headerStyle={headerStyle}
      footerStyle={footerStyle}
      header1Data={headerData}
      header2Data={header2}
      footerData={footerData}
    >
      {children}
    </LayoutClient>
  );
}

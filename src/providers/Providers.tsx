"use client";
import React from "react";
import WebThemeProvider from "./WebThemeProvider";
import MotionProvider from "./MotionProviders";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <WebThemeProvider>{children}</WebThemeProvider>
    </MotionProvider>
  );
}

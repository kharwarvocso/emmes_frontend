"use client";
import React from "react";
import ReactQueryProvider from "./QueryProvider";
import WebThemeProvider from "./WebThemeProvider";
import MotionProvider from "./MotionProviders";
import CartModeBridge from "@/components/cart/CartModeBridge";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <MotionProvider>
        <WebThemeProvider>
          <CartModeBridge />
          {children}
        </WebThemeProvider>
      </MotionProvider>
    </ReactQueryProvider>
  );
}

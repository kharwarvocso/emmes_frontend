import React from "react";
import ReactQueryProvider from "./QueryProvider";
import WebThemeProvider from "./WebThemeProvider";
import MotionProvider from "./MotionProvider";
import Layout from "@/components/layout/Layout";
import ReduxProvider from "./ReduxProvider";
import CartModeBridge from "@/components/cart/CartModeBridge";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <MotionProvider>
                <WebThemeProvider>
                    <ReduxProvider>
                        <CartModeBridge />
                        <Layout>{children}</Layout>
                    </ReduxProvider>
                </WebThemeProvider>
            </MotionProvider>
        </ReactQueryProvider>
    );
}
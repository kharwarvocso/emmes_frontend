"use client";

import React from "react";
import { MotionConfig, useReducedMotion } from "@/lib/motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
    const prefersReduced = useReducedMotion();

    return (
        <MotionConfig
            reducedMotion={prefersReduced ? "always" : "never"}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {children}
        </MotionConfig>
    );
}
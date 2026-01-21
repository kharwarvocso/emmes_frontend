"use client";

// Centralized Motion utilities and re-exports
// Use this module across the app instead of importing from "framer-motion" directly.

import {
    motion,
    AnimatePresence,
    MotionConfig,
    useReducedMotion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    type Variants,
    type Transition,
    type HTMLMotionProps,
    type MotionProps,
} from "framer-motion";

export { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring };
export type { Variants, Transition, HTMLMotionProps, MotionProps };

// Common transitions
export const transitions = {
    fast: { duration: 0.2, ease: "easeOut" } as Transition,
    base: { duration: 0.35, ease: "easeOut" } as Transition,
    slow: { duration: 0.6, ease: "easeOut" } as Transition,
    spring: { type: "spring", stiffness: 300, damping: 24 } as Transition,
    springSnappy: { type: "spring", stiffness: 400, damping: 25 } as Transition,
};

// Default viewport config for in-view animations
export const viewport = { once: true, amount: 0.2 } as const;

// Common variants
export const fade: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export const pop: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
};

export const fadeUp = (distance = 20): Variants => ({
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0 },
});

export const fadeDown = (distance = 20): Variants => ({
    hidden: { opacity: 0, y: -distance },
    show: { opacity: 1, y: 0 },
});

export const fadeLeft = (distance = 20): Variants => ({
    hidden: { opacity: 0, x: distance },
    show: { opacity: 1, x: 0 },
});

export const fadeRight = (distance = 20): Variants => ({
    hidden: { opacity: 0, x: -distance },
    show: { opacity: 1, x: 0 },
});

export const scaleIn = (from = 0.95): Variants => ({
    hidden: { opacity: 0, scale: from },
    show: { opacity: 1, scale: 1 },
});

export const container = (stagger = 0.08, delayChildren = 0.06): Variants => ({
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: stagger, delayChildren },
    },
});

export const variants = {
    fade,
    pop,
    fadeUp,
    fadeDown,
    fadeLeft,
    fadeRight,
    scaleIn,
    container,
};

// Helper for in-view pattern: spread onto motion elements
export function inView(
    v: Variants | (() => Variants),
    opts?: { delay?: number; duration?: number; once?: boolean; amount?: number; transition?: Transition },
): MotionProps & { variants: Variants } {
    const variant = typeof v === "function" ? v() : v;
    const { delay = 0, duration, once, amount, transition } = opts ?? {};
    const baseTransition = transition ?? (duration ? { duration, ease: "easeOut" } : transitions.base);
    return {
        initial: "hidden",
        whileInView: "show",
        viewport: { ...viewport, ...(once !== undefined ? { once } : {}), ...(amount !== undefined ? { amount } : {}) },
        variants: variant,
        transition: { ...baseTransition, delay },
    };
}
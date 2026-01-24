"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
    children: React.ReactNode;
    className?: string;
    overlayClassName?: string;
}

export const AnimatedButton = ({
    variant = "primary",
    size = "md",
    children,
    className,
    overlayClassName,
    ...props
}: AnimatedButtonProps) => {
    const baseStyles = "relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed group";

    const variants = {
        primary: "bg-cyan-100 border border-cyan-600 text-cyan-700 hover:text-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.2)]",
        secondary: "bg-gray-100 border border-gray-300 text-gray-700 hover:text-white",
        outline: "bg-transparent border-2 border-cyan-600 text-cyan-600 hover:text-white",
        ghost: "bg-transparent text-gray-600 hover:text-cyan-600",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-base rounded-2xl",
        icon: "p-2.5 rounded-full aspect-square",
    };

    const overlayColors = {
        primary: "bg-cyan-600",
        secondary: "bg-gray-600",
        outline: "bg-cyan-600",
        ghost: "bg-cyan-50",
    };

    return (
        <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            initial="initial"
            animate="initial"
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            <motion.div
                className={cn(
                    "absolute inset-0 z-0",
                    size === "icon" ? "rounded-full" : "",
                    overlayColors[variant],
                    overlayClassName
                )}
                variants={{
                    initial: { scale: 0, originX: 0.5, originY: 0.5 },
                    hover: { scale: variant === "ghost" ? 1 : 1.5, originX: 0.5, originY: 0.5 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
                className="relative z-10 flex items-center justify-center gap-2 w-full"
                variants={{
                    initial: { color: "inherit" },
                    hover: { color: variant === "ghost" ? "#0e7490" : "#ffffff" },
                }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </motion.button>
    );
};

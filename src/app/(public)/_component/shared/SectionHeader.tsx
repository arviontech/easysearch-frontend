"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

interface SectionHeaderProps {
    title: string;
    onPrev?: () => void;
    onNext?: () => void;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    viewAllHref?: string;
    className?: string;
}

export const SectionHeader = ({
    title,
    onPrev,
    onNext,
    prevDisabled,
    nextDisabled,
    viewAllHref,
    className,
}: SectionHeaderProps) => {
    return (
        <motion.div
            className={className || "flex items-center justify-between mb-8"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
            </h2>

            <div className="flex items-center gap-3">
                {/* Navigation Arrows */}
                {(onPrev || onNext) && (
                    <div className="hidden md:flex gap-2">
                        <AnimatedButton
                            size="icon"
                            onClick={onPrev}
                            disabled={prevDisabled}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </AnimatedButton>
                        <AnimatedButton
                            size="icon"
                            onClick={onNext}
                            disabled={nextDisabled}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </AnimatedButton>
                    </div>
                )}

                {/* View All Link */}
                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1 transition-all hover:gap-2"
                    >
                        <span>View All</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardAdProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const CardAd = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
}: CardAdProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      initial={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        whileHover="hover"
        initial="initial"
        animate="initial"
      >
        <Link
          href={ctaLink}
          className="group block bg-gradient-to-t from-cyan-50/90 via-cyan-50/40 to-transparent backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden h-full min-h-[380px] flex flex-col"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Featured Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mb-4 flex-1">{subtitle}</p>
            )}

            {/* CTA Button - Opposite hover effect */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="bg-cyan-600 text-white text-sm font-semibold px-3 py-2 rounded-2xl border border-cyan-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center justify-center gap-2">
                <motion.div
                  className="absolute inset-0 bg-cyan-100 rounded-2xl"
                  variants={{
                    initial: { scale: 0 },
                    hover: { scale: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative z-10 flex items-center gap-2"
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "#0e7490" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>{ctaText}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CardAd;

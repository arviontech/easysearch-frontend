"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCategoryCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
  isActive?: boolean;
}

const ServiceCategoryCard = ({
  icon: Icon,
  title,
  href,
  isActive = false,
}: ServiceCategoryCardProps) => {
  return (
    <motion.div
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      initial="initial"
      animate="initial"
    >
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-3xl border border-white backdrop-blur-md transition-all shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(0,0,0,0.08)] ${
          isActive ? "bg-cyan-50/60 border-blue-600" : "bg-cyan-50/60"
        }`}
      >
        <div
          className={`p-3 rounded-full flex-shrink-0 border shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden ${
            isActive ? "bg-blue-100 border-blue-600" : "bg-cyan-100 border-cyan-600"
          }`}
        >
          <motion.div
            className={`absolute inset-0 rounded-full ${isActive ? "bg-blue-600" : "bg-cyan-600"}`}
            variants={{
              initial: { scale: 0 },
              hover: { scale: 1 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10"
            variants={{
              initial: { color: isActive ? "#1d4ed8" : "#0e7490" },
              hover: { color: "#ffffff" }
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>
        <span
          className={`text-sm font-semibold ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {title}
        </span>
      </Link>
    </motion.div>
  );
};

export default ServiceCategoryCard;

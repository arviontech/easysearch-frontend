"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AreaCardProps {
  name: string;
  propertyCount: number;
  imageUrl: string;
  href: string;
}

const AreaCard = ({ name, propertyCount, imageUrl, href }: AreaCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group relative overflow-hidden rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 block"
      >
        {/* Image Container */}
        <div className="relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Content with Glass Morphism */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-cyan-50/90 backdrop-blur-md rounded-2xl p-4 border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition">
                  {name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  <span className="font-medium">{propertyCount.toLocaleString()} Properties</span>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="bg-cyan-600 text-white p-2 rounded-full group-hover:bg-cyan-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AreaCard;

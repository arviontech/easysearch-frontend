"use client";

import { Camera, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

interface FoodCardProps {
  id: string;
  nameBengali: string;
  nameEnglish: string;
  description: string;
  famousLocations: number;
  avgPrice: number;
  userPhotosCount: number;
  imageUrl: string;
  href: string;
  category?: string;
  area?: string;
}

const FoodCard = ({
  id: _id,
  nameBengali,
  nameEnglish,
  description,
  famousLocations,
  avgPrice,
  userPhotosCount,
  imageUrl,
  href,
  category,
  area,
}: FoodCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={href}
        className="group block bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[380px]"
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={nameEnglish}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {category}
              </span>
            </div>
          )}

          {/* Photo Count Badge */}
          <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm">
            <Camera className="w-3 h-3 text-cyan-600" />
            <span className="text-xs font-bold">{userPhotosCount}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Food Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-cyan-600 transition">
            {nameBengali}
          </h3>

          {/* English Name */}
          <p className="text-sm text-cyan-600 font-medium line-clamp-1 mb-2">
            {nameEnglish}
          </p>

          <div className="space-y-1.5 mb-3">
            {/* Area */}
            {area && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span className="font-medium">{area}</span>
              </div>
            )}

            {/* Shops Nearby */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span>{famousLocations} shops nearby</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Price & View Button */}
          <div className="flex items-center justify-between pt-3 border-t border-cyan-100 mt-auto">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-0.5">Average Price</span>
              <p className="text-lg font-bold text-gray-900">৳{avgPrice}</p>
            </div>

            <AnimatedButton size="sm" className="rounded-xl">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </AnimatedButton>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;

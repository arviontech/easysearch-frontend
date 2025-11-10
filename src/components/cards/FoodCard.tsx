"use client";

import { Camera, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    >
      <motion.div
        whileHover="hover"
        initial="initial"
        animate="initial"
      >
      <Link
        href={href}
        className="group block bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
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
              <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
          )}

          {/* Photo Count Badge */}
          <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span className="text-xs font-medium">{userPhotosCount}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          {/* Food Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-cyan-600 transition">
            {nameBengali}
          </h3>

          {/* English Name */}
          <p className="text-sm text-gray-600 line-clamp-1 mb-2">{nameEnglish}</p>

          {/* Area */}
          {area && (
            <div className="flex items-center gap-1.5 text-sm text-cyan-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{area}</span>
            </div>
          )}

          {/* Shops Nearby */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{famousLocations} shops nearby</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>

          {/* Price & View Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
            <div>
              <span className="text-xs text-gray-500">Avg Price</span>
              <p className="text-lg font-bold text-gray-900">৳{avgPrice}</p>
            </div>

            <div className="bg-cyan-100 text-cyan-700 text-sm font-semibold px-3 py-2 rounded-2xl border border-cyan-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center gap-2">
              <motion.div
                className="absolute inset-0 bg-cyan-600 rounded-2xl"
                variants={{
                  initial: { scale: 0 },
                  hover: { scale: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10 flex items-center gap-2"
                variants={{
                  initial: { color: "#0e7490" },
                  hover: { color: "#ffffff" }
                }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
    </motion.div>
  );
};

export default FoodCard;

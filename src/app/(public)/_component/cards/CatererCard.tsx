"use client";

import { Eye, MapPin, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CatererCardProps {
  id: string;
  businessName: string;
  specialty: string;
  serviceType: string;
  mealTypes: ("Breakfast" | "Lunch" | "Dinner")[];
  lunchPrice: number;
  location: string;
  cuisineStyle: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  href: string;
}

const CatererCard = ({
  id: _id,
  businessName,
  specialty,
  serviceType,
  mealTypes,
  lunchPrice,
  location,
  cuisineStyle,
  rating,
  reviewCount,
  imageUrl,
  href,
}: CatererCardProps) => {
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
            alt={businessName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Service Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {serviceType}
            </span>
          </div>

          {/* Location Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          {/* Business Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-cyan-600 transition">
            {businessName}
          </h3>

          {/* Specialty */}
          <p className="text-xs text-gray-500 mb-2">{specialty}</p>

          {/* Meal Types */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
            <UtensilsCrossed className="w-4 h-4" />
            <span className="line-clamp-1">
              {mealTypes.join(", ")}
            </span>
          </div>

          {/* Cuisine Style */}
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {cuisineStyle}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>

          {/* Price & View Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ৳{lunchPrice}
              </span>
              <span className="text-sm text-gray-500">/lunch</span>
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

export default CatererCard;

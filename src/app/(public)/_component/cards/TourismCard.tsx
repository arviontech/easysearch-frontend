"use client";

import { Clock, Eye, Star, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

interface TourismCardProps {
  id: string;
  name: string;
  type: string;
  entryFee: number;
  bestTime: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  href: string;
}

const TourismCard = ({
  id: _id,
  name,
  type,
  entryFee,
  bestTime,
  rating,
  reviewCount,
  imageUrl,
  href,
}: TourismCardProps) => {
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
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {type}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-cyan-600 transition">
            {name}
          </h3>

          <div className="space-y-2 mb-4">
            {/* Entry Fee */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 flex items-center justify-center text-cyan-600">
                <Tag className="w-4 h-4" />
              </div>
              <span className="font-medium text-gray-900">Entry: {entryFee === 0 ? "Free" : `৳${entryFee}`}</span>
            </div>

            {/* Best Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 flex items-center justify-center text-cyan-600">
                <Clock className="w-4 h-4" />
              </div>
              <span className="line-clamp-1">{bestTime}</span>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 flex items-center justify-center text-cyan-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-500">({reviewCount} reviews)</span>
            </div>
          </div>

          {/* View Button */}
          <div className="flex items-center justify-end pt-3 border-t border-cyan-100 mt-auto">
            <AnimatedButton size="sm" className="rounded-xl">
              <Eye className="w-4 h-4" />
              <span>Explore</span>
            </AnimatedButton>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TourismCard;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Tag } from "lucide-react";

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
  id,
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
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {type}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {name}
        </h3>

        {/* Entry Fee */}
        <div className="flex items-center gap-1.5 text-sm text-gray-700 mb-2">
          <Tag className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            Entry: <span className="font-semibold">৳{entryFee}</span>
          </span>
        </div>

        {/* Best Time */}
        <div className="flex items-center gap-1.5 text-sm text-gray-700 mb-2">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="line-clamp-1">{bestTime}</span>
        </div>

        {/* Reviews */}
        <p className="text-xs text-gray-500 mb-3">{reviewCount} reviews</p>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle hire guide
            }}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Hire Guide
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle plan visit
            }}
            className="border-2 border-blue-600 text-blue-600 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Plan Visit
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TourismCard;

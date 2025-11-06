"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Camera } from "lucide-react";

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
}

const FoodCard = ({
  id,
  nameBengali,
  nameEnglish,
  description,
  famousLocations,
  avgPrice,
  userPhotosCount,
  imageUrl,
  href,
}: FoodCardProps) => {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={nameEnglish}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Photo Count Badge */}
        <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <Camera className="w-3 h-3" />
          <span className="text-xs font-medium">{userPhotosCount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Food Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition">
          {nameBengali}
        </h3>

        {/* English Name & Shops Nearby */}
        <div className="flex items-center gap-3 mb-1.5">
          <p className="text-sm text-gray-600 line-clamp-1">{nameEnglish}</p>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium whitespace-nowrap">
              {famousLocations} shops
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-auto">
          <div>
            <span className="text-xs text-gray-500">Avg Price</span>
            <p className="text-lg font-bold text-gray-900">৳{avgPrice}</p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle where to find
            }}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Find
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;

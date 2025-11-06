"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  features: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  href: string;
}

const PropertyCard = ({
  id,
  title,
  category,
  price,
  location,
  features,
  rating,
  reviewCount,
  imageUrl,
  href,
}: PropertyCardProps) => {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
          {features.map((feature, index) => (
            <span key={index}>
              {feature}
              {index < features.length - 1 && " •"}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-900">
            {rating}
          </span>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>

        {/* Price & View Details Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ৳{price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          <button
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

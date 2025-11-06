"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";

interface CatererCardProps {
  id: string;
  businessName: string;
  specialty: string;
  serviceTypes: string[];
  pricePerPerson: number;
  location: string;
  capacity: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  href: string;
}

const CatererCard = ({
  id,
  businessName,
  specialty,
  serviceTypes,
  pricePerPerson,
  location,
  capacity,
  rating,
  reviewCount,
  imageUrl,
  href,
}: CatererCardProps) => {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={businessName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Location Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Business Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {businessName}
        </h3>

        {/* Specialty & Capacity */}
        <div className="flex items-center gap-3 mb-2">
          <p className="text-sm font-semibold text-blue-600">{specialty}</p>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{capacity}</span>
          </div>
        </div>

        {/* Service Types */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {serviceTypes.slice(0, 3).map((type, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ৳{pricePerPerson}
            </span>
            <span className="text-sm text-gray-500">/person</span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle get quote
            }}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Quote
          </button>
        </div>

        {/* Reviews */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          {reviewCount} reviews
        </p>
      </div>
    </Link>
  );
};

export default CatererCard;

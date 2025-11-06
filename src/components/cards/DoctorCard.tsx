"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Calendar, ArrowRight } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experience: string;
  consultationFee: number;
  available: string;
  hospital: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  href: string;
}

const DoctorCard = ({
  id,
  name,
  specialization,
  qualifications,
  experience,
  consultationFee,
  available,
  hospital,
  rating,
  reviewCount,
  imageUrl,
  href,
}: DoctorCardProps) => {
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

        {/* Available Time Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {available}
          </span>
        </div>

        {/* Specialization Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {specialization}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {name}
        </h3>

        {/* Hospital Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{hospital}</span>
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
              ৳{consultationFee}
            </span>
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

export default DoctorCard;

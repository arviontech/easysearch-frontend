"use client";

import {
  Star,
  Phone,
  MapPin,
  Languages,
  Briefcase,
  Clock,
  Eye,
  Navigation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface DoctorCardProps {
  id: string;
  name: string;
  qualifications: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  experience: number; // in years
  consultationFee: number;
  availableDays: string;
  availableTimes: string;
  languages?: string[];
  hospital: string;
  location: string;
  imageUrl?: string;
  phoneNumber?: string;
}

const DoctorCard = ({
  id,
  name,
  qualifications,
  specialization,
  rating,
  reviewCount,
  experience,
  consultationFee,
  availableDays,
  availableTimes,
  languages,
  hospital,
  location,
  imageUrl = "/assets/hero-image.jpg",
  phoneNumber,
}: DoctorCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div whileHover="hover" initial="initial" animate="initial">
        <div className="group bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden">
          {/* Header with Profile Photo */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4 mb-4">
              {/* Circular Profile Photo */}
              <div className="relative w-20 h-20 shrink-0">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="80px"
                  className="object-cover rounded-full border-4 border-cyan-100"
                />
              </div>

              {/* Name & Qualifications */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {name}
                </h3>
                <p className="text-sm text-cyan-600 font-medium mb-1">
                  {qualifications}
                </p>
                <p className="text-sm text-gray-600">{specialization}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({reviewCount} reviews)
              </span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{experience} years</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-2.5 mb-4">
              {/* Consultation Fee */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <span className="text-cyan-600 font-bold">৳</span>
                </div>
                <span className="text-gray-700">
                  <span className="font-semibold text-gray-900">
                    ৳{consultationFee}
                  </span>{" "}
                  consultation fee
                </span>
              </div>

              {/* Available Days & Times */}
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    {availableDays}
                  </span>
                  <span className="text-gray-500 text-xs">{availableTimes}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 text-sm">
                <Languages className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-gray-700">{languages?.join(", ") || "Not specified"}</span>
              </div>

              {/* Hospital & Location */}
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{hospital}</span>
                  <span className="text-gray-500 text-xs">{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-2">
              <Link href={`/find/doctor/${id}`}>
                <button className="w-full px-3 py-2 bg-white border border-cyan-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-cyan-50 hover:border-cyan-400 transition flex items-center justify-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
              </Link>

              {phoneNumber && (
                <a href={`tel:${phoneNumber}`}>
                  <button className="w-full px-3 py-2 bg-white border border-cyan-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-cyan-50 hover:border-cyan-400 transition flex items-center justify-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </button>
                </a>
              )}

              <button className="w-full px-3 py-2 bg-white border border-cyan-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-cyan-50 hover:border-cyan-400 transition flex items-center justify-center gap-1.5">
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorCard;

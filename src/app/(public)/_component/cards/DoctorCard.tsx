"use client";

import {
  Star,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Eye,
  Navigation,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

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
  hospital,
  location,
  imageUrl = "/assets/hero-image.jpg",
  phoneNumber,
}: DoctorCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <div className="group bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Header with Profile Photo */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-4 mb-4">
            {/* Circular Profile Photo */}
            <div className="relative w-16 h-16 shrink-0 shadow-sm">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="64px"
                className="object-cover rounded-full border-2 border-white shadow-inner"
              />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-100" />
            </div>

            {/* Name & Qualifications */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-cyan-700 transition-colors">
                {name}
              </h3>
              <p className="text-xs text-cyan-600 font-bold uppercase tracking-wider mb-1">
                {specialization}
              </p>
              <p className="text-xs text-gray-500 font-medium line-clamp-1 italic">{qualifications}</p>
            </div>
          </div>

          {/* Rating & Experience Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg border border-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-900">{rating}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">({reviewCount} reviews)</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5 text-xs text-cyan-700 font-bold bg-cyan-50 px-2 py-1 rounded-lg border border-cyan-100">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{experience} Yrs Exp.</span>
            </div>
          </div>

          {/* Info Stack */}
          <div className="space-y-3 mb-2">
            {/* Consultation Fee */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 flex items-center justify-center shrink-0 text-cyan-600 font-black bg-cyan-100 rounded-md text-[10px]">
                TK
              </div>
              <span className="text-gray-700 font-medium">
                Fee: <span className="font-bold text-gray-900">৳{consultationFee}</span>
              </span>
            </div>

            {/* Available Days */}
            <div className="flex items-start gap-2 text-sm">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-xs">{availableDays}</span>
                <span className="text-gray-500 text-[11px]">{availableTimes}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-xs line-clamp-1">{hospital}</span>
                <span className="text-gray-500 text-[11px] line-clamp-1">{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-5 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <AnimatedButton
              size="sm"
              variant="outline"
              className="rounded-xl border-cyan-200 text-cyan-700"
              onClick={() => router.push(`/find/doctor/${id}`)}
            >
              <Eye className="w-4 h-4" />
              <span>Profile</span>
            </AnimatedButton>

            {phoneNumber ? (
              <AnimatedButton
                size="sm"
                className="rounded-xl"
                onClick={() => window.location.href = `tel:${phoneNumber}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </AnimatedButton>
            ) : (
              <AnimatedButton
                size="sm"
                variant="ghost"
                className="rounded-xl"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </AnimatedButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;

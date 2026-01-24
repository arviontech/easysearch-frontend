"use client";

import {
  MapPin,
  Briefcase,
  Clock,
  Eye,
  Building2,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: string;
  salary: string;
  experience?: string;
  education?: string;
  postedDate: string;
  deadline?: string;
  vacancies?: number;
  category?: string;
  href?: string;
}

const JobCard = ({
  id,
  title,
  company,
  companyLogo = "/assets/hero-image.jpg",
  location,
  jobType,
  salary,
  experience,
  postedDate,
  deadline,
  vacancies,
  category,
  href,
}: JobCardProps) => {
  const finalHref = href || `/find/jobs/${id}`;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={finalHref}
        className="group block bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[300px]"
      >
        <div className="p-4 pb-2">
          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-14 h-14 shrink-0 shadow-sm">
              <Image
                src={companyLogo}
                alt={company}
                fill
                sizes="56px"
                className="object-cover rounded-xl border border-cyan-100"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-[17px] font-bold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-cyan-600 transition">
                {title}
              </h3>
              <p className="text-sm text-cyan-600 font-bold flex items-center gap-1 line-clamp-1">
                <Building2 className="w-4 h-4" />
                {company}
              </p>
              {category && (
                <span className="inline-block mt-2 bg-cyan-100 text-cyan-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-cyan-200">
                  {category}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span className="line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-gray-900">{jobType}</span>
              <span className="text-gray-300">|</span>
              <span className="font-bold text-cyan-700">{salary}</span>
            </div>

            {(experience || vacancies) && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                {experience && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{experience}</span>
                  </div>
                )}
                {vacancies && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-cyan-50 rounded-md text-cyan-700 border border-cyan-100">
                    <span>{vacancies} Vacancy</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pb-4 mt-auto">
          <div className="flex items-center justify-between pt-3 border-t border-cyan-100">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                <Clock className="w-3.5 h-3.5" />
                <span>{postedDate}</span>
              </div>
              {deadline && (
                <div className="text-[11px] text-red-500 font-bold uppercase tracking-tight">
                  Deadline: {deadline}
                </div>
              )}
            </div>

            <AnimatedButton size="sm" className="rounded-xl px-4">
              <Eye className="w-4 h-4" />
              <span>Details</span>
            </AnimatedButton>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;

"use client";

import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  Building2,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: string; // Full-time, Part-time, Contract, etc.
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
  education,
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
    >
      <motion.div whileHover="hover" initial="initial" animate="initial">
        <Link
          href={finalHref}
          className="group block bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-[280px] flex flex-col"
        >
          {/* Header with Company Logo */}
          <div className="p-3 pb-2">
            <div className="flex items-start gap-2 mb-1.5">
              {/* Company Logo */}
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={companyLogo}
                  alt={company}
                  fill
                  sizes="48px"
                  className="object-cover rounded-lg border border-cyan-100"
                />
              </div>

              {/* Job Title & Company */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-0.5 line-clamp-1 group-hover:text-cyan-600 transition">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 font-medium flex items-center gap-1 line-clamp-1">
                  <Building2 className="w-4 h-4" />
                  {company}
                </p>
                {/* Category Badge Inline */}
                {category && (
                  <span className="inline-block mt-1 bg-cyan-600 text-white text-sm font-semibold px-2 py-0.5 rounded-full">
                    {category}
                  </span>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-1 mb-1.5">
              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span className="line-clamp-1">{location}</span>
              </div>

              {/* Job Type & Salary */}
              <div className="flex items-center gap-1.5 text-sm text-gray-700">
                <Briefcase className="w-4 h-4 text-cyan-600" />
                <span className="font-medium">{jobType}</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-gray-900">{salary}</span>
              </div>

              {/* Experience & Vacancies */}
              {(experience || vacancies) && (
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  {experience && (
                    <>
                      <GraduationCap className="w-4 h-4 text-cyan-600" />
                      <span>{experience}</span>
                    </>
                  )}
                  {experience && vacancies && <span className="text-gray-400">•</span>}
                  {vacancies && <span>{vacancies} vacancies</span>}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 pb-3 mt-auto">
            <div className="flex items-center justify-between pt-1.5 border-t border-gray-200">
              {/* Posted Date & Deadline */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{postedDate}</span>
                </div>
                {deadline && (
                  <div className="text-sm text-red-600 font-medium">
                    {deadline}
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <div className="bg-cyan-100 text-cyan-700 text-sm font-semibold px-3 py-1.5 rounded-xl border border-cyan-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center gap-1.5">
                <motion.div
                  className="absolute inset-0 bg-cyan-600 rounded-xl"
                  variants={{
                    initial: { scale: 0 },
                    hover: { scale: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative z-10 flex items-center gap-1.5"
                  variants={{
                    initial: { color: "#0e7490" },
                    hover: { color: "#ffffff" },
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

export default JobCard;

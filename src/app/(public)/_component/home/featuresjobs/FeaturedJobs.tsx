"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import JobCard from "@/app/(public)/_component/cards/JobCard";

const FeaturedJobs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 4;

  const jobs = [
    {
      id: "1",
      title: "Software Engineer",
      company: "TechBD Limited",
      location: "Rajshahi City",
      jobType: "Full-time",
      salary: "৳35,000 - 45,000",
      experience: "2-3 years",
      education: "B.Sc in CSE",
      postedDate: "2 days ago",
      deadline: "March 15, 2025",
      vacancies: 3,
      category: "IT & Software",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "2",
      title: "Marketing Executive",
      company: "Creative Solutions",
      location: "Shaheb Bazar",
      jobType: "Full-time",
      salary: "৳25,000 - 35,000",
      experience: "1-2 years",
      education: "BBA/MBA",
      postedDate: "5 days ago",
      deadline: "March 20, 2025",
      vacancies: 2,
      category: "Sales & Marketing",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "3",
      title: "Civil Engineer",
      company: "BuildTech Engineers",
      location: "Uposhohor",
      jobType: "Full-time",
      salary: "৳40,000 - 60,000",
      experience: "3-5 years",
      education: "B.Sc in Civil Engineering",
      postedDate: "1 week ago",
      deadline: "March 10, 2025",
      vacancies: 1,
      category: "Engineering",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "4",
      title: "Teacher (English)",
      company: "Rajshahi College",
      location: "Boalia",
      jobType: "Full-time",
      salary: "৳25,000 - 35,000",
      experience: "1-3 years",
      education: "M.A in English",
      postedDate: "4 days ago",
      deadline: "March 12, 2025",
      vacancies: 1,
      category: "Education",
      companyLogo: "/assets/hero-image.jpg",
    },
  ];

  const totalPages = Math.ceil(jobs.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = jobs.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Latest Job Opportunities
          </h2>

          <div className="flex items-center gap-3">
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <motion.button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="bg-cyan-100 border border-cyan-600 p-2 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                initial="initial"
                animate="initial"
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-600 rounded-full"
                  variants={{
                    initial: { scale: 0 },
                    hover: { scale: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative z-10"
                  variants={{
                    initial: { color: "#0e7490" },
                    hover: { color: "#ffffff" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.div>
              </motion.button>
              <motion.button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="bg-cyan-100 border border-cyan-600 p-2 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                initial="initial"
                animate="initial"
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-600 rounded-full"
                  variants={{
                    initial: { scale: 0 },
                    hover: { scale: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative z-10"
                  variants={{
                    initial: { color: "#0e7490" },
                    hover: { color: "#ffffff" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>

            {/* View All Link */}
            <Link
              href="/find/jobs"
              className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1 transition"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Jobs Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
          <AnimatePresence>
            {visibleItems.map((job, index) => (
              <motion.div
                key={`${currentPage}-${job.id}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard {...job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </PublicContainer>
    </section>
  );
};

export default FeaturedJobs;

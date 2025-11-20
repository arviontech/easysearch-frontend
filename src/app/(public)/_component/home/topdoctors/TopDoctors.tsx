"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import DoctorCard from "@/app/(public)/_component/cards/DoctorCard";

const TopDoctors = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const cardsToShow = 3;

  const departments = [
    "All",
    "Cardiologist",
    "Pediatrician",
    "Orthopedic",
    "Gynecologist",
  ];

  const allDoctors = [
    {
      id: "1",
      name: "Dr. Abdul Karim",
      specialization: "Cardiologist",
      qualifications: "MBBS, FCPS",
      experience: 15,
      consultationFee: 800,
      availableDays: "Sat-Thu",
      availableTimes: "4:00 PM - 8:00 PM",
      hospital: "Rajshahi Medical College Hospital",
      location: "Laxmipur, Rajshahi",
      rating: 4.9,
      reviewCount: 120,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English"],
    },
    {
      id: "2",
      name: "Dr. Fatima Rahman",
      specialization: "Pediatrician",
      qualifications: "MBBS, MD",
      experience: 12,
      consultationFee: 600,
      availableDays: "Sun-Thu",
      availableTimes: "10:00 AM - 2:00 PM",
      hospital: "Rajshahi Specialized Hospital",
      location: "Shaheb Bazar, Rajshahi",
      rating: 4.8,
      reviewCount: 95,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English"],
    },
    {
      id: "3",
      name: "Dr. Mohammed Ali",
      specialization: "Orthopedic",
      qualifications: "MBBS, MS (Ortho)",
      experience: 18,
      consultationFee: 1000,
      availableDays: "Sat-Wed",
      availableTimes: "6:00 PM - 10:00 PM",
      hospital: "Square Hospital Rajshahi",
      location: "Kazla, Rajshahi",
      rating: 4.9,
      reviewCount: 142,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English", "Hindi"],
    },
    {
      id: "4",
      name: "Dr. Ayesha Siddiqua",
      specialization: "Gynecologist",
      qualifications: "MBBS, FCPS",
      experience: 10,
      consultationFee: 700,
      availableDays: "Sun-Thu",
      availableTimes: "3:00 PM - 7:00 PM",
      hospital: "Islami Bank Medical College",
      location: "Motihar, Rajshahi",
      rating: 4.7,
      reviewCount: 88,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English"],
    },
    {
      id: "5",
      name: "Dr. Rashid Ahmed",
      specialization: "Cardiologist",
      qualifications: "MBBS, MD",
      experience: 20,
      consultationFee: 900,
      availableDays: "Sat-Thu",
      availableTimes: "2:00 PM - 6:00 PM",
      hospital: "Rajshahi Medical College Hospital",
      location: "Laxmipur, Rajshahi",
      rating: 4.8,
      reviewCount: 156,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English"],
    },
    {
      id: "6",
      name: "Dr. Nusrat Jahan",
      specialization: "Pediatrician",
      qualifications: "MBBS, FCPS",
      experience: 8,
      consultationFee: 550,
      availableDays: "Sun-Thu",
      availableTimes: "5:00 PM - 9:00 PM",
      hospital: "Popular Hospital Rajshahi",
      location: "C&B Mor, Rajshahi",
      rating: 4.6,
      reviewCount: 72,
      imageUrl: "/assets/hero-image.jpg",
      languages: ["Bangla", "English"],
    },
  ];

  // Filter doctors based on selected department
  const doctors =
    selectedDepartment === "All"
      ? allDoctors
      : allDoctors.filter((doc) => doc.specialization === selectedDepartment);

  const totalPages = Math.ceil(doctors.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = doctors.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find Trusted Doctors
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
              href="/find/doctor"
              className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1 transition"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Department Tabs */}
        <motion.div
          className="flex items-center gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {departments.map((dept) => (
            <motion.button
              type="button"
              key={dept}
              onClick={() => {
                setSelectedDepartment(dept);
                setCurrentPage(0); // Reset to first page when changing department
              }}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap relative overflow-hidden border shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] ${selectedDepartment === dept
                ? "bg-cyan-600 text-white border-cyan-600"
                : "bg-cyan-100 text-cyan-700 border-cyan-600"
                }`}
              whileHover={selectedDepartment !== dept ? "hover" : undefined}
              whileTap={{ scale: 0.95 }}
              initial="initial"
              animate="initial"
            >
              {selectedDepartment !== dept && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-cyan-600 rounded-full"
                    variants={{
                      initial: { scale: 0 },
                      hover: { scale: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="relative z-10"
                    variants={{
                      initial: { color: "#0e7490" },
                      hover: { color: "#ffffff" }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {dept}
                  </motion.span>
                </>
              )}
              {selectedDepartment === dept && <span>{dept}</span>}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Layout: Carousel (Left) + Fixed Ad (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left: Paginated Carousel - 3 cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
              <AnimatePresence>
                {visibleItems.map((doctor, index) => (
                  <motion.div
                    key={`${currentPage}-${doctor.id}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DoctorCard {...doctor} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Book trusted doctors online"
              subtitle="Available 24/7 for consultation"
              imageUrl="/assets/hero-image.jpg"
              ctaText="Find Doctor"
              ctaLink="/find/doctor"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default TopDoctors;

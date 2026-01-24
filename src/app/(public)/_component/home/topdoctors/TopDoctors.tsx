"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import DoctorCard from "@/app/(public)/_component/cards/DoctorCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";
import { AnimatedButton } from "@/components/ui/animated-button";

const DEPARTMENTS = [
  "All",
  "Cardiologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
];

const ALL_DOCTORS = [
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

const TopDoctors = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const cardsToShow = 3;

  const doctors = selectedDepartment === "All"
    ? ALL_DOCTORS
    : ALL_DOCTORS.filter((doc) => doc.specialization === selectedDepartment);

  const totalPages = Math.ceil(doctors.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = doctors.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Find Trusted Doctors"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/find/doctor"
        />

        <motion.div
          className="flex items-center gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {DEPARTMENTS.map((dept) => (
            <AnimatedButton
              key={dept}
              onClick={() => {
                setSelectedDepartment(dept);
                setCurrentPage(0);
              }}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap ${selectedDepartment === dept
                ? "bg-cyan-600 text-white border-cyan-600 shadow-lg"
                : "bg-cyan-100 text-cyan-700 border-cyan-600"
                }`}
              variant={selectedDepartment === dept ? "primary" : "outline"}
            >
              {dept}
            </AnimatedButton>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedDepartment}-${currentPage}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  {visibleItems.map((doctor) => (
                    <DoctorCard key={doctor.id} {...doctor} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

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

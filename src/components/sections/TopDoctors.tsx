"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import DoctorCard from "@/components/cards/DoctorCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

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
      experience: "15 years",
      consultationFee: 800,
      available: "Today at 4 PM",
      hospital: "Rajshahi Medical College Hospital",
      rating: 4.9,
      reviewCount: 120,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/1",
    },
    {
      id: "2",
      name: "Dr. Fatima Rahman",
      specialization: "Pediatrician",
      qualifications: "MBBS, MD",
      experience: "12 years",
      consultationFee: 600,
      available: "Tomorrow at 10 AM",
      hospital: "Rajshahi Specialized Hospital",
      rating: 4.8,
      reviewCount: 95,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/2",
    },
    {
      id: "3",
      name: "Dr. Mohammed Ali",
      specialization: "Orthopedic",
      qualifications: "MBBS, MS (Ortho)",
      experience: "18 years",
      consultationFee: 1000,
      available: "Today at 6 PM",
      hospital: "Square Hospital Rajshahi",
      rating: 4.9,
      reviewCount: 142,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/3",
    },
    {
      id: "4",
      name: "Dr. Ayesha Siddiqua",
      specialization: "Gynecologist",
      qualifications: "MBBS, FCPS",
      experience: "10 years",
      consultationFee: 700,
      available: "Today at 3 PM",
      hospital: "Islami Bank Medical College",
      rating: 4.7,
      reviewCount: 88,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/4",
    },
    {
      id: "5",
      name: "Dr. Rashid Ahmed",
      specialization: "Cardiologist",
      qualifications: "MBBS, MD",
      experience: "20 years",
      consultationFee: 900,
      available: "Tomorrow at 2 PM",
      hospital: "Rajshahi Medical College Hospital",
      rating: 4.8,
      reviewCount: 156,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/5",
    },
    {
      id: "6",
      name: "Dr. Nusrat Jahan",
      specialization: "Pediatrician",
      qualifications: "MBBS, FCPS",
      experience: "8 years",
      consultationFee: 550,
      available: "Today at 5 PM",
      hospital: "Popular Hospital Rajshahi",
      rating: 4.6,
      reviewCount: 72,
      imageUrl: "/assets/hero-img.jpg",
      href: "/find-doctor/6",
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
    <section className="py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find Trusted Doctors
          </h2>

          <div className="flex items-center gap-3">
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* View All Link */}
            <Link
              href="/find-doctor"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Department Tabs */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => {
                setSelectedDepartment(dept);
                setCurrentPage(0); // Reset to first page when changing department
              }}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                selectedDepartment === dept
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Main Layout: Carousel (Left) + Fixed Ad (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left: Paginated Carousel - 3 cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleItems.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Book trusted doctors online"
              subtitle="Available 24/7 for consultation"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Find Doctor"
              ctaLink="/find-doctor"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopDoctors;

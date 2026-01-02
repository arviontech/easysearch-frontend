"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import PropertyCard from "@/app/(public)/_component/cards/PropertyCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const HOSTELS = [
  {
    id: "1",
    title: "Green Valley Hostel",
    category: "Male",
    price: 8000,
    location: "Shaheb Bazar, Rajshahi",
    features: ["Meals Included", "AC", "Wi-Fi"],
    rating: 4.6,
    reviewCount: 45,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/hostels/1",
  },
  {
    id: "2",
    title: "Student Haven Hostel",
    category: "Female",
    price: 7500,
    location: "Kazla, Rajshahi",
    features: ["3 Meals", "Study Room", "Locker"],
    rating: 4.8,
    reviewCount: 52,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/hostels/2",
  },
  {
    id: "3",
    title: "City Hostel",
    category: "Male",
    price: 6500,
    location: "Motihar, Rajshahi",
    features: ["Shared Room", "Laundry", "Security"],
    rating: 4.4,
    reviewCount: 28,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/hostels/3",
  },
  {
    id: "4",
    title: "Royal Hostel",
    category: "Female",
    price: 9000,
    location: "Uposhohor, Rajshahi",
    features: ["Single Room", "AC", "3 Meals"],
    rating: 4.9,
    reviewCount: 67,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/hostels/4",
  },
];

const PopularHostels = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;
  const totalPages = Math.ceil(HOSTELS.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = HOSTELS.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Popular Hostels for Students"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/for-rent/hostels"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  {visibleItems.map((hostel) => (
                    <PropertyCard key={hostel.id} {...hostel} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Find the perfect hostel for students"
              subtitle="Safe, affordable, and convenient"
              imageUrl="/assets/hero-image.jpg"
              ctaText="View All Hostels"
              ctaLink="/for-rent/hostels"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default PopularHostels;

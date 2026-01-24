"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import TourismCard from "@/app/(public)/_component/cards/TourismCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const DESTINATIONS = [
  {
    id: "1",
    name: "Varendra Research Museum",
    type: "Historical",
    entryFee: 50,
    bestTime: "Morning 9 AM - 5 PM",
    rating: 4.5,
    reviewCount: 234,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/1",
  },
  {
    id: "2",
    name: "Puthia Rajbari",
    type: "Heritage",
    entryFee: 30,
    bestTime: "Winter Season, 8 AM - 6 PM",
    rating: 4.8,
    reviewCount: 412,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/2",
  },
  {
    id: "3",
    name: "Padma River Bank",
    type: "Natural",
    entryFee: 0,
    bestTime: "Sunset Time, 5 PM - 7 PM",
    rating: 4.6,
    reviewCount: 189,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/3",
  },
  {
    id: "4",
    name: "Bagha Mosque",
    type: "Religious",
    entryFee: 20,
    bestTime: "Early Morning, 6 AM - 12 PM",
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/4",
  },
];

const TourismDestinations = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;
  const totalPages = Math.ceil(DESTINATIONS.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = DESTINATIONS.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Explore Rajshahi Tourism"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/tourism"
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
                  {visibleItems.map((destination) => (
                    <TourismCard key={destination.id} {...destination} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Discover Rajshahi's heritage"
              subtitle="Experience history and natural beauty"
              imageUrl="/assets/hero-image.jpg"
              ctaText="Explore Destinations"
              ctaLink="/tourism"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default TourismDestinations;

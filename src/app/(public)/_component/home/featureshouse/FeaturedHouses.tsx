"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import PropertyCard from "@/app/(public)/_component/cards/PropertyCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const HOUSES = [
  {
    id: "1",
    title: "2 Bedroom Family House",
    category: "Family",
    price: 15000,
    location: "Kazla, Rajshahi",
    features: ["2 Beds", "1 Bath", "Furnished"],
    rating: 4.8,
    reviewCount: 24,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/houses/1",
  },
  {
    id: "2",
    title: "Bachelor Apartment",
    category: "Bachelor",
    price: 8000,
    location: "Shaheb Bazar, Rajshahi",
    features: ["1 Bed", "1 Bath", "Wi-Fi"],
    rating: 4.6,
    reviewCount: 18,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/houses/2",
  },
  {
    id: "3",
    title: "3 Bedroom Family House",
    category: "Family",
    price: 20000,
    location: "Uposhohor, Rajshahi",
    features: ["3 Beds", "2 Baths", "Parking"],
    rating: 4.9,
    reviewCount: 32,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/houses/3",
  },
  {
    id: "4",
    title: "Studio Apartment",
    category: "Sublet",
    price: 6000,
    location: "Motihar, Rajshahi",
    features: ["Studio", "1 Bath", "Balcony"],
    rating: 4.5,
    reviewCount: 12,
    imageUrl: "/assets/hero-image.jpg",
    href: "/for-rent/houses/4",
  },
];

const FeaturedHouses = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;
  const totalPages = Math.ceil(HOUSES.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = HOUSES.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Featured Houses in Rajshahi"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/for-rent/houses"
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
                  {visibleItems.map((house) => (
                    <PropertyCard key={house.id} {...house} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Discover great deals on houses"
              subtitle="Find your perfect home today"
              imageUrl="/assets/hero-image.jpg"
              ctaText="Explore Now"
              ctaLink="/for-rent/houses"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default FeaturedHouses;

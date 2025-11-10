"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import TourismCard from "@/components/cards/TourismCard";

const TourismDestinations = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;

  const destinations = [
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

  const totalPages = Math.ceil(destinations.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = destinations.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore Rajshahi Tourism
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
              href="/tourism"
              className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1 transition"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Layout: Carousel (Left) + Fixed Ad (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left: Paginated Carousel - 3 cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
              <AnimatePresence>
                {visibleItems.map((destination, index) => (
                  <motion.div
                    key={`${currentPage}-${destination.id}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TourismCard {...destination} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
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
      </Container>
    </section>
  );
};

export default TourismDestinations;

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import FoodCard from "@/app/(public)/_component/cards/FoodCard";

const LocalFoods = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;

  const foods = [
    {
      id: "1",
      nameBengali: "চমচম",
      nameEnglish: "Chomchom",
      description: "Traditional sweet delicacy famous in Rajshahi",
      famousLocations: 12,
      avgPrice: 120,
      userPhotosCount: 45,
      imageUrl: "/assets/hero-image.jpg",
      href: "/foods/1",
    },
    {
      id: "2",
      nameBengali: "কাচ্চি বিরিয়ানি",
      nameEnglish: "Kacchi Biryani",
      description: "Aromatic rice dish with tender mutton",
      famousLocations: 8,
      avgPrice: 250,
      userPhotosCount: 78,
      imageUrl: "/assets/hero-image.jpg",
      href: "/foods/2",
    },
    {
      id: "3",
      nameBengali: "পান্তা ইলিশ",
      nameEnglish: "Panta Ilish",
      description: "Traditional Bengali breakfast with hilsa fish",
      famousLocations: 5,
      avgPrice: 350,
      userPhotosCount: 34,
      imageUrl: "/assets/hero-image.jpg",
      href: "/foods/3",
    },
    {
      id: "4",
      nameBengali: "রসগোল্লা",
      nameEnglish: "Rosogolla",
      description: "Soft and spongy sweet soaked in sugar syrup",
      famousLocations: 15,
      avgPrice: 80,
      userPhotosCount: 92,
      imageUrl: "/assets/hero-image.jpg",
      href: "/foods/4",
    },
  ];

  const totalPages = Math.ceil(foods.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = foods.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Discover Rajshahi&apos;s Famous Foods
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
              href="/foods"
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
                {visibleItems.map((food, index) => (
                  <motion.div
                    key={`${currentPage}-${food.id}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FoodCard {...food} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Explore authentic local flavors"
              subtitle="Discover where to find the best foods"
              imageUrl="/assets/hero-image.jpg"
              ctaText="Discover Foods"
              ctaLink="/foods"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default LocalFoods;

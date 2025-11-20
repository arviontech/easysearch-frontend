"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import CatererCard from "@/app/(public)/_component/cards/CatererCard";

const CateringServices = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;

  const caterers = [
    {
      id: "1",
      businessName: "Ghor Er Ranna Catering",
      specialty: "Daily Tiffin Service",
      serviceType: "Home-Based",
      mealTypes: ["Lunch", "Dinner"] as ("Breakfast" | "Lunch" | "Dinner")[],
      lunchPrice: 100,
      location: "Shaheb Bazar",
      cuisineStyle: "Bengali Home-style",
      rating: 4.7,
      reviewCount: 143,
      imageUrl: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",
      href: "/catering/1",
    },
    {
      id: "2",
      businessName: "Corporate Meals BD",
      specialty: "Corporate Lunch",
      serviceType: "Restaurant-Based",
      mealTypes: ["Breakfast", "Lunch", "Dinner"] as ("Breakfast" | "Lunch" | "Dinner")[],
      lunchPrice: 120,
      location: "Kazla",
      cuisineStyle: "Multi-cuisine",
      rating: 4.8,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      href: "/catering/2",
    },
    {
      id: "3",
      businessName: "Student Tiffin Service",
      specialty: "Budget Tiffin",
      serviceType: "Cloud Kitchen",
      mealTypes: ["Lunch", "Dinner"] as ("Breakfast" | "Lunch" | "Dinner")[],
      lunchPrice: 70,
      location: "Binodpur",
      cuisineStyle: "Bengali",
      rating: 4.5,
      reviewCount: 178,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      href: "/catering/3",
    },
    {
      id: "4",
      businessName: "Spice Route Kitchen",
      specialty: "Premium Meals",
      serviceType: "Restaurant-Based",
      mealTypes: ["Breakfast", "Lunch", "Dinner"] as ("Breakfast" | "Lunch" | "Dinner")[],
      lunchPrice: 180,
      location: "Motihar",
      cuisineStyle: "Indian",
      rating: 4.9,
      reviewCount: 94,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      href: "/catering/4",
    },
  ];

  const totalPages = Math.ceil(caterers.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = caterers.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Best Catering Services
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
              href="/catering"
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
                {visibleItems.map((caterer, index) => (
                  <motion.div
                    key={`${currentPage}-${caterer.id}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CatererCard {...caterer} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Find the best caterers"
              subtitle="Quality service for all events"
              imageUrl="/assets/hero-image.jpg"
              ctaText="Explore Caterers"
              ctaLink="/catering"
            />
          </div>
        </div>
      </PublicContainer>
    </section>
  );
};

export default CateringServices;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import CatererCard from "@/app/(public)/_component/cards/CatererCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const CATERERS = [
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

const CateringServices = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;
  const totalPages = Math.ceil(CATERERS.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = CATERERS.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Best Catering Services"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/catering"
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
                  {visibleItems.map((caterer) => (
                    <CatererCard key={caterer.id} {...caterer} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

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

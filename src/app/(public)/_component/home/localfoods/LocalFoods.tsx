"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardAd from "@/app/(public)/_component/ads/CardAd";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import FoodCard from "@/app/(public)/_component/cards/FoodCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const FOODS = [
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

const LocalFoods = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;
  const totalPages = Math.ceil(FOODS.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = FOODS.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Discover Rajshahi's Famous Foods"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/foods"
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
                  {visibleItems.map((food) => (
                    <FoodCard key={food.id} {...food} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

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

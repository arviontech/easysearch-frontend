"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import FoodCard from "@/components/cards/FoodCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
    <section className="py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Discover Rajshahi&apos;s Famous Foods
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
              href="/foods"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleItems.map((food) => (
                <FoodCard key={food.id} {...food} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Explore authentic local flavors"
              subtitle="Discover where to find the best foods"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Discover Foods"
              ctaLink="/foods"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LocalFoods;

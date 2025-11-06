"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CatererCard from "@/components/cards/CatererCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

const CateringServices = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;

  const caterers = [
    {
      id: "1",
      businessName: "Royal Caterers",
      specialty: "Bengali Cuisine",
      serviceTypes: ["Wedding", "Corporate", "Events"],
      pricePerPerson: 500,
      location: "Uposhohor, Rajshahi",
      capacity: "50-500 guests",
      rating: 4.7,
      reviewCount: 85,
      imageUrl: "/assets/hero-img.jpg",
      href: "/catering/1",
    },
    {
      id: "2",
      businessName: "Spice Garden Catering",
      specialty: "Multi-Cuisine",
      serviceTypes: ["Wedding", "Birthday", "Corporate"],
      pricePerPerson: 450,
      location: "Kazla, Rajshahi",
      capacity: "30-300 guests",
      rating: 4.6,
      reviewCount: 72,
      imageUrl: "/assets/hero-img.jpg",
      href: "/catering/2",
    },
    {
      id: "3",
      businessName: "Heritage Caterers",
      specialty: "Traditional Bengali",
      serviceTypes: ["Wedding", "Holud", "Reception"],
      pricePerPerson: 600,
      location: "Shaheb Bazar, Rajshahi",
      capacity: "100-1000 guests",
      rating: 4.9,
      reviewCount: 124,
      imageUrl: "/assets/hero-img.jpg",
      href: "/catering/3",
    },
    {
      id: "4",
      businessName: "City Feast Catering",
      specialty: "Modern Fusion",
      serviceTypes: ["Corporate", "Birthday", "Events"],
      pricePerPerson: 550,
      location: "Motihar, Rajshahi",
      capacity: "20-200 guests",
      rating: 4.5,
      reviewCount: 58,
      imageUrl: "/assets/hero-img.jpg",
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
    <section className="py-12 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Best Catering Services
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
              href="/catering"
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
              {visibleItems.map((caterer) => (
                <CatererCard key={caterer.id} {...caterer} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Find the best caterers"
              subtitle="Quality service for all events"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Explore Caterers"
              ctaLink="/catering"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CateringServices;

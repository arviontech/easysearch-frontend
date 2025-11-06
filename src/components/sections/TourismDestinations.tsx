"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import TourismCard from "@/components/cards/TourismCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
      imageUrl: "/assets/hero-img.jpg",
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
    <section className="py-12 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore Rajshahi Tourism
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
              href="/tourism"
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
              {visibleItems.map((destination) => (
                <TourismCard key={destination.id} {...destination} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Discover Rajshahi's heritage"
              subtitle="Experience history and natural beauty"
              imageUrl="/assets/hero-img.jpg"
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

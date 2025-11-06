"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

const FeaturedHouses = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  const houses = [
    {
      id: "1",
      title: "2 Bedroom Family House",
      category: "Family",
      price: 15000,
      location: "Kazla, Rajshahi",
      features: ["2 Beds", "1 Bath", "Furnished"],
      rating: 4.8,
      reviewCount: 24,
      imageUrl: "/assets/hero-img.jpg",
      href: "/house-rent/1",
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
      imageUrl: "/assets/hero-img.jpg",
      href: "/house-rent/2",
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
      imageUrl: "/assets/hero-img.jpg",
      href: "/house-rent/3",
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
      imageUrl: "/assets/hero-img.jpg",
      href: "/house-rent/4",
    },
  ];

  const cardsToShow = 3; // Show 3 cards at a time in the carousel
  const totalPages = Math.ceil(houses.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = houses.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Houses in Rajshahi
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
              href="/house-rent"
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
              {visibleItems.map((house) => (
                <PropertyCard key={house.id} {...house} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Discover great deals on houses"
              subtitle="Find your perfect home today"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Explore Now"
              ctaLink="/house-rent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedHouses;

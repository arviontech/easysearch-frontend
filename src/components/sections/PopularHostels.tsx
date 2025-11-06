"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import CardAd from "@/components/ads/CardAd";
import Container from "@/components/Container";
import Link from "next/link";

const PopularHostels = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 3;

  const hostels = [
    {
      id: "1",
      title: "Green Valley Hostel",
      category: "Male",
      price: 8000,
      location: "Shaheb Bazar, Rajshahi",
      features: ["Meals Included", "AC", "Wi-Fi"],
      rating: 4.6,
      reviewCount: 45,
      imageUrl: "/assets/hero-img.jpg",
      href: "/hostel-rent/1",
    },
    {
      id: "2",
      title: "Student Haven Hostel",
      category: "Female",
      price: 7500,
      location: "Kazla, Rajshahi",
      features: ["3 Meals", "Study Room", "Locker"],
      rating: 4.8,
      reviewCount: 52,
      imageUrl: "/assets/hero-img.jpg",
      href: "/hostel-rent/2",
    },
    {
      id: "3",
      title: "City Hostel",
      category: "Male",
      price: 6500,
      location: "Motihar, Rajshahi",
      features: ["Shared Room", "Laundry", "Security"],
      rating: 4.4,
      reviewCount: 28,
      imageUrl: "/assets/hero-img.jpg",
      href: "/hostel-rent/3",
    },
    {
      id: "4",
      title: "Royal Hostel",
      category: "Female",
      price: 9000,
      location: "Uposhohor, Rajshahi",
      features: ["Single Room", "AC", "3 Meals"],
      rating: 4.9,
      reviewCount: 67,
      imageUrl: "/assets/hero-img.jpg",
      href: "/hostel-rent/4",
    },
  ];

  const totalPages = Math.ceil(hostels.length / cardsToShow);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentPage * cardsToShow;
  const visibleItems = hostels.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Hostels for Students
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
              href="/hostel-rent"
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
              {visibleItems.map((hostel) => (
                <PropertyCard key={hostel.id} {...hostel} />
              ))}
            </div>
          </div>

          {/* Right: Fixed Ad Card */}
          <div className="lg:col-span-1 h-full min-h-[380px]">
            <CardAd
              title="Find the perfect hostel for students"
              subtitle="Safe, affordable, and convenient"
              imageUrl="/assets/hero-img.jpg"
              ctaText="View All Hostels"
              ctaLink="/hostel-rent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PopularHostels;

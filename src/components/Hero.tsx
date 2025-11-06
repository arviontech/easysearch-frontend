"use client";

import { Search, Home, Building2, Stethoscope, UtensilsCrossed, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState("House");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const categories = [
    { value: "House", label: "House Rent", icon: Home },
    { value: "Hostel", label: "Hostel Rent", icon: Building2 },
    { value: "Doctor", label: "Find Doctor", icon: Stethoscope },
    { value: "Catering", label: "Catering", icon: UtensilsCrossed },
    { value: "Tourism", label: "Tourism", icon: MapPin },
    { value: "Foods", label: "Foods", icon: UtensilsCrossed },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", { selectedCategory, location, priceRange });
    // TODO: Implement search functionality
  };

  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-img.jpg"
          alt="Rajshahi City"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-3">
            Discover Rajshahi&apos;s Local Services
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl font-medium drop-shadow-md">
            Housing, Healthcare, Catering, Tourism & More
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="w-full max-w-4xl px-4">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden">
              {/* Category Dropdown */}
              <div className="relative px-6 py-4 border-r border-gray-300">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Category
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-sm text-gray-700 outline-none bg-transparent cursor-pointer font-medium pr-2"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="flex-1 px-6 py-4 border-r border-gray-300">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Location
                </div>
                <input
                  type="text"
                  placeholder="Kazla, Shaheb Bazar, Uposhohor..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>

              {/* Price Range */}
              <div className="flex-1 px-6 py-4 border-r border-gray-300">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Price Range
                </div>
                <input
                  type="text"
                  placeholder="Any budget"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>

              {/* Advanced Filters */}
              <div className="hidden lg:block px-4 py-4">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                >
                  More filters
                </button>
              </div>

              {/* Search Button */}
              <div className="pr-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

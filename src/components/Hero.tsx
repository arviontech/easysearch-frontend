"use client";

import {
  Building2,
  Home,
  MapPin,
  Search,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/slices/uiSlice";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState("House");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const categories = [
    { value: "House", label: "House Rent", icon: Home },
    { value: "Hostel", label: "Hostel Rent", icon: Building2 },
    { value: "Doctor", label: "Find Doctor", icon: Stethoscope },
    { value: "Jobs", label: "Find Jobs", icon: Building2 },
    { value: "Catering", label: "Catering", icon: UtensilsCrossed },
    { value: "Tourism", label: "Tourism", icon: MapPin },
    { value: "Foods", label: "Foods", icon: UtensilsCrossed },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!location.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please enter a location to search",
        }),
      );
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      category: selectedCategory,
      location: location.trim(),
      priceRange: priceRange.trim(),
    };

    // Navigate to search results
    const searchParams = new URLSearchParams(sanitizedData);
    router.push(`/search?${searchParams.toString()}`);

    dispatch(
      addNotification({
        type: "success",
        message: `Searching for ${selectedCategory} in ${sanitizedData.location}`,
      }),
    );
  };

  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-image.jpg"
          alt="Rajshahi City scenic view showcasing local landmarks and vibrant community"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
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
        <div className="w-full max-w-3xl px-4">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-cyan-50 backdrop-blur-md rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_6px_12px_rgba(0,0,0,0.25)] overflow-hidden border border-white/40">
              {/* Category Dropdown */}
              <div className="relative px-6 py-4 border-r border-white/30">
                <label
                  htmlFor="search-category"
                  className="text-xs font-semibold text-gray-900 mb-1 block"
                >
                  Category
                </label>
                <select
                  id="search-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Select service category"
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
              <div className="flex-1 px-6 py-4 border-r border-white/30">
                <label
                  htmlFor="search-location"
                  className="text-xs font-semibold text-gray-900 mb-1 block"
                >
                  Location
                </label>
                <input
                  id="search-location"
                  type="text"
                  placeholder="Kazla, Shaheb Bazar, Uposhohor..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Enter location"
                  required
                  className="w-full text-sm text-gray-600 placeholder-gray-600 outline-none bg-transparent"
                />
              </div>

              {/* Price Range */}
              <div className="flex-1 px-6 py-4">
                <label
                  htmlFor="search-price"
                  className="text-xs font-semibold text-gray-900 mb-1 block"
                >
                  Price Range
                </label>
                <input
                  id="search-price"
                  type="text"
                  placeholder="Any budget"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  aria-label="Enter price range"
                  className="w-full text-sm text-gray-600 placeholder-gray-600 outline-none bg-transparent"
                />
              </div>

              {/* Search Button */}
              <div className="pr-2">
                <motion.button
                  type="submit"
                  aria-label="Search"
                  className="bg-cyan-100 border border-cyan-600 p-4 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
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
                    <Search className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  UtensilsCrossed,
  Camera,
  X,
} from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import FoodCard from "@/app/(public)/_component/cards/FoodCard";

// Mock data - Replace with API call
const mockFoods = [
  {
    id: "1",
    nameBengali: "চমচম",
    nameEnglish: "Chomchom",
    description: "Famous sweet delicacy of Rajshahi, soft and syrupy",
    famousLocations: 12,
    avgPrice: 80,
    userPhotosCount: 145,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/1",
    category: "Sweets",
    location: "Shaheb Bazar",
    area: "Shaheb Bazar",
  },
  {
    id: "2",
    nameBengali: "কাঁচা আম",
    nameEnglish: "Green Mango",
    description: "Fresh green mangoes from local orchards",
    famousLocations: 8,
    avgPrice: 120,
    userPhotosCount: 89,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/2",
    category: "Fruits",
    location: "Kazla",
    area: "Kazla Gate",
  },
  {
    id: "3",
    nameBengali: "মিষ্টি দই",
    nameEnglish: "Sweet Yogurt",
    description: "Traditional sweet yogurt served in clay pots",
    famousLocations: 15,
    avgPrice: 60,
    userPhotosCount: 203,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/3",
    category: "Sweets",
    location: "Boalia",
    area: "Boalia Bazar",
  },
  {
    id: "4",
    nameBengali: "ফুচকা",
    nameEnglish: "Fuchka",
    description: "Crispy puffed balls filled with spicy tamarind water",
    famousLocations: 20,
    avgPrice: 30,
    userPhotosCount: 312,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/4",
    category: "Street Food",
    location: "Shaheb Bazar",
    area: "Station Road",
  },
  {
    id: "5",
    nameBengali: "ঝালমুড়ি",
    nameEnglish: "Jhal Muri",
    description: "Spicy puffed rice mix with vegetables and mustard oil",
    famousLocations: 18,
    avgPrice: 20,
    userPhotosCount: 178,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/5",
    category: "Snacks",
    location: "Motihar",
    area: "Motihar Circle",
  },
  {
    id: "6",
    nameBengali: "লিচু",
    nameEnglish: "Litchi",
    description: "Fresh sweet litchis from Rajshahi orchards",
    famousLocations: 10,
    avgPrice: 150,
    userPhotosCount: 95,
    imageUrl: "/assets/hero-image.jpg",
    href: "/foods/6",
    category: "Fruits",
    location: "Talaimari",
    area: "Talaimari Bazar",
  },
];

const FoodsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    category: [] as string[],
    location: "",
    area: [] as string[],
    priceRange: [0, 500],
  });

  const locations = [
    "Shaheb Bazar",
    "Kazla",
    "Boalia",
    "Motihar",
    "Rajpara",
    "Talaimari",
    "Uposhohor",
  ];

  const areas = [
    "Station Road",
    "Shaheb Bazar",
    "Kazla Gate",
    "Boalia Bazar",
    "Motihar Circle",
    "Talaimari Bazar",
    "Rajpara Main",
    "Uposhohor",
  ];

  const categories = [
    "Sweets",
    "Snacks",
    "Fruits",
    "Street Food",
    "Beverages",
    "Traditional",
  ];

  const popularKeywords = [
    { label: "Famous Chomchom", filter: { category: ["Sweets"] } },
    { label: "Fresh Mangoes", filter: { category: ["Fruits"] } },
    { label: "Street Snacks", filter: { category: ["Street Food"] } },
    { label: "Traditional Sweets", filter: { category: ["Traditional"] } },
    { label: "Shaheb Bazar Foods", filter: { location: "Shaheb Bazar" } },
    { label: "Budget Friendly (Under ৳100)", filter: { priceRange: [0, 100] } },
    { label: "Premium Foods (৳200+)", filter: { priceRange: [200, 500] } },
    { label: "Most Photographed", filter: {} },
  ];

  const handleKeywordClick = (keywordFilter: any) => {
    setFilters({ ...filters, ...keywordFilter });
  };

  const clearFilter = (filterKey: string, value?: string) => {
    if (value && Array.isArray(filters[filterKey as keyof typeof filters])) {
      setFilters({
        ...filters,
        [filterKey]: (filters[filterKey as keyof typeof filters] as string[]).filter(
          (item) => item !== value
        ),
      });
    } else {
      setFilters({
        ...filters,
        [filterKey]: filterKey === "category" || filterKey === "area" ? [] : "",
      });
    }
  };

  // Filter foods based on all criteria
  const filteredFoods = mockFoods.filter((food) => {
    const matchesSearch =
      searchQuery === "" ||
      food.nameBengali.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(food.category);

    const matchesLocation = !filters.location || food.location === filters.location;

    const matchesArea =
      filters.area.length === 0 || filters.area.includes(food.area);

    const matchesPrice =
      food.avgPrice >= filters.priceRange[0] &&
      food.avgPrice <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesArea && matchesPrice;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filters, searchQuery, currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 pt-24 pb-16">
      <PublicContainer>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="w-10 h-10 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Popular Foods in Rajshahi
            </h1>
          </div>
          <p className="text-gray-600">
            Discover the best local foods and where to find them - {mockFoods.length}+ featured items
          </p>
        </div>

        {/* Popular Keywords Tabs - Infinite Scroll */}
        <div className="mb-6 overflow-hidden relative">
          <div className="flex items-center gap-3 pb-2 animate-infinite-scroll hover:[animation-play-state:paused]">
            {/* First set */}
            {popularKeywords.map((keyword, index) => (
              <button
                key={`first-${index}`}
                onClick={() => handleKeywordClick(keyword.filter)}
                className="shrink-0 px-4 py-2 bg-white border border-cyan-200 text-gray-700 rounded-full text-sm font-medium hover:bg-cyan-50 hover:border-cyan-400 hover:text-cyan-700 transition whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_2px_6px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(255,255,255,0.5)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_3px_8px_rgba(0,0,0,0.2),inset_0_-2px_6px_rgba(255,255,255,0.6)] active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.25),inset_0_-2px_4px_rgba(255,255,255,0.4)]"
              >
                {keyword.label}
              </button>
            ))}
            {/* Duplicate set for seamless loop */}
            {popularKeywords.map((keyword, index) => (
              <button
                key={`second-${index}`}
                onClick={() => handleKeywordClick(keyword.filter)}
                className="shrink-0 px-4 py-2 bg-white border border-cyan-200 text-gray-700 rounded-full text-sm font-medium hover:bg-cyan-50 hover:border-cyan-400 hover:text-cyan-700 transition whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_2px_6px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(255,255,255,0.5)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_3px_8px_rgba(0,0,0,0.2),inset_0_-2px_6px_rgba(255,255,255,0.6)] active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.25),inset_0_-2px_4px_rgba(255,255,255,0.4)]"
              >
                {keyword.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by food name (Bengali or English)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cyan-200 rounded-xl hover:bg-cyan-50 transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-cyan-600" />
            <span className="font-medium text-gray-700">Filters</span>
            {(filters.category.length > 0 || filters.location || filters.area.length > 0) && (
              <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {filters.category.length + (filters.location ? 1 : 0) + filters.area.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-2xl border border-cyan-200 p-6 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(255,255,255,0.5)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() =>
                    setFilters({
                      category: [],
                      location: "",
                      area: [],
                      priceRange: [0, 500],
                    })
                  }
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Food Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 3).map((category) => {
                      const isSelected = filters.category.includes(category);
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            const newCategories = isSelected
                              ? filters.category.filter((c) => c !== category)
                              : [...filters.category, category];
                            setFilters({ ...filters, category: newCategories });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* More Categories */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    More
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(3).map((category) => {
                      const isSelected = filters.category.includes(category);
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            const newCategories = isSelected
                              ? filters.category.filter((c) => c !== category)
                              : [...filters.category, category];
                            setFilters({ ...filters, category: newCategories });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range (BDT)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [0, parseInt(e.target.value)],
                        })
                      }
                      className="w-full accent-cyan-600"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>৳0</span>
                      <span className="font-semibold text-cyan-600">
                        ৳{filters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row - Area Filter */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Area
                </label>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => {
                    const isSelected = filters.area.includes(area);
                    return (
                      <button
                        key={area}
                        onClick={() => {
                          const newAreas = isSelected
                            ? filters.area.filter((a) => a !== area)
                            : [...filters.area, area];
                          setFilters({ ...filters, area: newAreas });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Pills */}
        {(filters.location || filters.category.length > 0 || filters.area.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600 font-medium">
              Active Filters:
            </span>
            {filters.location && (
              <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {filters.location}
                <button
                  onClick={() => clearFilter("location")}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category.map((category) => (
              <span
                key={category}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                {category}
                <button
                  onClick={() => clearFilter("category", category)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.area.map((area) => (
              <span
                key={area}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <MapPin className="w-3.5 h-3.5" />
                {area}
                <button
                  onClick={() => clearFilter("area", area)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredFoods.length)} of {filteredFoods.length}{" "}
            {filteredFoods.length === 1 ? "food item" : "food items"}
          </h2>
        </div>

        {/* Food Grid */}
        {paginatedFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedFoods.map((food) => (
              <FoodCard key={food.id} {...food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No food items found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredFoods.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition ${currentPage === page
                    ? "bg-cyan-600 text-white"
                    : "border border-cyan-200 hover:bg-cyan-50"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </PublicContainer>
    </div>
  );
};

export default FoodsPage;

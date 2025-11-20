"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  BedDouble,
  Bath,
  Home,
  X,
  Users,
  User,
  UserCircle,
} from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import PropertyCard from "@/app/(public)/_component/cards/PropertyCard";
import { useTranslation } from "@/hooks/useTranslation";

// Mock data - Replace with API call
const mockHouses = [
  {
    id: "1",
    title: "Modern 3 Bedroom Apartment",
    location: "Shaheb Bazar, Rajshahi",
    price: 15000,
    image: "/assets/hero-image.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    furnished: true,
    available: true,
  },
  {
    id: "2",
    title: "Spacious Family House",
    location: "Kazla, Rajshahi",
    price: 25000,
    image: "/assets/hero-image.jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    type: "House",
    furnished: false,
    available: true,
  },
  // Add more mock data as needed
];

const HousesPage = () => {
  const t = useTranslation();
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    bedrooms: "",
    bathrooms: "",
    categories: [] as string[], // Multi-select: Family, Bachelor (Male), Bachelor (Female), Sublet
    furnishing: "",
    location: "",
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

  const popularKeywords = [
    { label: "Houses in Shaheb Bazar", filter: { location: "Shaheb Bazar" } },
    { label: "Houses in Kazla", filter: { location: "Kazla" } },
    { label: "Houses in Boalia", filter: { location: "Boalia" } },
    { label: "3 Bedroom Apartments", filter: { bedrooms: "3" } },
    { label: "Furnished Houses", filter: { furnishing: "Furnished" } },
    { label: "Family Houses", filter: { houseType: "House" } },
    { label: "Budget Friendly (Under ৳15k)", filter: { priceRange: [0, 15000] } },
    { label: "Luxury Houses (৳25k+)", filter: { priceRange: [25000, 50000] } },
  ];

  const handleKeywordClick = (keywordFilter: any) => {
    setFilters({ ...filters, ...keywordFilter });
  };

  // Filter houses based on criteria
  const filteredHouses = mockHouses.filter((house) => {
    const matchesSearch =
      searchQuery === "" ||
      house.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !filters.location || house.location.includes(filters.location);

    const matchesPrice =
      house.price >= filters.priceRange[0] && house.price <= filters.priceRange[1];

    const matchesBedrooms = !filters.bedrooms || house.bedrooms === parseInt(filters.bedrooms);

    const matchesBathrooms = !filters.bathrooms || house.bathrooms === parseInt(filters.bathrooms);

    const matchesFurnishing = !filters.furnishing ||
      (filters.furnishing === "Furnished" && house.furnished) ||
      (filters.furnishing === "Unfurnished" && !house.furnished);

    return matchesSearch && matchesLocation && matchesPrice && matchesBedrooms && matchesBathrooms && matchesFurnishing;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHouses = filteredHouses.slice(startIndex, endIndex);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Houses for Rent in Rajshahi
          </h1>
          <p className="text-gray-600">
            Find your perfect home from {mockHouses.length}+ available properties
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
              placeholder="Search by location, area, or keywords..."
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
            {(filters.location || filters.bedrooms || filters.bathrooms || filters.categories.length > 0 || filters.furnishing) && (
              <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {(filters.location ? 1 : 0) + (filters.bedrooms ? 1 : 0) + (filters.bathrooms ? 1 : 0) + filters.categories.length + (filters.furnishing ? 1 : 0)}
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
                      priceRange: [0, 50000],
                      bedrooms: "",
                      bathrooms: "",
                      categories: [],
                      furnishing: "",
                      location: "",
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

                {/* Category Filter (Multi-select pills) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "Family", icon: Users },
                      { value: "Bachelor", icon: User },
                      { value: "Sublet", icon: Home },
                    ].map((category) => {
                      const Icon = category.icon;
                      const isSelected = filters.categories.includes(category.value);
                      return (
                        <button
                          key={category.value}
                          onClick={() => {
                            const newCategories = isSelected
                              ? filters.categories.filter((c) => c !== category.value)
                              : [...filters.categories, category.value];
                            setFilters({ ...filters, categories: newCategories });
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{category.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map((bed) => (
                      <button
                        key={bed}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            bedrooms: filters.bedrooms === bed ? "" : bed,
                          })
                        }
                        className={`py-1.5 rounded-lg text-sm font-medium transition ${filters.bedrooms === bed
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                      >
                        {bed}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range & Furnishing */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range (BDT)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
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
                        ৳{filters.priceRange[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Row for Bathrooms and Furnishing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bathrooms
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map((bath) => (
                      <button
                        key={bath}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            bathrooms: filters.bathrooms === bath ? "" : bath,
                          })
                        }
                        className={`py-1.5 rounded-lg text-sm font-medium transition ${filters.bathrooms === bath
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                      >
                        {bath}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Furnishing
                  </label>
                  <select
                    value={filters.furnishing}
                    onChange={(e) =>
                      setFilters({ ...filters, furnishing: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">All Types</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content - Property Grid/List */}
        <div className="w-full">
          {/* Active Filters Pills */}
          {(filters.location ||
            filters.bedrooms ||
            filters.bathrooms ||
            filters.categories.length > 0 ||
            filters.furnishing) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-600 font-medium">
                  Active Filters:
                </span>
                {filters.location && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {filters.location}
                    <button
                      onClick={() => setFilters({ ...filters, location: "" })}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.categories.map((category) => (
                  <span
                    key={category}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    {category === "Family" && <Users className="w-3.5 h-3.5" />}
                    {category === "Bachelor (Male)" && <User className="w-3.5 h-3.5" />}
                    {category === "Bachelor (Female)" && <UserCircle className="w-3.5 h-3.5" />}
                    {category === "Sublet" && <Home className="w-3.5 h-3.5" />}
                    {category}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter((c) => c !== category),
                        })
                      }
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.bedrooms && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    <BedDouble className="w-3.5 h-3.5" />
                    {filters.bedrooms} Bedrooms
                    <button
                      onClick={() => setFilters({ ...filters, bedrooms: "" })}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.bathrooms && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    <Bath className="w-3.5 h-3.5" />
                    {filters.bathrooms} Bathrooms
                    <button
                      onClick={() => setFilters({ ...filters, bathrooms: "" })}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.furnishing && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    {filters.furnishing}
                    <button
                      onClick={() => setFilters({ ...filters, furnishing: "" })}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedHouses.map((house) => (
              <PropertyCard
                key={house.id}
                {...house}
              />
            ))}
          </div>

          {/* Pagination */}
          {filteredHouses.length > 0 && totalPages > 1 && (
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
        </div>
      </PublicContainer>
    </div>
  );
};

export default HousesPage;

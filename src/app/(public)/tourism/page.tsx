"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Compass,
  Star,
  Tag,
  Clock,
  X,
} from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import TourismCard from "@/app/(public)/_component/cards/TourismCard";

// Mock data - Replace with API call
const mockPlaces = [
  {
    id: "1",
    name: "Varendra Research Museum",
    type: "Historical",
    entryFee: 20,
    bestTime: "October to March",
    rating: 4.7,
    reviewCount: 234,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/1",
    location: "Shaheb Bazar",
  },
  {
    id: "2",
    name: "Puthia Rajbari",
    type: "Historical",
    entryFee: 50,
    bestTime: "November to February",
    rating: 4.9,
    reviewCount: 458,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/2",
    location: "Puthia",
  },
  {
    id: "3",
    name: "Padma Garden",
    type: "Natural",
    entryFee: 10,
    bestTime: "Year Round",
    rating: 4.5,
    reviewCount: 167,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/3",
    location: "Kazla",
  },
  {
    id: "4",
    name: "Bagha Mosque",
    type: "Religious",
    entryFee: 0,
    bestTime: "Year Round",
    rating: 4.8,
    reviewCount: 312,
    imageUrl: "/assets/hero-image.jpg",
    href: "/tourism/4",
    location: "Bagha",
  },
];

const TourismPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    placeType: [] as string[],
    location: "",
    entryFee: "all" as string,
    bestTime: [] as string[],
  });

  const locations = [
    "Shaheb Bazar",
    "Kazla",
    "Puthia",
    "Bagha",
    "Boalia",
    "Motihar",
    "Rajpara",
  ];

  const placeTypes = ["Historical", "Religious", "Natural", "Cultural", "Modern"];

  const bestTimeOptions = [
    "Year Round",
    "October to March",
    "November to February",
    "December to January",
    "Monsoon Season",
  ];

  const popularKeywords = [
    { label: "Historical Sites", filter: { placeType: ["Historical"] } },
    { label: "Religious Places", filter: { placeType: ["Religious"] } },
    { label: "Natural Beauty", filter: { placeType: ["Natural"] } },
    { label: "Free Entry", filter: { entryFee: "free" } },
    { label: "Winter Destinations", filter: { bestTime: ["November to February"] } },
    { label: "Year Round", filter: { bestTime: ["Year Round"] } },
    { label: "Puthia Heritage", filter: { location: "Puthia" } },
    { label: "City Attractions", filter: { location: "Shaheb Bazar" } },
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
        [filterKey]:
          filterKey === "placeType" || filterKey === "bestTime" ? [] : "",
      });
    }
  };

  // Filter places based on all criteria
  const filteredPlaces = mockPlaces.filter((place) => {
    const matchesSearch =
      searchQuery === "" ||
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filters.placeType.length === 0 || filters.placeType.includes(place.type);

    const matchesLocation = !filters.location || place.location === filters.location;

    const matchesEntryFee =
      filters.entryFee === "all" ||
      (filters.entryFee === "free" && place.entryFee === 0) ||
      (filters.entryFee === "paid" && place.entryFee > 0);

    const matchesBestTime =
      filters.bestTime.length === 0 || filters.bestTime.includes(place.bestTime);

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesEntryFee &&
      matchesBestTime
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlaces = filteredPlaces.slice(startIndex, endIndex);

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
            <Compass className="w-10 h-10 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Tourism & Places in Rajshahi
            </h1>
          </div>
          <p className="text-gray-600">
            Explore the best tourist destinations and heritage sites - {mockPlaces.length}+ featured places
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
              placeholder="Search by place name, type, or location..."
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
            {(filters.placeType.length > 0 ||
              filters.location ||
              filters.entryFee !== "all" ||
              filters.bestTime.length > 0) && (
                <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {filters.placeType.length +
                    (filters.location ? 1 : 0) +
                    (filters.entryFee !== "all" ? 1 : 0) +
                    filters.bestTime.length}
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
                      placeType: [],
                      location: "",
                      entryFee: "all",
                      bestTime: [],
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

                {/* Place Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Place Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {placeTypes.slice(0, 3).map((type) => {
                      const isSelected = filters.placeType.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            const newTypes = isSelected
                              ? filters.placeType.filter((t) => t !== type)
                              : [...filters.placeType, type];
                            setFilters({ ...filters, placeType: newTypes });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Entry Fee Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Entry Fee
                  </label>
                  <select
                    value={filters.entryFee}
                    onChange={(e) =>
                      setFilters({ ...filters, entryFee: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                  >
                    <option value="all">All Places</option>
                    <option value="free">Free Entry</option>
                    <option value="paid">Paid Entry</option>
                  </select>
                </div>

                {/* Best Time Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Best Time to Visit
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {bestTimeOptions.slice(0, 2).map((time) => {
                      const isSelected = filters.bestTime.includes(time);
                      const displayTime = time.length > 12 ? time.substring(0, 12) + "..." : time;
                      return (
                        <button
                          key={time}
                          onClick={() => {
                            const newTimes = isSelected
                              ? filters.bestTime.filter((t) => t !== time)
                              : [...filters.bestTime, time];
                            setFilters({ ...filters, bestTime: newTimes });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                          title={time}
                        >
                          {displayTime}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Second Row for More Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    More Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {placeTypes.slice(3).map((type) => {
                      const isSelected = filters.placeType.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            const newTypes = isSelected
                              ? filters.placeType.filter((t) => t !== type)
                              : [...filters.placeType, type];
                            setFilters({ ...filters, placeType: newTypes });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Pills */}
        {(filters.location ||
          filters.placeType.length > 0 ||
          filters.entryFee !== "all" ||
          filters.bestTime.length > 0) && (
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
              {filters.placeType.map((type) => (
                <span
                  key={type}
                  className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                >
                  <Compass className="w-3.5 h-3.5" />
                  {type}
                  <button
                    onClick={() => clearFilter("placeType", type)}
                    className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.entryFee !== "all" && (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  {filters.entryFee === "free" ? "Free Entry" : "Paid Entry"}
                  <button
                    onClick={() => setFilters({ ...filters, entryFee: "all" })}
                    className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.bestTime.map((time) => (
                <span
                  key={time}
                  className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                >
                  <Clock className="w-3.5 h-3.5" />
                  {time}
                  <button
                    onClick={() => clearFilter("bestTime", time)}
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPlaces.length)} of {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1 ? "place" : "places"}
          </h2>
        </div>

        {/* Places Grid */}
        {paginatedPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedPlaces.map((place) => (
              <TourismCard key={place.id} {...place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No places found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredPlaces.length > 0 && totalPages > 1 && (
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

export default TourismPage;

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Users,
  User,
  UserCircle,
  X,
  UtensilsCrossed,
  Bed,
} from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import PropertyCard from "@/app/(public)/_component/cards/PropertyCard";
import { mockHostels } from "@/data/mockHostels";

const HostelsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    priceRange: [0, 15000],
    gender: [] as string[], // Male, Female
    tenantType: [] as string[], // Student, Job Holder
    mealOptions: [] as string[], // Included, Not Included, Optional
    roomType: [] as string[], // Single, Shared (2-person), Shared (3-4 person)
    facilities: [] as string[], // AC, Study Table, Locker, Laundry
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
    { label: "Hostels in Shaheb Bazar", filter: { location: "Shaheb Bazar" } },
    { label: "Hostels in Kazla", filter: { location: "Kazla" } },
    { label: "Male Hostels", filter: { gender: ["Male"] } },
    { label: "Female Hostels", filter: { gender: ["Female"] } },
    { label: "Student Hostels", filter: { tenantType: ["Student"] } },
    { label: "Meals Included", filter: { mealOptions: ["Included"] } },
    { label: "AC Hostels", filter: { facilities: ["AC"] } },
    { label: "Budget Friendly (Under ৳5k)", filter: { priceRange: [0, 5000] } },
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
      setFilters({ ...filters, [filterKey]: "" });
    }
  };

  // Filter hostels based on criteria
  const filteredHostels = mockHostels.filter((hostel) => {
    const matchesSearch =
      searchQuery === "" ||
      hostel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.location.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !filters.location || hostel.location.area === filters.location;

    const matchesPrice =
      hostel.price >= filters.priceRange[0] && hostel.price <= filters.priceRange[1];

    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(hostel.gender);

    const matchesTenantType =
      filters.tenantType.length === 0 ||
      filters.tenantType.includes(hostel.tenantType) ||
      hostel.tenantType === "Both";

    const matchesMealOptions =
      filters.mealOptions.length === 0 || filters.mealOptions.includes(hostel.mealOptions);

    const matchesRoomType =
      filters.roomType.length === 0 || filters.roomType.includes(hostel.roomType);

    const matchesFacilities =
      filters.facilities.length === 0 ||
      filters.facilities.every((facility) =>
        hostel.facilities.some((f) => f.includes(facility))
      );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice &&
      matchesGender &&
      matchesTenantType &&
      matchesMealOptions &&
      matchesRoomType &&
      matchesFacilities
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredHostels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHostels = filteredHostels.slice(startIndex, endIndex);

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
            Hostels for Rent in Rajshahi
          </h1>
          <p className="text-gray-600">
            Find your perfect hostel from {mockHostels.length}+ available options
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
            {(filters.location || filters.gender.length > 0 || filters.tenantType.length > 0 || filters.mealOptions.length > 0 || filters.roomType.length > 0 || filters.facilities.length > 0) && (
              <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {(filters.location ? 1 : 0) + filters.gender.length + filters.tenantType.length + filters.mealOptions.length + filters.roomType.length + filters.facilities.length}
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
                      priceRange: [0, 15000],
                      gender: [],
                      tenantType: [],
                      mealOptions: [],
                      roomType: [],
                      facilities: [],
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

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gender
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "Male", icon: User },
                      { value: "Female", icon: UserCircle },
                    ].map((gender) => {
                      const Icon = gender.icon;
                      const isSelected = filters.gender.includes(gender.value);
                      return (
                        <button
                          key={gender.value}
                          onClick={() => {
                            const newGender = isSelected
                              ? filters.gender.filter((g) => g !== gender.value)
                              : [...filters.gender, gender.value];
                            setFilters({ ...filters, gender: newGender });
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{gender.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tenant Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tenant Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Student", "Job Holder"].map((type) => {
                      const isSelected = filters.tenantType.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            const newTypes = isSelected
                              ? filters.tenantType.filter((t) => t !== type)
                              : [...filters.tenantType, type];
                            setFilters({ ...filters, tenantType: newTypes });
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{type}</span>
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
                      max="15000"
                      step="500"
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

              {/* Second Row for Meal, Room Type, and Facilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* Meal Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Meal Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Included", "Not Included", "Optional"].map((meal) => {
                      const isSelected = filters.mealOptions.includes(meal);
                      return (
                        <button
                          key={meal}
                          onClick={() => {
                            const newMeals = isSelected
                              ? filters.mealOptions.filter((m) => m !== meal)
                              : [...filters.mealOptions, meal];
                            setFilters({ ...filters, mealOptions: newMeals });
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5" />
                          <span>{meal}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Room Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Single", "Shared 2", "Shared 3-4"].map(
                      (room) => {
                        const fullRoom = room === "Shared 2" ? "Shared (2-person)" : room === "Shared 3-4" ? "Shared (3-4 person)" : room;
                        const isSelected = filters.roomType.includes(fullRoom);
                        return (
                          <button
                            key={room}
                            onClick={() => {
                              const newRooms = isSelected
                                ? filters.roomType.filter((r) => r !== fullRoom)
                                : [...filters.roomType, fullRoom];
                              setFilters({ ...filters, roomType: newRooms });
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                              ? "bg-cyan-600 text-white"
                              : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                              }`}
                          >
                            <Bed className="w-3.5 h-3.5" />
                            <span>{room}</span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Facilities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["AC", "Study Table", "Locker", "Laundry"].map((facility) => {
                      const isSelected = filters.facilities.includes(facility);
                      return (
                        <button
                          key={facility}
                          onClick={() => {
                            const newFacilities = isSelected
                              ? filters.facilities.filter((f) => f !== facility)
                              : [...filters.facilities, facility];
                            setFilters({ ...filters, facilities: newFacilities });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {facility}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content - Hostel Grid */}
        <div className="w-full">
          {/* Active Filters Pills */}
          {(filters.location ||
            filters.gender.length > 0 ||
            filters.tenantType.length > 0 ||
            filters.mealOptions.length > 0 ||
            filters.roomType.length > 0 ||
            filters.facilities.length > 0) && (
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
                {filters.gender.map((gender) => (
                  <span
                    key={gender}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    {gender === "Male" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <UserCircle className="w-3.5 h-3.5" />
                    )}
                    {gender}
                    <button
                      onClick={() => clearFilter("gender", gender)}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.tenantType.map((type) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    <Users className="w-3.5 h-3.5" />
                    {type}
                    <button
                      onClick={() => clearFilter("tenantType", type)}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.mealOptions.map((meal) => (
                  <span
                    key={meal}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    Meals {meal}
                    <button
                      onClick={() => clearFilter("mealOptions", meal)}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.roomType.map((room) => (
                  <span
                    key={room}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    <Bed className="w-3.5 h-3.5" />
                    {room}
                    <button
                      onClick={() => clearFilter("roomType", room)}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    {facility}
                    <button
                      onClick={() => clearFilter("facilities", facility)}
                      className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

          {/* Hostel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedHostels.map((hostel) => (
              <PropertyCard
                key={hostel.id}
                id={hostel.id}
                title={hostel.title}
                location={`${hostel.location.area}, ${hostel.location.city}`}
                price={hostel.price}
                category={hostel.gender}
                features={[
                  hostel.type,
                  hostel.roomType,
                  hostel.mealOptions === "Included" ? `${hostel.mealsPerDay} Meals` : hostel.mealOptions,
                ]}
                rating={hostel.rating}
                reviewCount={hostel.totalReviews}
                imageUrl={hostel.images[0]}
                href={`/for-rent/hostels/${hostel.id}`}
                available={hostel.availableSeats > 0}
              />
            ))}
          </div>

          {/* Pagination */}
          {filteredHostels.length > 0 && totalPages > 1 && (
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

export default HostelsPage;

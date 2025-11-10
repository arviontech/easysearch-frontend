"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  UtensilsCrossed,
  Users,
  X,
} from "lucide-react";
import Container from "@/components/Container";
import CatererCard from "@/components/cards/CatererCard";
import { mockCaterers } from "@/data/mockCaterers";

const CateringPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    cuisineStyle: [] as string[],
    mealType: [] as string[],
    serviceType: [] as string[],
    targetCustomer: [] as string[],
    location: "",
    priceRange: [0, 200],
  });

  const locations = [
    "Shaheb Bazar",
    "Kazla",
    "Boalia",
    "Motihar",
    "Rajpara",
    "Talaimari",
    "Uposhohor",
    "Binodpur",
  ];

  const cuisineStyles = [
    "Bengali Home-style",
    "Bengali",
    "Indian",
    "Chinese",
    "Continental",
    "Thai",
    "Multi-cuisine",
  ];

  const mealTypeOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
  ];

  const serviceTypeOptions = [
    "Home-Based",
    "Restaurant-Based",
    "Cloud Kitchen",
  ];

  const targetCustomerOptions = [
    "Office Employees",
    "Students",
    "Bachelors",
    "Working Professionals",
    "Families",
  ];

  const popularKeywords = [
    { label: "Student Meals", filter: { targetCustomer: ["Students"] } },
    { label: "Corporate Lunch", filter: { targetCustomer: ["Office Employees"] } },
    { label: "Home-style Bengali", filter: { cuisineStyle: ["Bengali Home-style"] } },
    { label: "Budget Friendly (Under ৳80)", filter: { priceRange: [0, 80] } },
    { label: "Premium Meals (৳150+)", filter: { priceRange: [150, 200] } },
    { label: "Lunch Service", filter: { mealType: ["Lunch"] } },
    { label: "Full Day Meals", filter: { mealType: ["Breakfast", "Lunch", "Dinner"] } },
    { label: "Home-Based Kitchen", filter: { serviceType: ["Home-Based"] } },
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
          filterKey === "cuisineStyle" || filterKey === "mealType" || filterKey === "serviceType" || filterKey === "targetCustomer" ? [] : "",
      });
    }
  };

  // Filter caterers based on all criteria
  const filteredCaterers = mockCaterers.filter((caterer) => {
    const matchesSearch =
      searchQuery === "" ||
      caterer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      caterer.location.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCuisineStyle =
      filters.cuisineStyle.length === 0 ||
      filters.cuisineStyle.some((style) => caterer.cuisineStyle.some((cs) => cs.includes(style)));

    const matchesMealType =
      filters.mealType.length === 0 ||
      filters.mealType.some((type) => caterer.mealTypes.includes(type as "Breakfast" | "Lunch" | "Dinner"));

    const matchesServiceType =
      filters.serviceType.length === 0 ||
      filters.serviceType.includes(caterer.serviceType);

    const matchesTargetCustomer =
      filters.targetCustomer.length === 0 ||
      filters.targetCustomer.some((customer) => caterer.targetCustomers.some((tc) => tc.includes(customer)));

    const matchesLocation = !filters.location || caterer.location.area === filters.location;

    const matchesPrice =
      caterer.pricing.lunch >= filters.priceRange[0] &&
      caterer.pricing.lunch <= filters.priceRange[1];

    return (
      matchesSearch &&
      matchesCuisineStyle &&
      matchesMealType &&
      matchesServiceType &&
      matchesTargetCustomer &&
      matchesLocation &&
      matchesPrice
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCaterers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCaterers = filteredCaterers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filters, searchQuery, currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 pt-24 pb-16">
      <Container>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="w-10 h-10 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Catering Services in Rajshahi
            </h1>
          </div>
          <p className="text-gray-600">
            Find the perfect caterer for your event from {mockCaterers.length}+ available services
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
              placeholder="Search by caterer name, cuisine type, or location..."
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
            {(filters.cuisineStyle.length > 0 ||
              filters.mealType.length > 0 ||
              filters.serviceType.length > 0 ||
              filters.targetCustomer.length > 0 ||
              filters.location) && (
              <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {filters.cuisineStyle.length +
                  filters.mealType.length +
                  filters.serviceType.length +
                  filters.targetCustomer.length +
                  (filters.location ? 1 : 0)}
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
                      cuisineStyle: [],
                      mealType: [],
                      serviceType: [],
                      targetCustomer: [],
                      location: "",
                      priceRange: [0, 200],
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

                {/* Cuisine Style Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Cuisine Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisineStyles.slice(0, 3).map((cuisine) => {
                      const isSelected = filters.cuisineStyle.includes(cuisine);
                      return (
                        <button
                          key={cuisine}
                          onClick={() => {
                            const newCuisines = isSelected
                              ? filters.cuisineStyle.filter((c) => c !== cuisine)
                              : [...filters.cuisineStyle, cuisine];
                            setFilters({ ...filters, cuisineStyle: newCuisines });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                            isSelected
                              ? "bg-cyan-600 text-white"
                              : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                        >
                          {cuisine}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Meal Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Meal Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mealTypeOptions.map((meal) => {
                      const isSelected = filters.mealType.includes(meal);
                      return (
                        <button
                          key={meal}
                          onClick={() => {
                            const newMeals = isSelected
                              ? filters.mealType.filter((m) => m !== meal)
                              : [...filters.mealType, meal];
                            setFilters({ ...filters, mealType: newMeals });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                            isSelected
                              ? "bg-cyan-600 text-white"
                              : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                        >
                          {meal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Lunch Price (BDT)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
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

              {/* Second Row for Service Type & Target Customer */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Service Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Service Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceTypeOptions.map((type) => {
                      const isSelected = filters.serviceType.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            const newTypes = isSelected
                              ? filters.serviceType.filter((t) => t !== type)
                              : [...filters.serviceType, type];
                            setFilters({ ...filters, serviceType: newTypes });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                            isSelected
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

                {/* Target Customer Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Target Customer
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {targetCustomerOptions.slice(0, 3).map((customer) => {
                      const isSelected = filters.targetCustomer.includes(customer);
                      return (
                        <button
                          key={customer}
                          onClick={() => {
                            const newCustomers = isSelected
                              ? filters.targetCustomer.filter((c) => c !== customer)
                              : [...filters.targetCustomer, customer];
                            setFilters({ ...filters, targetCustomer: newCustomers });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                            isSelected
                              ? "bg-cyan-600 text-white"
                              : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                          }`}
                        >
                          {customer}
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
          filters.cuisineStyle.length > 0 ||
          filters.mealType.length > 0 ||
          filters.serviceType.length > 0 ||
          filters.targetCustomer.length > 0) && (
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
            {filters.cuisineStyle.map((cuisine) => (
              <span
                key={cuisine}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                {cuisine}
                <button
                  onClick={() => clearFilter("cuisineStyle", cuisine)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.mealType.map((meal) => (
              <span
                key={meal}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                {meal}
                <button
                  onClick={() => clearFilter("mealType", meal)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.serviceType.map((type) => (
              <span
                key={type}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                {type}
                <button
                  onClick={() => clearFilter("serviceType", type)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.targetCustomer.map((customer) => (
              <span
                key={customer}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <Users className="w-3.5 h-3.5" />
                {customer}
                <button
                  onClick={() => clearFilter("targetCustomer", customer)}
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredCaterers.length)} of {filteredCaterers.length}{" "}
            {filteredCaterers.length === 1 ? "caterer" : "caterers"}
          </h2>
        </div>

        {/* Caterer Grid */}
        {paginatedCaterers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCaterers.map((caterer) => (
              <CatererCard
                key={caterer.id}
                id={caterer.id}
                businessName={caterer.businessName}
                specialty={caterer.specialties[0]}
                serviceType={caterer.serviceType}
                mealTypes={caterer.mealTypes}
                lunchPrice={caterer.pricing.lunch}
                location={caterer.location.area}
                cuisineStyle={caterer.cuisineStyle[0]}
                rating={caterer.rating}
                reviewCount={caterer.totalReviews}
                imageUrl={caterer.images[0]}
                href={`/catering/${caterer.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No caterers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCaterers.length > 0 && totalPages > 1 && (
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
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
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
      </Container>
    </div>
  );
};

export default CateringPage;

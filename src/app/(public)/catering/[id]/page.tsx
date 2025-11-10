"use client";

import { notFound } from "next/navigation";
import { useState, use, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  CheckCircle2,
  UtensilsCrossed,
  Clock,
  Calendar,
  Award,
  Shield,
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  AlertCircle,
  Home,
  Building2,
  BadgeCheck,
  ThumbsUp,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getCatererById } from "@/data/mockCaterers";

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CateringDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const caterer = getCatererById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<"lunch" | "dinner" | "both">("lunch");
  const [reviewSort, setReviewSort] = useState<"recent" | "rating">("recent");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 5;

  if (!caterer) {
    notFound();
  }

  // Helper function to get user initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  // Reset pagination when filters or sort change
  useEffect(() => {
    setCurrentReviewPage(1);
  }, [reviewSort, ratingFilter]);

  // Sort and filter reviews
  const sortedAndFilteredReviews = caterer.reviews
    .filter((review) => (ratingFilter ? review.rating === ratingFilter : true))
    .sort((a, b) => {
      if (reviewSort === "rating") {
        return b.rating - a.rating;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Pagination calculations
  const totalReviews = sortedAndFilteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentReviewPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = sortedAndFilteredReviews.slice(startIndex, endIndex);

  // Page navigation
  const goToPage = (page: number) => {
    setCurrentReviewPage(page);
    // Scroll to reviews section
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % caterer.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + caterer.images.length) % caterer.images.length
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: caterer.businessName,
          text: caterer.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const calculateMonthlyPrice = () => {
    if (selectedMeal === "lunch") return caterer.pricing.monthlyPackage.lunch;
    if (selectedMeal === "dinner") {
      return caterer.pricing.monthlyPackage.lunchDinner - caterer.pricing.monthlyPackage.lunch;
    }
    return caterer.pricing.monthlyPackage.lunchDinner;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] rounded-2xl overflow-hidden mb-6 group"
        >
          <img
            src={caterer.images[currentImageIndex]}
            alt={caterer.businessName}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {caterer.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {caterer.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {caterer.verified && (
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified
              </span>
            )}
            <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {caterer.serviceType}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {caterer.businessName}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{caterer.location.address}</span>
              </div>
              {caterer.hasRestaurant && (
                <div className="flex items-center text-cyan-600 mb-3">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span className="text-sm">
                    Also has restaurant: {caterer.restaurantAddress}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-semibold">{caterer.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({caterer.totalReviews} reviews)
                  </span>
                </div>
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Since {caterer.establishedSince}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {caterer.activeSubscribers}+ Active Subscribers
                </span>
              </div>

              {/* Quick Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <DollarSign className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Per Meal</div>
                  <div className="font-semibold text-sm">৳{caterer.pricing.lunch}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Users className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Min Order</div>
                  <div className="font-semibold text-sm">{caterer.minimumOrder} person</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Lunch Time</div>
                  <div className="font-semibold text-xs">{caterer.deliveryTiming.lunch || "N/A"}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Calendar className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Menu Changes</div>
                  <div className="font-semibold text-sm">{caterer.menuRotation}</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Our Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{caterer.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Owner:</span>
                <span className="font-semibold text-gray-900">{caterer.ownerName}</span>
              </div>
            </motion.div>

            {/* Subscription Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-cyan-600" />
                Monthly Subscription Packages
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {caterer.pricing.monthlyPackage.lunch > 0 && (
                  <button
                    onClick={() => setSelectedMeal("lunch")}
                    className={`p-4 rounded-xl border-2 transition ${
                      selectedMeal === "lunch"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    <div className="text-lg font-bold text-gray-900 mb-1">Lunch Only</div>
                    <div className="text-2xl font-bold text-cyan-600 mb-2">
                      ৳{caterer.pricing.monthlyPackage.lunch}
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <p className="text-xs text-gray-600">30 days lunch delivery</p>
                  </button>
                )}

                {caterer.pricing.monthlyPackage.lunchDinner > 0 && (
                  <button
                    onClick={() => setSelectedMeal("both")}
                    className={`p-4 rounded-xl border-2 transition ${
                      selectedMeal === "both"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    <div className="text-lg font-bold text-gray-900 mb-1">Lunch + Dinner</div>
                    <div className="text-2xl font-bold text-cyan-600 mb-2">
                      ৳{caterer.pricing.monthlyPackage.lunchDinner}
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <p className="text-xs text-gray-600">30 days both meals</p>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mt-2 inline-block">
                      Save ৳{(caterer.pricing.lunch + caterer.pricing.dinner) * 30 - caterer.pricing.monthlyPackage.lunchDinner}
                    </span>
                  </button>
                )}

                {caterer.pricing.monthlyPackage.fullDay > 0 && (
                  <button
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-cyan-300 transition"
                  >
                    <div className="text-lg font-bold text-gray-900 mb-1">Full Day</div>
                    <div className="text-2xl font-bold text-cyan-600 mb-2">
                      ৳{caterer.pricing.monthlyPackage.fullDay}
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <p className="text-xs text-gray-600">All 3 meals daily</p>
                  </button>
                )}
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Per Meal Pricing:</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {caterer.pricing.breakfast > 0 && (
                    <div>
                      <div className="text-sm text-gray-600">Breakfast</div>
                      <div className="font-bold text-gray-900">৳{caterer.pricing.breakfast}</div>
                    </div>
                  )}
                  {caterer.pricing.lunch > 0 && (
                    <div>
                      <div className="text-sm text-gray-600">Lunch</div>
                      <div className="font-bold text-gray-900">৳{caterer.pricing.lunch}</div>
                    </div>
                  )}
                  {caterer.pricing.dinner > 0 && (
                    <div>
                      <div className="text-sm text-gray-600">Dinner</div>
                      <div className="font-bold text-gray-900">৳{caterer.pricing.dinner}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Sample Menus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-cyan-600" />
                Sample Menu
              </h2>
              <div className="space-y-4">
                {caterer.sampleMenus.map((menu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">{menu.day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {menu.breakfast && (
                        <div>
                          <div className="text-sm font-semibold text-cyan-600 mb-2">Breakfast</div>
                          <ul className="space-y-1">
                            {menu.breakfast.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {menu.lunch && (
                        <div>
                          <div className="text-sm font-semibold text-cyan-600 mb-2">Lunch</div>
                          <ul className="space-y-1">
                            {menu.lunch.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {menu.dinner && (
                        <div>
                          <div className="text-sm font-semibold text-cyan-600 mb-2">Dinner</div>
                          <ul className="space-y-1">
                            {menu.dinner.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-cyan-600" />
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Delivery Timing:</h3>
                  <div className="space-y-2">
                    {caterer.deliveryTiming.breakfast && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span className="text-gray-700">Breakfast: {caterer.deliveryTiming.breakfast}</span>
                      </div>
                    )}
                    {caterer.deliveryTiming.lunch && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span className="text-gray-700">Lunch: {caterer.deliveryTiming.lunch}</span>
                      </div>
                    )}
                    {caterer.deliveryTiming.dinner && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span className="text-gray-700">Dinner: {caterer.deliveryTiming.dinner}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Delivery Areas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {caterer.deliveryAreas.map((area, index) => (
                      <span
                        key={index}
                        className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-700 mb-1">Packaging:</div>
                <p className="text-gray-600 text-sm">{caterer.packaging}</p>
              </div>
            </motion.div>

            {/* Features & Cuisine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Specialties</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Cuisine Style:</h3>
                  <div className="flex flex-wrap gap-2">
                    {caterer.cuisineStyle.map((cuisine, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Key Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {caterer.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Target Customers:</h3>
                  <div className="flex flex-wrap gap-2">
                    {caterer.targetCustomers.map((customer, index) => (
                      <span
                        key={index}
                        className="bg-cyan-50 border border-cyan-200 text-cyan-700 px-3 py-1 rounded-full text-sm"
                      >
                        {customer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Reviews */}
            <motion.div
              id="reviews-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              {/* Reviews Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Customer Reviews ({caterer.totalReviews})
                </h2>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-gray-900">{caterer.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(caterer.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort and Filter */}
              <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">Sort:</span>
                  <button
                    onClick={() => setReviewSort("recent")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      reviewSort === "recent"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Most Recent
                  </button>
                  <button
                    onClick={() => setReviewSort("rating")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      reviewSort === "rating"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Highest Rating
                  </button>
                </div>

                {/* Filter by Rating */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">Filter:</span>
                  <button
                    onClick={() => setRatingFilter(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      ratingFilter === null
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {[5, 4, 3].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                        ratingFilter === rating
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rating} <Star className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {paginatedReviews.length > 0 ? (
                  paginatedReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      {/* Review Header */}
                      <div className="flex items-start gap-4 mb-3">
                        {/* User Avatar */}
                        <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-semibold shrink-0">
                          {review.userAvatar ? (
                            <Image
                              src={review.userAvatar}
                              alt={review.userName}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          ) : (
                            getInitials(review.userName)
                          )}
                        </div>

                        {/* User Info & Rating */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">• {review.orderType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Review Comment */}
                      <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative w-24 h-24 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={image}
                                alt={`Review image ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Helpful Button */}
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpfulCount})</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No reviews found for the selected filter.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && paginatedReviews.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Page Info */}
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(endIndex, totalReviews)} of {totalReviews} reviews
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => goToPage(currentReviewPage - 1)}
                        disabled={currentReviewPage === 1}
                        className="px-4 py-2 rounded-lg border border-cyan-200 text-gray-700 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition"
                      >
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          const showPage =
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentReviewPage - 1 && page <= currentReviewPage + 1);

                          // Show ellipsis
                          const showEllipsisBefore = page === currentReviewPage - 2 && currentReviewPage > 3;
                          const showEllipsisAfter = page === currentReviewPage + 2 && currentReviewPage < totalPages - 2;

                          if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                              <span key={page} className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }

                          if (!showPage) return null;

                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`min-w-[40px] h-10 rounded-lg font-medium transition ${
                                currentReviewPage === page
                                  ? "bg-cyan-600 text-white"
                                  : "border border-cyan-200 text-gray-700 hover:bg-cyan-50"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => goToPage(currentReviewPage + 1)}
                        disabled={currentReviewPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-cyan-200 text-gray-700 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Terms & Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-cyan-600" />
                Terms & Policies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Advance Order Required:</h3>
                  <p className="text-gray-600">{caterer.advanceOrder}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Cancellation Policy:</h3>
                  <p className="text-gray-600">{caterer.cancellationPolicy}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Operating Days:</h3>
                  <p className="text-gray-600">{caterer.operatingDays}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Payment Options:</h3>
                  <div className="flex flex-wrap gap-2">
                    {caterer.paymentOptions.map((option, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
                {caterer.trialAvailable && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                      <BadgeCheck className="w-5 h-5" />
                      Trial Available
                    </div>
                    <p className="text-sm text-green-600">
                      You can try our service before committing to a monthly package!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <Map
                latitude={caterer.location.coordinates.lat}
                longitude={caterer.location.coordinates.lng}
                address={caterer.location.address}
              />
            </motion.div>
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md sticky top-4"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact for Subscription
              </h2>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {caterer.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {caterer.ownerName}
                    </div>
                    <div className="text-sm text-gray-600">Owner</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${caterer.contact.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{caterer.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${caterer.contact.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{caterer.contact.email}</span>
                  </a>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-3 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Meal Prices</h3>
                {caterer.mealTypes.map((meal) => (
                  <div key={meal} className="flex justify-between items-center">
                    <span className="text-gray-600">{meal}</span>
                    <span className="font-semibold text-gray-900">
                      ৳{caterer.pricing[meal.toLowerCase() as keyof typeof caterer.pricing] as number}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="text-sm text-gray-600 mb-1">Monthly Package (Lunch)</div>
                  <div className="text-2xl font-bold text-cyan-600">
                    ৳{caterer.pricing.monthlyPackage.lunch}
                  </div>
                  <div className="text-xs text-gray-500">Save on monthly subscription</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`tel:${caterer.contact.phone}`}
                  className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition"
                >
                  Call to Subscribe
                </a>
                <a
                  href={`https://wa.me/${caterer.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition"
                >
                  WhatsApp
                </a>
              </div>

              {/* Quick Info */}
              <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Minimum Order:</span>
                    <span className="font-semibold text-cyan-700">
                      {caterer.minimumOrder} {caterer.minimumOrder === 1 ? 'person' : 'persons'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Subscribers:</span>
                    <span className="font-semibold text-gray-900">
                      {caterer.activeSubscribers}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Trial Available:</span>
                    <span className="font-semibold text-green-600">
                      {caterer.trialAvailable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

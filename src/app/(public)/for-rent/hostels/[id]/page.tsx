"use client";

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Bed,
  Calendar,
  Phone,
  Mail,
  Shield,
  Wifi,
  Zap,
  Droplet,
  Wind,
  BatteryCharging,
  Clock,
  UserCheck,
  Building2,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Home,
  Utensils,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { getHostelById } from "@/data/mockHostels";

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function HostelDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const hostel = getHostelById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!hostel) {
    notFound();
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + hostel.images.length) % hostel.images.length
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hostel.title,
          text: hostel.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const totalUpfront =
    hostel.price * hostel.advancePayment + hostel.securityDeposit;

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
            src={hostel.images[currentImageIndex]}
            alt={hostel.title}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {hostel.images.length > 1 && (
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
            {hostel.images.map((_, index) => (
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

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {hostel.type}
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
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {hostel.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{hostel.location.address}, {hostel.location.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 font-semibold">{hostel.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({hostel.totalReviews} reviews)
                      </span>
                    </div>
                    {hostel.manager.verified && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600">
                    ৳{hostel.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Users className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Gender</div>
                  <div className="font-semibold text-sm">{hostel.gender}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Bed className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Room Type</div>
                  <div className="font-semibold text-sm">{hostel.roomType}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Utensils className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Meals</div>
                  <div className="font-semibold text-sm">{hostel.mealOptions}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Gate Closing</div>
                  <div className="font-semibold text-sm">{hostel.gateClosingTime}</div>
                </div>
              </div>
            </motion.div>

            {/* Meal Information (if included) */}
            {hostel.mealOptions !== "Not Included" && hostel.mealTiming && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-cyan-600" />
                  Meal Schedule
                </h2>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-700">
                      {hostel.mealsPerDay} Times Daily Meals
                    </span>
                    {hostel.type === "Mess" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Homemade Food
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {hostel.mealTiming.map((timing, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>{timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </motion.div>

            {/* Key Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Tenant Type
                    </div>
                    <div className="text-gray-600">{hostel.tenantType}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Room Capacity
                    </div>
                    <div className="text-gray-600">
                      {hostel.capacityPerRoom} person(s) per room
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bed className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Available Seats
                    </div>
                    <div className="text-gray-600">
                      {hostel.availableSeats} seats available
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Total Rooms
                    </div>
                    <div className="text-gray-600">{hostel.totalRooms} rooms</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Floor
                    </div>
                    <div className="text-gray-600">{hostel.floor}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Total Floors
                    </div>
                    <div className="text-gray-600">{hostel.totalFloors} floors</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Study Hours
                    </div>
                    <div className="text-gray-600">{hostel.studyHours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Established
                    </div>
                    <div className="text-gray-600">{hostel.establishedYear}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Utilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Utilities Available
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  className={`flex items-center gap-2 ${
                    hostel.utilities.electricity
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>Electricity</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hostel.utilities.water ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <Droplet className="w-5 h-5" />
                  <span>Water Supply</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hostel.utilities.gas ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <Wind className="w-5 h-5" />
                  <span>Gas</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hostel.utilities.wifi ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <Wifi className="w-5 h-5" />
                  <span>WiFi</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hostel.utilities.generator
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <BatteryCharging className="w-5 h-5" />
                  <span>Generator</span>
                </div>
              </div>
            </motion.div>

            {/* Room Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Room Facilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostel.roomFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-600" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Facilities & Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostel.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-600" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Common Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Common Areas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hostel.commonAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 text-center text-gray-700 font-medium"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan-600" />
                Security Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostel.security.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cleaning Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cleaning Services
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Room Cleaning</span>
                  <span
                    className={`font-semibold ${
                      hostel.cleaning.roomCleaning
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {hostel.cleaning.roomCleaning ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Frequency</span>
                  <span className="font-semibold text-gray-900">
                    {hostel.cleaning.frequency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Bathroom Cleaning</span>
                  <span
                    className={`font-semibold ${
                      hostel.cleaning.bathroomCleaning
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {hostel.cleaning.bathroomCleaning ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Nearby Places */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Nearby Places
              </h2>
              <div className="space-y-3">
                {hostel.nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {place.name}
                      </div>
                      <div className="text-sm text-gray-600">{place.type}</div>
                    </div>
                    <div className="text-cyan-600 font-semibold">
                      {place.distance}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-cyan-600" />
                Rules & Regulations
              </h2>
              <ul className="space-y-2">
                {hostel.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <Map
                latitude={hostel.location.coordinates.lat}
                longitude={hostel.location.coordinates.lng}
                address={hostel.location.address}
              />
            </motion.div>
          </div>

          {/* Sidebar - Manager Contact */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md sticky top-4"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Manager
              </h2>

              {/* Manager Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {hostel.manager.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {hostel.manager.name}
                    </div>
                    {hostel.manager.verified && (
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Verified Manager
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${hostel.manager.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{hostel.manager.phone}</span>
                  </a>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="border-t pt-4 space-y-3">
                <h3 className="font-bold text-gray-900 mb-3">
                  Payment Summary
                </h3>
                <div className="flex justify-between text-gray-700">
                  <span>Monthly Rent</span>
                  <span className="font-semibold">
                    ৳{hostel.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Advance ({hostel.advancePayment} month)</span>
                  <span className="font-semibold">
                    ৳{(hostel.price * hostel.advancePayment).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Security Deposit</span>
                  <span className="font-semibold">
                    ৳{hostel.securityDeposit.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Upfront</span>
                  <span className="text-cyan-600">
                    ৳{totalUpfront.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${hostel.manager.phone}`}
                  className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition"
                >
                  Call Manager
                </a>
                <a
                  href={`https://wa.me/${hostel.manager.phone.replace(/[^0-9]/g, "")}`}
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
                  <div className="flex justify-between">
                    <span>Available Seats:</span>
                    <span className="font-semibold text-cyan-700">
                      {hostel.availableSeats}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posted:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(hostel.postedDate).toLocaleDateString()}
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

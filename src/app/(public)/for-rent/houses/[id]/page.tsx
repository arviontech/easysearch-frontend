"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Building2,
  Zap,
  Droplet,
  Wifi,
  Car,
  Shield,
  Star,
  CheckCircle2,
} from "lucide-react";
import { getHouseById } from "@/data/mockHouses";
import Map from "@/components/Map";
import { useAppDispatch } from "@/lib/redux/hooks";
import { openModal, addNotification } from "@/lib/redux/slices/uiSlice";

export default function HouseDetailsPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const house = getHouseById(params.id as string);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">House Not Found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link
            href="/for-rent/houses"
            className="text-cyan-600 hover:text-cyan-700 font-medium"
          >
            ← Back to Houses
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % house.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + house.images.length) % house.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: house.title,
        text: house.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(addNotification({
        type: "success",
        message: "Link copied to clipboard!",
      }));
    }
  };

  const handleContact = () => {
    dispatch(addNotification({
      type: "info",
      message: "Contact feature coming soon!",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/for-rent/houses"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Houses
        </Link>

        {/* Image Gallery */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8 bg-gray-200">
          <Image
            src={house.images[currentImageIndex]}
            alt={house.title}
            fill
            className="object-cover"
          />

          {/* Image Navigation */}
          {house.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {house.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{house.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{house.location.address}, {house.location.area}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-cyan-600">
                  ৳{house.price.toLocaleString()}
                </span>
                <span className="text-gray-600">/month</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{house.rating}</span>
                </div>
                <span className="text-gray-600">({house.totalReviews} reviews)</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Bed className="w-5 h-5" />
                  <span className="text-sm">Bedrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{house.bedrooms}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Bath className="w-5 h-5" />
                  <span className="text-sm">Bathrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{house.bathrooms}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Maximize className="w-5 h-5" />
                  <span className="text-sm">Size</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{house.size}</p>
                <p className="text-xs text-gray-600">sq ft</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm">Floor</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{house.floor}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{house.description}</p>
            </div>

            {/* Property Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Property Type</p>
                  <p className="font-semibold text-gray-900">{house.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Furnishing</p>
                  <p className="font-semibold text-gray-900">{house.furnishing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Floors</p>
                  <p className="font-semibold text-gray-900">{house.totalFloors}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available From</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(house.availableFrom).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Security Deposit</p>
                  <p className="font-semibold text-gray-900">৳{house.securityDeposit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Advance Rent</p>
                  <p className="font-semibold text-gray-900">{house.advanceRent} months</p>
                </div>
              </div>
            </div>

            {/* Utilities */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Utilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  {house.utilities.gas ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-gray-700">Gas</span>
                </div>
                <div className="flex items-center gap-3">
                  {house.utilities.electricity ? (
                    <>
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Electricity</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">Electricity</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {house.utilities.water ? (
                    <>
                      <Droplet className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Water</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">Water</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {house.utilities.internet ? (
                    <>
                      <Wifi className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Internet</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">Internet</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {house.utilities.generator ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Generator</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">Generator</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {house.parking.available ? (
                    <>
                      <Car className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Parking ({house.parking.type})</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">No Parking</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {house.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {house.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Places</h2>
              <div className="space-y-3">
                {house.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{place.name}</p>
                      <p className="text-sm text-gray-600">{place.type}</p>
                    </div>
                    <span className="text-sm font-semibold text-cyan-600">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">House Rules</h2>
              <ul className="space-y-2">
                {house.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <p className="text-gray-600 mb-4">
                {house.location.address}, {house.location.area}, {house.location.city}
              </p>
              <Map
                latitude={house.location.coordinates.lat}
                longitude={house.location.coordinates.lng}
                address={house.location.address}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Owner Info Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Property Owner</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-cyan-600">
                        {house.owner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{house.owner.name}</p>
                      {house.owner.verified && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified Owner</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`tel:${house.owner.phone}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <Phone className="w-5 h-5 text-cyan-600" />
                      <span className="text-gray-700">{house.owner.phone}</span>
                    </a>
                    <a
                      href={`mailto:${house.owner.email}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <Mail className="w-5 h-5 text-cyan-600" />
                      <span className="text-gray-700 text-sm">{house.owner.email}</span>
                    </a>
                  </div>

                  <button
                    onClick={handleContact}
                    className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition font-semibold"
                  >
                    Contact Owner
                  </button>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-semibold text-gray-900">৳{house.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-semibold text-gray-900">৳{house.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advance Payment</span>
                    <span className="font-semibold text-gray-900">{house.advanceRent} months</span>
                  </div>
                  <div className="border-t border-cyan-200 pt-3 flex justify-between">
                    <span className="text-gray-900 font-semibold">Total Upfront</span>
                    <span className="font-bold text-cyan-600">
                      ৳{(house.price * house.advanceRent + house.securityDeposit).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Posted Date */}
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Posted on {new Date(house.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

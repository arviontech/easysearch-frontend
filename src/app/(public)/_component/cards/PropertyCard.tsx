"use client";

import {
  Armchair,
  Bath,
  Bed,
  Car,
  CircleUserRound,
  Eye,
  Home,
  Lock,
  MapPin,
  Maximize,
  Shield,
  Sparkles,
  Star,
  User,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PropertyCardProps {
  id: string;
  title: string;
  category?: string;
  price: number;
  location: string;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  image?: string;
  href?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type?: string;
  furnished?: boolean;
  available?: boolean;
  viewMode?: "grid" | "list";
}

const PropertyCard = ({
  id,
  title,
  category,
  price,
  location,
  features = [],
  rating = 0,
  reviewCount = 0,
  imageUrl,
  image,
  href,
  bedrooms,
  bathrooms,
  area,
  type,
  furnished,
  available = true,
  viewMode = "grid",
}: PropertyCardProps) => {
  const finalImageUrl = imageUrl || image || "/assets/hero-image.jpg";
  const finalHref = href || `/for-rent/houses/${id}`;
  const finalCategory = category || type || "Property";

  // Build features array from bedrooms, bathrooms, area if not provided
  const finalFeatures =
    features.length > 0
      ? features
      : [
          bedrooms && `${bedrooms} Bed`,
          bathrooms && `${bathrooms} Bath`,
          area && `${area} sqft`,
          furnished !== undefined && (furnished ? "Furnished" : "Unfurnished"),
        ].filter(Boolean) as string[];

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("male") && !lowerCategory.includes("female")) {
      return <User className="w-3.5 h-3.5" />;
    }
    if (lowerCategory.includes("female")) {
      return <CircleUserRound className="w-3.5 h-3.5" />;
    }
    if (lowerCategory.includes("family")) {
      return <Users className="w-3.5 h-3.5" />;
    }
    if (lowerCategory.includes("bachelor")) {
      return <User className="w-3.5 h-3.5" />;
    }
    if (lowerCategory.includes("sublet")) {
      return <Home className="w-3.5 h-3.5" />;
    }
    return null;
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();

    // Meals/Food related
    if (lowerFeature.includes("meal") || lowerFeature.includes("food")) {
      return <UtensilsCrossed className="w-3.5 h-3.5" />;
    }
    // Internet/WiFi
    if (
      lowerFeature.includes("wifi") ||
      lowerFeature.includes("wi-fi") ||
      lowerFeature.includes("internet")
    ) {
      return <Wifi className="w-3.5 h-3.5" />;
    }
    // AC/Air Conditioning
    if (lowerFeature.includes("ac") || lowerFeature.includes("air")) {
      return <Sparkles className="w-3.5 h-3.5" />;
    }
    // Security
    if (lowerFeature.includes("security") || lowerFeature.includes("guard")) {
      return <Shield className="w-3.5 h-3.5" />;
    }
    // Locker/Storage
    if (lowerFeature.includes("locker") || lowerFeature.includes("storage")) {
      return <Lock className="w-3.5 h-3.5" />;
    }
    // Parking
    if (lowerFeature.includes("parking") || lowerFeature.includes("garage")) {
      return <Car className="w-3.5 h-3.5" />;
    }
    // Furnished
    if (
      lowerFeature.includes("furnished") ||
      lowerFeature.includes("furniture")
    ) {
      return <Armchair className="w-3.5 h-3.5" />;
    }
    // Studio/Balcony
    if (lowerFeature.includes("studio") || lowerFeature.includes("balcony")) {
      return <Home className="w-3.5 h-3.5" />;
    }
    // People related (Male/Female/Family)
    if (lowerFeature.includes("male") || lowerFeature.includes("family")) {
      return <Users className="w-3.5 h-3.5" />;
    }
    // Rooms/Beds
    if (lowerFeature.includes("bed") || lowerFeature.includes("room")) {
      return <Bed className="w-3.5 h-3.5" />;
    }
    // Bathrooms
    if (lowerFeature.includes("bath")) {
      return <Bath className="w-3.5 h-3.5" />;
    }
    // Square footage
    if (lowerFeature.includes("sqft") || lowerFeature.includes("sq")) {
      return <Maximize className="w-3.5 h-3.5" />;
    }
    return null;
  };

  // Grid View (default)
  if (viewMode === "grid") {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div whileHover="hover" initial="initial" animate="initial">
          <Link
            href={finalHref}
            className="group block bg-cyan-50/60 backdrop-blur-md rounded-3xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden h-[380px] flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={finalImageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  {getCategoryIcon(finalCategory)}
                  {finalCategory}
                </span>
              </div>

              {/* Available Badge */}
              {!available && (
                <div className="absolute top-3 right-3">
                  <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Unavailable
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-cyan-600 transition">
                {title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{location}</span>
              </div>

              {/* Features */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
                {finalFeatures.map((feature, index) => (
                  <span key={feature} className="flex items-center gap-1.5">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                    {index < finalFeatures.length - 1 && (
                      <span className="ml-1">•</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-500">({reviewCount})</span>
                </div>
              )}

              {/* Price & View Details Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ৳{price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>

                <div className="bg-cyan-100 text-cyan-700 text-sm font-semibold px-3 py-2 rounded-2xl border border-cyan-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center gap-2">
                  <motion.div
                    className="absolute inset-0 bg-cyan-600 rounded-2xl"
                    variants={{
                      initial: { scale: 0 },
                      hover: { scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="relative z-10 flex items-center gap-2"
                    variants={{
                      initial: { color: "#0e7490" },
                      hover: { color: "#ffffff" },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div whileHover="hover" initial="initial" animate="initial">
        <Link
          href={finalHref}
          className="group block bg-cyan-50/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden"
        >
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="relative h-40 w-56 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={finalImageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-cyan-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {getCategoryIcon(finalCategory)}
                  {finalCategory}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Title & Available Badge */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition">
                  {title}
                </h3>
                {!available && (
                  <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Unavailable
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>

              {/* Features */}
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 flex-wrap">
                {finalFeatures.map((feature) => (
                  <span key={feature} className="flex items-center gap-1.5">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </span>
                ))}
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-500">({reviewCount})</span>
                </div>
              )}

              {/* Price & View Details Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>

                <div className="bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-2.5 rounded-2xl border border-cyan-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center gap-2">
                  <motion.div
                    className="absolute inset-0 bg-cyan-600 rounded-2xl"
                    variants={{
                      initial: { scale: 0 },
                      hover: { scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="relative z-10 flex items-center gap-2"
                    variants={{
                      initial: { color: "#0e7490" },
                      hover: { color: "#ffffff" },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PropertyCard;

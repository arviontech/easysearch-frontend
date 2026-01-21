"use client";

import React, { useEffect, useState } from "react";
import { useGetActiveBannersQuery } from "@/lib/redux/features/banner/bannerApi";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  altText: string;
  description?: string;
  linkUrl?: string;
  priority: number;
}

const BannerCarousel = () => {
  const { data: bannersData, isLoading, isError } = useGetActiveBannersQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = bannersData?.data || [];

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Change banner every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="h-64 md:h-96 bg-gray-200 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading banners...</div>
      </div>
    );
  }

  if (isError || banners.length === 0) {
    return (
      <div className="h-64 md:h-96 bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">No active banners available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner: Banner, index: number) => (
          <motion.div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {banner.linkUrl ? (
              <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={banner.imageUrl}
                  alt={banner.altText}
                  className="w-full h-full object-cover"
                />
              </a>
            ) : (
              <img
                src={banner.imageUrl}
                alt={banner.altText}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Banner Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center px-4 max-w-4xl">
                <motion.h2
                  className="text-2xl md:text-4xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {banner.title}
                </motion.h2>
                {banner.description && (
                  <motion.p
                    className="text-base md:text-lg text-white mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {banner.description}
                  </motion.p>
                )}
                {banner.linkUrl && (
                  <motion.a
                    href={banner.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Learn More
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-20"
        aria-label="Previous banner"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-20"
        aria-label="Next banner"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
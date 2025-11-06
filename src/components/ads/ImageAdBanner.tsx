"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "@/components/Container";

interface CarouselAd {
  imageUrl: string;
  link: string;
}

interface ImageAdBannerProps {
  leftImageUrl: string;
  leftLink: string;
  carouselAds: CarouselAd[];
  height?: string;
  autoPlayInterval?: number;
}

const ImageAdBanner = ({
  leftImageUrl,
  leftLink,
  carouselAds,
  height = "h-[200px]",
  autoPlayInterval = 3000,
}: ImageAdBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselAds.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [carouselAds.length, autoPlayInterval]);

  return (
    <div className="w-full py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Image Ad - Takes 2/3 width */}
          <div className="md:col-span-2">
            <Link
              href={leftLink}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block"
            >
              <div className={`relative ${height} w-full`}>
                <Image
                  src={leftImageUrl}
                  alt="Advertisement"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Right Carousel Ad - Takes 1/3 width */}
          <div className="md:col-span-1">
            <div className={`relative overflow-hidden rounded-xl shadow-md ${height}`}>
              {carouselAds.map((ad, index) => (
                <Link
                  key={index}
                  href={ad.link}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={ad.imageUrl}
                      alt={`Advertisement ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}

              {/* Carousel Indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {carouselAds.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-6"
                        : "bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ImageAdBanner;

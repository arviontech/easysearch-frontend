"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import AreaCard from "@/components/AreaCard";
import Container from "@/components/Container";

const PopularAreas = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const areas = [
    {
      name: "Kazla",
      propertyCount: 2161,
      imageUrl: "/assets/hero-img.jpg",
      href: "/area/kazla",
    },
    {
      name: "Shaheb Bazar",
      propertyCount: 1521,
      imageUrl: "/assets/hero-img.jpg",
      href: "/area/shaheb-bazar",
    },
    {
      name: "Uposhohor",
      propertyCount: 3319,
      imageUrl: "/assets/hero-img.jpg",
      href: "/area/uposhohor",
    },
    {
      name: "Motihar",
      propertyCount: 2030,
      imageUrl: "/assets/hero-img.jpg",
      href: "/area/motihar",
    },
    {
      name: "Padma Residential",
      propertyCount: 1418,
      imageUrl: "/assets/hero-img.jpg",
      href: "/area/padma-residential",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Most popular areas in Rajshahi
          </h2>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <AreaCard
                name={area.name}
                propertyCount={area.propertyCount}
                imageUrl={area.imageUrl}
                href={area.href}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularAreas;

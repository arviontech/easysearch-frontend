"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AreaCard from "@/components/AreaCard";
import Container from "@/components/Container";

const PopularAreas = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const areas = [
    {
      name: "Kazla",
      propertyCount: 2161,
      imageUrl: "/assets/hero-image.jpg",
      href: "/area/kazla",
    },
    {
      name: "Shaheb Bazar",
      propertyCount: 1521,
      imageUrl: "/assets/hero-image.jpg",
      href: "/area/shaheb-bazar",
    },
    {
      name: "Uposhohor",
      propertyCount: 3319,
      imageUrl: "/assets/hero-image.jpg",
      href: "/area/uposhohor",
    },
    {
      name: "Motihar",
      propertyCount: 2030,
      imageUrl: "/assets/hero-image.jpg",
      href: "/area/motihar",
    },
    {
      name: "Padma Residential",
      propertyCount: 1418,
      imageUrl: "/assets/hero-image.jpg",
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

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If we're at the end, scroll back to the start, otherwise scroll right
        if (container.scrollLeft >= maxScroll) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <Container>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Most popular areas in Rajshahi
          </h2>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <motion.button
              type="button"
              onClick={() => scroll("left")}
              className="bg-cyan-100 border border-cyan-600 p-2 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
              aria-label="Scroll left"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              initial="initial"
              animate="initial"
            >
              <motion.div
                className="absolute inset-0 bg-cyan-600 rounded-full"
                variants={{
                  initial: { scale: 0 },
                  hover: { scale: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10"
                variants={{
                  initial: { color: "#0e7490" },
                  hover: { color: "#ffffff" }
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll("right")}
              className="bg-cyan-100 border border-cyan-600 p-2 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
              aria-label="Scroll right"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              initial="initial"
              animate="initial"
            >
              <motion.div
                className="absolute inset-0 bg-cyan-600 rounded-full"
                variants={{
                  initial: { scale: 0 },
                  hover: { scale: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10"
                variants={{
                  initial: { color: "#0e7490" },
                  hover: { color: "#ffffff" }
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-0 pt-2 pl-3 h-[380px]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowY: "visible",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {areas.map((area) => (
            <motion.div
              key={area.name}
              className="flex-shrink-0 w-[280px] md:w-[360px] snap-start mt-4"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <AreaCard
                name={area.name}
                propertyCount={area.propertyCount}
                imageUrl={area.imageUrl}
                href={area.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default PopularAreas;

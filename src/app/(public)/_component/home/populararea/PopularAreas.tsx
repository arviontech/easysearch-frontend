"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AreaCard from "@/app/(public)/_component/areacard/AreaCard";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const AREAS = [
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

const PopularAreas = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

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
      <PublicContainer>
        <SectionHeader
          title="Most popular areas in Rajshahi"
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
        />

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
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {AREAS.map((area) => (
            <motion.div
              key={area.name}
              className="flex-shrink-0 w-[280px] md:w-[360px] snap-start mt-4"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <AreaCard {...area} />
            </motion.div>
          ))}
        </motion.div>
      </PublicContainer>
    </section>
  );
};

export default PopularAreas;

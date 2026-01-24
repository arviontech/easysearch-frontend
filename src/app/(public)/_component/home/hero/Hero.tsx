"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SearchBar } from "./components/SearchBar";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/hero-image.jpg"
          alt="Rajshahi City scenic view"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-white text-5xl md:text-7xl font-black drop-shadow-2xl mb-4 tracking-tight">
            Discover <span className="text-cyan-400">Rajshahi&apos;s</span><br />
            Best Services
          </h1>
          <p className="text-cyan-50 text-xl md:text-2xl font-medium drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
            From cozy rentals to expert doctors - find everything you need in the City of Education.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full flex justify-center"
        >
          <SearchBar />
        </motion.div>

        {/* Floating Stats or Trust Badges (Optional but adds premium feel) */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">500+</span>
            <span className="text-xs uppercase tracking-widest font-bold opacity-60">Verified Listings</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">10k+</span>
            <span className="text-xs uppercase tracking-widest font-bold opacity-60">Happy Users</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">24/7</span>
            <span className="text-xs uppercase tracking-widest font-bold opacity-60">Local Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

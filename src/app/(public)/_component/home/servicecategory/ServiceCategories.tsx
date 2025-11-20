"use client";

import {
  Building2,
  Home,
  MapPin,
  Package,
  Stethoscope,
  UtensilsCrossed,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import ServiceCategoryCard from "@/app/(public)/_component/servicecategorycard/ServiceCategoryCard";

const ServiceCategories = () => {
  const categories = [
    {
      icon: Home,
      title: "Houses",
      href: "/for-rent/houses",
    },
    {
      icon: Building2,
      title: "Hostels",
      href: "/for-rent/hostels",
    },
    {
      icon: Stethoscope,
      title: "Doctors",
      href: "/find/doctor",
    },
    {
      icon: Briefcase,
      title: "Jobs",
      href: "/find/jobs",
    },
    {
      icon: UtensilsCrossed,
      title: "Catering",
      href: "/catering",
    },
    {
      icon: MapPin,
      title: "Tourism",
      href: "/tourism",
    },
  ];

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Which type of service suits your needs?
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <ServiceCategoryCard
                icon={category.icon}
                title={category.title}
                href={category.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </PublicContainer>
    </section>
  );
};

export default ServiceCategories;

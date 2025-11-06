"use client";

import {
  Home,
  Building2,
  Stethoscope,
  UtensilsCrossed,
  MapPin,
  Package,
} from "lucide-react";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import Container from "@/components/Container";

const ServiceCategories = () => {
  const categories = [
    {
      icon: Home,
      title: "Houses",
      href: "/house-rent",
    },
    {
      icon: Building2,
      title: "Hostels",
      href: "/hostel-rent",
    },
    {
      icon: Stethoscope,
      title: "Doctors",
      href: "/find-doctor",
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
    {
      icon: Package,
      title: "All Services",
      href: "/services",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Which type of service suits your needs?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <ServiceCategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              href={category.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceCategories;

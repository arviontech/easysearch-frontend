"use client";

import {
  Building2,
  Home,
  MapPin,
  Package,
  Stethoscope,
  UtensilsCrossed,
  Briefcase,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import ServiceCategoryCard from "@/app/(public)/_component/servicecategorycard/ServiceCategoryCard";
import { useGetAllCategoriesQuery } from "@/lib/redux/features/category/categoryApi";

const ServiceCategories = () => {
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery(undefined);
  const categories = categoriesData?.data || [];

  if (isLoading) {
    return (
      <section className="py-12 bg-white/40 backdrop-blur-sm">
        <PublicContainer>
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-[#008ca1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </PublicContainer>
      </section>
    )
  }

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
          {categories.map((category: any) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <ServiceCategoryCard
                icon={Layers} // Fallback icon
                imageUrl={category.categoryImage}
                title={category.categoryName}
                href={`/services/${category.id}`} // Assuming dynamic route or mapping
              />
            </motion.div>
          ))}
        </motion.div>
      </PublicContainer>
    </section>
  );
};

export default ServiceCategories;

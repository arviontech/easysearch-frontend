"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCategoryCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
  isActive?: boolean;
}

const ServiceCategoryCard = ({
  icon: Icon,
  title,
  href,
  isActive = false,
}: ServiceCategoryCardProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-3 px-6 py-4 rounded-lg border-2 transition-all hover:border-blue-600 hover:bg-blue-50 ${
        isActive
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 bg-white hover:shadow-md"
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span
        className={`text-sm font-semibold text-center ${
          isActive ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default ServiceCategoryCard;

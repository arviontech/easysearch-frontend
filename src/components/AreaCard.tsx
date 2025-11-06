"use client";

import Image from "next/image";
import Link from "next/link";

interface AreaCardProps {
  name: string;
  propertyCount: number;
  imageUrl: string;
  href: string;
}

const AreaCard = ({ name, propertyCount, imageUrl, href }: AreaCardProps) => {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-200">
          {propertyCount.toLocaleString()} Properties
        </p>
      </div>
    </Link>
  );
};

export default AreaCard;

"use client";

import Image from "next/image";
import Link from "next/link";

interface CardAdProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const CardAd = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
}: CardAdProps) => {
  return (
    <Link
      href={ctaLink}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative h-full"
    >
      {/* Full Card Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Black Gradient Overlay - Fades from bottom upward */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Content at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white flex flex-col justify-end h-[140px]">
        <div className="flex-1 flex flex-col justify-end">
          <h3 className="text-lg font-bold mb-1.5 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm opacity-90 mb-3">
              {subtitle}
            </p>
          )}
        </div>

        <button className="w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition text-sm">
          {ctaText}
        </button>
      </div>
    </Link>
  );
};

export default CardAd;

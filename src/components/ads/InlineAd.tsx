"use client";

import Image from "next/image";
import Link from "next/link";

interface InlineAdProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
}

const InlineAd = ({
  title,
  subtitle,
  imageUrl,
  ctaLink,
  ctaText,
  backgroundColor = "bg-gradient-to-br from-orange-500 to-pink-500",
}: InlineAdProps) => {
  return (
    <Link
      href={ctaLink}
      className="group block rounded-xl overflow-hidden h-full hover:opacity-90 transition-opacity duration-300"
    >
      {/* Image Only */}
      <div className="relative h-full w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default InlineAd;

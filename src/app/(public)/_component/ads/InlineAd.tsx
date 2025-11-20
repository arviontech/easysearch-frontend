"use client";

import Image from "next/image";
import Link from "next/link";

interface InlineAdProps {
  title: string;
  imageUrl: string;
  ctaLink: string;
}

const InlineAd = ({ title, imageUrl, ctaLink }: InlineAdProps) => {
  return (
    <Link
      href={ctaLink}
      className="group block rounded-3xl overflow-hidden h-full hover:opacity-90 transition-opacity duration-300"
    >
      {/* Image Only */}
      <div className="relative h-full w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
    </Link>
  );
};

export default InlineAd;

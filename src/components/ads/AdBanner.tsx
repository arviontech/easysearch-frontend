"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";

interface AdBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  textColor?: string;
}

const AdBanner = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
  backgroundColor = "bg-gradient-to-r from-blue-600 to-blue-400",
  textColor = "text-white",
}: AdBannerProps) => {
  return (
    <div className="w-full py-8">
      <Container>
        <div
          className={`relative rounded-2xl overflow-hidden shadow-xl ${backgroundColor}`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-4`}
              >
                {title}
              </h2>
              <p className={`text-lg md:text-xl ${textColor} mb-6`}>
                {subtitle}
              </p>
              <div>
                <Link
                  href={ctaLink}
                  className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {ctaText}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-full">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdBanner;

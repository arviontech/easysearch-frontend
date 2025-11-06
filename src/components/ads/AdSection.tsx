"use client";

import InlineAd from "./InlineAd";
import Container from "@/components/Container";

const AdSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <Container>
        <div className="grid md:grid-cols-5 gap-6 h-[200px]">
          {/* Ad 1 - Smaller (2 columns) */}
          <div className="md:col-span-2">
            <InlineAd
              title="Special Offers"
              subtitle="Get up to 25% OFF on premium listings"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Explore Deals"
              ctaLink="/offers"
              backgroundColor="bg-gradient-to-br from-purple-600 to-blue-500"
            />
          </div>

          {/* Ad 2 - Wider (3 columns) */}
          <div className="md:col-span-3">
            <InlineAd
              title="List Your Property"
              subtitle="Reach thousands of potential tenants today"
              imageUrl="/assets/hero-img.jpg"
              ctaText="Start Listing"
              ctaLink="/list-property"
              backgroundColor="bg-gradient-to-br from-green-600 to-teal-500"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdSection;

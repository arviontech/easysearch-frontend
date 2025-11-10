"use client";

import Container from "@/components/Container";
import InlineAd from "./InlineAd";

const AdSection = () => {
  return (
    <section className="py-8 bg-white/40 backdrop-blur-sm">
      <Container>
        <div className="grid md:grid-cols-5 gap-6 h-[200px]">
          {/* Ad 1 - Smaller (2 columns) */}
          <div className="md:col-span-2">
            <InlineAd
              title="Special Offers"
              imageUrl="/assets/hero-image.jpg"
              ctaLink="/offers"
            />
          </div>

          {/* Ad 2 - Wider (3 columns) */}
          <div className="md:col-span-3">
            <InlineAd
              title="List Your Property"
              imageUrl="/assets/hero-image.jpg"
              ctaLink="/list-property"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdSection;

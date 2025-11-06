import Hero from "@/components/Hero";
import ServiceCategories from "@/components/sections/ServiceCategories";
import PopularAreas from "@/components/sections/PopularAreas";
import FeaturedHouses from "@/components/sections/FeaturedHouses";
import PopularHostels from "@/components/sections/PopularHostels";
import TopDoctors from "@/components/sections/TopDoctors";
import CateringServices from "@/components/sections/CateringServices";
import LocalFoods from "@/components/sections/LocalFoods";
import TourismDestinations from "@/components/sections/TourismDestinations";
import ImageAdBanner from "@/components/ads/ImageAdBanner";
import AdSection from "@/components/ads/AdSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceCategories />

      {/* Image Banner Ad - Two Columns with Carousel */}
      <ImageAdBanner
        leftImageUrl="/assets/hero-img.jpg"
        leftLink="/services"
        carouselAds={[
          { imageUrl: "/assets/hero-img.jpg", link: "/offers" },
          { imageUrl: "/assets/hero-img.jpg", link: "/special-deals" },
          { imageUrl: "/assets/hero-img.jpg", link: "/promotions" },
        ]}
        height="h-[200px]"
        autoPlayInterval={3000}
      />

      <FeaturedHouses />
      <PopularHostels />
      <TopDoctors />

      {/* Inline Ad Section - After 3 sections */}
      <AdSection />

      <CateringServices />
      <LocalFoods />
      <TourismDestinations />

      {/* Inline Ad Section - After 3 more sections */}
      <AdSection />

      <PopularAreas />
    </div>
  );
};

export default Home;

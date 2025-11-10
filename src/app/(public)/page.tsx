import AdSection from "@/components/ads/AdSection";
import ImageAdBanner from "@/components/ads/ImageAdBanner";
import Hero from "@/components/Hero";
import CateringServices from "@/components/sections/CateringServices";
import FeaturedHouses from "@/components/sections/FeaturedHouses";
import FeaturedJobs from "@/components/sections/FeaturedJobs";
import LocalFoods from "@/components/sections/LocalFoods";
import PopularAreas from "@/components/sections/PopularAreas";
import PopularHostels from "@/components/sections/PopularHostels";
import ServiceCategories from "@/components/sections/ServiceCategories";
import TopDoctors from "@/components/sections/TopDoctors";
import TourismDestinations from "@/components/sections/TourismDestinations";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceCategories />

      {/* Image Banner Ad - Two Columns with Carousel */}
      <ImageAdBanner
        leftImageUrl="/assets/hero-image.jpg"
        leftLink="/services"
        carouselAds={[
          { imageUrl: "/assets/hero-image.jpg", link: "/offers" },
          { imageUrl: "/assets/hero-image.jpg", link: "/special-deals" },
          { imageUrl: "/assets/hero-image.jpg", link: "/promotions" },
        ]}
        height="h-[200px]"
        autoPlayInterval={3000}
      />

      <FeaturedHouses />
      <PopularHostels />
      <TopDoctors />
      <FeaturedJobs />

      {/* Inline Ad Section - After 4 sections */}
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

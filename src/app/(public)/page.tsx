import AdSection from "@/app/(public)/_component/ads/AdSection";
import ImageAdBanner from "@/app/(public)/_component/ads/ImageAdBanner";
import Hero from "@/app/(public)/_component/home/hero/Hero";
import CateringServices from "@/app/(public)/_component/home/cateringservice/CateringServices";
import FeaturedHouses from "@/app/(public)/_component/home/featureshouse/FeaturedHouses";
import FeaturedJobs from "@/app/(public)/_component/home/featuresjobs/FeaturedJobs";
import LocalFoods from "@/app/(public)/_component/home/localfoods/LocalFoods";
import PopularAreas from "@/app/(public)/_component/home/populararea/PopularAreas";
import PopularHostels from "@/app/(public)/_component/home/popularhostels/PopularHostels";
import ServiceCategories from "@/app/(public)/_component/home/servicecategory/ServiceCategories";
import TopDoctors from "@/app/(public)/_component/home/topdoctors/TopDoctors";
import TourismDestinations from "@/app/(public)/_component/home/tourismdestination/TourismDestinations";

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

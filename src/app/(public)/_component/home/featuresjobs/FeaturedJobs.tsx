"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import JobCard from "@/app/(public)/_component/cards/JobCard";
import { SectionHeader } from "@/app/(public)/_component/shared/SectionHeader";

const JOBS = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TechBD Limited",
    location: "Rajshahi City",
    jobType: "Full-time",
    salary: "৳35,000 - 45,000",
    experience: "2-3 years",
    education: "B.Sc in CSE",
    postedDate: "2 days ago",
    deadline: "March 15, 2025",
    vacancies: 3,
    category: "IT & Software",
    companyLogo: "/assets/hero-image.jpg",
  },
  {
    id: "2",
    title: "Marketing Executive",
    company: "Creative Solutions",
    location: "Shaheb Bazar",
    jobType: "Full-time",
    salary: "৳25,000 - 35,000",
    experience: "1-2 years",
    education: "BBA/MBA",
    postedDate: "5 days ago",
    deadline: "March 20, 2025",
    vacancies: 2,
    category: "Sales & Marketing",
    companyLogo: "/assets/hero-image.jpg",
  },
  {
    id: "3",
    title: "Civil Engineer",
    company: "BuildTech Engineers",
    location: "Uposhohor",
    jobType: "Full-time",
    salary: "৳40,000 - 60,000",
    experience: "3-5 years",
    education: "B.Sc in Civil Engineering",
    postedDate: "1 week ago",
    deadline: "March 10, 2025",
    vacancies: 1,
    category: "Engineering",
    companyLogo: "/assets/hero-image.jpg",
  },
  {
    id: "4",
    title: "Teacher (English)",
    company: "Rajshahi College",
    location: "Boalia",
    jobType: "Full-time",
    salary: "৳25,000 - 35,000",
    experience: "1-3 years",
    education: "M.A in English",
    postedDate: "4 days ago",
    deadline: "March 12, 2025",
    vacancies: 1,
    category: "Education",
    companyLogo: "/assets/hero-image.jpg",
  },
];

const FeaturedJobs = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsToShow = 4;
  const totalPages = Math.ceil(JOBS.length / cardsToShow);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIndex = currentPage * cardsToShow;
  const visibleItems = JOBS.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-white/40 backdrop-blur-sm">
      <PublicContainer>
        <SectionHeader
          title="Latest Job Opportunities"
          onPrev={prevPage}
          onNext={nextPage}
          prevDisabled={currentPage === 0}
          nextDisabled={currentPage === totalPages - 1}
          viewAllHref="/find/jobs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative overflow-hidden pl-3 pt-2 pb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {visibleItems.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </PublicContainer>
    </section>
  );
};

export default FeaturedJobs;

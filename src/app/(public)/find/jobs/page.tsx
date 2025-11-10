"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import JobCard from "@/components/cards/JobCard";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    jobType: "",
    location: "",
    salaryRange: "",
    experience: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "All Categories",
    "IT & Software",
    "Engineering",
    "Healthcare",
    "Education",
    "Sales & Marketing",
    "Finance & Accounting",
    "Customer Service",
    "Hospitality",
    "Administration",
  ];

  const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];

  const locations = [
    "All Locations",
    "Rajshahi City",
    "Kazla",
    "Shaheb Bazar",
    "Uposhohor",
    "Motihar",
    "Boalia",
  ];

  const salaryRanges = [
    "All Salaries",
    "Below 15,000",
    "15,000 - 25,000",
    "25,000 - 40,000",
    "40,000 - 60,000",
    "Above 60,000",
  ];

  const experienceLevels = [
    "All Levels",
    "Entry Level",
    "1-2 years",
    "3-5 years",
    "5+ years",
  ];

  // Mock job data
  const mockJobs = [
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
      title: "Nurse",
      company: "Rajshahi Medical College Hospital",
      location: "Laxmipur",
      jobType: "Full-time",
      salary: "৳20,000 - 30,000",
      experience: "1-2 years",
      education: "Nursing Diploma/Degree",
      postedDate: "3 days ago",
      deadline: "March 18, 2025",
      vacancies: 5,
      category: "Healthcare",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "5",
      title: "Accounts Officer",
      company: "Prime Bank Limited",
      location: "Kazla",
      jobType: "Full-time",
      salary: "৳30,000 - 40,000",
      experience: "2-3 years",
      education: "BBA/MBA in Accounting",
      postedDate: "1 day ago",
      deadline: "March 25, 2025",
      vacancies: 2,
      category: "Finance & Accounting",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "6",
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
    {
      id: "7",
      title: "Customer Service Representative",
      company: "Grameenphone",
      location: "Rajshahi City",
      jobType: "Full-time",
      salary: "৳18,000 - 25,000",
      experience: "0-1 year",
      education: "Any Graduate",
      postedDate: "6 days ago",
      deadline: "March 22, 2025",
      vacancies: 10,
      category: "Customer Service",
      companyLogo: "/assets/hero-image.jpg",
    },
    {
      id: "8",
      title: "Web Developer Intern",
      company: "Digital Agency BD",
      location: "Shaheb Bazar",
      jobType: "Internship",
      salary: "৳10,000 - 15,000",
      experience: "Fresher",
      education: "B.Sc in CSE (pursuing)",
      postedDate: "2 days ago",
      deadline: "March 8, 2025",
      vacancies: 3,
      category: "IT & Software",
      companyLogo: "/assets/hero-image.jpg",
    },
  ];

  // Filter jobs
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !filters.category ||
      filters.category === "All Categories" ||
      job.category === filters.category;

    const matchesJobType =
      !filters.jobType ||
      filters.jobType === "All Types" ||
      job.jobType === filters.jobType;

    const matchesLocation =
      !filters.location ||
      filters.location === "All Locations" ||
      job.location === filters.location;

    return matchesSearch && matchesCategory && matchesJobType && matchesLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filters, searchQuery, currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <Container>
        <div className="py-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Find Jobs in Rajshahi
            </h1>
            <p className="text-gray-600">
              Explore {filteredJobs.length} job opportunities in various sectors
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-700 transition flex items-center gap-2 font-medium"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="mb-6 p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) =>
                      setFilters({ ...filters, jobType: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters({ ...filters, experience: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {experienceLevels.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    category: "",
                    jobType: "",
                    location: "",
                    salaryRange: "",
                    experience: "",
                  })
                }
                className="mt-4 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing {paginatedJobs.length} of {filteredJobs.length} jobs
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No jobs found matching your criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-cyan-200 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-cyan-600 text-white"
                      : "border border-cyan-200 hover:bg-cyan-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-cyan-200 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default JobsPage;

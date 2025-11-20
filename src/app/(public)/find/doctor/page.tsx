"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Stethoscope, SlidersHorizontal, X, Clock, Calendar } from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import DoctorCard from "@/app/(public)/_component/cards/DoctorCard";

// Department categories based on requirements
const departments = [
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gynecology",
  "ENT",
  "Neurology",
  "General Medicine",
  "Dental",
  "Psychiatry",
];

// Mock data - Replace with API call
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Ahmed Rahman",
    qualifications: "MBBS, FCPS (Cardiology)",
    specialization: "Cardiologist",
    rating: 4.8,
    reviewCount: 156,
    experience: 15,
    consultationFee: 1200,
    availableDays: "Sat-Thu",
    availableTimes: "5:00 PM - 9:00 PM",
    languages: ["Bangla", "English"],
    hospital: "Rajshahi Medical College Hospital",
    location: "Laxmipur, Rajshahi",
    imageUrl: "/assets/hero-image.jpg",
    phoneNumber: "+8801712345678",
    department: "Cardiology",
  },
  {
    id: "2",
    name: "Dr. Fatima Sultana",
    qualifications: "MBBS, MD (Pediatrics)",
    specialization: "Pediatrician",
    rating: 4.9,
    reviewCount: 203,
    experience: 12,
    consultationFee: 800,
    availableDays: "Sun-Thu",
    availableTimes: "4:00 PM - 8:00 PM",
    languages: ["Bangla", "English"],
    hospital: "Popular Diagnostic Centre",
    location: "Shaheb Bazar, Rajshahi",
    imageUrl: "/assets/hero-image.jpg",
    phoneNumber: "+8801812345678",
    department: "Pediatrics",
  },
  {
    id: "3",
    name: "Dr. Kamal Hossain",
    qualifications: "MBBS, MS (Orthopedics)",
    specialization: "Orthopedic Surgeon",
    rating: 4.7,
    reviewCount: 128,
    experience: 18,
    consultationFee: 1000,
    availableDays: "Sat-Wed",
    availableTimes: "6:00 PM - 10:00 PM",
    languages: ["Bangla", "English", "Hindi"],
    hospital: "Islami Bank Hospital",
    location: "Kazla, Rajshahi",
    imageUrl: "/assets/hero-image.jpg",
    phoneNumber: "+8801912345678",
    department: "Orthopedics",
  },
];

const DoctorPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    hospital: "",
    days: [] as string[],
    timeSlot: [] as string[],
  });

  // Get unique hospitals
  const hospitals = Array.from(new Set(mockDoctors.map(d => d.hospital))).sort();

  const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["Morning (8AM-12PM)", "Afternoon (12PM-5PM)", "Evening (5PM-9PM)", "Night (9PM-12AM)"];

  // Filter doctors based on all criteria
  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesDepartment = selectedDepartment === "All" || doctor.department === selectedDepartment;
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHospital = !filters.hospital || doctor.hospital === filters.hospital;

    const matchesDays = filters.days.length === 0 || filters.days.some(day =>
      doctor.availableDays.toLowerCase().includes(day.substring(0, 3).toLowerCase())
    );

    const matchesTimeSlot = filters.timeSlot.length === 0 || filters.timeSlot.some(slot => {
      const time = doctor.availableTimes.toLowerCase();
      if (slot.includes("Morning") && (time.includes("am") || time.includes("8") || time.includes("9") || time.includes("10") || time.includes("11"))) return true;
      if (slot.includes("Afternoon") && (time.includes("pm") && (time.includes("12") || time.includes("1") || time.includes("2") || time.includes("3") || time.includes("4")))) return true;
      if (slot.includes("Evening") && (time.includes("pm") && (time.includes("5") || time.includes("6") || time.includes("7") || time.includes("8")))) return true;
      if (slot.includes("Night") && (time.includes("pm") && (time.includes("9") || time.includes("10") || time.includes("11")))) return true;
      return false;
    });

    return matchesDepartment && matchesSearch && matchesHospital && matchesDays && matchesTimeSlot;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filters, searchQuery, selectedDepartment, currentPage, totalPages]);

  const clearFilter = (filterKey: string, value?: string) => {
    if (value && Array.isArray(filters[filterKey as keyof typeof filters])) {
      setFilters({
        ...filters,
        [filterKey]: (filters[filterKey as keyof typeof filters] as string[]).filter(
          (item) => item !== value
        ),
      });
    } else {
      setFilters({ ...filters, [filterKey]: filterKey === "days" || filterKey === "timeSlot" ? [] : "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 pt-24 pb-16">
      <PublicContainer>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Stethoscope className="w-10 h-10 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Find Doctors in Rajshahi
            </h1>
          </div>
          <p className="text-gray-600">
            Browse by specialty and book appointments with top doctors
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition shadow-sm"
            />
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cyan-200 rounded-xl hover:bg-cyan-50 transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-cyan-600" />
            <span className="font-medium text-gray-700">Filters</span>
            {(selectedDepartment !== "All" || filters.hospital || filters.days.length > 0 || filters.timeSlot.length > 0) && (
              <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {(selectedDepartment !== "All" ? 1 : 0) + (filters.hospital ? 1 : 0) + filters.days.length + filters.timeSlot.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-2xl border border-cyan-200 p-6 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(255,255,255,0.5)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedDepartment("All");
                    setFilters({
                      hospital: "",
                      days: [],
                      timeSlot: [],
                    });
                  }}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                  >
                    <option value="All">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hospital/Clinic Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Hospital / Clinic
                  </label>
                  <select
                    value={filters.hospital}
                    onChange={(e) =>
                      setFilters({ ...filters, hospital: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">All Hospitals</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital} value={hospital}>
                        {hospital}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day Available Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Day Available
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = filters.days.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => {
                            const newDays = isSelected
                              ? filters.days.filter((d) => d !== day)
                              : [...filters.days, day];
                            setFilters({ ...filters, days: newDays });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                            }`}
                        >
                          {day.substring(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Available Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Time Available
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => {
                      const isSelected = filters.timeSlot.includes(slot);
                      return (
                        <label
                          key={slot}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              const newSlots = isSelected
                                ? filters.timeSlot.filter((s) => s !== slot)
                                : [...filters.timeSlot, slot];
                              setFilters({ ...filters, timeSlot: newSlots });
                            }}
                            className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-cyan-700 transition">
                            {slot}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Pills */}
        {(selectedDepartment !== "All" || filters.hospital || filters.days.length > 0 || filters.timeSlot.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
            {selectedDepartment !== "All" && (
              <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                <Stethoscope className="w-3.5 h-3.5" />
                {selectedDepartment}
                <button
                  onClick={() => setSelectedDepartment("All")}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.hospital && (
              <span className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                {filters.hospital}
                <button
                  onClick={() => clearFilter("hospital")}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.days.map((day) => (
              <span
                key={day}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <Calendar className="w-3.5 h-3.5" />
                {day}
                <button
                  onClick={() => clearFilter("days", day)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.timeSlot.map((slot) => (
              <span
                key={slot}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
              >
                <Clock className="w-3.5 h-3.5" />
                {slot.split(" ")[0]}
                <button
                  onClick={() => clearFilter("timeSlot", slot)}
                  className="ml-1 hover:bg-cyan-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Showing {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "doctor" : "doctors"}
            {selectedDepartment !== "All" && (
              <span className="text-gray-600 font-normal"> in {selectedDepartment}</span>
            )}
          </h2>
        </div>

        {/* Doctor Grid */}
        {paginatedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try selecting a different department or adjusting your search
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredDoctors.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition ${currentPage === page
                    ? "bg-cyan-600 text-white"
                    : "border border-cyan-200 hover:bg-cyan-50"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </PublicContainer>
    </div>
  );
};

export default DoctorPage;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import { SEARCH_CATEGORIES } from "@/data/categories";

export const SearchBar = () => {
    const [selectedCategory, setSelectedCategory] = useState("House");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!location.trim()) {
            dispatch(addNotification({ type: "error", message: "Please enter a location to search" }));
            return;
        }

        const searchParams = new URLSearchParams({
            category: selectedCategory,
            location: location.trim(),
            priceRange: priceRange.trim(),
        });

        router.push(`/search?${searchParams.toString()}`);
        dispatch(addNotification({
            type: "success",
            message: `Searching for ${selectedCategory} in ${location.trim()}`
        }));
    };

    return (
        <div className="w-full max-w-4xl px-4">
            <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row items-stretch md:items-center bg-cyan-50/90 backdrop-blur-md rounded-3xl md:rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.3)] overflow-hidden border border-white/50 p-2 gap-2">
                    {/* Category Dropdown */}
                    <div className="px-6 py-2 md:py-0 md:border-r border-cyan-200/50 flex flex-col justify-center min-w-[140px]">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-800/60 mb-1">Category</span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-sm text-gray-800 outline-none bg-transparent cursor-pointer font-bold appearance-none"
                        >
                            {SEARCH_CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div className="flex-1 px-6 py-2 md:py-0 md:border-r border-cyan-200/50 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-800/60 mb-1">Location</span>
                        <input
                            type="text"
                            placeholder="Where are you looking?"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-bold"
                        />
                    </div>

                    {/* Price Range */}
                    <div className="flex-1 px-6 py-2 md:py-0 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-800/60 mb-1">Budget</span>
                        <input
                            type="text"
                            placeholder="Any budget"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-bold"
                        />
                    </div>

                    {/* Search Button */}
                    <motion.button
                        type="submit"
                        className="bg-cyan-600 text-white p-4 rounded-2xl md:rounded-full shadow-lg hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 group min-w-[120px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="md:hidden lg:inline text-sm font-bold">Search</span>
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

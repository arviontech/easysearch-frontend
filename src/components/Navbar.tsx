"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  Bell,
  ChevronDown,
  Home,
  Building2,
  Stethoscope,
  UtensilsCrossed,
  MapPin,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";

const Navbar = () => {
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("House");
  const userMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: "House", label: "House Rent", icon: Home },
    { value: "Hostel", label: "Hostel Rent", icon: Building2 },
    { value: "Doctor", label: "Find Doctor", icon: Stethoscope },
    { value: "Catering", label: "Catering", icon: UtensilsCrossed },
    { value: "Tourism", label: "Tourism", icon: MapPin },
    { value: "Foods", label: "Foods", icon: UtensilsCrossed },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Navigation Bar */}
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">
          {/* Left: Logo & Main Navigation */}
          <div className="flex items-center gap-8">
            {/* Mobile Hamburger */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-blue-700 text-base font-bold leading-none">
                  Rajshahi
                </span>
                <span className="text-gray-600 text-xs leading-none">
                  Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/house-rent"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                House
              </Link>
              <Link
                href="/hostel-rent"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                Hostel
              </Link>
              <Link
                href="/find-doctor"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                Doctor
              </Link>
              <Link
                href="/catering"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                Catering
              </Link>

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition flex items-center gap-1"
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showMoreMenu && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48">
                    <Link
                      href="/foods"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Foods
                    </Link>
                    <Link
                      href="/tourism"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tourism & Guides
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3">
            {/* Search Icon (Mobile) */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="hidden md:flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition text-sm font-medium text-gray-700"
            >
              {language === "en" ? "EN" : "বাং"}
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Combined Menu + User Button with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 border-2 border-gray-300 rounded-full pl-4 pr-2 py-2 hover:shadow-md transition"
              >
                <Menu className="w-4 h-4 text-gray-700" />
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-medium">Sign up</span>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    href="/help"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Help Center
                  </Link>
                </div>
              )}
            </div>
          </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;

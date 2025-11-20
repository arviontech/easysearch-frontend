"use client";

import {
  Bell,
  Briefcase,
  Building2,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  Search,
  Settings,
  Stethoscope,
  User,
  UserPlus,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLanguage, openModal, addNotification } from "@/lib/redux/slices/uiSlice";
import { logout } from "@/lib/redux/slices/authSlice";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Debug: Log user data when it changes
  useEffect(() => {
    // User data sync check
  }, [isAuthenticated, user]);

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

  const handleLanguageToggle = () => {
    dispatch(setLanguage(language === "en" ? "bn" : "en"));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addNotification({
      type: "success",
      message: "Logged out successfully!",
    }));
    setShowUserMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-white shadow-lg">
      {/* Top Navigation Bar */}
      <div className="py-4">
        <PublicContainer>
          <div className="flex items-center justify-between">
            {/* Left: Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
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
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/for-rent/houses"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/for-rent/houses")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <Home className="w-4 h-4" />
                House
              </Link>
              <Link
                href="/for-rent/hostels"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/for-rent/hostels")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <Building2 className="w-4 h-4" />
                Hostel
              </Link>
              <Link
                href="/find/doctor"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/find/doctor")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <Stethoscope className="w-4 h-4" />
                Doctor
              </Link>
              <Link
                href="/find/jobs"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/find/jobs")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <Briefcase className="w-4 h-4" />
                Jobs
              </Link>
              <Link
                href="/catering"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/catering")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Catering
              </Link>
              <Link
                href="/foods"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/foods")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Foods
              </Link>
              <Link
                href="/tourism"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${pathname?.startsWith("/tourism")
                  ? "bg-cyan-600 text-white border-2 border-cyan-700 shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)]"
                  : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <MapPin className="w-4 h-4" />
                Tourism
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-3">
              {/* Search Icon (Mobile) */}
              <button
                type="button"
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={handleLanguageToggle}
                className="hidden md:flex items-center gap-1 px-3 py-2 bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-lg transition text-sm font-medium text-gray-700"
                aria-label={`Switch to ${language === "en" ? "Bengali" : "English"}`}
              >
                {language === "en" ? "EN" : "বাং"}
              </button>

              {/* Notification Bell */}
              <button
                type="button"
                className="relative p-2 bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-full transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Combined Menu + User Button with Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                  className="flex items-center gap-3 bg-cyan-50/60 backdrop-blur-md border border-white rounded-full pl-4 pr-2 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.15)] transition"
                >
                  <Menu className="w-4 h-4 text-gray-700" />
                  {isAuthenticated && user ? (
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name}
                    </span>
                  ) : null}
                  <motion.div
                    className="w-8 h-8 bg-cyan-100 border border-cyan-600 rounded-full flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                    initial="initial"
                    animate="initial"
                  >
                    {isAuthenticated && user?.profilePhoto ? (
                      <Image
                        src={user.profilePhoto}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-cyan-600 rounded-full"
                          variants={{
                            initial: { scale: 0 },
                            hover: { scale: 1 }
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="relative z-10"
                          variants={{
                            initial: { color: "#0e7490" },
                            hover: { color: "#ffffff" }
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <User className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 w-64 bg-cyan-50 backdrop-blur-md rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] border border-white py-3 overflow-hidden"
                    >
                      {isAuthenticated && user ? (
                        <>
                          {/* User Info Section */}
                          <div className="px-4 py-3 border-b border-cyan-200/50">
                            <p className="text-base font-bold text-gray-900 truncate">
                              {user.name || "User"}
                            </p>
                            <p className="text-xs text-gray-600 truncate mt-0.5">
                              {user.email || user.contactNumber}
                            </p>
                            <span className="inline-block px-2 py-0.5 mt-2 text-xs font-medium bg-cyan-100 text-cyan-700 rounded-full capitalize">
                              {user.role.toLowerCase()}
                            </span>
                          </div>

                          {/* Profile Link */}
                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <Link
                              href="/profile"
                              className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition relative overflow-hidden"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <motion.div
                                className="absolute inset-0 bg-cyan-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 flex items-center gap-3 w-full"
                                variants={{
                                  initial: { color: "#374151" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <User className="w-4 h-4" />
                                <span className="font-medium">My Profile</span>
                              </motion.div>
                            </Link>
                          </motion.div>

                          {/* Settings Link */}
                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <Link
                              href="/settings"
                              className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition relative overflow-hidden"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <motion.div
                                className="absolute inset-0 bg-cyan-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 flex items-center gap-3 w-full"
                                variants={{
                                  initial: { color: "#374151" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <Settings className="w-4 h-4" />
                                <span className="font-medium">Settings</span>
                              </motion.div>
                            </Link>
                          </motion.div>

                          <div className="border-t border-cyan-200/50 my-2 mx-3" />

                          {/* Logout Button */}
                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <button
                              type="button"
                              className="group flex items-center gap-3 px-4 py-3 text-sm text-red-600 transition relative overflow-hidden w-full"
                              onClick={handleLogout}
                            >
                              <motion.div
                                className="absolute inset-0 bg-red-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 flex items-center gap-3 w-full"
                                variants={{
                                  initial: { color: "#dc2626" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <LogOut className="w-4 h-4" />
                                <span className="font-medium">Logout</span>
                              </motion.div>
                            </button>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          {/* Not Authenticated - Show Login/Signup */}
                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <button
                              type="button"
                              className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition relative overflow-hidden w-full"
                              onClick={() => {
                                setShowUserMenu(false);
                                dispatch(openModal("loginOpen"));
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-cyan-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 flex items-center gap-3 w-full"
                                variants={{
                                  initial: { color: "#374151" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <LogIn className="w-4 h-4" />
                                <span className="font-medium">Login</span>
                              </motion.div>
                            </button>
                          </motion.div>

                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <button
                              type="button"
                              className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition relative overflow-hidden w-full"
                              onClick={() => {
                                setShowUserMenu(false);
                                dispatch(openModal("signupOpen"));
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-cyan-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 flex items-center gap-3 w-full"
                                variants={{
                                  initial: { color: "#374151" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <UserPlus className="w-4 h-4" />
                                <span className="font-medium">Sign up</span>
                              </motion.div>
                            </button>
                          </motion.div>

                          <div className="border-t border-cyan-200/50 my-2 mx-3" />

                          <motion.div
                            whileHover="hover"
                            initial="initial"
                            animate="initial"
                          >
                            <Link
                              href="/help"
                              className="group flex items-center gap-3 px-4 py-2 text-sm text-gray-600 transition relative overflow-hidden"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <motion.div
                                className="absolute inset-0 bg-cyan-600 rounded-none"
                                variants={{
                                  initial: { scaleX: 0, originX: 0 },
                                  hover: { scaleX: 1, originX: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              />
                              <motion.div
                                className="relative z-10 w-full"
                                variants={{
                                  initial: { color: "#4b5563" },
                                  hover: { color: "#ffffff" }
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <span className="font-medium">Help Center</span>
                              </motion.div>
                            </Link>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </PublicContainer>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white bg-white/40 backdrop-blur-md">
          <PublicContainer>
            <div className="py-4 space-y-1">
              <Link
                href="/for-rent/houses"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/for-rent/houses")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Home className="w-4 h-4" />
                House Rent
              </Link>
              <Link
                href="/for-rent/hostels"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/for-rent/hostels")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Building2 className="w-4 h-4" />
                Hostel Rent
              </Link>
              <Link
                href="/find/doctor"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/find/doctor")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Stethoscope className="w-4 h-4" />
                Find Doctor
              </Link>
              <Link
                href="/find/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/find/jobs")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Briefcase className="w-4 h-4" />
                Find Jobs
              </Link>
              <Link
                href="/catering"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/catering")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Catering
              </Link>
              <Link
                href="/foods"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/foods")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Foods
              </Link>
              <Link
                href="/tourism"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition ${pathname?.startsWith("/tourism")
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <MapPin className="w-4 h-4" />
                Tourism & Guides
              </Link>

              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={handleLanguageToggle}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Language: {language === "en" ? "English" : "বাংলা"}
              </button>
            </div>
          </PublicContainer>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

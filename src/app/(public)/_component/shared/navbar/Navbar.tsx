"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, Search, X } from "lucide-react";
import PublicContainer from "@/app/(public)/_component/shared/publicContainer/PublicContainer";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLanguage } from "@/lib/redux/features/ui/uiSlice";
import { NavLink } from "./NavLink";
import { UserMenu } from "./UserMenu";
import { NAV_LINKS } from "./nav-data";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    dispatch(setLanguage(language === "en" ? "bn" : "en"));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-white shadow-lg">
      <div className="py-4">
        <PublicContainer>
          <div className="flex items-center justify-between">
            {/* Left: Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-blue-700 text-base font-bold leading-none">Rajshahi</span>
                  <span className="text-gray-600 text-xs leading-none">Services</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2 overflow-x-auto no-scrollbar max-w-[50vw]">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-3">
              <button type="button" className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              <button
                type="button"
                onClick={handleLanguageToggle}
                className="hidden md:flex items-center gap-1 px-3 py-2 bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-lg transition text-sm font-medium text-gray-700"
              >
                {language === "en" ? "EN" : "বাং"}
              </button>

              <button
                type="button"
                className="relative p-2 bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-full transition"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <UserMenu />
            </div>
          </div>
        </PublicContainer>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white bg-white/40 backdrop-blur-md max-h-[70vh] overflow-y-auto">
          <PublicContainer>
            <div className="py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.mobileLabel}
                  icon={link.icon}
                  mobile
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
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

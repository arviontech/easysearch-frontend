"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Building2,
  Users,
  Utensils,
  Stethoscope,
  Palmtree,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BarChart3,
  User,
  LogOut,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Hostels", href: "/admin/hostels", icon: Home },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Catering", href: "/admin/catering", icon: Utensils },
  { name: "Tourism", href: "/admin/tourism", icon: Palmtree },
  { name: "Foods", href: "/admin/foods", icon: Utensils },
  { name: "Users", href: "/admin/users", icon: Users, badge: 12 },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare, badge: 5 },
  { name: "Approvals", href: "/admin/approvals", icon: CheckCircle, badge: 8 },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-48"
        } bg-gradient-to-b from-cyan-50/60 to-blue-50/60 backdrop-blur-md border-r border-white min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-40 flex flex-col shadow-[4px_0_16px_rgba(0,0,0,0.1)]`}
    >
      {/* Collapse/Expand Button Only */}
      <div className="h-14 flex items-center justify-center px-3 border-b border-cyan-200/50">
        <motion.div whileHover="hover" initial="initial" animate="initial">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-all text-gray-700 relative overflow-hidden"
            type="button"
          >
            <motion.div
              className="absolute inset-0 bg-cyan-600 rounded-full"
              variants={{
                initial: { scale: 0 },
                hover: { scale: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
              className="relative z-10 flex items-center justify-center"
              variants={{
                initial: { color: "#374151" },
                hover: { color: "#ffffff" },
              }}
              transition={{ duration: 0.3 }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
        <ul className="space-y-1 pl-2 pr-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <motion.div whileHover="hover" initial="initial" animate="initial">
                  <Link
                    href={item.href}
                    className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"
                      } px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                        ? "bg-cyan-600 text-white shadow-[0_4px_8px_rgba(6,182,212,0.3),inset_0_2px_8px_rgba(0,0,0,0.2)] border-2 border-cyan-700"
                        : "bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-gray-700 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.15)]"
                      }`}
                  >
                    {/* Hover animation background */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-600 rounded-xl"
                        variants={{
                          initial: { scale: 0 },
                          hover: { scale: 1 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}

                    <div className="flex items-center gap-2 relative z-10">
                      <motion.div
                        variants={{
                          initial: { color: isActive ? "#ffffff" : "#374151" },
                          hover: { color: "#ffffff" },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`} />
                      </motion.div>
                      {!isCollapsed && (
                        <motion.span
                          className="font-semibold text-sm"
                          variants={{
                            initial: { color: isActive ? "#ffffff" : "#374151" },
                            hover: { color: "#ffffff" },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-bold rounded-full relative z-10 leading-none flex items-center justify-center min-w-[20px] h-5 px-1.5">
                        {item.badge}
                      </span>
                    )}
                    {isCollapsed && item.badge && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full z-10 leading-none min-w-[16px] h-4 flex items-center justify-center px-1">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-cyan-50 backdrop-blur-md border border-white text-gray-900 text-sm rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account Section - Fixed at Bottom */}
      <div className="border-t border-cyan-200/50 p-3 relative">
        {isCollapsed ? (
          <>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-center w-full group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)] group-hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)] transition-all">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
            {/* Tooltip Menu for collapsed state */}
            {showUserMenu && (
              <div className="absolute left-full bottom-0 ml-3 w-48 bg-cyan-50 backdrop-blur-md rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.1)] border border-white py-2 z-50">
                <div className="px-4 py-2 border-b border-cyan-200/50">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user?.email || "admin@rajshahi.com"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 bg-cyan-50/60 backdrop-blur-md border border-white rounded-xl px-3 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email || "admin@rajshahi.com"}
                </p>
              </div>
            </button>
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-3 right-3 mb-2 bg-cyan-50 backdrop-blur-md rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.1)] border border-white py-2 z-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

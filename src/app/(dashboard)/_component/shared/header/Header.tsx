"use client";

import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/features/auth/authSlice";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New property listing awaiting approval", time: "5 min ago", unread: true },
    { id: 2, text: "New user registration: John Doe", time: "1 hour ago", unread: true },
    { id: 3, text: "Review reported by user", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-cyan-50/60 backdrop-blur-md shadow-[0_4px_8px_rgba(0,0,0,0.1)] border-b border-white h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties, users, services..."
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-gray-700 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-cyan-50/60 backdrop-blur-sm border border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.15)] rounded-full transition-all text-gray-700"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-80 bg-cyan-50 backdrop-blur-md rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(0,0,0,0.1)] border border-white py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-cyan-200/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <span className="text-xs text-gray-600 bg-cyan-100 px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-hide">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-cyan-100/50 cursor-pointer border-b border-cyan-100/50 transition-colors ${notification.unread ? "bg-blue-50/50" : ""
                        }`}
                    >
                      <p className="text-sm text-gray-900 font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-cyan-200/50">
                  <button
                    type="button"
                    className="text-sm text-cyan-700 hover:text-cyan-800 font-semibold transition-colors"
                  >
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

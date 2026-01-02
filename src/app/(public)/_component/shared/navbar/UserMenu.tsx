"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, Settings, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openModal, addNotification } from "@/lib/redux/features/ui/uiSlice";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { clearAuthCookies } from "@/lib/actions/auth";
import { cn } from "@/utils/utils";

export const UserMenu = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await clearAuthCookies();
        dispatch(logout());
        dispatch(addNotification({ type: "success", message: "Logged out successfully!" }));
        setShowUserMenu(false);
    };

    const menuVariants = {
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 },
    };

    return (
        <div className="relative" ref={userMenuRef}>
            <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 bg-cyan-50/60 backdrop-blur-md border border-white rounded-full pl-4 pr-2 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.15)] transition"
            >
                <Menu className="w-4 h-4 text-gray-700" />
                {isAuthenticated && user && (
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                        {user.name}
                    </span>
                )}
                <div className="w-8 h-8 bg-cyan-100 border border-cyan-600 rounded-full flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden">
                    {isAuthenticated && user?.profilePhoto ? (
                        <Image
                            src={user.profilePhoto}
                            alt={user.name || "User"}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <User className="w-5 h-5 text-cyan-700" />
                    )}
                </div>
            </button>

            <AnimatePresence>
                {showUserMenu && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-full right-0 mt-2 w-64 bg-cyan-50 backdrop-blur-md rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)] border border-white py-3 overflow-hidden z-[100]"
                    >
                        {isAuthenticated && user ? (
                            <>
                                <div className="px-4 py-3 border-b border-cyan-200/50">
                                    <p className="text-base font-bold text-gray-900 truncate">{user.name || "User"}</p>
                                    <p className="text-xs text-gray-600 truncate mt-0.5">{user.email || user.contactNumber}</p>
                                    <span className="inline-block px-2 py-0.5 mt-2 text-xs font-medium bg-cyan-100 text-cyan-700 rounded-full capitalize">
                                        {user.role?.toLowerCase()}
                                    </span>
                                </div>

                                <MenuItem icon={User} label="My Profile" href="/profile" onClick={() => setShowUserMenu(false)} />
                                <MenuItem icon={Settings} label="Settings" href="/settings" onClick={() => setShowUserMenu(false)} />

                                <div className="border-t border-cyan-200/50 my-2 mx-3" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full group flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => { setShowUserMenu(false); dispatch(openModal("loginOpen")); }}
                                    className="w-full group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-cyan-100 transition"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span className="font-medium">Login</span>
                                </button>
                                <button
                                    onClick={() => { setShowUserMenu(false); dispatch(openModal("signupOpen")); }}
                                    className="w-full group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-cyan-100 transition"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span className="font-medium">Sign up</span>
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MenuItem = ({ icon: Icon, label, href, onClick }: any) => (
    <Link
        href={href}
        onClick={onClick}
        className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-cyan-100 transition w-full"
    >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{label}</span>
    </Link>
);

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegistrationMutation } from "@/lib/redux/features/auth/authApi";
import { setAuthCookies } from "@/lib/actions/auth";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { decodeToken } from "@/helper/jwtHelper/jwtHelper";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [registration, { isLoading }] = useRegistrationMutation();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error("Password should be at least 6 characters long.");
            return;
        }

        try {
            const res = await registration({
                name,
                email,
                password,
                contactNumber,
                role,
            }).unwrap();

            if (res?.data?.accessToken && res?.data?.refreshToken) {
                const token = res.data.accessToken;
                const refreshToken = res.data.refreshToken;
                const decodedUser: any = decodeToken(token);

                // Use server action to set cookies
                await setAuthCookies(token, refreshToken);

                dispatch(setToken(token));
                dispatch(setUser(decodedUser));

                toast.success("Account created successfully!");
                router.push("/");
            } else {
                toast.success("Account created successfully! Please sign in.");
                router.push("/login");
            }
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.data?.message || error?.message || "Failed to create account. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f18] p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Join EasySearch</h1>
                        <p className="text-gray-400">Create an account to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hello@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Contact Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    placeholder="+88017..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">I am a</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <Briefcase size={18} />
                                </div>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                >
                                    <option value="CUSTOMER" className="bg-[#1a212e]">Customer</option>
                                    <option value="HOST" className="bg-[#1a212e]">Host / Provider</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;

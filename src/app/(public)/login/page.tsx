"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/redux/features/auth/authApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { decodeToken } from "@/helper/jwtHelper/jwtHelper";
import { setAuthCookies } from "@/lib/actions/auth";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();

            if (res?.data?.accessToken && res?.data?.refreshToken) {
                const token = res.data.accessToken;
                const refreshToken = res.data.refreshToken;
                const decodedUser: any = decodeToken(token);

                // Use server action to set cookies
                await setAuthCookies(token, refreshToken);

                dispatch(setToken(token));
                dispatch(setUser(decodedUser));

                toast.success("Welcome back!");
                router.push("/");
            } else {
                toast.error("Invalid response from server.");
            }
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.data?.message || error?.message || "Failed to sign in. Please check your credentials.";
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
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
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
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-500 text-gray-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
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
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

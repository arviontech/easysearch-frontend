"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeModal, openModal, addNotification } from "@/lib/redux/features/ui/uiSlice";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { useTranslation } from "@/hooks/useTranslation";
import { authAPI } from "@/lib/api/auth";
import { getUserFromToken } from "@/utils/jwt";
import { firebaseAuth } from "@/lib/firebase/auth";

const LoginModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.modals.loginOpen);
  const t = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Detect if input is email or phone number
      const isEmail = formData.emailOrPhone.includes("@");

      const loginData = {
        ...(isEmail
          ? { email: formData.emailOrPhone }
          : { contactNumber: formData.emailOrPhone }
        ),
        password: formData.password,
      };

      const response = await authAPI.login(loginData);

      if (response.success && response.data?.accessToken) {
        // Store token
        dispatch(setToken(response.data.accessToken));

        // Extract user info from JWT token
        const userFromToken = getUserFromToken(response.data.accessToken);


        let userRole: "CUSTOMER" | "HOST" | "ADMIN" = "CUSTOMER";

        if (userFromToken) {
          dispatch(setUser(userFromToken as any));
          userRole = userFromToken.role || "CUSTOMER";
        } else {
          // Fallback if JWT decoding fails
          dispatch(setUser({
            id: "",
            name: "",
            email: isEmail ? formData.emailOrPhone : "",
            role: "CUSTOMER",
            contactNumber: !isEmail ? formData.emailOrPhone : undefined,
          }));
        }

        dispatch(addNotification({
          type: "success",
          message: "Login successful! Welcome back!",
        }));
        dispatch(closeModal("loginOpen"));

        // Redirect based on user role
        if (userRole === "ADMIN") {
          router.push("/admin");
        }
        // HOST and CUSTOMER stay on current page or can be redirected elsewhere
      } else {
        // Handle error
        const errorMsg = response.errorMessages?.map(e => e.message).join(", ") || response.message;
        dispatch(addNotification({
          type: "error",
          message: `Login failed: ${errorMsg}`,
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        message: `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "Google") {
      try {
        setIsLoading(true);
        const result = await firebaseAuth.loginWithGoogle();
        const idToken = await result.user.getIdToken();

        // TODO: Backend Integration Required
        // 1. Send `idToken` to your backend endpoint (e.g., POST /api/v1/auth/google)
        // 2. Verify the token using Firebase Admin SDK
        // 3. Return a session token (accessToken) to the client
        // 4. Dispatch setToken(accessToken) and setUser(user)
        //
        // Current Behavior: Simulates successful login by using Firebase user data directly.

        dispatch(addNotification({
          type: "success",
          message: `Logged in with Google as ${result.user.displayName}`,
        }));
        dispatch(closeModal("loginOpen"));

      } catch (error) {
        console.error("Firebase Login Error:", error);
        dispatch(addNotification({
          type: "error",
          message: "Failed to login with Google",
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    dispatch(closeModal("loginOpen"));
  };

  const switchToSignup = () => {
    dispatch(closeModal("loginOpen"));
    dispatch(openModal("signupOpen"));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <div className="bg-cyan-50/95 backdrop-blur-md rounded-3xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(0,0,0,0.15)] p-8 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-cyan-100 rounded-full transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {t.loginModal.title}
                  </h2>
                  <p className="text-gray-600">
                    {t.loginModal.subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email/Phone Input */}
                  <div>
                    <label
                      htmlFor="emailOrPhone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t.loginModal.emailOrPhone}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="emailOrPhone"
                        type="text"
                        required
                        value={formData.emailOrPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, emailOrPhone: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                        placeholder={t.loginModal.emailOrPhonePlaceholder}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t.loginModal.password}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full pl-12 pr-12 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                        placeholder={t.loginModal.passwordPlaceholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) =>
                          setFormData({ ...formData, rememberMe: e.target.checked })
                        }
                        className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">{t.loginModal.rememberMe}</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition"
                    >
                      {t.loginModal.forgotPassword}
                    </button>
                  </div>

                  {/* Submit Button and Google Login in Same Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="bg-cyan-100 border border-cyan-600 py-3 rounded-xl font-semibold shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      initial="initial"
                      animate="initial"
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-600 rounded-xl"
                        variants={{
                          initial: { scaleX: 0, originX: 0 },
                          hover: { scaleX: 1, originX: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="relative z-10 flex items-center justify-center gap-2"
                        variants={{
                          initial: { color: "#0e7490" },
                          hover: { color: "#ffffff" },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>{t.loginModal.signingIn}</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-5 h-5" />
                            <span>{t.loginModal.signInButton}</span>
                          </>
                        )}
                      </motion.div>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => handleSocialLogin("Google")}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-cyan-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>{t.loginModal.googleButton}</span>
                    </motion.button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center mt-6 text-sm text-gray-600">
                  {t.loginModal.noAccount}{" "}
                  <button
                    type="button"
                    onClick={switchToSignup}
                    className="text-cyan-600 hover:text-cyan-700 font-semibold transition"
                  >
                    {t.loginModal.signupLink}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

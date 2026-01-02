"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  X,
  Briefcase,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeModal, openModal, addNotification } from "@/lib/redux/features/ui/uiSlice";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { getUserFromToken } from "@/utils/jwt";
import { useRegistrationMutation } from "@/lib/redux/features/auth/authApi";

const SignupModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.modals.signupOpen);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userType: "seeker", // 'seeker' or 'provider'
    fullName: "",
    email: "",
    countryCode: "+880",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registration] = useRegistrationMutation()

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 10)
      return { strength: 2, label: "Fair", color: "bg-yellow-500" };
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password))
      return { strength: 3, label: "Strong", color: "bg-green-500" };
    return { strength: 2, label: "Fair", color: "bg-yellow-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      dispatch(addNotification({
        type: "error",
        message: "Passwords do not match!",
      }));
      return;
    }
    if (!formData.agreeToTerms) {
      dispatch(addNotification({
        type: "warning",
        message: "Please accept the terms and conditions",
      }));
      return;
    }
    setIsLoading(true);

    try {
      // Map userType to backend role
      const role = formData.userType === "seeker" ? "CUSTOMER" : "HOST";

      // Combine country code and phone number
      const contactNumber = `${formData.countryCode}${formData.phone}`;

      const response = await registration({
        name: formData.fullName,
        email: formData.email,
        contactNumber,
        password: formData.password,
        type: role,
      }).unwrap();

      if (response.success && response.data?.accessToken) {
        // Store token
        dispatch(setToken(response.data.accessToken));

        // Extract user info from JWT token
        const userFromToken = getUserFromToken(response.data.accessToken);


        if (userFromToken) {
          dispatch(setUser(userFromToken as any));
        } else {
          // Fallback if JWT decoding fails
          dispatch(setUser({
            id: "",
            name: formData.fullName,
            email: formData.email,
            role,
            contactNumber,
          }));
        }

        dispatch(addNotification({
          type: "success",
          message: "Registration successful! Welcome aboard!",
        }));
        dispatch(closeModal("signupOpen"));
      } else {
        // Handle error
        const errorMsg = response.errorMessages?.map((e: any) => e.message).join(", ") || response.message;
        dispatch(addNotification({
          type: "error",
          message: `Registration failed: ${errorMsg}`,
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


  const handleClose = () => {
    dispatch(closeModal("signupOpen"));
  };

  const switchToLogin = () => {
    dispatch(closeModal("signupOpen"));
    dispatch(openModal("loginOpen"));
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
              className="relative w-full max-w-2xl pointer-events-auto"
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
                    Create Account
                  </h2>
                  <p className="text-gray-600">
                    Join as a seeker or provider to get started
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* User Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      I want to:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: "seeker" })}
                        className={`relative p-4 rounded-xl border-2 transition-all ${formData.userType === "seeker"
                          ? "border-cyan-600 bg-cyan-50"
                          : "border-cyan-200 bg-white hover:border-cyan-400"
                          }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users className={`w-6 h-6 ${formData.userType === "seeker" ? "text-cyan-600" : "text-gray-600"}`} />
                          <span className={`text-sm font-semibold ${formData.userType === "seeker" ? "text-cyan-700" : "text-gray-700"}`}>
                            Find Services
                          </span>
                        </div>
                        {formData.userType === "seeker" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                          </motion.div>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: "provider" })}
                        className={`relative p-4 rounded-xl border-2 transition-all ${formData.userType === "provider"
                          ? "border-cyan-600 bg-cyan-50"
                          : "border-cyan-200 bg-white hover:border-cyan-400"
                          }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Briefcase className={`w-6 h-6 ${formData.userType === "provider" ? "text-cyan-600" : "text-gray-600"}`} />
                          <span className={`text-sm font-semibold ${formData.userType === "provider" ? "text-cyan-700" : "text-gray-700"}`}>
                            Offer Services
                          </span>
                        </div>
                        {formData.userType === "provider" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                          </motion.div>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Full Name & Email - Two Column */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) =>
                          setFormData({ ...formData, countryCode: e.target.value })
                        }
                        className="w-24 px-3 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition text-sm"
                      >
                        <option value="+880">🇧🇩 +880</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                      </select>
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password & Confirm Password - Two Column */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Password
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
                          placeholder="Create a strong password"
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
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                style={{
                                  width: `${(passwordStrength.strength / 3) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600">
                              {passwordStrength.label}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-12 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition"
                          placeholder="Re-enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="mt-1 text-xs text-red-500">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreeToTerms: e.target.checked,
                          })
                        }
                        className="w-4 h-4 mt-0.5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-cyan-600 hover:text-cyan-700 font-medium"
                        >
                          Terms & Conditions
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-cyan-600 hover:text-cyan-700 font-medium"
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      disabled={isLoading || !formData.agreeToTerms}
                      className="w-full bg-cyan-100 border border-cyan-600 py-3 rounded-xl font-semibold shadow-[inset_0_4px_8_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.5)] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <span className="text-sm">Creating...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5" />
                            <span className="text-sm">Sign Up</span>
                          </>
                        )}
                      </motion.div>
                    </motion.button>
                  </div>
                </form>

                {/* Login Link */}
                <p className="text-center mt-6 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-cyan-600 hover:text-cyan-700 font-semibold transition"
                  >
                    Sign in
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

export default SignupModal;

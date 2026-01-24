"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, UserPlus, Phone, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "@/lib/validations/auth";
import { useRegistrationMutation } from "@/lib/redux/features/auth/authApi";
import { FormInput } from "@/components/ui/form-input";
import { FormPasswordInput } from "@/components/ui/form-password-input";
import { UserTypeSelector } from "@/app/(public)/_component/shared/modals/components/UserTypeSelector";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: "seeker",
      fullName: "",
      email: "",
      countryCode: "+880",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const { handleSubmit, watch, formState: { errors } } = methods;

  const [registration, { isLoading }] = useRegistrationMutation();
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // Map userType to backend role
      const role = data.userType === "seeker" ? "CUSTOMER" : "HOST";

      // Combine country code and phone number
      const contactNumber = `${data.countryCode}${data.phone}`;

      const response = await registration({
        name: data.fullName,
        email: data.email,
        contactNumber,
        password: data.password,
        role: role,
      }).unwrap();

      if (response.success && response.data?.user) {
        // Backend already sets cookies, just use user data from response
        const user = response.data.user;
        
        dispatch(setUser({
          id: user.id,
          name: user.host?.name || user.customer?.name || user.admin?.name || user.doctor?.name || data.fullName,
          email: user.email,
          role: user.role,
          contactNumber: user.contactNumber,
        }));

        dispatch(addNotification({
          type: "success",
          message: "Registration successful! Welcome aboard!",
        }));
        
        // Role-based redirection
        const redirectPath = role === "CUSTOMER" ? "/user" : 
                           role === "HOST" ? "/host" : 
                           "/admin";
        router.push(redirectPath);
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-cyan-50/95 backdrop-blur-md rounded-3xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(0,0,0,0.15)] p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join as a seeker or provider to get started
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <UserTypeSelector />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon={User}
                />
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    {...methods.register("countryCode")}
                    className="w-24 px-3 py-3 bg-white border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none transition text-sm"
                  >
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                  </select>
                  <FormInput
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    icon={Phone}
                    containerClassName="flex-1 space-y-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormPasswordInput
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                  showStrength
                />
                <FormPasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                />
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...methods.register("agreeToTerms")}
                    className="w-4 h-4 mt-0.5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <button type="button" className="text-cyan-600 hover:text-cyan-700 font-medium">Terms</button>
                    {" & "}
                    <button type="button" className="text-cyan-600 hover:text-cyan-700 font-medium">Privacy</button>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms.message}</p>}
              </div>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isLoading || !agreeToTerms}
                  className="w-full bg-cyan-100 border border-cyan-600 py-3 rounded-xl font-semibold shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.2)] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  initial="initial"
                  animate="initial"
                >
                  <motion.div
                    className="absolute inset-0 bg-cyan-600"
                    variants={{
                      initial: { scaleX: 0, originX: 0 },
                      hover: { scaleX: 1, originX: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300 text-cyan-700">
                    {isLoading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    <span className="text-sm">{isLoading ? "Creating..." : "Sign Up"}</span>
                  </div>
                </motion.button>
              </div>
            </form>
          </FormProvider>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

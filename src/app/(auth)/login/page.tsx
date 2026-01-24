"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, LogIn, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addNotification } from "@/lib/redux/features/ui/uiSlice";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { useTranslation } from "@/hooks/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useLoginMutation } from "@/lib/redux/features/auth/authApi";
import { decodeToken } from "@/helper/jwtHelper/jwtHelper";
import { setAuthCookies } from "@/lib/actions/auth";
import { FormInput } from "@/components/ui/form-input";
import { FormPasswordInput } from "@/components/ui/form-password-input";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data).unwrap();

      if (res?.data?.accessToken && res?.data?.refreshToken) {
        const token = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        const decodedUser: any = decodeToken(token);

        await setAuthCookies(token, refreshToken);

        dispatch(setToken(token));
        dispatch(setUser(decodedUser));

        dispatch(addNotification({
          type: "success",
          message: "Login successful! Welcome back!",
        }));
        
        // Role-based redirection
        const userRole = decodedUser?.role;
        const redirectPath = userRole === "CUSTOMER" ? "/user" : 
                           userRole === "HOST" ? "/host" : 
                           "/admin";
        router.push(redirectPath);
        router.refresh();
      } else {
        dispatch(addNotification({
          type: "error",
          message: "Invalid response from server.",
        }));
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to sign in. Please check your credentials.";
      dispatch(addNotification({
        type: "error",
        message: errorMessage,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-cyan-50/95 backdrop-blur-md rounded-3xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(0,0,0,0.15)] p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t.loginModal.title}
            </h2>
            <p className="text-gray-600">
              {t.loginModal.subtitle}
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                name="email"
                label={t.loginModal.emailOrPhone}
                type="email"
                placeholder={t.loginModal.emailOrPhonePlaceholder}
                icon={Mail}
              />

              <FormPasswordInput
                name="password"
                label={t.loginModal.password}
                placeholder={t.loginModal.passwordPlaceholder}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
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

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isLoading}
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
                      <LogIn className="w-5 h-5" />
                    )}
                    <span className="text-sm">{isLoading ? t.loginModal.signingIn : t.loginModal.signInButton}</span>
                  </div>
                </motion.button>
              </div>
            </form>
          </FormProvider>

          <p className="text-center mt-6 text-sm text-gray-600">
            {t.loginModal.noAccount}{" "}
            <Link
              href="/signup"
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition"
            >
              {t.loginModal.signupLink}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

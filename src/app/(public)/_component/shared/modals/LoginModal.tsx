"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, LogIn, X, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeModal, openModal, addNotification } from "@/lib/redux/features/ui/uiSlice";
import { setUser } from "@/lib/redux/features/auth/authSlice";
import { useTranslation } from "@/hooks/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useLoginMutation } from "@/lib/redux/features/auth/authApi";
import { FormInput } from "@/components/ui/form-input";
import { FormPasswordInput } from "@/components/ui/form-password-input";

const LoginModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.modals.loginOpen);
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

      if (res?.success && res?.data?.user) {
        // Backend sets cookies automatically, get user data from response
        const user = res.data.user;
        
        dispatch(setUser({
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.host?.name || user.customer?.name || user.admin?.name || user.doctor?.name || 'User',
          contactNumber: user.contactNumber,
        }));

        dispatch(addNotification({
          type: "success",
          message: "Login successful! Welcome back!",
        }));
        dispatch(closeModal("loginOpen"));
        
        // Role-based redirect
        const redirectPath = user.role === "CUSTOMER" ? "/user" : 
                           user.role === "HOST" ? "/host" : 
                           user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "/admin" : 
                           "/user";
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <div className="bg-cyan-50/95 backdrop-blur-md rounded-3xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_4px_8px_rgba(0,0,0,0.15)] p-8 max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-cyan-100 rounded-full transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

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

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { getUserFromToken, isTokenExpired } from "@/utils/jwt";

/**
 * Hook to restore auth state from localStorage on app mount
 * Call this in the root layout or app component
 */
export function useAuthPersistence() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");

    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        // Clear expired token
        localStorage.removeItem("accessToken");
        return;
      }

      // Restore token and user from JWT
      dispatch(setToken(token));

      const user = getUserFromToken(token);
      if (user) {
        dispatch(
          setUser({
            id: user.id || "",
            email: user.email || "",
            name: user.name || "",
            role: user.role || "CUSTOMER",
            contactNumber: user.contactNumber,
            profilePhoto: user.profilePhoto,
          }),
        );
      }
    }
  }, [dispatch]);
}

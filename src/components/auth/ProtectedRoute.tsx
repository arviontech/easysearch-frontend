"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import type { UserRole } from "@/lib/api/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole = "ADMIN",
  redirectTo = "/",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give a small delay to allow auth state to be restored from localStorage
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isChecking) {
      // Not authenticated - redirect to home
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // Authenticated but doesn't have required role
      if (requiredRole && user?.role !== requiredRole) {
        router.push(redirectTo);
        return;
      }
    }
  }, [isChecking, isAuthenticated, user, requiredRole, redirectTo, router]);

  // Show loading state while checking authentication
  if (isChecking || !isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-600 border-t-transparent" />
          <p className="mt-4 text-gray-700 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

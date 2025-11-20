"use client";

import type React from "react";
import { useState } from "react";
import Sidebar from "@/app/(dashboard)/_component/shared/sidebar/Sidebar";
import Header from "@/app/(dashboard)/_component/shared/header/Header";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute requiredRole="ADMIN" redirectTo="/">
      <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-48"
          }`}>
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;

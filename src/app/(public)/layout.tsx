import type React from "react";
import Footer from "@/app/(public)/_component/shared/footer/Footer";
import Navbar from "@/app/(public)/_component/shared/navbar/Navbar";
import NotificationCenter from "@/components/notificationcenter/NotificationCenter";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-cyan-50 to-yellow-100">
      <Navbar />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
      <NotificationCenter />
    </div>
  );
};

export default PublicLayout;

import type React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

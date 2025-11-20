import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import AuthInitializer from "@/components/auth/AuthInitializer";
import LoginModal from "@/app/(public)/_component/shared/modals/LoginModal";
import SignupModal from "@/app/(public)/_component/shared/modals/SignupModal";
import Toast from "@/components/toast/Toast";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rajshahi Services - Local Services Platform",
  description:
    "Find houses, hostels, doctors, catering, tourism and more in Rajshahi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-sans antialiased`}>
        <StoreProvider>
          <AuthInitializer />
          {children}
          <LoginModal />
          <SignupModal />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}

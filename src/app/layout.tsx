import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rajshahi Services - Local Services Platform",
  description: "Find houses, hostels, doctors, catering, tourism and more in Rajshahi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

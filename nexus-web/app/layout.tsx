import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "NEXUS - AI-Powered Railway Track Fitting Identification System",
  description:
    "NEXUS: Revolutionary laser QR code marking system for Indian Railways track fittings with predictive maintenance and quality control",
  keywords:
    "NEXUS, Indian Railways, QR Code, Laser Marking, Track Fittings, Predictive Maintenance, Smart India Hackathon 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Navbar />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}

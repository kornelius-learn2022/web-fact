import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Gift Worth Giving: Christmas Celebration & Market 2026 | Cita Hati Elementary School Pakuwon City",
    template: "%s | The Gift Worth Giving",
  },
  description:
    "Cita Hati Christian Elementary School Pakuwon City Campus mempersembahkan Christmas Celebration & Market: The Gift Worth Giving. Pertunjukan drama musikal spektakuler dan pasar Natal terbuka untuk umum pada Sabtu, 05 Desember 2026.",
  keywords: [
    "The Gift Worth Giving",
    "Cita Hati Christian School",
    "Cita Hati Pakuwon City",
    "Christmas Celebration",
    "Christmas Market Surabaya",
    "Drama Musikal Natal",
    "Acara Natal Surabaya",
    "Open for Public",
    "Pakuwon City Event",
  ],
  authors: [{ name: "Sekolah Kristen Cita Hati Pakuwon City" }],
  creator: "Cita Hati Christian Elementary School",
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "The Gift Worth Giving: Christmas Celebration & Market 2026",
    description:
      "Pertunjukan drama musikal spektakuler dan pasar Natal terbuka untuk umum pada Sabtu, 05 Desember 2026 di Cita Hati Elementary School Pakuwon City Campus Surabaya.",
    siteName: "The Gift Worth Giving 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gift Worth Giving: Christmas Celebration & Market 2026",
    description:
      "Pertunjukan drama musikal spektakuler dan pasar Natal terbuka untuk umum pada Sabtu, 05 Desember 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#08101e] text-[#f5f0e6] selection:bg-[#e5c07b] selection:text-[#0a1122]">
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

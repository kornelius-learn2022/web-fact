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
  metadataBase: new URL("https://mindmaze-chi.vercel.app"),
  title: {
    default: "Mind.Maze — Small Facts, Big Perspective | Knowledge & Trivia Hub",
    template: "%s | Mind.Maze",
  },
  description:
    "Eksplorasi fakta unik interaktif, trivia kejutan, teka-teki silang AI, dan kuis pengetahuan umum dengan pendekatan visual neo-pop.",
  keywords: [
    "Mind Maze",
    "fakta unik",
    "trivia indonesia",
    "pengetahuan umum",
    "teka teki silang ai",
    "kuis ai",
    "knowledge hub",
    "sains dan teknologi",
    "sejarah dan seni",
  ],
  authors: [{ name: "Mind.Maze Editorial Team" }],
  creator: "Mind.Maze",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mindmaze-chi.vercel.app",
    title: "Mind.Maze — Small Facts, Big Perspective",
    description:
      "Platform interaktif penemuan fakta unik, kuis AI, dan teka-teki silang pengetahuan umum.",
    siteName: "Mind.Maze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind.Maze — Small Facts, Big Perspective",
    description: "Platform interaktif penemuan fakta unik, kuis AI, dan teka-teki silang.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-graphite-black text-white selection:bg-cyber-lime selection:text-black">
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

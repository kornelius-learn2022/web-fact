"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Brain, Compass, BookOpen, Target, Lightbulb } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-graphite-black text-white selection:bg-cyber-lime selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section */}
        <section className="relative overflow-hidden bg-neon-fuchsia">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            {/* Background Team Photo with Grayscale Overlay */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="Mind.Maze Team Working"
              className="h-full w-full object-cover mix-blend-multiply filter grayscale contrast-125 opacity-80"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-neon-fuchsia/90 via-neon-fuchsia/40 to-transparent" />

            {/* Centered ABOUT US Title Box */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="rounded-2xl border-4 border-electric-indigo/80 bg-black/40 px-10 py-5 sm:px-16 sm:py-7 backdrop-blur-sm shadow-2xl">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-lg">
                  ABOUT US
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Profil Description Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Left Column: Big Brand Display */}
            <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter drop-shadow-2xl">
                <span className="text-neon-fuchsia">Mind.</span>
                <br />
                <span className="text-cyber-lime">Maze</span>
              </div>
            </div>

            {/* Right Column: Profil Description Text */}
            <div className="space-y-4">
              <div className="leading-none">
                <h2 className="text-3xl sm:text-4xl font-black text-white">Profil</h2>
                <h3 className="text-3xl sm:text-4xl font-black text-neon-fuchsia">Description</h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-gray-200 font-medium pt-2">
                Bukan sekadar baca fakta unik biasa. MindMaze hadir sebagai media pembelajaran
                interaktif yang ngajak kamu buat paham, nguji ingatan, dan mikir kritis lewat cara yang
                menyenangkan.
              </p>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section className="border-t border-white/10 bg-[#121212] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column: Glowing Brain & Starburst Illustration */}
              <div className="relative flex items-center justify-center lg:col-span-4">
                <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                  {/* Cyber Lime Starburst Badge Behind */}
                  <div className="absolute -top-4 -left-4 h-24 w-24 text-cyber-lime opacity-90 animate-pulse">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
                      <polygon points="50,0 63,35 100,35 70,57 82,92 50,70 18,92 30,57 0,35 37,35" />
                    </svg>
                  </div>

                  {/* Brain Visual Card */}
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-neon-fuchsia/40 bg-gradient-to-br from-neon-fuchsia/20 via-black to-black p-4 shadow-[0_0_50px_rgba(255,46,154,0.3)]">
                    <img
                      src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
                      alt="Brain Neuroscience Glowing"
                      className="h-full w-full rounded-2xl object-cover filter contrast-125 brightness-110"
                    />
                    <div className="absolute inset-0 bg-neon-fuchsia/25 mix-blend-color" />
                  </div>

                  {/* Fuchsia Starburst Bottom Right */}
                  <div className="absolute -bottom-6 -right-6 h-28 w-28 text-neon-fuchsia opacity-90">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
                      <polygon points="50,0 60,30 90,20 75,50 100,70 70,75 70,100 45,80 20,95 30,65 0,50 30,35 15,10 45,25" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Middle Column: Visi */}
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2">
                  <h3 className="text-3xl font-black text-cyber-lime">Visi</h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                  Menjadi media pembelajaran interaktif yang mendorong terwujudnya generasi pelajar
                  berliterasi tinggi, kritis, dan adaptif terhadap perkembangan informasi melalui teknologi
                  web yang inovatif.
                </p>
              </div>

              {/* Right Column: Misi */}
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2">
                  <h3 className="text-3xl font-black text-cyber-lime">Misi</h3>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyber-lime font-black">•</span>
                    <span>Meningkatkan Minat Baca dan Literasi Informasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyber-lime font-black">•</span>
                    <span>Mengembangkan Pembelajaran Interaktif berbasis Evaluasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyber-lime font-black">•</span>
                    <span>Mendorong Kemampuan Berpikir Kritis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Tagline Banner */}
        <section className="bg-graphite-black py-16 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <div className="inline-block rounded-3xl bg-cyber-lime px-8 py-5 sm:px-14 sm:py-6 shadow-[0_0_40px_rgba(207,255,4,0.4)]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black">
                Mainkan Otakmu, Perluas Wawasanmu.
              </h2>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

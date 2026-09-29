import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white">
      {/* Top subtle border */}
      <div className="w-full border-t border-white/20" />

      {/* Ambient pink/magenta neon glow along the bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-neon-fuchsia/20 via-neon-fuchsia/5 to-transparent blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Description (cyber-lime text) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-wider text-cyber-lime">
              MIND.MAZE
            </h2>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-cyber-lime max-w-md">
              Bukan sekadar baca fakta unik biasa. MindMaze hadir sebagai media pembelajaran
              interaktif yang ngajak kamu buat paham, nguji ingatan, dan mikir kritis lewat cara yang
              menyenangkan.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-black text-white tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-bold text-gray-300">
              <li>
                <Link href="/" className="hover:text-cyber-lime transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-cyber-lime transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-cyber-lime transition-colors">
                  Quiz
                </Link>
              </li>
              <li>
                <Link href="/contributor" className="hover:text-cyber-lime transition-colors">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyber-lime transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyber-lime transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Link */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-black text-white tracking-wide">
              Quick Link
            </h3>
            <ul className="space-y-2 text-xs font-bold text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-cyber-lime transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Work Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-black text-white tracking-wide">
              Work Hours
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-gray-300">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyber-lime flex-shrink-0" />
                <span>Mon - Fri : 8AM-5PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyber-lime flex-shrink-0" />
                <span>Saturday 9AM-1PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Contact Row with Cyber-lime Icons */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-lg flex-shrink-0">
              <Phone className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="block text-xs font-black text-white uppercase tracking-wider">Phone</span>
              <span className="text-sm font-bold text-gray-200">(+62) 594218652</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-lg flex-shrink-0">
              <Mail className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="block text-xs font-black text-white uppercase tracking-wider">Email</span>
              <span className="text-xs sm:text-sm font-bold text-gray-200 block">
                priscila.buana.tunggadewi-2024@fisip.unair.ac.id
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-200 block">
                reenata.amodia.khansa-2024@fisip.unair.ac.id
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyber-lime text-black shadow-lg flex-shrink-0">
              <MapPin className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-sm font-black uppercase text-white tracking-wider">
                FISIP UNAIR
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Dotted Yellow/Lime Line matching Image 2 */}
        <div className="mt-8 border-b-2 border-dotted border-cyber-lime/80 w-full" />
      </div>
    </footer>
  );
}

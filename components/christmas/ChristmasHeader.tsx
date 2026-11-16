"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, MapPin, ChevronDown } from "lucide-react";
import CitaHatiLogo from "./CitaHatiLogo";
import { CHRISTMAS_EVENT_INFO } from "@/data/christmasData";

export default function ChristmasHeader() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#0D1B2A] via-[#13253A] to-[#1B324F] px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8"
      aria-label="Puncak Pembuka Acara Natal Cita Hati"
    >
      {/* Decorative Warm Fairy Lights Wire */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden select-none opacity-80" aria-hidden="true">
        <svg viewBox="0 0 1200 60" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path d="M0,15 Q300,45 600,15 T1200,15" stroke="#DFB76C" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="80" cy="22" r="5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="220" cy="30" r="4.5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="360" cy="27" r="5.5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="500" cy="19" r="4.5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="640" cy="23" r="5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="780" cy="29" r="4.5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="920" cy="25" r="5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
          <circle cx="1060" cy="18" r="4.5" fill="#FFE8A3" filter="drop-shadow(0 0 6px #F6E05E)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Top Section: School Presentation and Official Logos */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-4">
            <CitaHatiLogo size="lg" showText={true} />
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#DFB76C] uppercase">
              {CHRISTMAS_EVENT_INFO.schoolName}
            </p>
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-gray-300 uppercase">
              {CHRISTMAS_EVENT_INFO.campusName} {CHRISTMAS_EVENT_INFO.presentationTagline}
            </p>
          </div>
        </div>

        {/* Event Category Title */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-px w-10 sm:w-16 bg-[#DFB76C]/40" />
          <h2 className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] text-[#F5E6C8] uppercase">
            {CHRISTMAS_EVENT_INFO.categorySubtitle}
          </h2>
          <span className="h-px w-10 sm:w-16 bg-[#DFB76C]/40" />
        </div>

        {/* Grand Title: The Gift Worth Giving */}
        <div className="relative mt-4">
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-6xl md:text-7xl lg:text-8xl">
            THE GIFT
          </h1>
          <h1 className="font-serif text-3xl font-extrabold tracking-normal text-[#F5E6C8] sm:text-5xl md:text-6xl lg:text-7xl mt-1">
            WORTH GIVING
          </h1>
        </div>

        {/* Central Illustration: The Gift Box with Ribbon and Laurel Stars */}
        <div className="relative mx-auto mt-6 flex max-w-xs sm:max-w-sm md:max-w-md items-center justify-center">
          <div className="relative h-60 w-60 sm:h-72 sm:w-72 md:h-80 md:w-80">
            <Image
              src="/images/gift-box.png"
              alt="Ilustrasi Kotak Hadiah Natal Emas Cita Hati"
              fill
              priority
              sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
              className="object-contain drop-shadow-[0_10px_25px_rgba(223,183,108,0.25)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Open For Public Ribbon Banner */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DFB76C] bg-gradient-to-r from-[#DFB76C] via-[#F5E6C8] to-[#DFB76C] px-6 py-2 shadow-lg">
            <Sparkles className="h-4 w-4 text-[#0D1B2A]" aria-hidden="true" />
            <span className="font-serif text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#0D1B2A] uppercase">
              {CHRISTMAS_EVENT_INFO.publicBadge}
            </span>
            <Sparkles className="h-4 w-4 text-[#0D1B2A]" aria-hidden="true" />
          </div>
        </div>

        {/* Quick Date and Location Tag */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-gray-200">
          <div className="flex items-center gap-2 rounded-full bg-[#0D1B2A]/60 border border-[#DFB76C]/30 px-4 py-2">
            <Calendar className="h-4 w-4 text-[#DFB76C]" aria-hidden="true" />
            <span className="font-semibold text-white">{CHRISTMAS_EVENT_INFO.dateFormatted}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#0D1B2A]/60 border border-[#DFB76C]/30 px-4 py-2">
            <MapPin className="h-4 w-4 text-[#DFB76C]" aria-hidden="true" />
            <span className="font-semibold text-white">Pakuwon City Campus</span>
          </div>
        </div>

        {/* Action Anchor Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="#info"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#DFB76C] px-6 py-3 text-xs sm:text-sm font-bold text-[#0D1B2A] shadow-md transition-all hover:bg-[#F5E6C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
          >
            <span>Jadwal & Info Acara</span>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="#sinopsis"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#DFB76C] bg-[#1B324F]/70 px-6 py-3 text-xs sm:text-sm font-bold text-[#F5E6C8] shadow-md transition-all hover:bg-[#1B324F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] active:scale-95"
          >
            <span>Sinopsis Drama & Pemeran</span>
          </Link>
          <Link
            href="#venue-map"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-bold text-gray-200 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
          >
            <span>Denah & Peta Lokasi</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Calendar, MapPin, BookOpen, MessageCircle } from "lucide-react";
import CitaHatiLogo from "./CitaHatiLogo";
import { CHRISTMAS_EVENT_INFO } from "@/data/christmasData";

export default function ChristmasNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "#hero", icon: null },
    { name: "Info Acara", href: "#info", icon: Calendar },
    { name: "Sinopsis & Cast", href: "#sinopsis", icon: BookOpen },
    { name: "Denah & Map", href: "#venue-map", icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DFB76C]/30 bg-[#0D1B2A]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <Link
          href="#hero"
          className="flex items-center gap-3 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C]"
          aria-label="Cita Hati Christmas Extravaganza Beranda"
        >
          <CitaHatiLogo size="sm" showText={false} />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-wider text-[#DFB76C] uppercase">
              Cita Hati Christian School
            </span>
            <span className="font-serif text-sm font-bold tracking-wide text-white sm:text-base">
              The Gift Worth Giving
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-semibold tracking-wider text-gray-200 transition-colors hover:text-[#DFB76C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] rounded px-2 py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={CHRISTMAS_EVENT_INFO.contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#DFB76C] bg-[#1B324F] px-4 py-2 text-xs font-bold text-[#F5E6C8] shadow-md transition-all hover:bg-[#DFB76C] hover:text-[#0D1B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Kontak Panitia</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#DFB76C]/40 bg-[#1B324F] text-[#DFB76C] hover:bg-[#27415D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C]"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-t border-[#DFB76C]/20 bg-[#0D1B2A] px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col space-y-2" aria-label="Navigasi Mobile">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-[#1B324F] hover:text-[#DFB76C]"
                >
                  {IconComp && <IconComp className="h-4 w-4 text-[#DFB76C]" aria-hidden="true" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <a
                href={CHRISTMAS_EVENT_INFO.contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#DFB76C] bg-[#DFB76C] px-4 py-2.5 text-xs font-bold text-[#0D1B2A] shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Hubungi via WhatsApp (081310007452)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

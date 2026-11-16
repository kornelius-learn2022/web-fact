"use client";

import React from "react";
import CitaHatiLogo from "./CitaHatiLogo";
import { CHRISTMAS_EVENT_INFO } from "@/data/christmasData";

export default function ChristmasFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070b16] text-[#94a3b8] border-t border-[#1e2d42] pt-14 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1e2d42]">
          {/* Col 1: School & Event Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CitaHatiLogo size="md" showText={false} />
              <div>
                <span className="text-white font-extrabold text-lg block leading-tight tracking-wide">
                  SEKOLAH CITA HATI
                </span>
                <span className="text-xs text-[#e5c07b] font-medium block">
                  Pakuwon City Campus, Surabaya
                </span>
              </div>
            </div>

            <p className="text-sm text-[#cbd5e1] max-w-md leading-relaxed">
              Perayaan Natal dan Pasar Rakyat Cita Hati Christian Elementary School mempersembahkan drama musikal &quot;The Gift Worth Giving&quot; yang terbuka bagi seluruh masyarakat umum dan keluarga.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38a169]/15 border border-[#38a169]/30 text-[#86efac] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" aria-hidden="true" />
              <span>Acara Terbuka Untuk Umum (Open for Public)</span>
            </div>
          </div>

          {/* Col 2: Navigasi Bagian Web */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#e5c07b] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#e5c07b] rounded"
                >
                  <span className="text-[#e5c07b] text-xs">01.</span>
                  <span>Logo &amp; Presentasi</span>
                </a>
              </li>
              <li>
                <a
                  href="#info"
                  className="hover:text-[#e5c07b] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#e5c07b] rounded"
                >
                  <span className="text-[#e5c07b] text-xs">02.</span>
                  <span>Informasi &amp; Jadwal</span>
                </a>
              </li>
              <li>
                <a
                  href="#synopsis"
                  className="hover:text-[#e5c07b] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#e5c07b] rounded"
                >
                  <span className="text-[#e5c07b] text-xs">03.</span>
                  <span>Sinopsis &amp; Pemeran</span>
                </a>
              </li>
              <li>
                <a
                  href="#map"
                  className="hover:text-[#e5c07b] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#e5c07b] rounded"
                >
                  <span className="text-[#e5c07b] text-xs">04.</span>
                  <span>Denah &amp; Peta Lokasi</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Informasi Kontak & Layanan */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Kontak &amp; Lokasi
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#cbd5e1]">
              <div>
                <strong className="text-white block text-xs uppercase text-[#94a3b8]">Tanggal Acara:</strong>
                <span>{CHRISTMAS_EVENT_INFO.dateFormatted}</span>
              </div>

              <div>
                <strong className="text-white block text-xs uppercase text-[#94a3b8]">Alamat Kampus:</strong>
                <span>{CHRISTMAS_EVENT_INFO.venueAddress}</span>
              </div>

              <div>
                <strong className="text-white block text-xs uppercase text-[#94a3b8]">Telepon / WhatsApp:</strong>
                <a
                  href={CHRISTMAS_EVENT_INFO.contactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5c07b] hover:underline font-semibold block mt-0.5"
                >
                  {CHRISTMAS_EVENT_INFO.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>
            &copy; {currentYear} Cita Hati Christian Elementary School Pakuwon City Campus. Hak cipta dilindungi undang-undang.
          </p>

          <p className="flex items-center gap-1">
            <span>Christmas Celebration &amp; Market</span>
            <span className="text-[#e5c07b]">&bull;</span>
            <span className="text-[#cbd5e1] font-medium">The Gift Worth Giving</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

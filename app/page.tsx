"use client";

import React from "react";
import ChristmasNavbar from "@/components/christmas/ChristmasNavbar";
import ChristmasHeader from "@/components/christmas/ChristmasHeader";
import ChristmasInfo from "@/components/christmas/ChristmasInfo";
import ChristmasSynopsis from "@/components/christmas/ChristmasSynopsis";
import ChristmasVenueMap from "@/components/christmas/ChristmasVenueMap";
import ChristmasFooter from "@/components/christmas/ChristmasFooter";

export default function ChristmasEventPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08101e] text-[#f5f0e6] selection:bg-[#e5c07b] selection:text-[#0a1122]">
      {/* Sticky Navigation Bar with Quick Actions */}
      <ChristmasNavbar />

      <main className="flex-1">
        {/* BAGIAN 1 (ATAS): Logo & Presentasi Poster */}
        <ChristmasHeader />

        {/* BAGIAN 2: Info (Jadwal, Countdown, Sesi Musical Drama & Market, RSVP) */}
        <ChristmasInfo />

        {/* BAGIAN 3: Sinopsis (Jalan Cerita, Scene Breakdown, & 42+ Pemeran Siswa) */}
        <ChristmasSynopsis />

        {/* BAGIAN 4: Map yang dibuat (Denah Interaktif Festival & Google Maps Navigasi) */}
        <ChristmasVenueMap />
      </main>

      {/* Footer Acara & Kontak */}
      <ChristmasFooter />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { CHRISTMAS_EVENT_INFO, VENUE_ZONES, VenueZone } from "@/data/christmasData";

export default function ChristmasVenueMap() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("auditorium");
  const [activeTab, setActiveTab] = useState<"floorplan" | "googlemaps">("floorplan");
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const selectedZone: VenueZone =
    VENUE_ZONES.find((z) => z.id === selectedZoneId) || VENUE_ZONES[0];

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CHRISTMAS_EVENT_INFO.venueAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2600);
    } catch {
      // Fallback
      setCopiedAddress(false);
    }
  };

  return (
    <section id="map" className="py-16 md:py-24 bg-[#0a1122] text-[#f5f0e6] relative overflow-hidden">
      {/* Anchor alias for navigation links targeting venue-map */}
      <div id="venue-map" className="absolute -top-20" aria-hidden="true" />
      {/* Decorative background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#2d4d6e]/20 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5c07b]/15 border border-[#e5c07b]/40 text-[#f3d99d] text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4 text-[#e5c07b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Bagian 4: Denah &amp; Peta Lokasi
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Denah Acara &amp; Panduan Menuju Lokasi
          </h2>

          <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
            Jelajahi peta interaktif Cita Hati Elementary School Pakuwon City Campus untuk mempermudah kedatangan, parkir, dan menikmati setiap agenda acara.
          </p>
        </div>

        {/* View Mode Toggle: Interactive Floorplan vs Google Maps */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Pilihan Tampilan Peta"
            className="inline-flex p-1.5 rounded-2xl bg-[#0f172a] border border-[#2d4d6e]/50 shadow-lg"
          >
            <button
              role="tab"
              aria-selected={activeTab === "floorplan"}
              aria-controls="panel-floorplan"
              id="tab-floorplan"
              onClick={() => setActiveTab("floorplan")}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#e5c07b] ${
                activeTab === "floorplan"
                  ? "bg-[#e5c07b] text-[#0a1122] shadow-md"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Denah Interaktif Festival</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "googlemaps"}
              aria-controls="panel-googlemaps"
              id="tab-googlemaps"
              onClick={() => setActiveTab("googlemaps")}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#e5c07b] ${
                activeTab === "googlemaps"
                  ? "bg-[#e5c07b] text-[#0a1122] shadow-md"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Peta Google Maps &amp; GPS</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Floorplan Map */}
        {activeTab === "floorplan" && (
          <div id="panel-floorplan" role="tabpanel" aria-labelledby="tab-floorplan" className="space-y-8 animate-fadeIn">
            {/* Zone Selector Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {VENUE_ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-2 border focus:outline-none focus:ring-2 focus:ring-[#e5c07b] ${
                      isSelected
                        ? "bg-[#1e2d42] border-[#e5c07b] text-[#f3d99d] shadow-sm scale-105"
                        : "bg-[#0f172a]/70 border-[#2d4d6e]/40 text-[#94a3b8] hover:text-white hover:border-[#2d4d6e]"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: zone.color }}
                      aria-hidden="true"
                    />
                    <span>{zone.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Interactive Floorplan Canvas */}
            <div className="bg-[#0f172a] rounded-3xl border border-[#2d4d6e]/50 p-4 sm:p-6 shadow-2xl relative">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] bg-gradient-to-b from-[#131f33] to-[#0c1524] rounded-2xl overflow-hidden border border-[#2d4d6e]/40 flex items-center justify-center">
                {/* SVG Visual Layout of Cita Hati Elementary School Pakuwon City */}
                <svg
                  viewBox="0 0 1000 650"
                  className="w-full h-full object-contain select-none"
                  aria-label="Denah Kampus Cita Hati Pakuwon City"
                >
                  <defs>
                    <linearGradient id="auditoriumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2b3b55" />
                      <stop offset="100%" stopColor="#1a273b" />
                    </linearGradient>
                    <linearGradient id="marketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1b3d2f" />
                      <stop offset="100%" stopColor="#11291f" />
                    </linearGradient>
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Campus Outline Perimeter */}
                  <rect
                    x="40"
                    y="30"
                    width="920"
                    height="590"
                    rx="24"
                    fill="#0e1726"
                    stroke="#23354d"
                    strokeWidth="3"
                  />

                  {/* Access Road (Jl. Kejawan Putih Barat) */}
                  <rect x="40" y="550" width="920" height="70" fill="url(#roadGrad)" />
                  <line
                    x1="50"
                    y1="585"
                    x2="950"
                    y2="585"
                    stroke="#e5c07b"
                    strokeWidth="2"
                    strokeDasharray="14 14"
                  />
                  <text
                    x="500"
                    y="608"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="1.5"
                  >
                    JL. KEJAWAN PUTIH BARAT (AKSES UTAMA PAKUWON CITY)
                  </text>

                  {/* Main Building Body */}
                  <rect
                    x="180"
                    y="70"
                    width="640"
                    height="240"
                    rx="16"
                    fill="url(#auditoriumGrad)"
                    stroke={selectedZoneId === "auditorium" ? "#e5c07b" : "#3b5278"}
                    strokeWidth={selectedZoneId === "auditorium" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#e5c07b]"
                    onClick={() => setSelectedZoneId("auditorium")}
                  />
                  <text
                    x="500"
                    y="130"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="22"
                    fontWeight="700"
                  >
                    MAIN AUDITORIUM &amp; THEATRE
                  </text>
                  <text
                    x="500"
                    y="155"
                    textAnchor="middle"
                    fill="#e5c07b"
                    fontSize="14"
                    fontWeight="600"
                  >
                    Panggung Drama Musikal Sesi I &amp; II
                  </text>

                  {/* Stage Area within Auditorium */}
                  <rect
                    x="350"
                    y="180"
                    width="300"
                    height="100"
                    rx="10"
                    fill="#152033"
                    stroke="#48658d"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="500"
                    y="235"
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="14"
                    fontWeight="600"
                  >
                    GRAND PERFORMANCE STAGE
                  </text>

                  {/* Central Courtyard / Plaza */}
                  <rect
                    x="180"
                    y="330"
                    width="640"
                    height="180"
                    rx="16"
                    fill="#121e30"
                    stroke="#23354d"
                    strokeWidth="1"
                  />

                  {/* Zone 2: Christmas Market & Culinary Bazaar */}
                  <rect
                    x="200"
                    y="350"
                    width="260"
                    height="140"
                    rx="14"
                    fill="url(#marketGrad)"
                    stroke={selectedZoneId === "market" ? "#38a169" : "#285e43"}
                    strokeWidth={selectedZoneId === "market" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#38a169]"
                    onClick={() => setSelectedZoneId("market")}
                  />
                  <text
                    x="330"
                    y="405"
                    textAnchor="middle"
                    fill="#68d391"
                    fontSize="16"
                    fontWeight="700"
                  >
                    CHRISTMAS MARKET
                  </text>
                  <text
                    x="330"
                    y="430"
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="12"
                  >
                    Bazaar Kuliner &amp; Stand Hadiah
                  </text>
                  <text
                    x="330"
                    y="455"
                    textAnchor="middle"
                    fill="#9ae6b4"
                    fontSize="11"
                    fontWeight="600"
                  >
                    12.00 - 20.00 WIB
                  </text>

                  {/* Zone 4: Photo Plaza */}
                  <rect
                    x="540"
                    y="350"
                    width="260"
                    height="140"
                    rx="14"
                    fill="#2a1f18"
                    stroke={selectedZoneId === "photobooth" ? "#dd6b20" : "#7b341e"}
                    strokeWidth={selectedZoneId === "photobooth" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#dd6b20]"
                    onClick={() => setSelectedZoneId("photobooth")}
                  />
                  <text
                    x="670"
                    y="405"
                    textAnchor="middle"
                    fill="#fbd38d"
                    fontSize="16"
                    fontWeight="700"
                  >
                    WINTER PHOTO PLAZA
                  </text>
                  <text
                    x="670"
                    y="430"
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="12"
                  >
                    Pohon Natal Raksasa &amp; Dekorasi
                  </text>
                  <text
                    x="670"
                    y="455"
                    textAnchor="middle"
                    fill="#f6ad55"
                    fontSize="11"
                    fontWeight="600"
                  >
                    Spot Foto Keluarga
                  </text>

                  {/* Zone 3: Main Entrance & Registration Desk */}
                  <rect
                    x="420"
                    y="500"
                    width="160"
                    height="46"
                    rx="8"
                    fill="#1e3a8a"
                    stroke={selectedZoneId === "entrance" ? "#60a5fa" : "#3b82f6"}
                    strokeWidth={selectedZoneId === "entrance" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#93c5fd]"
                    onClick={() => setSelectedZoneId("entrance")}
                  />
                  <text
                    x="500"
                    y="528"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="700"
                  >
                    MAIN GATE &amp; REGISTRASI
                  </text>

                  {/* Zone 6: First Aid & Information */}
                  <rect
                    x="60"
                    y="360"
                    width="100"
                    height="120"
                    rx="10"
                    fill="#3b1d1d"
                    stroke={selectedZoneId === "medical" ? "#ef4444" : "#991b1b"}
                    strokeWidth={selectedZoneId === "medical" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#ef4444]"
                    onClick={() => setSelectedZoneId("medical")}
                  />
                  <text
                    x="110"
                    y="415"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="13"
                    fontWeight="700"
                  >
                    FIRST AID
                  </text>
                  <text
                    x="110"
                    y="435"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                  >
                    Pos Medis &amp;
                  </text>
                  <text
                    x="110"
                    y="450"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                  >
                    Pusat Info
                  </text>

                  {/* Zone 5: Drop Off & Parking */}
                  <rect
                    x="840"
                    y="360"
                    width="100"
                    height="120"
                    rx="10"
                    fill="#2e1065"
                    stroke={selectedZoneId === "parking" ? "#c084fc" : "#7e22ce"}
                    strokeWidth={selectedZoneId === "parking" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:stroke-[#c084fc]"
                    onClick={() => setSelectedZoneId("parking")}
                  />
                  <text
                    x="890"
                    y="415"
                    textAnchor="middle"
                    fill="#e9d5ff"
                    fontSize="13"
                    fontWeight="700"
                  >
                    PARKING
                  </text>
                  <text
                    x="890"
                    y="435"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                  >
                    Drop-Off &amp;
                  </text>
                  <text
                    x="890"
                    y="450"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                  >
                    Parkir Mobil
                  </text>

                  {/* Interactive Pulse Pin for Currently Selected Zone */}
                  {selectedZone && (
                    <g
                      transform={`translate(${selectedZone.xPercent * 10}, ${selectedZone.yPercent * 6.5})`}
                      className="pointer-events-none"
                    >
                      <circle r="22" fill={selectedZone.color} opacity="0.3" className="animate-ping" />
                      <circle r="14" fill={selectedZone.color} stroke="#ffffff" strokeWidth="2.5" />
                      <circle r="5" fill="#ffffff" />
                    </g>
                  )}
                </svg>

                {/* Legend Pill Overlay in Top-Right */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#0a1122]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2d4d6e]/50 text-[11px] text-[#cbd5e1] hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e5c07b] animate-pulse" />
                  <span>Klik area pada denah untuk melihat info</span>
                </div>
              </div>

              {/* Selected Zone Detail Card */}
              <div className="mt-6 bg-[#162032] rounded-2xl border border-[#2d4d6e]/60 p-5 sm:p-6 transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d4d6e]/40 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: selectedZone.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#94a3b8]">
                        Zona Terpilih: {selectedZone.code}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {selectedZone.name}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#2d4d6e]/60 text-xs sm:text-sm text-[#f3d99d] font-medium self-start md:self-auto">
                    <svg className="w-4 h-4 text-[#e5c07b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{selectedZone.operatingHours}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed mb-5">
                  {selectedZone.description}
                </p>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-2.5">
                    Fasilitas &amp; Keunggulan Zona
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {selectedZone.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0f172a]/70 border border-[#2d4d6e]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-[#e5c07b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Google Maps Embed & GPS Directions */}
        {activeTab === "googlemaps" && (
          <div id="panel-googlemaps" role="tabpanel" aria-labelledby="tab-googlemaps" className="space-y-6 animate-fadeIn">
            <div className="bg-[#0f172a] rounded-3xl border border-[#2d4d6e]/50 p-4 sm:p-6 shadow-2xl">
              <div className="relative w-full h-80 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden border border-[#2d4d6e]/40 bg-[#162032]">
                <iframe
                  title="Peta Lokasi Cita Hati Christian Elementary School Pakuwon City"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.692484083321!2d112.8028731!3d-7.2758129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa18536ec6f5%3A0xe54020a40ffbfa6!2sSekolah%20Kristen%20Cita%20Hati%20(Pakuwon%20City)!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[15%] contrast-105"
                />
              </div>

              {/* Action Buttons below Google Maps */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-[#cbd5e1]">
                  <strong className="text-white block sm:inline">Sekolah Kristen Cita Hati Pakuwon City:</strong>{" "}
                  {CHRISTMAS_EVENT_INFO.venueAddress}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCopyAddress}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e293b] hover:bg-[#334155] text-white border border-[#475569] transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#e5c07b]"
                  >
                    <svg className="w-4 h-4 text-[#e5c07b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{copiedAddress ? "Alamat Tersalin!" : "Salin Alamat"}</span>
                  </button>

                  <a
                    href={CHRISTMAS_EVENT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#e5c07b] hover:bg-[#f3d99d] text-[#0a1122] shadow-md transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#e5c07b]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Buka Rute di Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Travel & Parking Information Guide */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Akses Kendaraan Pribadi */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#2d4d6e]/40 p-5">
            <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/15 text-[#e5c07b] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Akses Kendaraan Pribadi
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              Masuk melalui bundaran gerbang utama Pakuwon City arah East Coast Center / Pakuwon City Mall. Ikuti petunjuk arah jalan boulevard menuju Jl. Kejawan Putih Barat.
            </p>
          </div>

          {/* Card 2: Drop-off & Fasilitas Parkir */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#2d4d6e]/40 p-5">
            <div className="w-10 h-10 rounded-xl bg-[#38a169]/15 text-[#68d391] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Drop-Off &amp; Area Parkir
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              Tersedia zona drop-off cepat di depan gerbang utama kampus. Area parkir mobil dan sepeda motor tersedia luas di dalam lingkungan kampus dengan pengawasan satpam.
            </p>
          </div>

          {/* Card 3: Layanan Transportasi Online */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#2d4d6e]/40 p-5">
            <div className="w-10 h-10 rounded-xl bg-[#3182ce]/15 text-[#60a5fa] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Titik Jemput Ojek &amp; Taksi Online
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              Titik penjemputan dan penurunan ojek/taksi online diatur di Shelter Utama dekat gerbang pos keamanan untuk kelancaran arus lalu lintas masuk dan keluar.
            </p>
          </div>
        </div>

        {/* Quick Contact / RSVP Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#0f172a] border border-[#3b82f6]/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#93c5fd]">
              Perlu Bantuan atau Info Khusus?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Hubungi Tim Informasi &amp; RSVP
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] mt-1">
              Petugas panitia siap menjawab pertanyaan mengenai tiket, tempat duduk, dan informasi stand Christmas Market.
            </p>
          </div>

          <a
            href={CHRISTMAS_EVENT_INFO.contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-6 py-3 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-[#0a1122] font-bold text-sm shadow-lg transition-all flex items-center gap-2.5 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#25d366]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.49 1.199.533 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z" />
            </svg>
            <span>WhatsApp: {CHRISTMAS_EVENT_INFO.contactPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

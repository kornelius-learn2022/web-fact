"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShoppingBag,
  Theater,
  MessageCircle,
  CalendarPlus,
  Users,
  Info,
  CheckCircle2,
} from "lucide-react";
import { CHRISTMAS_EVENT_INFO, SESSIONS_DATA } from "@/data/christmasData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ChristmasInfo() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [calendarSaved, setCalendarSaved] = useState(false);

  // Live countdown timer calculation
  useEffect(() => {
    const targetDate = new Date("2026-12-05T12:00:00+07:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Cita Hati//Christmas Extravaganza 2026//EN",
      "BEGIN:VEVENT",
      "UID:citahati-christmas-2026@citahati.sch.id",
      "DTSTAMP:20261116T000000Z",
      "DTSTART:20261205T050000Z",
      "DTEND:20261205T130000Z",
      "SUMMARY:The Gift Worth Giving - Christmas Celebration & Market",
      "DESCRIPTION:Cita Hati Christian Elementary School Pakuwon City Campus Proudly Presents Christmas Celebration & Market: The Gift Worth Giving. Drama Musikal Sesi I (14.00-15.30), Sesi II (17.00-18.30), Christmas Market (12.00-20.00).",
      "LOCATION:Cita Hati Christian School Pakuwon City Campus, Surabaya",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "CitaHati-TheGiftWorthGiving-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 4000);
  };

  return (
    <section
      id="info"
      className="relative bg-[#0D1B2A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 border-t border-[#DFB76C]/20"
      aria-label="Informasi Lengkap Acara Natal"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DFB76C]/40 bg-[#1B324F] px-4 py-1 text-xs font-bold text-[#DFB76C]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Agenda & Waktu Penyelenggaraan</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Informasi Lengkap Acara
          </h2>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Perayaan Natal spektakuler Sekolah Kristen Cita Hati Pakuwon City Campus terbuka untuk seluruh keluarga dan masyarakat umum.
          </p>
        </div>

        {/* Live Countdown Clock Cards */}
        <div className="mt-10 rounded-2xl border border-[#DFB76C]/40 bg-gradient-to-b from-[#1B324F] to-[#122338] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB76C]">
                Hitung Mundur Menuju Perayaan
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
                Sabtu, 05 Desember 2026
              </h3>
              <p className="mt-1 text-xs text-gray-300">
                Pintu gerbang Christmas Market dibuka mulai pukul 12.00 WIB
              </p>
            </div>

            {/* Countdown Digits Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-[64px] sm:min-w-[76px] flex-col items-center justify-center rounded-xl border border-[#DFB76C]/30 bg-[#0D1B2A] p-2.5 sm:p-3 shadow-inner"
                >
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F5E6C8]">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Main Session Cards (Matching Poster Exact Timings) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SESSIONS_DATA.map((session) => {
            const isDrama = session.iconName === "Drama";
            const Icon = isDrama ? Theater : ShoppingBag;

            return (
              <div
                key={session.id}
                className="flex flex-col justify-between rounded-2xl border border-[#DFB76C]/30 bg-[#15253A] p-6 shadow-md transition-all hover:border-[#DFB76C] hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFB76C]/20 border border-[#DFB76C]/40 px-3 py-1 text-[11px] font-bold text-[#F5E6C8]">
                      {session.badge}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1B2A] text-[#DFB76C]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold text-white">
                    {session.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#DFB76C]">
                    <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span>{session.time}</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {session.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Lokasi: {isDrama ? "Auditorium Utama" : "Plaza Sekolah"}</span>
                  <span className="font-bold text-[#F5E6C8]">Gratis Masuk</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Event Badges & Notices */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#15253A]/60 p-4">
            <Users className="h-5 w-5 text-[#DFB76C] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Terbuka Untuk Umum (Open For Public)
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Seluruh keluarga, kerabat, dan masyarakat umum diperbolehkan hadir menikmati perayaan Natal tanpa pungutan biaya masuk.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#15253A]/60 p-4">
            <MapPin className="h-5 w-5 text-[#DFB76C] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Lokasi Pakuwon City Campus
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {CHRISTMAS_EVENT_INFO.venueAddress} (Akses mudah dari East Coast Center / Pakuwon City Mall).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#15253A]/60 p-4 sm:col-span-2 lg:col-span-1">
            <Info className="h-5 w-5 text-[#DFB76C] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Pintu Auditorium & Registrasi
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Pintu dibuka 30 menit sebelum sesi dimulai. Harap hadir tepat waktu untuk kenyamanan menonton pertunjukan.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Action Bar: Contact WhatsApp, Save Calendar, & Map Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CHRISTMAS_EVENT_INFO.contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#DFB76C] px-6 py-3 text-xs sm:text-sm font-bold text-[#0D1B2A] shadow-md transition-all hover:bg-[#F5E6C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Tanya Panitia via WhatsApp (081310007452)</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#DFB76C] bg-[#1B324F] px-6 py-3 text-xs sm:text-sm font-bold text-[#F5E6C8] shadow-md transition-all hover:bg-[#27415D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] active:scale-95"
          >
            {calendarSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden="true" />
                <span>Pengingat Disimpan (.ics)</span>
              </>
            ) : (
              <>
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                <span>Simpan ke Kalender (.ics)</span>
              </>
            )}
          </button>

          <a
            href="#venue-map"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-bold text-gray-200 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
          >
            <MapPin className="h-4 w-4 text-[#DFB76C]" aria-hidden="true" />
            <span>Lihat Denah & Petunjuk Arah</span>
          </a>
        </div>
      </div>
    </section>
  );
}

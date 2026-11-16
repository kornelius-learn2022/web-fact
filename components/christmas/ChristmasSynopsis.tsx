"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Music,
  Users,
  Search,
  Sparkles,
  ChevronRight,
  Heart,
  Quote,
  Drama,
} from "lucide-react";
import {
  SYNOPSIS_OVERVIEW,
  SCENES_DATA,
  CAST_DATA,
  CastMember,
} from "@/data/christmasData";

const CAST_CATEGORIES = [
  "Semua",
  "Pemeran Utama",
  "Keluarga",
  "Pasar & Warga",
  "Prajurit & Penjaga",
  "Musik & Paduan Suara",
] as const;

export default function ChristmasSynopsis() {
  const [selectedSceneId, setSelectedSceneId] = useState<number>(0);
  const [castSearch, setCastSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredCast: CastMember[] = CAST_DATA.filter((member) => {
    const matchesCategory =
      selectedCategory === "Semua" || member.category === selectedCategory;
    const matchesSearch =
      member.character.toLowerCase().includes(castSearch.toLowerCase()) ||
      member.actor.toLowerCase().includes(castSearch.toLowerCase()) ||
      member.roleDescription.toLowerCase().includes(castSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeScene =
    SCENES_DATA.find((s) => s.id === selectedSceneId) || SCENES_DATA[0];

  return (
    <section
      id="sinopsis"
      className="relative bg-gradient-to-b from-[#0D1B2A] via-[#122338] to-[#0D1B2A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 border-t border-[#DFB76C]/20"
      aria-label="Sinopsis Drama Musikal dan Daftar Pemeran"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DFB76C]/40 bg-[#1B324F] px-4 py-1 text-xs font-bold text-[#DFB76C]">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kisah Drama Musikal Natal 2026</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Sinopsis: A Gift Worth Giving
          </h2>
          <p className="mt-2 font-serif text-base text-[#F5E6C8] font-semibold italic">
            "{SYNOPSIS_OVERVIEW.tagline}"
          </p>
        </div>

        {/* Storyline Overview Box */}
        <div className="mt-10 rounded-3xl border border-[#DFB76C]/40 bg-[#15253A] p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DFB76C]">
                Ringkasan Alur Cerita
              </span>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {SYNOPSIS_OVERVIEW.summary}
              </p>

              {/* Moral Quote Callout */}
              <div className="rounded-2xl border border-[#DFB76C]/30 bg-[#0D1B2A]/80 p-5 mt-4">
                <div className="flex items-start gap-3">
                  <Quote className="h-6 w-6 text-[#DFB76C] flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-serif text-sm sm:text-base italic text-[#F5E6C8] leading-relaxed">
                      "{SYNOPSIS_OVERVIEW.quote}"
                    </p>
                    <p className="text-xs font-semibold text-gray-400 mt-2">
                      {SYNOPSIS_OVERVIEW.quoteAuthor}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Themes Highlight Card */}
            <div className="w-full md:w-72 rounded-2xl border border-white/10 bg-[#0D1B2A] p-5 flex flex-col gap-3">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#DFB76C]" aria-hidden="true" />
                <span>Nilai-Nilai Utama</span>
              </h3>
              {[
                { title: "Kasih Tanpa Syarat", desc: "Berbagi tanpa mengharapkan balasan" },
                { title: "Kekuatan Pengampunan", desc: "Meluluhkan kepahitan hati masa lalu" },
                { title: "Kemurahan Hati", desc: "Meringankan beban sesama yang berkekurangan" },
                { title: "Kasih Sejati Allah", desc: "Makna hakiki perayaan Natal di dunia" },
              ].map((val) => (
                <div key={val.title} className="text-xs">
                  <span className="font-bold text-[#F5E6C8] block">{val.title}</span>
                  <span className="text-gray-400">{val.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scene by Scene Interactive Explorer */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DFB76C]">
                Jelajahi Alur Pertunjukan
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Rangkaian Adegan Drama Musikal
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              Pilih babak di bawah untuk membaca detail adegan
            </span>
          </div>

          {/* Scene Selector Pills Grid */}
          <div className="flex flex-wrap gap-2 pb-2">
            {SCENES_DATA.map((scene) => {
              const isSelected = scene.id === selectedSceneId;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setSelectedSceneId(scene.id)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] ${
                    isSelected
                      ? "bg-[#DFB76C] text-[#0D1B2A] shadow-lg shadow-[#DFB76C]/20 font-black"
                      : "border border-white/10 bg-[#15253A] text-gray-300 hover:border-[#DFB76C]/60 hover:text-white"
                  }`}
                >
                  <Drama className="h-4 w-4" aria-hidden="true" />
                  <span>{scene.id === 0 ? "Prolog" : `Adegan ${scene.id}`}</span>
                </button>
              );
            })}
          </div>

          {/* Active Scene Detail View */}
          <div className="mt-4 rounded-3xl border border-[#DFB76C]/30 bg-[#15253A] p-6 sm:p-8 shadow-xl transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="inline-block rounded-full bg-[#DFB76C]/20 border border-[#DFB76C]/40 px-3 py-0.5 text-xs font-bold text-[#F5E6C8]">
                  {activeScene.id === 0 ? "Prolog Teater" : `Babak ${activeScene.id}`}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeScene.title}
                </h4>
              </div>
              <div className="text-xs text-gray-400">
                <span className="font-semibold text-gray-300">Setting: </span>
                {activeScene.setting}
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
              {activeScene.summary}
            </p>

            {/* Song, Characters, and Moral Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl bg-[#0D1B2A] p-3 border border-white/5">
                <span className="font-bold text-[#DFB76C] flex items-center gap-1.5 mb-1">
                  <Music className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Musik & Lagu:</span>
                </span>
                <span className="text-gray-300">{activeScene.songs.join(", ")}</span>
              </div>

              <div className="rounded-xl bg-[#0D1B2A] p-3 border border-white/5">
                <span className="font-bold text-[#DFB76C] flex items-center gap-1.5 mb-1">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pemeran Utama Adegan:</span>
                </span>
                <span className="text-gray-300">{activeScene.keyCharacters.join(", ")}</span>
              </div>

              <div className="rounded-xl bg-[#0D1B2A] p-3 border border-white/5">
                <span className="font-bold text-[#DFB76C] flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pesan Moral:</span>
                </span>
                <span className="text-gray-300 italic">"{activeScene.moral}"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cast & Characters Directory */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DFB76C]">
                Siswa Berbakat Cita Hati
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Daftar Pemeran & Karakter ({CAST_DATA.length} Siswa)
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Cari siswa atau nama karakter dalam pementasan drama musikal
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={castSearch}
                onChange={(e) => setCastSearch(e.target.value)}
                placeholder="Cari pemeran atau peran..."
                className="w-full min-h-[44px] rounded-xl border border-white/20 bg-[#15253A] pl-9 pr-4 text-xs font-medium text-white placeholder-gray-400 transition-colors focus:border-[#DFB76C] focus:outline-none focus:ring-1 focus:ring-[#DFB76C]"
                aria-label="Cari nama karakter atau nama siswa"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-4">
            {CAST_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex min-h-[38px] items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] ${
                    isSelected
                      ? "bg-[#DFB76C] text-[#0D1B2A] font-extrabold shadow-sm"
                      : "border border-white/10 bg-[#15253A] text-gray-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Cast Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCast.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-[#15253A] p-8 text-center text-gray-400">
                <Users className="mx-auto h-8 w-8 text-gray-500 mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-white">Tidak ada pemeran yang cocok dengan pencarian.</p>
                <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain atau pilih kategori "Semua".</p>
              </div>
            ) : (
              filteredCast.map((member) => (
                <div
                  key={`${member.character}-${member.actor}`}
                  className="rounded-2xl border border-white/10 bg-[#15253A] p-4 shadow-sm transition-all hover:border-[#DFB76C]/60 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFB76C]">
                        {member.category}
                      </span>
                      <h4 className="font-serif text-base font-bold text-white">
                        {member.character}
                      </h4>
                    </div>
                    <span className="rounded-full bg-[#0D1B2A] border border-[#DFB76C]/30 px-2.5 py-0.5 text-[11px] font-bold text-[#F5E6C8]">
                      {member.actor}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                    {member.roleDescription}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

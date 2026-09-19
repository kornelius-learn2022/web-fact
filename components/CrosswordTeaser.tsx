"use client";

import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  RefreshCw,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { AICrosswordResult } from "@/lib/groqAI";

interface CellDef {
  r: number;
  c: number;
  answer: string;
  number?: number;
}

export default function CrosswordTeaser() {
  const [loading, setLoading] = useState(false);

  // Default initial crossword
  const [crossword, setCrossword] = useState<AICrosswordResult>({
    title: "Teka-Teki Silang Multidisiplin",
    category: "Semua Kategori",
    grid: { rows: 6, cols: 8 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "ATMOSFER",
        clue: "Lapisan gas bumi tempat molekul menyebarkan cahaya matahari sehingga langit biru.",
        startRow: 1,
        startCol: 0,
      },
      {
        number: 2,
        direction: "down",
        word: "SURYA",
        clue: "Sebutan lain untuk matahari, pusat tata surya yang memancarkan cahaya dan energi.",
        startRow: 1,
        startCol: 4,
      },
    ],
    modelUsed: "Sistem Cerdas",
    layer: 1,
  });

  const [gridValues, setGridValues] = useState<{ [key: string]: string }>({});
  const [activeClueIndex, setActiveClueIndex] = useState<number>(0);

  // Dynamic grid dimension bounds
  const gridRows = Math.max(
    crossword.grid?.rows || 6,
    ...crossword.words.map((w) => (w.direction === "down" ? w.startRow + w.word.length : w.startRow + 1))
  );
  const gridCols = Math.max(
    crossword.grid?.cols || 8,
    ...crossword.words.map((w) => (w.direction === "across" ? w.startCol + w.word.length : w.startCol + 1))
  );

  // Build target cell map from active crossword words
  const targetCells: { [key: string]: CellDef } = {};
  crossword.words.forEach((w) => {
    const letters = w.word.toUpperCase().split("");
    letters.forEach((char, idx) => {
      const r = w.direction === "across" ? w.startRow : w.startRow + idx;
      const c = w.direction === "across" ? w.startCol + idx : w.startCol;
      const key = `${r}-${c}`;

      if (!targetCells[key]) {
        targetCells[key] = {
          r,
          c,
          answer: char,
          number: idx === 0 ? w.number : undefined,
        };
      } else if (idx === 0) {
        targetCells[key].number = w.number;
      }
    });
  });

  // Verification
  const totalCells = Object.keys(targetCells).length;
  const correctCellsCount = Object.keys(targetCells).filter(
    (k) => (gridValues[k] || "").toUpperCase() === targetCells[k].answer
  ).length;
  const isAllCorrect = totalCells > 0 && correctCellsCount === totalCells;

  // Handle cell input
  const handleCellChange = (r: number, c: number, val: string) => {
    const char = val.slice(-1).toUpperCase();
    const key = `${r}-${c}`;
    const nextGrid = { ...gridValues, [key]: char };
    setGridValues(nextGrid);

    // Auto advance to next cell in current word
    if (char) {
      const activeWord = crossword.words[activeClueIndex] || crossword.words[0];
      if (activeWord) {
        if (activeWord.direction === "across") {
          document.getElementById(`cell-${r}-${c + 1}`)?.focus();
        } else {
          document.getElementById(`cell-${r + 1}-${c}`)?.focus();
        }
      }
    }
  };

  // Generate new crossword dynamically with AI
  const handleGenerateAI = async () => {
    setLoading(true);
    setGridValues({});
    try {
      const res = await fetch("/api/ai/crossword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "Semua Kategori" }),
      });

      const data = await res.json();
      if (data.success && data.crossword) {
        setCrossword(data.crossword);
      }
    } catch {
      // Fallback handled by API
    } finally {
      setLoading(false);
    }
  };

  const revealAll = () => {
    const full: { [key: string]: string } = {};
    Object.keys(targetCells).forEach((k) => {
      full[k] = targetCells[k].answer;
    });
    setGridValues(full);
  };

  const resetGrid = () => {
    setGridValues({});
  };

  return (
    <section id="quiz" className="bg-graphite-black px-6 py-16 md:px-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-electric-indigo/50 bg-[#151126] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Neon Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric-indigo/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-neon-fuchsia/25 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-electric-indigo p-3 text-white shadow-lg shadow-electric-indigo/40">
                <Brain className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-widest text-cyber-lime uppercase">
                    Knowledge Discovery Maze
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyber-lime/10 border border-cyber-lime/40 px-2.5 py-0.5 text-[10px] font-black text-cyber-lime">
                    <Sparkles className="h-3 w-3" />
                    Teka-Teki Dinamis
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  {crossword.title}
                </h2>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetGrid}
                className="flex items-center gap-1 rounded-full border border-gray-700 bg-black/40 px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                onClick={revealAll}
                className="rounded-full bg-cyber-lime/10 border border-cyber-lime px-3.5 py-1.5 text-xs font-black text-cyber-lime hover:bg-cyber-lime hover:text-black transition-colors"
              >
                Bocorkan Jawaban
              </button>
            </div>
          </div>

          {/* AI Generator Control Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-lime/30 bg-cyber-lime/10 px-3.5 py-1.5 text-xs font-bold text-cyber-lime">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Cakupan: <strong>Semua Topik</strong> (Multidisiplin)</span>
              </span>

              <button
                onClick={handleGenerateAI}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-neon-fuchsia px-4 py-2 text-xs font-black text-black shadow-md hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Menyusun Teka-Teki..." : "🎲 Buat Teka-Teki Baru"}
              </button>
            </div>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyber-lime hover:underline"
            >
              Buka Arena Kuis & TTS Lengkap <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Main TTS Grid & Clues */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive 2D Crossword Board */}
            <div className="lg:col-span-7 flex justify-center overflow-x-auto p-4 bg-black/50 rounded-3xl border border-white/10">
              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center gap-3">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyber-lime border-t-transparent" />
                  <p className="text-xs font-bold text-gray-300">
                    Menyusun kata bersilang interaktif...
                  </p>
                </div>
              ) : (
                <div
                  className="inline-grid gap-2 p-2 min-w-[320px]"
                  style={{
                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: gridRows }).map((_, r) =>
                    Array.from({ length: gridCols }).map((_, c) => {
                      const cellKey = `${r}-${c}`;
                      const cellDef = targetCells[cellKey];

                      if (!cellDef) {
                        return (
                          <div
                            key={cellKey}
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-transparent"
                          />
                        );
                      }

                      const val = gridValues[cellKey] || "";
                      const isCellCorrect = val.toUpperCase() === cellDef.answer;

                      return (
                        <div key={cellKey} className="relative">
                          {cellDef.number && (
                            <span className="absolute top-1 left-1.5 text-[9px] font-black text-cyber-lime pointer-events-none z-10">
                              {cellDef.number}
                            </span>
                          )}

                          <input
                            id={`cell-${r}-${c}`}
                            type="text"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleCellChange(r, c, e.target.value)}
                            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl text-center text-lg sm:text-xl font-black uppercase transition-all duration-150 focus:outline-none focus:ring-2 ${
                              isAllCorrect
                                ? "border-2 border-cyber-lime bg-cyber-lime/20 text-cyber-lime ring-cyber-lime"
                                : val
                                ? "border-2 border-neon-fuchsia bg-white/10 text-white ring-neon-fuchsia"
                                : "border border-white/25 bg-black/80 text-white hover:border-cyber-lime focus:border-cyber-lime focus:ring-cyber-lime"
                            }`}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Right: Dynamic Clues List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                Petunjuk Teka-Teki:
              </span>

              {crossword.words.map((w, idx) => {
                const letters = w.word.toUpperCase().split("");
                const isWordCorrect = letters.every((char, i) => {
                  const r = w.direction === "across" ? w.startRow : w.startRow + i;
                  const c = w.direction === "across" ? w.startCol + i : w.startCol;
                  return (gridValues[`${r}-${c}`] || "").toUpperCase() === char;
                });

                return (
                  <div
                    key={w.number}
                    onClick={() => setActiveClueIndex(idx)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      activeClueIndex === idx
                        ? "border-cyber-lime bg-cyber-lime/10 shadow-lg"
                        : "border-white/10 bg-[#1e1a33] hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black text-black ${
                            w.direction === "across" ? "bg-cyber-lime" : "bg-neon-fuchsia"
                          }`}
                        >
                          {w.number}
                        </span>
                        <span
                          className={`text-xs font-black tracking-wider uppercase ${
                            w.direction === "across" ? "text-cyber-lime" : "text-neon-fuchsia"
                          }`}
                        >
                          {w.direction === "across" ? "Mendatar" : "Menurun"} ({w.word.length} Huruf)
                        </span>
                      </div>

                        {isWordCorrect && (
                        <span className="flex items-center gap-1 text-xs font-bold text-cyber-lime">
                          <CheckCircle2 className="h-4 w-4" /> Benar!
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      "{w.clue}"
                    </p>
                  </div>
                );
              })}

              {/* Victory Banner */}
              {isAllCorrect && (
                <div className="rounded-2xl border-2 border-cyber-lime bg-cyber-lime/15 p-5 text-center animate-in zoom-in-95">
                  <p className="text-sm font-black text-cyber-lime">
                    🎉 LUAR BIASA! SEMUA TEKA-TEKI TERPECAHKAN!
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Kamu berhasil memecahkan seluruh susunan kata pada teka-teki silang ini!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

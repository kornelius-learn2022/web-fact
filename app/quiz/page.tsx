"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Brain,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { AICrosswordResult, AIQuizResult } from "@/lib/groqAI";

export default function QuizArenaPage() {
  const [activeMode, setActiveMode] = useState<"crossword" | "trivia">("trivia");
  const [loading, setLoading] = useState(false);

  // Trivia Quiz State - Multidisciplinary across all categories
  const [quizData, setQuizData] = useState<AIQuizResult>({
    title: "Kuis Trivia Multidisiplin",
    category: "Semua Kategori",
    questions: [
      {
        id: 1,
        question: "Mengapa langit pada siang hari tampak berwarna biru?",
        options: [
          "Pantulan warna air laut ke atmosfer",
          "Hamburan Rayleigh oleh partikel gas udara",
          "Gas ozon memancarkan spektrum biru",
          "Lapisan awan tipis membiaskan cahaya",
        ],
        correctIndex: 1,
        explanation:
          "Molekul gas di atmosfer bumi menyebarkan cahaya biru yang bergelombang pendek jauh lebih kuat daripada warna gelombang panjang (Hamburan Rayleigh).",
        category: "Sains",
      },
      {
        id: 2,
        question: "Benda apakah yang dijuluki sebagai komputer analog tertua dari abad ke-2 SM yang ditemukan di dasar laut Yunani?",
        options: [
          "Mekanisme Antikythera",
          "Abakus Romawi",
          "Jam Pasir Alexandria",
          "Kompas Pelaut Fenisia",
        ],
        correctIndex: 0,
        explanation:
          "Mekanisme Antikythera ditemukan di dasar laut Yunani dengan 30+ roda gigi perunggu yang mampu memprediksi posisi planet dan gerhana matahari.",
        category: "Teknologi",
      },
      {
        id: 3,
        question: "Fenomena tiba-tiba lupa tujuan saat melangkah melewati pintu dinamakan:",
        options: [
          "Tunnel Vision",
          "Doorway Effect",
          "Placebo Reset",
          "Cognitive Dissonance",
        ],
        correctIndex: 1,
        explanation:
          "Doorway Effect terjadi karena pintu bertindak sebagai batas peristiwa (event boundary) yang memicu otak mengarsipkan memori ruangan sebelumnya.",
        category: "Psikologi",
      },
      {
        id: 4,
        question: "Berapa persen suplai oksigen bumi yang dihasilkan oleh fotosintesis di lautan?",
        options: [
          "Sekitar 10%",
          "Sekitar 25%",
          "Sekitar 50-80%",
          "Hampir 100%",
        ],
        correctIndex: 2,
        explanation:
          "Sebagian besar oksigen bumi dihasilkan oleh plankton laut dan alga mikroskopis (fitoplankton), bukan hanya pohon di daratan.",
        category: "Sains",
      },
      {
        id: 5,
        question: "Prinsip komputasi kuantum di mana data dapat bernilai 0 dan 1 sekaligus disebut:",
        options: [
          "Quantum Superposition",
          "Binary Oscillation",
          "Quantum Decoherence",
          "Silicon Singularity",
        ],
        correctIndex: 0,
        explanation:
          "Superposisi memungkinkan qubit berada dalam status majemuk hingga hasil pengukuran akhir dievaluasi.",
        category: "Teknologi",
      },
      {
        id: 6,
        question: "Peristiwa gelembung ekonomi pertama yang tercatat dalam sejarah dunia pada abad ke-17 di Belanda adalah:",
        options: [
          "South Sea Bubble",
          "Tulip Mania (Demam Tulip)",
          "Mississippi Scheme",
          "The Great Crash",
        ],
        correctIndex: 1,
        explanation:
          "Tulip Mania (1637) terjadi saat harga umbi tulip langka melambung drastis hingga setara harga rumah mewah sebelum akhirnya anjlok seketika.",
        category: "Ekonomi",
      },
      {
        id: 7,
        question: "Teknik lukisan legendaris Leonardo da Vinci yang memadukan gradasi warna tanpa garis batas tegas dinamakan:",
        options: [
          "Chiaroscuro",
          "Sfumato",
          "Impasto",
          "Fresco",
        ],
        correctIndex: 1,
        explanation:
          "Sfumato menghasilkan gradasi halus bagai asap tanpa transisi garis yang kaku, terlihat sempurna pada lukisan Mona Lisa.",
        category: "Seni & Budaya",
      },
      {
        id: 8,
        question: "Pustaka kuno legendaris manakah di era Helenistik yang pernah menjadi pusat penyimpanan seluruh naskah ilmu pengetahuan dunia kuno?",
        options: [
          "Perpustakaan Alexandria",
          "Perpustakaan Ashurbanipal",
          "Perpustakaan Pergamon",
          "House of Wisdom",
        ],
        correctIndex: 0,
        explanation:
          "Perpustakaan Alexandria di Mesir menjadi simbol kejayaan ilmu pengetahuan klasik sebelum terbakar dalam berbagai tragedi sejarah.",
        category: "Sejarah",
      },
    ],
    modelUsed: "Sistem Cerdas",
    layer: 1,
  });

  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Handle Trivia Option Select
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submittedQuiz) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Generate New Trivia dynamically with AI across all categories
  const handleGenerateNewQuiz = async () => {
    setLoading(true);
    setUserAnswers({});
    setSubmittedQuiz(false);

    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "Semua Kategori" }),
      });

      const data = await res.json();
      if (data.success && data.quiz) {
        setQuizData(data.quiz);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  // Calculate score
  const score = quizData.questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black text-white">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header Banner */}
          <div className="mb-8 rounded-3xl border border-electric-indigo/50 bg-[#161129] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric-indigo/30 blur-3xl" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-electric-indigo p-3 text-white">
                  <Brain className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-widest text-cyber-lime uppercase">
                    Mind.Maze Knowledge Arena
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyber-lime/10 border border-cyber-lime/40 px-2.5 py-0.5 text-[10px] font-black text-cyber-lime">
                    <Sparkles className="h-3 w-3" />
                    Kuis Adaptif
                  </span>
                </div>
                <h1 className="text-3xl font-black text-white md:text-4xl">
                  Arena Kuis & Teka-Teki Cerdas
                </h1>
              </div>
            </div>

            {/* Mode Toggles */}
            <div className="flex items-center gap-2 rounded-2xl bg-black/50 p-1.5 border border-white/10">
              <button
                onClick={() => setActiveMode("trivia")}
                className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
                  activeMode === "trivia"
                    ? "bg-cyber-lime text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Kuis Trivia Pilihan Ganda
              </button>
              <button
                onClick={() => setActiveMode("crossword")}
                className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
                  activeMode === "crossword"
                    ? "bg-neon-fuchsia text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Teka-Teki Silang (TTS)
              </button>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm text-gray-300">
            Pertanyaan dan teka-teki silang ini dihasilkan secara dinamis oleh kecerdasan buatan dengan sistem pintar berkecepatan tinggi untuk pengalaman belajar trivia yang interaktif dan seru.
          </p>
        </div>

        {/* AI Generator Control Bar - All Categories Trivia */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#1c1c1c] p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-lime/30 bg-cyber-lime/10 px-3.5 py-1.5 text-xs font-bold text-cyber-lime">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cakupan: <strong>Semua Kategori</strong> (Multidisiplin)</span>
            </span>

            <button
              onClick={handleGenerateNewQuiz}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-neon-fuchsia px-4 py-2 text-xs font-black text-black shadow-md hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Menyiapkan Kuis..." : "🎲 Acak Soal Baru (Semua Kategori)"}
            </button>
          </div>

          {submittedQuiz && (
            <div className="flex items-center gap-2 text-xs font-black text-cyber-lime">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Skor Anda: {score} dari {quizData.questions.length} Benar!
              </span>
            </div>
          )}
        </div>

        {/* MODE 1: TRIVIA MULTIPLE CHOICE */}
        {activeMode === "trivia" && (
          <div className="space-y-6">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-16 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyber-lime border-t-transparent mb-4" />
                <p className="text-base font-bold text-white">
                  Sedang menyusun pertanyaan trivia interaktif dari semua kategori...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Sistem cerdas merangkum wawasan Sains, Teknologi, Psikologi, Sejarah, Ekonomi, dan Seni.
                </p>
              </div>
              ) : (
                quizData.questions.map((q, qIndex) => {
                  const selectedOpt = userAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;

                  return (
                    <div
                      key={q.id}
                      className="rounded-3xl border border-white/10 bg-[#1e1e1e] p-6 sm:p-8 shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full bg-cyber-lime/10 border border-cyber-lime/40 px-3 py-1 text-xs font-black text-cyber-lime">
                          Soal #{qIndex + 1}
                        </span>
                        {q.category && (
                          <span className="rounded-full bg-white/10 border border-white/15 px-3 py-0.5 text-xs font-bold text-gray-300">
                            {q.category}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-black text-white sm:text-xl">
                        {q.question}
                      </h3>

                      {/* Options Grid */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedOpt === optIndex;
                          const isCorrect = q.correctIndex === optIndex;

                          let btnStyle = "border-white/20 bg-black/50 text-gray-200 hover:border-cyber-lime";
                          if (submittedQuiz) {
                            if (isCorrect) {
                              btnStyle = "border-cyber-lime bg-cyber-lime/20 text-cyber-lime font-black";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "border-red-500 bg-red-500/20 text-red-300";
                            }
                          } else if (isSelected) {
                            btnStyle = "border-cyber-lime bg-cyber-lime text-black font-black shadow-lg";
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectOption(q.id, optIndex)}
                              className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                            >
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after submission */}
                      {submittedQuiz && (
                        <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4 text-xs text-gray-300 animate-in fade-in">
                          <strong className="text-cyber-lime">💡 Pembahasan: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* Submit Quiz Answers Button */}
              {!submittedQuiz && !loading && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-cyber-lime px-8 py-3.5 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    <span>Periksa Jawaban Saya</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: TEKA-TEKI SILANG ARENA */}
          {activeMode === "crossword" && (
            <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-10 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-neon-fuchsia mb-3" />
              <h2 className="text-2xl font-black text-white">Teka-Teki Silang Interaktif AI</h2>
              <p className="mt-2 text-xs text-gray-400 max-w-lg mx-auto">
                Teka-teki silang dinamis dapat dimainkan langsung di bagian beranda dengan grid 2D interaktif yang menyusun kata bersilangan secara cerdas.
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href="/#quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-neon-fuchsia px-8 py-3.5 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Buka Papan Teka-Teki Silang Beranda
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

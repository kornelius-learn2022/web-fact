"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Article } from "@/data/mockData";
import {
  PenTool,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
  PlusCircle,
  ArrowLeft,
  Check,
  X,
  Sparkles,
  UserCog,
} from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import ImageUploader from "@/components/ImageUploader";

export default function ContributorPortalPage() {
  const { user, login } = useAuth();
  const { articles, categories, addArticle, updateArticle, deleteArticle } =
    useData();

  const [activeTab, setActiveTab] = useState<"my-articles" | "submit">(
    "my-articles"
  );

  // Submit Form state
  const [title, setTitle] = useState("");
  const [highlightWord, setHighlightWord] = useState("");
  const [categorySlug, setCategorySlug] = useState("technology");
  const [readTime, setReadTime] = useState("2 min read");
  const [shortSummary, setShortSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [triviaTitle, setTriviaTitle] = useState("Ternyata selama ini...");
  const [triviaText, setTriviaText] = useState("");
  const [crosswordWord, setCrosswordWord] = useState("");
  const [crosswordClue, setCrosswordClue] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Edit Own Article state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // If user not logged in, show prompt
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col bg-graphite-black text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#161616] p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyber-lime/20 text-cyber-lime">
              <PenTool className="h-8 w-8" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-white">
              Portal Kontributor Mind.Maze
            </h1>
            <p className="mt-2 text-xs text-gray-400">
              Silakan masuk atau daftar terlebih dahulu untuk mengirim fakta baru dan mengelola artikel Anda.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/login"
                className="block w-full rounded-full bg-cyber-lime py-3 text-xs font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Masuk ke Akun
              </Link>

              <Link
                href="/register"
                className="block w-full rounded-full border border-electric-indigo bg-electric-indigo/20 py-3 text-xs font-bold text-white hover:bg-electric-indigo/30 transition-all text-center"
              >
                Daftar Akun Kontributor
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter only this contributor's articles
  const myArticles = articles.filter((a) => a.author.email === user.email);

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !shortSummary) return;

    const selectedCategory = categories.find((c) => c.slug === categorySlug);
    const res = addArticle(
      {
        title,
        highlightWord,
        highlightColor: "#CFFF04",
        category: selectedCategory ? selectedCategory.name : "Technology",
        categorySlug,
        readTime,
        shortSummary,
        content,
        imageUrl:
          imageUrl ||
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        isHotPick: false,
        triviaPopup: triviaText
          ? { title: triviaTitle, text: triviaText }
          : undefined,
        crosswordClue: crosswordWord
          ? { word: crosswordWord.toUpperCase().trim(), clue: crosswordClue }
          : undefined,
      },
      user
    );

    if (res.success) {
      showToast(res.message);
      setTitle("");
      setShortSummary("");
      setContent("");
      setImageUrl("");
      setTriviaText("");
      setCrosswordWord("");
      setCrosswordClue("");
      setActiveTab("my-articles");
    }
  };

  const handleUpdateOwnArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const res = updateArticle(
      editingArticle.id,
      {
        title: editingArticle.title,
        shortSummary: editingArticle.shortSummary,
        content: editingArticle.content,
        categorySlug: editingArticle.categorySlug,
      },
      user
    );

    if (res.success) {
      showToast(res.message);
      setEditingArticle(null);
    } else {
      showToast(res.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black text-white">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Toast */}
          {notification && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyber-lime bg-black/95 px-5 py-2.5 text-xs font-bold text-cyber-lime shadow-2xl backdrop-blur-md">
              <Check className="h-4 w-4" />
              <span>{notification}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyber-lime/20 p-3 text-cyber-lime">
                <PenTool className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-black text-white">
                    Portal Kontributor
                  </h1>
                  <span className="rounded-full bg-electric-indigo/30 border border-electric-indigo/50 px-2.5 py-0.5 text-[10px] font-black text-white uppercase">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-gray-400 flex flex-wrap items-center gap-2">
                  <span>Selamat datang, <strong className="text-white">{user.name}</strong> ({user.email}).</span>
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="inline-flex items-center gap-1 rounded-full border border-cyber-lime/60 bg-cyber-lime/10 px-2.5 py-0.5 text-[10px] font-bold text-cyber-lime hover:bg-cyber-lime hover:text-black transition-colors"
                  >
                    <UserCog className="h-3 w-3" />
                    Edit Nama
                  </button>
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Tab Buttons */}
          <div className="mb-8 flex gap-3 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("my-articles")}
              className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-black transition-all ${
                activeTab === "my-articles"
                  ? "bg-cyber-lime text-black shadow-lg shadow-cyber-lime/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Artikel Saya ({myArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("submit")}
              className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-black transition-all ${
                activeTab === "submit"
                  ? "bg-neon-fuchsia text-black shadow-lg shadow-neon-fuchsia/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>+ Kirim Artikel Baru</span>
            </button>
          </div>

          {/* TAB 1: ARTIKEL SAYA */}
          {activeTab === "my-articles" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">Daftar Artikel Anda</h2>
                  <p className="text-xs text-gray-400">
                    Anda hanya dapat mengedit dan mengelola artikel yang Anda buat sendiri.
                  </p>
                </div>
              </div>

              {myArticles.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-12 text-center text-gray-400">
                  <PenTool className="mx-auto h-12 w-12 text-cyber-lime/50 mb-3" />
                  <p className="text-base font-bold text-white">Belum ada artikel yang dikirim</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Jadilah kontributor pertama dan kirimkan fakta unik yang kamu ketahui!
                  </p>
                  <button
                    onClick={() => setActiveTab("submit")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-neon-fuchsia px-6 py-2.5 text-xs font-black text-black hover:brightness-110"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Mulai Tulis Artikel
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myArticles.map((art) => (
                    <div
                      key={art.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#202020] transition-all hover:border-cyber-lime/60 hover:shadow-xl"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-44 w-full bg-black">
                          <img
                            src={art.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            {art.status === "published" && (
                              <span className="flex items-center gap-1 rounded-full bg-cyber-lime px-2.5 py-1 text-[10px] font-black text-black">
                                <CheckCircle2 className="h-3 w-3" /> Tayang Publik
                              </span>
                            )}
                            {art.status === "pending" && (
                              <span className="flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-black">
                                <Clock className="h-3 w-3" /> Menunggu Verifikasi Admin
                              </span>
                            )}
                            {art.status === "rejected" && (
                              <span className="flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-black text-white">
                                <XCircle className="h-3 w-3" /> Perlu Revisi
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <span className="text-[11px] font-bold text-cyber-lime uppercase">
                            {art.category}
                          </span>
                          <h3 className="mt-1 text-base font-black text-white line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="mt-2 text-xs text-gray-300 line-clamp-3">
                            {art.shortSummary}
                          </p>

                          {art.adminFeedback && (
                            <div className="mt-3 rounded-xl bg-red-500/10 border border-red-500/30 p-2 text-[11px] text-red-300">
                              <strong>Catatan Admin:</strong> {art.adminFeedback}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 bg-[#181818]">
                        <button
                          onClick={() => setEditingArticle(art)}
                          className="flex items-center gap-1 text-xs font-bold text-cyber-lime hover:underline"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit Artikel
                        </button>

                        <div className="flex items-center gap-2">
                          {art.status === "published" && (
                            <Link
                              href={`/article/${art.slug}`}
                              target="_blank"
                              className="rounded-lg bg-white/10 p-1.5 text-gray-300 hover:text-white"
                              title="Buka Artikel"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Hapus artikel "${art.title}"?`)) {
                                deleteArticle(art.id, user);
                                showToast("Artikel berhasil dihapus.");
                              }
                            }}
                            className="rounded-lg bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20"
                            title="Hapus"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUBMIT ARTIKEL BARU */}
          {activeTab === "submit" && (
            <div className="max-w-3xl rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-10 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-black tracking-widest text-neon-fuchsia uppercase">
                  Pengajuan Konten
                </span>
                <h2 className="text-2xl font-black text-white">Kirim Artikel / Fakta Baru</h2>
                <p className="text-xs text-gray-400 mt-1">
                  💡 Setiap artikel yang Anda kirim akan berstatus <strong>Pending</strong> dan diverifikasi terlebih dahulu oleh tim Admin Mind.Maze sebelum tayang ke publik.
                </p>
              </div>

              <form onSubmit={handleSubmitArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Mengapa Paus 52 Hz Selalu Bernyanyi Sendirian?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Pilih Kategori</label>
                    <select
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-neon-fuchsia focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Estimasi Waktu Baca</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-neon-fuchsia focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Ringkasan Singkat (Lead)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="1-2 kalimat ringkas untuk pratinjau kartu..."
                    value={shortSummary}
                    onChange={(e) => setShortSummary(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Konten Lengkap Penjelasan</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tuliskan fakta ilmiah/sejarah secara jelas dan menarik..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                <ImageUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  accentColor="neon-fuchsia"
                  label="Foto Artikel (Disimpan Langsung di Vercel)"
                />

                {/* Pop-up Trivia info */}
                <div className="rounded-2xl border border-cyber-lime/40 bg-cyber-lime/5 p-4 space-y-3">
                  <span className="text-xs font-black text-cyber-lime uppercase tracking-wider">
                    Pop-up "Ternyata Selama Ini..." (Opsional)
                  </span>
                  <input
                    type="text"
                    placeholder="Judul (Default: Ternyata selama ini...)"
                    value={triviaTitle}
                    onChange={(e) => setTriviaTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Fakta kejutan tambahan..."
                    value={triviaText}
                    onChange={(e) => setTriviaText(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-neon-fuchsia py-3.5 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Ajukan Artikel untuk Verifikasi Admin
                </button>
              </form>
            </div>
          )}

          {/* Edit Modal */}
          {editingArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#1e1e1e] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <h3 className="text-lg font-black text-white">Edit Artikel Saya</h3>
                  <button onClick={() => setEditingArticle(null)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateOwnArticle} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Judul</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.title}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, title: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Ringkasan</label>
                    <textarea
                      rows={2}
                      required
                      value={editingArticle.shortSummary}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          shortSummary: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Konten Lengkap</label>
                    <textarea
                      rows={4}
                      required
                      value={editingArticle.content}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, content: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white"
                    />
                  </div>

                  <ImageUploader
                    value={editingArticle.imageUrl || ""}
                    onChange={(url) =>
                      setEditingArticle({ ...editingArticle, imageUrl: url })
                    }
                    accentColor="neon-fuchsia"
                    label="Ganti Foto Artikel (Vercel Storage)"
                  />

                  <p className="text-[11px] text-amber-300 italic">
                    *Mengedit artikel yang sudah terbit akan mengajukannya kembali untuk verifikasi admin.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-full bg-cyber-lime py-2.5 text-xs font-black text-black"
                    >
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="rounded-full border border-gray-600 px-4 py-2.5 text-xs font-bold text-gray-300"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Edit Profile Modal */}
          <EditProfileModal
            isOpen={editProfileOpen}
            onClose={() => setEditProfileOpen(false)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

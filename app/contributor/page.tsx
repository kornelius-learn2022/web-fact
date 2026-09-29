"use client";

import React, { useState, useEffect } from "react";
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
  Bookmark,
  Share2,
} from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import ImageUploader from "@/components/ImageUploader";
import ArticleCardActions from "@/components/ArticleCardActions";

export default function ContributorPortalPage() {
  const { user, login } = useAuth();
  const { articles, categories, addArticle, updateArticle, deleteArticle } =
    useData();

  const [activeTab, setActiveTab] = useState<"my-articles" | "submit" | "favorites">(
    "my-articles"
  );

  // Submit Form state
  const [title, setTitle] = useState("");
  const [highlightWord, setHighlightWord] = useState("");
  const [categorySlug, setCategorySlug] = useState("asal-usul-benda");
  const [readTime, setReadTime] = useState("2 min read");
  const [shortSummary, setShortSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sourcesInput, setSourcesInput] = useState("");
  const [triviaTitle, setTriviaTitle] = useState("Ternyata selama ini...");
  const [triviaText, setTriviaText] = useState("");
  const [crosswordWord, setCrosswordWord] = useState("");
  const [crosswordClue, setCrosswordClue] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Edit Own Article state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editSourcesInput, setEditSourcesInput] = useState("");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user?.email) {
      try {
        const saved = localStorage.getItem(`mindmaze_bookmarks_${user.email}`);
        if (saved) {
          setBookmarkedMap(JSON.parse(saved));
        }
      } catch {}
    }
  }, [user, activeTab]);

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

  // Filter only articles authored by this user
  const myArticles = articles.filter(
    (a) => a.author.email.toLowerCase() === user.email.toLowerCase()
  );

  // Favorite articles bookmarked by user
  const favoriteArticles = articles.filter((a) => !!bookmarkedMap[a.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !shortSummary) {
      showToast("Judul, ringkasan, dan konten wajib diisi.");
      return;
    }

    const selectedCategory = categories.find((c) => c.slug === categorySlug);
    const parsedSources = sourcesInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const res = addArticle(
      {
        title,
        highlightWord,
        highlightColor: "#FF2E9A",
        category: selectedCategory ? selectedCategory.name : "Asal-Usul Benda Sehari-hari",
        categorySlug,
        readTime,
        shortSummary,
        content,
        imageUrl:
          imageUrl ||
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        isHotPick: false,
        sources: parsedSources.length > 0 ? parsedSources : undefined,
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
      setSourcesInput("");
      setTriviaText("");
      setCrosswordWord("");
      setCrosswordClue("");
      setActiveTab("my-articles");
    }
  };

  const handleUpdateOwnArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const parsedSources = editSourcesInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const res = updateArticle(
      editingArticle.id,
      {
        title: editingArticle.title,
        shortSummary: editingArticle.shortSummary,
        content: editingArticle.content,
        imageUrl: editingArticle.imageUrl,
        categorySlug: editingArticle.categorySlug,
        sources: parsedSources.length > 0 ? parsedSources : editingArticle.sources,
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
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyber-lime bg-black/95 px-5 py-2.5 text-xs font-bold text-cyber-lime shadow-2xl backdrop-blur-md animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>{notification}</span>
            </div>
          )}

          {/* User Profile Header Card */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#161616] p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-black shadow-md ${user.avatarColor}`}
              >
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{user.name}</h1>
                  <span className="rounded-full bg-cyber-lime/20 border border-cyber-lime/40 px-2.5 py-0.5 text-[10px] font-black uppercase text-cyber-lime">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditProfileOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                <UserCog className="h-4 w-4 text-cyber-lime" />
                <span>Edit Nama Profil</span>
              </button>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="mb-8 flex flex-wrap gap-3 border-b border-white/10 pb-4">
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

            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-black transition-all ${
                activeTab === "favorites"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Koleksi Favorit ({favoriteArticles.length})</span>
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
                  <FileText className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="text-base font-bold text-gray-300">Belum ada artikel yang dikirim</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Bagikan wawasan unik Anda dengan menulis artikel fakta pertama!
                  </p>
                  <button
                    onClick={() => setActiveTab("submit")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyber-lime px-6 py-2.5 text-xs font-black text-black hover:brightness-110 transition-all"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Tulis Artikel Sekarang
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myArticles.map((art) => (
                    <div
                      key={art.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#1e1e1e] transition-all hover:border-white/30"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-44 w-full bg-black/40 overflow-hidden">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            {art.status === "published" && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black uppercase text-black backdrop-blur-xs">
                                <CheckCircle2 className="h-3 w-3" /> Terbit Publik
                              </span>
                            )}
                            {art.status === "pending" && (
                              <span className="flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 text-[10px] font-black uppercase text-black backdrop-blur-xs">
                                <Clock className="h-3 w-3" /> Menunggu Admin
                              </span>
                            )}
                            {art.status === "rejected" && (
                              <span className="flex items-center gap-1 rounded-full bg-rose-500/90 px-3 py-1 text-[10px] font-black uppercase text-white backdrop-blur-xs">
                                <XCircle className="h-3 w-3" /> Perlu Revisi
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-neon-fuchsia">
                            {art.category}
                          </span>
                          <h3 className="mt-1 text-sm font-black text-white leading-snug line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="mt-2 text-xs text-gray-400 line-clamp-2">
                            {art.shortSummary}
                          </p>

                          {/* Admin Feedback jika artikel ditolak */}
                          {art.status === "rejected" && art.adminFeedback && (
                            <div className="mt-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3 text-[11px] text-rose-300">
                              <span className="font-bold block">Catatan Admin:</span>
                              {art.adminFeedback}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-white/10 p-4 flex items-center justify-between bg-[#181818]">
                        <span className="text-[10px] text-gray-500">{art.createdAt}</span>

                        <div className="flex items-center gap-2">
                          {art.status === "published" && (
                            <Link
                              href={`/article/${art.slug}`}
                              className="rounded-xl bg-white/5 p-2 text-gray-400 hover:text-white"
                              title="Lihat Artikel"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setEditSourcesInput((art.sources || []).join("\n"));
                            }}
                            className="rounded-xl bg-white/10 p-2 text-cyber-lime hover:bg-cyber-lime/20"
                            title="Edit Artikel"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus artikel "${art.title}"?`)) {
                                deleteArticle(art.id, user);
                                showToast("Artikel berhasil dihapus.");
                              }
                            }}
                            className="rounded-xl bg-white/10 p-2 text-rose-400 hover:bg-rose-500/20"
                            title="Hapus Artikel"
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

          {/* TAB 2: SUBMIT ARTIKEL */}
          {activeTab === "submit" && (
            <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-10 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-neon-fuchsia">
                  Formulir Kontribusi
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Kirimkan Fakta Menarik Anda</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Setiap artikel yang diajukan akan melalui moderasi dan verifikasi oleh tim Redaksi Mind.Maze sebelum ditayangkan untuk publik.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Judul Artikel Fakta
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Did you know? Asal-Usul Warna Oranye pada Wortel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                {/* Highlight Word */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Kata Kunci Sorotan (Highlight di Beranda)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Oranye"
                    value={highlightWord}
                    onChange={(e) => setHighlightWord(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Kategori Pengetahuan
                    </label>
                    <select
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs font-bold text-white focus:border-neon-fuchsia focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug} className="bg-black text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Estimasi Waktu Baca
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 2 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs text-white focus:border-neon-fuchsia focus:outline-none"
                    />
                  </div>
                </div>

                {/* Short Summary */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Ringkasan Singkat (Muncul di Kartu Beranda)
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan 1-2 kalimat pengantar yang memancing rasa penasaran..."
                    value={shortSummary}
                    onChange={(e) => setShortSummary(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    Isi Fakta Lengkap (Penjelasan Ilmiah / Historis)
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Jelaskan secara mendalam bukti sejarah, riset ilmiah, atau rujukan yang mendasari fakta ini..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs text-white focus:border-neon-fuchsia focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Image Uploader */}
                <ImageUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  accentColor="neon-fuchsia"
                  label="Foto Artikel (Disimpan Langsung di Vercel)"
                />

                {/* Sumber Referensi */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    🔗 Sumber & Referensi Ilmiah / Sejarah (1 tautan per baris)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="https://smithsonianmag.com/...&#10;https://britannica.com/...&#10;Buku / Dokumen Referensi"
                    value={sourcesInput}
                    onChange={(e) => setSourcesInput(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-xs text-white focus:border-neon-fuchsia focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Sertakan tautan jurnal atau situs terpercaya untuk memudahkan verifikasi oleh Admin.
                  </p>
                </div>

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

          {/* TAB 3: KOLEKSI FAVORIT */}
          {activeTab === "favorites" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-black text-white">Artikel Favorit Tersimpan ({favoriteArticles.length})</h2>
                <p className="text-xs text-gray-400">
                  Daftar artikel yang telah Anda simpan untuk dibaca kembali kapan saja.
                </p>
              </div>

              {favoriteArticles.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-12 text-center text-gray-400">
                  <Bookmark className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="text-base font-bold text-gray-300">Belum ada artikel favorit</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Jelajahi fakta-fakta unik di beranda dan klik ikon bookmark untuk menyimpannya di sini.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyber-lime px-6 py-2.5 text-xs font-black text-black hover:brightness-110 transition-all"
                  >
                    Jelajahi Fakta di Beranda
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteArticles.map((art) => (
                    <article
                      key={art.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#1e1e1e] transition-all hover:border-amber-400/60"
                    >
                      <div>
                        <div className="relative h-44 w-full bg-black/40 overflow-hidden">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 rounded-full border border-cyber-lime/80 bg-black/80 px-2.5 py-1 text-[10px] font-black uppercase text-cyber-lime">
                            {art.category}
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="text-base font-black text-white leading-snug line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="mt-2 text-xs text-gray-300 line-clamp-3">
                            {art.shortSummary}
                          </p>
                        </div>
                      </div>

                      <ArticleCardActions article={art} />
                    </article>
                  ))}
                </div>
              )}
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

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      🔗 Sumber & Referensi Ilmiah / Sejarah (1 per baris)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="https://..."
                      value={editSourcesInput}
                      onChange={(e) => setEditSourcesInput(e.target.value)}
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

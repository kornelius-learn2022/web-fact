"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Article, Category } from "@/data/mockData";
import {
  ShieldCheck,
  FileCheck2,
  FileText,
  PlusCircle,
  Users,
  UserPlus,
  UserCheck,
  Tag,
  Flame,
  Check,
  X,
  Trash2,
  Edit3,
  ExternalLink,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Mail,
  MessageSquare,
  PhoneCall,
  Clock,
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function AdminDashboardPage() {
  const { user, token, login } = useAuth();
  const {
    articles,
    categories,
    addArticle,
    updateArticle,
    deleteArticle,
    verifyArticle,
    toggleHotPick,
    addCategory,
    deleteCategory,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    "verify" | "articles" | "create" | "contributors" | "categories" | "messages"
  >("verify");

  // New Article Form state
  const [title, setTitle] = useState("");
  const [highlightWord, setHighlightWord] = useState("");
  const [categorySlug, setCategorySlug] = useState("asal-usul-benda");
  const [readTime, setReadTime] = useState("2 min read");
  const [shortSummary, setShortSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isHotPick, setIsHotPick] = useState(false);
  const [triviaTitle, setTriviaTitle] = useState("Ternyata selama ini...");
  const [triviaText, setTriviaText] = useState("");
  const [crosswordWord, setCrosswordWord] = useState("");
  const [crosswordClue, setCrosswordClue] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // New Category Form state
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatBg, setNewCatBg] = useState("bg-cyan-400");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Edit Article state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // User Management state (PostgreSQL)
  interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Kontributor";
    avatarColor: string;
    createdAt: string;
    status?: "pending" | "approved" | "rejected";
  }
  const [dbUsers, setDbUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"Admin" | "Kontributor">("Kontributor");
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  // Sources reference state for articles
  const [sourcesInput, setSourcesInput] = useState("");
  const [editSourcesInput, setEditSourcesInput] = useState("");

  // Contact Messages state
  interface ContactMessageItem {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
    status: "unread" | "read";
  }
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const fetchUsers = async () => {
    if (!token) return;
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setDbUsers(data.users);
      }
    } catch (error) {
      console.error("Gagal memuat pengguna:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchMessages = async () => {
    if (!token) return;
    setIsLoadingMessages(true);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Gagal memuat pesan kontak:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleToggleMessageStatus = async (id: string, currentStatus: "unread" | "read") => {
    if (!token) return;
    const nextStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(
          nextStatus === "read"
            ? "Pesan ditandai sudah dibaca ✅"
            : "Pesan ditandai belum dibaca"
        );
        fetchMessages();
      }
    } catch {
      showNotification("Gagal memperbarui status pesan.");
    }
  };

  const handleDeleteMessage = async (id: string, senderName: string) => {
    if (!token) return;
    if (!confirm(`Hapus pesan dari "${senderName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Pesan berhasil dihapus.");
        fetchMessages();
      } else {
        showNotification(data.message || "Gagal menghapus pesan.");
      }
    } catch {
      showNotification("Gagal menghubungi server.");
    }
  };

  useEffect(() => {
    if (user?.role === "Admin" && token) {
      fetchUsers();
      fetchMessages();
    }
  }, [user, token]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmittingUser(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message || "Pengguna berhasil ditambahkan!");
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserRole("Kontributor");
        fetchUsers();
      } else {
        showNotification(data.message || "Gagal menambahkan pengguna.");
      }
    } catch (error) {
      showNotification("Gagal terhubung ke server.");
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleApproveUser = async (id: string, name: string) => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: "approved" }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Akun ${name} berhasil disetujui! ✅`);
        fetchUsers();
      } else {
        showNotification(data.message || "Gagal menyetujui akun.");
      }
    } catch {
      showNotification("Terjadi kendala jaringan.");
    }
  };

  const handleRejectUser = async (id: string, name: string) => {
    if (!token) return;
    if (!confirm(`Tolak pendaftaran akun "${name}"?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: "rejected" }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Pendaftaran akun ${name} ditolak.`);
        fetchUsers();
      } else {
        showNotification(data.message || "Gagal menolak akun.");
      }
    } catch {
      showNotification("Terjadi kendala jaringan.");
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!token) return;
    if (!confirm(`Hapus pengguna "${name}" dari database?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message || "Pengguna berhasil dihapus.");
        fetchUsers();
      } else {
        showNotification(data.message || "Gagal menghapus pengguna.");
      }
    } catch (error) {
      showNotification("Gagal menghubungi server.");
    }
  };

  const pendingArticles = articles.filter((a) => a.status === "pending");
  const publishedArticles = articles.filter((a) => a.status === "published");
  const hotPickArticles = articles.filter((a) => a.isHotPick);

  // Filter contributors
  const contributorEmails = Array.from(
    new Set(articles.map((a) => a.author.email))
  );

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // If not Admin, show quick access button to switch account
  if (!user || user.role !== "Admin") {
    return (
      <div className="flex min-h-screen flex-col bg-graphite-black text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-neon-fuchsia/40 bg-[#161616] p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neon-fuchsia/20 text-neon-fuchsia">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-white">
              Akses Khusus Administrator
            </h1>
            <p className="mt-2 text-xs text-gray-400">
              Anda saat ini masuk sebagai {user ? user.role : "Tamu (Belum Login)"}.
              Halaman ini diperuntukkan untuk mengelola konten dan verifikasi artikel.
            </p>

            <Link
              href="/login"
              className="mt-6 block w-full rounded-full bg-neon-fuchsia py-3 text-xs font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Masuk dengan Akun Admin
            </Link>

            <div className="mt-4">
              <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle Admin Article Submit
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !shortSummary) return;

    const selectedCategory = categories.find((c) => c.slug === categorySlug);
    const parsedSources = sourcesInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const res = addArticle(
      {
        title,
        highlightWord,
        highlightColor: "#CFFF04",
        category: selectedCategory ? selectedCategory.name : "Asal-Usul Benda Sehari-hari",
        categorySlug,
        readTime,
        shortSummary,
        content,
        imageUrl:
          imageUrl ||
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        isHotPick,
        sources: parsedSources.length > 0 ? parsedSources : undefined,
        triviaPopup: triviaText ? { title: triviaTitle, text: triviaText } : undefined,
        crosswordClue: crosswordWord
          ? { word: crosswordWord.toUpperCase().trim(), clue: crosswordClue }
          : undefined,
      },
      user
    );

    if (res.success) {
      showNotification(res.message);
      // Reset form
      setTitle("");
      setShortSummary("");
      setContent("");
      setImageUrl("");
      setSourcesInput("");
      setTriviaText("");
      setCrosswordWord("");
      setCrosswordClue("");
      setActiveTab("articles");
    }
  };

  // Handle Edit Submit
  const handleUpdateArticle = (e: React.FormEvent) => {
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
        category:
          categories.find((c) => c.slug === editingArticle.categorySlug)?.name ||
          editingArticle.category,
        sources: parsedSources.length > 0 ? parsedSources : editingArticle.sources,
      },
      user
    );

    if (res.success) {
      showNotification(res.message);
      setEditingArticle(null);
    }
  };

  // Handle Add Category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;

    const res = addCategory({
      name: newCatName,
      slug: newCatSlug.toLowerCase().trim().replace(/\s+/g, "-"),
      bgColor: newCatBg,
      textColor: "text-black",
      icon: "Sparkles",
      description: newCatDesc || `Kumpulan fakta tentang ${newCatName}.`,
    });

    if (res.success) {
      showNotification(res.message);
      setNewCatName("");
      setNewCatSlug("");
      setNewCatDesc("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black text-white">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Notification Toast */}
          {feedbackMsg && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyber-lime bg-black/95 px-5 py-2.5 text-xs font-bold text-cyber-lime shadow-2xl backdrop-blur-md">
              <Check className="h-4 w-4" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Admin Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-neon-fuchsia/20 p-3 text-neon-fuchsia">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-cyber-lime uppercase">
                  Control Management System
                </span>
                <h1 className="text-3xl font-black text-white">
                  Dashboard Administrator
                </h1>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Lihat Tampilan Publik Web
            </Link>
          </div>

          {/* Metrics Overview Cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-[#1e1e1e] p-5">
              <span className="text-xs font-bold text-gray-400">Total Artikel</span>
              <p className="mt-2 text-3xl font-black text-white">{articles.length}</p>
              <span className="text-[11px] text-gray-500">{publishedArticles.length} tayang publik</span>
            </div>

            <div className="rounded-3xl border border-neon-fuchsia/40 bg-[#1e1e1e] p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Menunggu Verifikasi</span>
                {pendingArticles.length > 0 && (
                  <span className="flex h-2.5 w-2.5 rounded-full bg-neon-fuchsia animate-ping" />
                )}
              </div>
              <p className="mt-2 text-3xl font-black text-neon-fuchsia">{pendingArticles.length}</p>
              <span className="text-[11px] text-gray-500">Artikel dari kontributor</span>
            </div>

            <div className="rounded-3xl border border-cyber-lime/40 bg-[#1e1e1e] p-5">
              <span className="text-xs font-bold text-gray-400">Hot Pick Beranda</span>
              <p className="mt-2 text-3xl font-black text-cyber-lime">{hotPickArticles.length}</p>
              <span className="text-[11px] text-gray-500">Unggulan di Home</span>
            </div>

            <div className="rounded-3xl border border-cyan-400/40 bg-[#1e1e1e] p-5">
              <span className="text-xs font-bold text-gray-400">Kategori Aktif</span>
              <p className="mt-2 text-3xl font-black text-cyan-400">{categories.length}</p>
              <span className="text-[11px] text-gray-500">Topik konten</span>
            </div>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("verify")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "verify"
                  ? "bg-neon-fuchsia text-black shadow-lg shadow-neon-fuchsia/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Verifikasi Artikel</span>
              {pendingArticles.length > 0 && (
                <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] text-black">
                  {pendingArticles.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "articles"
                  ? "bg-cyber-lime text-black shadow-lg shadow-cyber-lime/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Kelola Semua Artikel ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "create"
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Posting Artikel Baru</span>
            </button>

            <button
              onClick={() => setActiveTab("contributors")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "contributors"
                  ? "bg-electric-indigo text-white shadow-lg shadow-electric-indigo/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Kelola Pengguna ({dbUsers.length || 1})</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "categories"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>Kelola Kategori ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                activeTab === "messages"
                  ? "bg-[#FF007F] text-black shadow-lg shadow-[#FF007F]/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Pesan Masuk ({messages.length})</span>
              {messages.filter((m) => m.status === "unread").length > 0 && (
                <span className="rounded-full bg-cyber-lime text-black font-black px-2 py-0.5 text-[10px] animate-pulse">
                  {messages.filter((m) => m.status === "unread").length} baru
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: VERIFIKASI ARTIKEL KONTRIBUTOR */}
          {activeTab === "verify" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Antrean Verifikasi Artikel Kontributor
                  </h2>
                  <p className="text-xs text-gray-400">
                    Periksa kebenaran fakta sebelum menyetujui artikel agar tayang di web publik.
                  </p>
                </div>
              </div>

              {pendingArticles.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-12 text-center text-gray-400">
                  <FileCheck2 className="mx-auto h-12 w-12 text-cyber-lime/60 mb-3" />
                  <p className="text-base font-bold text-white">Semua artikel telah diverifikasi!</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Tidak ada artikel kontributor yang sedang menunggu persetujuan saat ini.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {pendingArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex flex-col md:flex-row gap-6 rounded-3xl border border-neon-fuchsia/40 bg-[#1e1e1e] p-6 shadow-xl"
                    >
                      <div className="h-48 md:h-auto md:w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-black">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="rounded-full bg-neon-fuchsia/20 px-3 py-0.5 text-[11px] font-black text-neon-fuchsia uppercase">
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              Oleh: <strong className="text-white">{article.author.name}</strong> ({article.author.email})
                            </span>
                            <span className="text-xs text-gray-500">• {article.createdAt}</span>
                          </div>

                          <h3 className="text-xl font-black text-white">{article.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-gray-300">{article.shortSummary}</p>

                          {article.triviaPopup && (
                            <div className="mt-3 rounded-xl bg-cyber-lime/10 border border-cyber-lime/30 p-3 text-xs text-cyber-lime">
                              <strong>Pop-up Trivia:</strong> {article.triviaPopup.text}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                          <button
                            onClick={() => {
                              verifyArticle(article.id, "published");
                              showNotification("Artikel berhasil disetujui & sekarang tayang publik! 🎉");
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-cyber-lime px-5 py-2 text-xs font-black text-black hover:brightness-110 active:scale-95 transition-all"
                          >
                            <Check className="h-4 w-4 stroke-[3]" />
                            <span>Setujui (Publish)</span>
                          </button>

                          <button
                            onClick={() => {
                              verifyArticle(article.id, "rejected", "Fakta belum memenuhi standar verifikasi.");
                              showNotification("Artikel ditolak.");
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/40 px-5 py-2 text-xs font-bold text-red-400 hover:bg-red-500/30 active:scale-95 transition-all"
                          >
                            <X className="h-4 w-4" />
                            <span>Tolak (Reject)</span>
                          </button>

                          <button
                            onClick={() => {
                              deleteArticle(article.id, user);
                              showNotification("Artikel dihapus.");
                            }}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 ml-auto"
                          >
                            <Trash2 className="h-4 w-4" /> Hapus Draft
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MANAJEMEN SEMUA ARTIKEL */}
          {activeTab === "articles" && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Katalog Semua Artikel</h2>
                  <p className="text-xs text-gray-400">
                    Kelola status tayang, aktifkan Hot Pick di beranda, edit konten, atau hapus artikel.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#1c1c1c]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-[#222] text-gray-400 uppercase font-black tracking-wider">
                    <tr>
                      <th className="p-4">Artikel</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Penulis</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Hot Pick Beranda</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 max-w-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={art.imageUrl}
                              alt=""
                              className="h-10 w-12 flex-shrink-0 rounded-lg object-cover"
                            />
                            <div className="truncate">
                              <p className="font-bold text-white truncate">{art.title}</p>
                              <span className="text-[10px] text-gray-500">{art.readTime}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-gray-200">
                            {art.category}
                          </span>
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-white">{art.author.name}</p>
                          <span className="text-[10px] text-gray-500">{art.author.role}</span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                              art.status === "published"
                                ? "bg-cyber-lime/20 text-cyber-lime border border-cyber-lime/40"
                                : art.status === "pending"
                                ? "bg-amber-400/20 text-amber-400 border border-amber-400/40"
                                : "bg-red-500/20 text-red-400 border border-red-500/40"
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => {
                              toggleHotPick(art.id);
                              showNotification(
                                !art.isHotPick
                                  ? "Artikel dijadikan Hot Pick di Beranda! 🔥"
                                  : "Artikel dicabut dari status Hot Pick."
                              );
                            }}
                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                              art.isHotPick
                                ? "bg-neon-fuchsia text-black shadow-md shadow-neon-fuchsia/30 font-black"
                                : "border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                            }`}
                          >
                            <Flame className="h-3.5 w-3.5" />
                            {art.isHotPick ? "Hot Pick Aktif" : "Bukan Hot Pick"}
                          </button>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/article/${art.slug}`}
                              target="_blank"
                              className="rounded-xl bg-white/10 p-2 text-gray-300 hover:text-white"
                              title="Lihat Halaman Publik"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>

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
                                  showNotification("Artikel berhasil dihapus.");
                                }
                              }}
                              className="rounded-xl bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                              title="Hapus Artikel"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: POSTING ARTIKEL BARU (ADMIN DIRECT) */}
          {activeTab === "create" && (
            <div className="max-w-3xl rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 sm:p-10 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                  Publikasi Instan
                </span>
                <h2 className="text-2xl font-black text-white">Posting Artikel Baru (Admin)</h2>
                <p className="text-xs text-gray-400">
                  Artikel yang diposting oleh Admin otomatis berstatus <strong>Published</strong> (langsung tayang).
                </p>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Mengapa Warna Ungu Dulu Hanya untuk Bangsawan?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Pilih Kategori</label>
                    <select
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Estimasi Baca</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Kata Highlight Judul (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Bangsawan?"
                    value={highlightWord}
                    onChange={(e) => setHighlightWord(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Ringkasan Singkat (Untuk Tampilan Kartu)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Deskripsi singkat yang menggugah rasa penasaran..."
                    value={shortSummary}
                    onChange={(e) => setShortSummary(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Isi Konten Lengkap</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Penjelasan detail fakta ilmiah/sejarah..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <ImageUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  accentColor="cyan-400"
                  label="Foto Artikel (Disimpan Langsung di Vercel)"
                />

                {/* Pop-up Trivia info */}
                <div className="rounded-2xl border border-cyber-lime/40 bg-cyber-lime/5 p-4 space-y-3">
                  <span className="text-xs font-black text-cyber-lime uppercase tracking-wider">
                    Pop-up "Ternyata Selama Ini..." (Opsional)
                  </span>
                  <input
                    type="text"
                    placeholder="Judul Pop-up (Default: Ternyata selama ini...)"
                    value={triviaTitle}
                    onChange={(e) => setTriviaTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Isi fun-fact kejutan..."
                    value={triviaText}
                    onChange={(e) => setTriviaText(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Teka-Teki Silang Clue */}
                <div className="rounded-2xl border border-electric-indigo/40 bg-electric-indigo/5 p-4 space-y-3">
                  <span className="text-xs font-black text-electric-indigo uppercase tracking-wider">
                    Integrasi Teka-Teki Silang (Opsional)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Kata Jawaban (contoh: PIGMEN)"
                      value={crosswordWord}
                      onChange={(e) => setCrosswordWord(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs uppercase font-bold text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Petunjuk Soal..."
                      value={crosswordClue}
                      onChange={(e) => setCrosswordClue(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sumber Referensi */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    🔗 Sumber & Referensi Ilmiah / Sejarah (1 tautan per baris)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="https://smithsonianmag.com/...&#10;https://britannica.com/...&#10;Buku / Dokumen Referensi"
                    value={sourcesInput}
                    onChange={(e) => setSourcesInput(e.target.value)}
                    className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Tautan akan ditampilkan di bagian bawah artikel sebagai rujukan terpercaya pembaca.
                  </p>
                </div>

                {/* Hot Pick Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    id="hotpick-check"
                    type="checkbox"
                    checked={isHotPick}
                    onChange={(e) => setIsHotPick(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-600 bg-black text-neon-fuchsia focus:ring-neon-fuchsia"
                  />
                  <label htmlFor="hotpick-check" className="text-xs font-bold text-white cursor-pointer flex items-center gap-1">
                    <Flame className="h-4 w-4 text-neon-fuchsia" />
                    Jadikan Hot Pick Unggulan di Beranda
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-400 py-3.5 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  🚀 Terbitkan Artikel Sekarang
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: KELOLA PENGGUNA & KONTRIBUTOR */}
          {activeTab === "contributors" && (
            <div className="space-y-8">
              {/* Antrean Persetujuan Kontributor Baru */}
              {dbUsers.filter((u) => u.status === "pending").length > 0 && (
                <div className="rounded-3xl border border-amber-400/40 bg-amber-400/10 p-6 shadow-xl animate-in fade-in">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <UserCheck className="h-5 w-5" />
                    <h3 className="text-lg font-black text-white">
                      Antrean Persetujuan Pendaftaran Akun Kontributor ({dbUsers.filter((u) => u.status === "pending").length})
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 mb-5">
                    Calon kontributor berikut mendaftar mandiri via halaman registrasi dan menunggu persetujuan Administrator agar dapat login ke sistem.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dbUsers
                      .filter((u) => u.status === "pending")
                      .map((u) => (
                        <div
                          key={u.id}
                          className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 flex flex-col justify-between shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-black text-black ${u.avatarColor}`}
                            >
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="font-bold text-white text-sm truncate">{u.name}</h4>
                              <p className="text-xs text-gray-400 truncate">{u.email}</p>
                              <span className="inline-block mt-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                                ⏳ Menunggu Persetujuan
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                            <button
                              onClick={() => handleApproveUser(u.id, u.name)}
                              className="flex-1 rounded-full bg-cyber-lime py-2 text-xs font-black text-black hover:brightness-110 active:scale-95 transition-all"
                            >
                              ✓ Setujui Akun
                            </button>
                            <button
                              onClick={() => handleRejectUser(u.id, u.name)}
                              className="rounded-full border border-red-500/40 bg-red-500/20 px-4 py-2 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white transition-all"
                            >
                              ✕ Tolak
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Form Tambah Pengguna Baru */}
                <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-2 text-cyber-lime">
                    <UserPlus className="h-5 w-5" />
                    <h3 className="text-lg font-black text-white">Tambah Pengguna Baru</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    Daftarkan akun pengguna baru ke database Vercel Postgres agar mereka dapat login dan berkontribusi.
                  </p>

                  <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Andi Pratama"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs font-bold text-white focus:border-cyber-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Contoh: andi@mindmaze.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:border-cyber-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Password (min. 6 karakter)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Password login..."
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:border-cyber-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Peran / Hak Akses
                    </label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as "Admin" | "Kontributor")}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs font-bold text-white focus:border-cyber-lime focus:outline-none"
                    >
                      <option value="Kontributor">Kontributor (Dapat submit artikel)</option>
                      <option value="Admin">Admin (Akses penuh dashboard)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingUser}
                    className="w-full rounded-full bg-cyber-lime py-3.5 text-xs font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSubmittingUser ? "Menyimpan ke Database..." : "+ Daftarkan Pengguna ke Database"}
                  </button>
                </form>
              </div>

              {/* Right Column: Daftar Pengguna Aktif */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white">
                      Pengguna Terdaftar di Database ({dbUsers.length})
                    </h2>
                    <p className="text-xs text-gray-400">
                      Semua akun tersimpan aman di Vercel Postgres.
                    </p>
                  </div>
                  <button
                    onClick={fetchUsers}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold text-gray-300 hover:bg-white/10"
                  >
                    Refresh 🔄
                  </button>
                </div>

                {isLoadingUsers && dbUsers.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-[#1e1e1e] p-8 text-center text-xs text-gray-400">
                    Memuat daftar pengguna dari database...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dbUsers.map((u) => {
                      const userArticleCount = articles.filter(
                        (a) => a.author.email.toLowerCase() === u.email.toLowerCase()
                      ).length;
                      const isMainAdmin = u.email === "admin@mindmaze.com" || u.id === "usr-admin-1";

                      return (
                        <div
                          key={u.id}
                          className="rounded-3xl border border-white/10 bg-[#1e1e1e] p-5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-base font-black text-black ${u.avatarColor}`}
                                >
                                  {u.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="font-black text-white text-sm">{u.name}</h4>
                                  <p className="text-xs text-gray-400 truncate max-w-[150px]">{u.email}</p>
                                </div>
                              </div>

                              {!isMainAdmin && (
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.name)}
                                  className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                                  title="Hapus Pengguna"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="mt-5 border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-400">
                              {userArticleCount} Artikel
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                                u.role === "Admin"
                                  ? "bg-neon-fuchsia/20 text-neon-fuchsia border border-neon-fuchsia/40"
                                  : "bg-electric-indigo/20 text-white border border-electric-indigo/40"
                              }`}
                            >
                              {u.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

          {/* TAB 5: KELOLA KATEGORI */}
          {activeTab === "categories" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Active Categories List */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-xl font-black text-white">Kategori Aktif ({categories.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`rounded-2xl p-5 ${cat.bgColor} ${cat.textColor} shadow-lg relative flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-black">{cat.name}</h3>
                          {categories.length > 3 && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus kategori ${cat.name}?`)) {
                                  deleteCategory(cat.id);
                                  showNotification(`Kategori ${cat.name} dihapus.`);
                                }
                              }}
                              className="text-black/60 hover:text-black"
                              title="Hapus Kategori"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="mt-2 text-xs font-semibold opacity-85 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-black/10 flex justify-between text-xs font-black">
                        <span>Slug: {cat.slug}</span>
                        <span>{articles.filter((a) => a.categorySlug === cat.slug).length} Artikel</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Category Form */}
              <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 shadow-xl">
                <h3 className="text-lg font-black text-white mb-2">Tambah Kategori Baru</h3>
                <p className="text-xs text-gray-400 mb-6">
                  Perluas cakupan topik trivia di luar kategori utama.
                </p>

                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Nama Kategori</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Astronomy & Cosmos"
                      value={newCatName}
                      onChange={(e) => {
                        setNewCatName(e.target.value);
                        setNewCatSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .trim()
                            .replace(/\s+/g, "-")
                        );
                      }}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">URL Slug</label>
                    <input
                      type="text"
                      required
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Warna Kartu</label>
                    <select
                      value={newCatBg}
                      onChange={(e) => setNewCatBg(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="bg-cyan-400">Cyan (#00D8F6)</option>
                      <option value="bg-neon-fuchsia">Fuchsia (#FF2E9A)</option>
                      <option value="bg-cyber-lime">Cyber Lime (#CFFF04)</option>
                      <option value="bg-electric-indigo">Electric Indigo (#5D00FF)</option>
                      <option value="bg-amber-400">Warm Amber (#FFB800)</option>
                      <option value="bg-vibrant-orange">Orange (#FF7A33)</option>
                      <option value="bg-emerald-400">Emerald Green</option>
                      <option value="bg-rose-500">Rose Red</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Deskripsi Kategori</label>
                    <textarea
                      rows={2}
                      placeholder="Penjelasan singkat ruang lingkup topik..."
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-black/60 p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-amber-400 py-3 text-xs font-black text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    + Simpan Kategori Baru
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: PESAN MASUK DARI CONTACT US */}
          {activeTab === "messages" && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#FF007F]" />
                    Pesan Masuk Contact Us
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Daftar pesan dan masukan yang dikirimkan oleh pengguna melalui halaman Get In Touch.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchMessages}
                    disabled={isLoadingMessages}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
                  >
                    <span>Segarkan Pesan</span>
                  </button>
                </div>
              </div>

              {/* Messages Summary Metrics */}
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-4">
                  <span className="text-xs font-bold text-gray-400">Total Pesan Masuk</span>
                  <p className="mt-1 text-2xl font-black text-white">{messages.length}</p>
                </div>
                <div className="rounded-2xl border border-cyber-lime/40 bg-[#1e1e1e] p-4">
                  <span className="text-xs font-bold text-gray-400">Belum Dibaca</span>
                  <p className="mt-1 text-2xl font-black text-cyber-lime">
                    {messages.filter((m) => m.status === "unread").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-4">
                  <span className="text-xs font-bold text-gray-400">Sudah Dibaca</span>
                  <p className="mt-1 text-2xl font-black text-gray-300">
                    {messages.filter((m) => m.status === "read").length}
                  </p>
                </div>
              </div>

              {/* Messages List */}
              {isLoadingMessages ? (
                <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-12 text-center text-gray-400">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-cyber-lime border-t-transparent mb-3" />
                  <p className="text-sm font-bold text-white">Memuat pesan masuk...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-12 text-center text-gray-400">
                  <Mail className="mx-auto h-12 w-12 text-[#FF007F]/60 mb-3" />
                  <p className="text-base font-bold text-white">Belum ada pesan masuk!</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Pesan yang dikirim pengunjung melalui formulir Get In Touch akan otomatis masuk dan tersimpan di sini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isUnread = msg.status === "unread";
                    return (
                      <div
                        key={msg.id}
                        className={`rounded-3xl border p-6 transition-all shadow-xl ${
                          isUnread
                            ? "border-cyber-lime/50 bg-[#1f1a2e]"
                            : "border-white/10 bg-[#1c1c1c]"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-black text-black ${
                                isUnread ? "bg-cyber-lime" : "bg-white/20 text-white"
                              }`}
                            >
                              {msg.name ? msg.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-black text-white">{msg.name}</h3>
                                {isUnread ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-cyber-lime/20 border border-cyber-lime/60 px-2.5 py-0.5 text-[10px] font-black text-cyber-lime">
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime animate-pulse" />
                                    Baru
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-400">
                                    Dibaca
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-gray-400">
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-gray-300 hover:text-cyber-lime underline decoration-dotted"
                                >
                                  {msg.email}
                                </a>
                                {msg.phone && (
                                  <span className="flex items-center gap-1 text-gray-400">
                                    <PhoneCall className="h-3 w-3" />
                                    {msg.phone}
                                  </span>
                                )}
                                <span className="flex items-center gap-1 text-gray-500 text-[11px]">
                                  <Clock className="h-3 w-3" />
                                  {new Date(msg.createdAt).toLocaleString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleMessageStatus(msg.id, msg.status)}
                              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                                isUnread
                                  ? "bg-cyber-lime text-black hover:brightness-110"
                                  : "border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {isUnread ? "Tandai Dibaca" : "Tandai Belum Dibaca"}
                            </button>
                            <a
                              href={`mailto:${msg.email}?subject=Balasan Mind.Maze untuk ${encodeURIComponent(
                                msg.name
                              )}`}
                              className="rounded-xl border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                              Balas
                            </a>
                            <button
                              onClick={() => handleDeleteMessage(msg.id, msg.name)}
                              className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                              title="Hapus Pesan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="mt-4 rounded-2xl bg-black/50 p-4 border border-white/5">
                          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Edit Modal */}
          {editingArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#1e1e1e] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <h3 className="text-lg font-black text-white">Edit Artikel (Admin)</h3>
                  <button onClick={() => setEditingArticle(null)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateArticle} className="space-y-3">
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
                      className="w-full rounded-xl border border-white/20 bg-black/60 p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <ImageUploader
                    value={editingArticle.imageUrl || ""}
                    onChange={(url) =>
                      setEditingArticle({ ...editingArticle, imageUrl: url })
                    }
                    accentColor="cyan-400"
                    label="Ganti Foto Artikel (Vercel Storage)"
                  />

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
        </div>
      </main>

      <Footer />
    </div>
  );
}

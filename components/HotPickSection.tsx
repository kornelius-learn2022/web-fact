"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import {
  Flame,
  Clock,
  Bookmark,
  Share2,
  ArrowRight,
  Check,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

interface HotPickSectionProps {
  selectedCategory?: string | null;
  onClearCategory?: () => void;
}

export default function HotPickSection({
  selectedCategory,
  onClearCategory,
}: HotPickSectionProps) {
  const { user } = useAuth();
  const { articles } = useData();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<{
    [key: string]: boolean;
  }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Only published articles are shown publicly
  const publishedArticles = articles.filter((a) => a.status === "published");

  // Filter articles based on category or Hot Pick
  const displayedArticles = selectedCategory
    ? publishedArticles.filter((art) => art.categorySlug === selectedCategory)
    : publishedArticles.filter((art) => art.isHotPick);

  // Fallback to published articles if no hot picks configured
  const finalArticles =
    displayedArticles.length > 0 ? displayedArticles : publishedArticles;

  const handleBookmark = (id: string) => {
    if (!user) {
      showToast("🔒 Perlu Akun: Silakan Masuk / Daftar untuk menyimpan artikel!");
      return;
    }

    setBookmarkedArticles((prev) => {
      const isBookmarked = !prev[id];
      showToast(
        isBookmarked
          ? `Artikel disimpan ke koleksi ${user.name}! 🔖`
          : "Artikel dihapus dari koleksi simpan."
      );
      return { ...prev, [id]: isBookmarked };
    });
  };

  const handleShare = async (article: Article) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/article/${article.slug}`
        : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.shortSummary,
          url: url,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast("Link artikel berhasil disalin ke clipboard! 📋");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <section id="hot-picks" className="relative bg-graphite-black px-6 py-12 md:px-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyber-lime bg-black/95 px-5 py-2.5 text-xs font-bold text-cyber-lime shadow-2xl backdrop-blur-md">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-neon-fuchsia/20 p-2.5 text-neon-fuchsia">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {selectedCategory ? (
                  <>
                    Artikel Kategori:{" "}
                    <span className="text-cyber-lime capitalize">
                      {selectedCategory}
                    </span>
                  </>
                ) : (
                  <>
                    Hot Picks <span className="text-neon-fuchsia">Kurasi Admin</span>
                  </>
                )}
              </h2>
              <p className="text-xs text-gray-400 sm:text-sm">
                {selectedCategory
                  ? `Menampilkan ${finalArticles.length} artikel pilihan dalam kategori ini`
                  : "Fakta pilihan terhangat yang wajib kamu ketahui hari ini"}
              </p>
            </div>
          </div>

          {selectedCategory && onClearCategory && (
            <button
              onClick={onClearCategory}
              className="rounded-full border border-gray-700 bg-white/5 px-4 py-1.5 text-xs font-bold text-gray-300 transition-colors hover:border-white hover:text-white"
            >
              Reset ke Semua Artikel
            </button>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {finalArticles.map((article) => {
            const isBookmarked = !!bookmarkedArticles[article.id];

            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#202020] transition-all duration-200 hover:-translate-y-1 hover:border-cyber-lime/60 hover:shadow-2xl"
              >
                <div>
                  {/* Article Thumbnail Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Category Badge overlay */}
                    <span className="absolute top-3 left-3 rounded-full border border-cyber-lime/80 bg-black/80 px-2.5 py-1 text-[11px] font-black tracking-wider text-cyber-lime backdrop-blur-xs">
                      {article.category}
                    </span>
                    {/* Read Time overlay */}
                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-gray-200 backdrop-blur-xs">
                      <Clock className="h-3 w-3 text-cyber-lime" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    {/* Author / Contributor Info */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-black ${article.author.avatarColor}`}
                        >
                          {article.author.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-300">
                          {article.author.name}
                        </span>
                      </div>

                      {/* Author Role Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider uppercase ${
                          article.author.role === "Admin"
                            ? "bg-neon-fuchsia/20 text-neon-fuchsia border border-neon-fuchsia/50"
                            : "bg-electric-indigo/30 text-white border border-electric-indigo/50"
                        }`}
                      >
                        {article.author.role === "Admin" ? (
                          <ShieldCheck className="h-3 w-3" />
                        ) : (
                          <UserCheck className="h-3 w-3" />
                        )}
                        {article.author.role}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black leading-snug text-white transition-colors group-hover:text-cyber-lime">
                      <Link href={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="mt-3 text-xs leading-relaxed text-gray-300 line-clamp-3">
                      {article.shortSummary}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions: Baca Detail + Bookmark + Share */}
                <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-[#1b1b1b]">
                  <Link
                    href={`/article/${article.slug}`}
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neon-fuchsia px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95"
                  >
                    <span>Baca Detail</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmark(article.id)}
                      title="Simpan artikel (Untuk pengguna terdaftar)"
                      className={`rounded-full p-2 transition-colors ${
                        isBookmarked
                          ? "bg-cyber-lime text-black"
                          : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Bookmark
                        className="h-4 w-4"
                        fill={isBookmarked ? "currentColor" : "none"}
                      />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(article)}
                      title="Bagikan fakta ini"
                      className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

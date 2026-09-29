"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Article } from "@/data/mockData";
import { Bookmark, Share2, ArrowRight, Check } from "lucide-react";

export default function ArticleCardActions({ article }: { article: Article }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      try {
        const saved = localStorage.getItem(`mindmaze_bookmarks_${user.email}`);
        if (saved) {
          const map = JSON.parse(saved);
          setIsBookmarked(!!map[article.id]);
        }
      } catch {}
    }
  }, [user, article.id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleBookmark = () => {
    if (!user) {
      router.push("/register?redirect=favorite");
      return;
    }

    try {
      const saved = localStorage.getItem(`mindmaze_bookmarks_${user.email}`);
      const map = saved ? JSON.parse(saved) : {};
      const next = !isBookmarked;
      map[article.id] = next;
      localStorage.setItem(`mindmaze_bookmarks_${user.email}`, JSON.stringify(map));
      setIsBookmarked(next);
      showToast(
        next
          ? `Artikel disimpan ke koleksi favorit ${user.name}! ⭐`
          : "Artikel dihapus dari koleksi favorit."
      );
    } catch {}
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/article/${article.slug}`
        : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.shortSummary,
          url,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      showToast("Link artikel berhasil disalin ke clipboard! 📋");
    }
  };

  return (
    <div className="relative flex items-center justify-between border-t border-white/10 px-6 py-4 bg-[#1b1b1b]">
      {toastMsg && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full border border-cyber-lime bg-black/95 px-3 py-1 text-[11px] font-bold text-cyber-lime shadow-xl whitespace-nowrap">
          <Check className="h-3.5 w-3.5" />
          <span>{toastMsg}</span>
        </div>
      )}

      <Link
        href={`/article/${article.slug}`}
        className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neon-fuchsia px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95"
      >
        <span>Baca Detail</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={handleBookmark}
          title={
            user
              ? isBookmarked
                ? "Hapus dari favorit"
                : "Simpan artikel favorit"
              : "Daftar untuk menyimpan artikel favorit"
          }
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

        <button
          onClick={handleShare}
          title="Bagikan fakta ini (Semua Pengguna)"
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

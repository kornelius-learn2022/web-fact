"use client";

import React, { useState } from "react";
import { Bookmark, Share2, Check, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ReactionActionsProps {
  initialReactions: {
    mindBlown: number;
    justLearned: number;
    neutral: number;
  };
  articleTitle: string;
}

export default function ReactionActions({
  initialReactions,
  articleTitle,
}: ReactionActionsProps) {
  const { user } = useAuth();
  const [reactions, setReactions] = useState(initialReactions);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVote = (type: "mindBlown" | "justLearned" | "neutral") => {
    if (selectedReaction === type) {
      // Unselect
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      setSelectedReaction(null);
    } else {
      setReactions((prev) => {
        const next = { ...prev };
        if (selectedReaction) {
          next[selectedReaction as "mindBlown" | "justLearned" | "neutral"] -= 1;
        }
        next[type] += 1;
        return next;
      });
      setSelectedReaction(type);
      showToast("Terima kasih atas reaksi feedback kamu! 🔥");
    }
  };

  const handleBookmark = () => {
    if (!user) {
      showToast("🔒 Perlu Akun: Masuk atau Daftar untuk menyimpan artikel ini!");
      return;
    }

    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    showToast(
      nextState
        ? `Artikel disimpan ke bookmark ${user.name}! 🔖`
        : "Artikel dihapus dari bookmark."
    );
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          url: url,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast("Tautan artikel berhasil disalin! 🔗");
    }
  };

  const formatCount = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div className="relative mt-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-cyber-lime bg-black/90 px-5 py-2 text-xs font-bold text-cyber-lime shadow-2xl backdrop-blur-md">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reaction and Actions Container */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        {/* Reaction Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 1. Pikiran Meledak (Neon Fuchsia) */}
          <button
            onClick={() => handleVote("mindBlown")}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all hover:scale-105 active:scale-95 ${
              selectedReaction === "mindBlown"
                ? "bg-neon-fuchsia text-black shadow-lg shadow-neon-fuchsia/40 ring-2 ring-white"
                : "bg-neon-fuchsia text-black hover:brightness-110"
            }`}
          >
            <span>Pikiran Meledak</span>
            <span className="font-extrabold opacity-80">
              {formatCount(reactions.mindBlown)}
            </span>
          </button>

          {/* 2. Baru Tahu (Electric Indigo) */}
          <button
            onClick={() => handleVote("justLearned")}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all hover:scale-105 active:scale-95 ${
              selectedReaction === "justLearned"
                ? "bg-electric-indigo text-white shadow-lg shadow-electric-indigo/40 ring-2 ring-white"
                : "bg-electric-indigo text-white hover:brightness-110"
            }`}
          >
            <span>Baru Tahu</span>
            <span className="font-extrabold opacity-80">
              {formatCount(reactions.justLearned)}
            </span>
          </button>

          {/* 3. Biasa Aja (Cyber Lime) */}
          <button
            onClick={() => handleVote("neutral")}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all hover:scale-105 active:scale-95 ${
              selectedReaction === "neutral"
                ? "bg-cyber-lime text-black shadow-lg shadow-cyber-lime/40 ring-2 ring-white"
                : "bg-cyber-lime text-black hover:brightness-110"
            }`}
          >
            <span>Biasa Aja</span>
            <span className="font-extrabold opacity-80">
              {formatCount(reactions.neutral)}
            </span>
          </button>
        </div>

        {/* Action Buttons (Bookmark & Share) */}
        <div className="flex items-center gap-3">
          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            title="Simpan artikel ke koleksi"
            className={`flex items-center justify-center rounded-2xl p-3 transition-all ${
              isBookmarked
                ? "bg-cyber-lime text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Bookmark
              className="h-5 w-5"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="Bagikan artikel"
            className="flex items-center justify-center rounded-2xl bg-white/10 p-3 text-white transition-all hover:bg-white/20 active:scale-95"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

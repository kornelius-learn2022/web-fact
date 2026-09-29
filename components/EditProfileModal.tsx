"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, X, Check, AlertCircle } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const { user, updateName } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name, isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage({ type: "error", text: "Nama tidak boleh kosong." });
      return;
    }

    setLoading(true);
    const res = await updateName(name.trim());
    setLoading(false);

    if (!res.success) {
      setMessage({ type: "error", text: res.message });
    } else {
      setMessage({ type: "success", text: "Nama profil berhasil diperbarui! 🎉" });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-md my-auto max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#161616] p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          title="Tutup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="rounded-2xl bg-cyber-lime/20 p-3 text-cyber-lime flex-shrink-0">
            <User className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white leading-tight">Edit Nama Profil</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Nama tampilan Anda di seluruh website Mind.Maze.
            </p>
          </div>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-2xl p-3 text-xs font-bold ${
              message.type === "success"
                ? "bg-cyber-lime/20 border border-cyber-lime text-cyber-lime"
                : "bg-red-500/20 border border-red-500 text-red-300"
            }`}
          >
            {message.type === "success" ? (
              <Check className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:border-cyber-lime focus:outline-none focus:ring-1 focus:ring-cyber-lime"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">
              Alamat Email (Akun Tetap)
            </label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-400 cursor-not-allowed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">
              Peran Hak Akses
            </label>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black uppercase ${
                  user.role === "Admin"
                    ? "bg-neon-fuchsia/20 text-neon-fuchsia border border-neon-fuchsia/40"
                    : "bg-electric-indigo/20 text-cyber-lime border border-cyber-lime/40"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-gray-600 py-3 text-xs font-bold text-gray-300 hover:bg-white/5 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-cyber-lime py-3 text-xs font-black text-black shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

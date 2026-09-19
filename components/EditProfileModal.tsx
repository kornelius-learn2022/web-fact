"use client";

import React, { useState } from "react";
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
      setMessage({ type: "success", text: "Nama berhasil diperbarui!" });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#181818] p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-2xl bg-cyber-lime/20 p-3 text-cyber-lime">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Edit Nama Profil</h3>
            <p className="text-xs text-gray-400">
              Ubah nama tampilan yang muncul di seluruh artikel dan navbar.
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
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-black/60 p-3.5 text-sm font-bold text-white focus:border-cyber-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">
              Email Akun (Tidak dapat diubah)
            </label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">
              Peran Akun
            </label>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyber-lime">
              {user.role}
            </span>
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
              {loading ? "Menyimpan..." : "Simpan Nama"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

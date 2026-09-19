"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, AlertCircle, RefreshCw, Cloud } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accentColor?: "cyber-lime" | "neon-fuchsia" | "cyan-400";
}

export default function ImageUploader({
  value,
  onChange,
  label = "Foto Artikel (Disimpan Langsung di Vercel)",
  accentColor = "cyber-lime",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErrorMsg(null);

    // Validate type
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Harap pilih file gambar (JPG, PNG, WEBP, GIF).");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran foto maksimal 5MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setErrorMsg(data.message || "Gagal mengunggah foto ke server.");
      }
    } catch {
      setErrorMsg("Terjadi kendala jaringan saat mengunggah foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const activeRing =
    accentColor === "neon-fuchsia"
      ? "focus:ring-neon-fuchsia border-neon-fuchsia"
      : accentColor === "cyan-400"
      ? "focus:ring-cyan-400 border-cyan-400"
      : "focus:ring-cyber-lime border-cyber-lime";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-300">
          {label}
        </label>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400">
          <Cloud className="h-3 w-3 text-cyan-400" />
          Vercel Direct Storage
        </span>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/50 p-2.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload State / Preview */}
      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-3 group">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/80">
            <img
              src={value}
              alt="Preview Foto Artikel"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {uploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm">
                <RefreshCw className="h-7 w-7 text-cyber-lime animate-spin mb-2" />
                <span className="text-xs font-bold text-white">Mengunggah ke Vercel...</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-cyber-lime">
              <CheckCircle2 className="h-4 w-4" />
              Tersimpan Langsung di Vercel
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-gray-200 hover:bg-white/20 hover:text-white transition-colors"
              >
                Ganti Foto
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={uploading}
                className="rounded-full border border-red-500/30 bg-red-500/10 p-1 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                title="Hapus foto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
            isDragOver
              ? activeRing + " bg-white/10"
              : "border-white/20 bg-black/40 hover:border-white/40 hover:bg-black/60"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <RefreshCw className="h-8 w-8 text-cyber-lime animate-spin mb-3" />
              <p className="text-xs font-bold text-white">Mengunggah foto ke Vercel...</p>
              <p className="text-[10px] text-gray-400 mt-1">Menyimpan langsung ke cloud storage</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-6 w-6 text-cyber-lime" />
              </div>
              <p className="text-xs font-bold text-white">
                Klik untuk Pilih Foto dari Perangkat atau Seret ke Sini
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Mendukung file JPG, PNG, WEBP, atau GIF (Maks. 5MB)
              </p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                <Cloud className="h-3 w-3" />
                Tersimpan di Cloud Vercel (Bukan URL Eksternal)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

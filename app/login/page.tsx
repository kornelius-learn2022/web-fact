"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, ArrowLeft, Check, AlertCircle } from "lucide-react";
import TypingLoader from "@/components/TypingLoader";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTypingLoader, setShowTypingLoader] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg("Kredensial valid! Mengautentikasi...");
      setShowTypingLoader(true);
    }
  };

  return (
    <>
      {showTypingLoader && (
        <TypingLoader
          onComplete={() => {
            router.push("/");
          }}
        />
      )}
      <div className="relative flex min-h-screen w-full flex-col md:flex-row bg-graphite-black text-white">
      {/* Ambient background blur */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-electric-indigo/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-neon-fuchsia/20 blur-3xl" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>

      {/* Left Side: Brand Logo */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
        <div className="text-center md:text-left">
          <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none drop-shadow-xl">
            <span className="text-neon-fuchsia">Mind.</span>
            <br className="hidden md:inline" />
            <span className="text-cyber-lime">Maze</span>
          </div>
          <p className="mt-4 max-w-sm text-xs sm:text-sm font-semibold text-gray-400">
            A digital space for curious minds to discover, explore, and fall into endless knowledge rabbit holes.
          </p>
        </div>
      </div>

      {/* Right Side: Log In Card */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10 md:p-16">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121212] p-8 sm:p-10 shadow-2xl relative">
          {/* Success Banner */}
          {successMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-2xl bg-cyber-lime/20 border border-cyber-lime p-4 text-xs font-bold text-cyber-lime animate-in fade-in">
              <Check className="h-5 w-5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-2xl bg-red-500/20 border border-red-500/50 p-4 text-xs font-bold text-red-300 animate-in shake">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white">Welcome Back,</h2>
            <p className="text-2xl font-bold text-cyber-lime mt-1">
              Curious Mind.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Address */}
            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-black">
                  <User className="h-5 w-5 stroke-[2.5]" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full bg-neon-fuchsia py-3.5 pl-12 pr-4 text-sm font-bold text-black placeholder-black/70 shadow-md focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>
            </div>

            {/* Password (Wajib diisi & diverifikasi) */}
            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-black">
                  <Lock className="h-5 w-5 stroke-[2.5]" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full bg-neon-fuchsia py-3.5 pl-12 pr-4 text-sm font-bold text-black placeholder-black/70 shadow-md focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-cyber-lime py-3.5 text-sm font-black text-black shadow-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Memverifikasi Kredensial..." : "Log in"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-cyber-lime hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

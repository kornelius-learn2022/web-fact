"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Menu,
  X,
  Brain,
  LogIn,
  LogOut,
  UserCheck,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-neon-fuchsia px-4 py-3 shadow-md md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-wider text-cyber-lime transition-transform hover:scale-105 active:scale-95"
        >
          <span className="font-extrabold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            MIND.MAZE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            HOME
          </Link>
          <Link
            href="/#explore"
            className="text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            EXPLORE
          </Link>
          <Link
            href="/quiz"
            className="flex items-center gap-1 text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            <Brain className="h-4 w-4" />
            QUIZ
          </Link>
          <Link
            href="/contributor"
            className="text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            SUBMIT
          </Link>

          {/* Role specific quick badge */}
          {user?.role === "Admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1 rounded-full bg-black/40 border border-white/40 px-3 py-1 text-xs font-black text-white hover:bg-black/60 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-cyber-lime" />
              Admin
            </Link>
          )}

          {user?.role === "Kontributor" && (
            <Link
              href="/contributor"
              className="flex items-center gap-1 rounded-full bg-black/30 border border-white/30 px-3 py-1 text-xs font-bold text-white hover:bg-black/50 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5 text-cyber-lime" />
              Portal
            </Link>
          )}
        </nav>

        {/* Right Side: Search + Auth Button */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Search Bar Desktop */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari fakta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 pr-8 text-xs text-white placeholder-white/70 backdrop-blur-sm transition-all focus:w-44 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            <Search className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/80 pointer-events-none" />
          </div>

          {/* User Auth Info / Login CTA */}
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-black/20 bg-black/30 py-1 pl-1.5 pr-3 backdrop-blur-xs">
              <Link
                href={user.role === "Admin" ? "/admin" : "/contributor"}
                className="flex items-center gap-2"
                title="Buka Dashboard Akun"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-black ${user.avatarColor}`}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-black text-white max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase text-cyber-lime">
                    {user.role}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setEditProfileOpen(true)}
                title="Ganti / Edit Nama Profil"
                className="ml-1 text-cyber-lime hover:text-white transition-colors"
              >
                <UserCog className="h-4 w-4" />
              </button>
              <button
                onClick={logout}
                title="Keluar akun"
                className="ml-1 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyber-lime px-4 py-1.5 text-xs font-black text-black shadow-md transition-all hover:brightness-110 active:scale-95"
              >
                <LogIn className="h-3.5 w-3.5" />
                Masuk / Daftar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex p-1.5 text-cyber-lime focus:outline-none md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mt-3 flex flex-col gap-3 rounded-2xl bg-black/60 p-5 backdrop-blur-md md:hidden">
          {/* Mobile Search */}
          <div className="relative mb-2 w-full">
            <input
              type="text"
              placeholder="Cari fakta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/40 bg-white/20 px-4 py-2 pr-9 text-sm text-white placeholder-white/70 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
          </div>

          {/* User status mobile */}
          {user ? (
            <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3 mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-black ${user.avatarColor}`}
                >
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black text-white">{user.name}</p>
                  <p className="text-[10px] font-bold text-cyber-lime uppercase">
                    {user.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEditProfileOpen(true);
                  }}
                  className="rounded-lg bg-cyber-lime/20 p-2 text-cyber-lime hover:bg-cyber-lime hover:text-black transition-colors"
                  title="Ganti Nama"
                >
                  <UserCog className="h-4 w-4" />
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-xs font-bold text-red-400"
                >
                  <LogOut className="h-4 w-4" /> Keluar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 mb-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-full bg-cyber-lime py-2 text-xs font-black text-black"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-full border border-white py-2 text-xs font-black text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-base font-black tracking-wider text-cyber-lime"
          >
            HOME
          </Link>
          <Link
            href="/#explore"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-base font-black tracking-wider text-cyber-lime"
          >
            EXPLORE
          </Link>
          <Link
            href="/quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-1 text-base font-black tracking-wider text-cyber-lime"
          >
            <Brain className="h-4 w-4" />
            QUIZ (Teka-Teki Silang & Trivia)
          </Link>
          <Link
            href="/contributor"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-base font-black tracking-wider text-cyber-lime"
          >
            SUBMIT
          </Link>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </header>
  );
}

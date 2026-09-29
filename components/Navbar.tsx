"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
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
  Info,
  PhoneCall,
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { articles } = useData();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults =
    searchQuery.trim().length > 0
      ? articles
          .filter((a) => a.status === "published")
          .filter(
            (a) =>
              a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
      : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}#hot-picks`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neon-fuchsia px-4 py-3 shadow-md md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-wider text-cyber-lime transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <span className="font-extrabold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            MIND.MAZE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <Link
            href="/"
            className="text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            HOME
          </Link>
          <Link
            href="/#explore"
            className="text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            EXPLORE
          </Link>
          <Link
            href="/quiz"
            className="flex items-center gap-1 text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            <Brain className="h-3.5 w-3.5" />
            QUIZ
          </Link>
          <Link
            href="/contributor"
            className="text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            SUBMIT
          </Link>
          <Link
            href="/about"
            className="text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-xs lg:text-sm font-black tracking-widest text-cyber-lime transition-opacity hover:opacity-80"
          >
            CONTACT US
          </Link>

          {/* Role specific quick badge */}
          {user?.role === "Admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1 rounded-full bg-black/40 border border-white/40 px-2.5 py-1 text-[11px] font-black text-white hover:bg-black/60 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-cyber-lime" />
              Admin
            </Link>
          )}

          {user?.role === "Kontributor" && (
            <Link
              href="/contributor"
              className="flex items-center gap-1 rounded-full bg-black/30 border border-white/30 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-black/50 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5 text-cyber-lime" />
              Portal
            </Link>
          )}
        </nav>

        {/* Right Side: Search + Auth Button */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Search Bar Desktop */}
          <div ref={searchContainerRef} className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Cari fakta unik..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                className="w-36 lg:w-44 rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 pr-8 text-xs text-white placeholder-white/70 backdrop-blur-sm transition-all focus:w-56 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                title="Cari"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Floating Live Search Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-80 lg:w-96 rounded-2xl border border-white/20 bg-[#161616] p-3 shadow-2xl backdrop-blur-md z-50 animate-in fade-in">
                <div className="text-[11px] font-bold text-gray-400 mb-2 px-2 flex justify-between items-center">
                  <span>Hasil Pencarian ({searchResults.length})</span>
                  <span className="text-[10px] text-cyber-lime font-mono">Enter untuk filter</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-400">
                    Tidak ditemukan fakta yang cocok dengan "{searchQuery}".
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/article/${item.slug}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/10 transition-colors group"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden text-left">
                          <span className="text-[10px] font-black text-cyber-lime uppercase block truncate">
                            {item.category}
                          </span>
                          <h4 className="text-xs font-bold text-white group-hover:text-cyber-lime truncate transition-colors">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
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
                  <span className="text-xs font-black text-white max-w-[85px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase text-cyber-lime">
                    {user.role}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setEditProfileOpen(true)}
                title="Edit Profil"
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
                className="flex items-center gap-1.5 rounded-full bg-cyber-lime px-3.5 py-1.5 text-xs font-black text-black shadow-md transition-all hover:brightness-110 active:scale-95"
              >
                <LogIn className="h-3.5 w-3.5 stroke-[2.5]" />
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-cyber-lime/80 bg-black/20 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-black/40"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/40 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-white/20 bg-black/90 p-4 backdrop-blur-md md:hidden animate-in fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Cari fakta unik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-2 pr-10 text-xs text-white placeholder-white/70 focus:border-cyber-lime focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Nav Links */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              HOME
            </Link>
            <Link
              href="/#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              EXPLORE
            </Link>
            <Link
              href="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              QUIZ TRIVIA
            </Link>
            <Link
              href="/contributor"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              SUBMIT ARTIKEL
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              ABOUT US
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm font-black text-cyber-lime hover:bg-white/10"
            >
              CONTACT US
            </Link>
          </div>

          {/* Auth section in Mobile */}
          <div className="pt-2 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-3 py-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-black ${user.avatarColor}`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-cyber-lime uppercase font-black">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setEditProfileOpen(true);
                    }}
                    className="rounded-full border border-white/20 p-1.5 text-cyber-lime hover:text-white"
                  >
                    <UserCog className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/20 py-2 text-xs font-bold text-red-200"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Keluar Akun
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-full bg-cyber-lime py-2 text-center text-xs font-black text-black"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-full border border-cyber-lime py-2 text-center text-xs font-black text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
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

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#141414] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <span className="text-xl font-black uppercase tracking-wider text-cyber-lime">
            MIND.MAZE
          </span>
          <p className="mt-1 text-xs text-gray-400">
            Interactive Random Trivia & Knowledge Discovery Website
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-cyber-lime transition-colors">
            Beranda
          </Link>
          <Link href="#explore" className="hover:text-cyber-lime transition-colors">
            Kategori
          </Link>
          <Link href="#quiz" className="hover:text-cyber-lime transition-colors">
            Teka-Teki Silang
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Mind.Maze. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

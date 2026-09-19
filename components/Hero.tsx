import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite-black px-6 py-16 md:px-12 md:py-24">
      {/* Ambient Neon Glow Background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-electric-indigo/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-neon-fuchsia/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-neon-fuchsia/60 bg-black/60 px-3.5 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-neon-fuchsia" />
          <span className="text-xs font-bold tracking-widest text-white uppercase">
            Mind.Maze Discovery
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.1]">
          <span className="text-white">Small Facts, </span>
          <br className="hidden sm:inline" />
          <span className="text-cyber-lime">Big Perspective.</span>
        </h1>

        {/* Subtitle & Line */}
        <p className="mt-4 text-base font-semibold text-gray-300 sm:text-lg">
          Interactive Random Trivia & Knowledge Discovery Website
        </p>
        <div className="my-5 h-1 w-24 rounded-full bg-neon-fuchsia" />

        {/* Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          Fakta-fakta unik untuk mereka yang selalu penasaran tentang dunia. A digital
          space for curious minds to discover, explore, and fall into endless
          knowledge rabbit holes.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="#explore"
            className="group inline-flex items-center gap-2 rounded-full bg-neon-fuchsia px-8 py-3.5 text-sm font-black text-black shadow-lg transition-all hover:brightness-110 hover:shadow-neon-fuchsia/40 active:scale-95"
          >
            Jelajahi Sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#hot-picks"
            className="inline-flex items-center gap-2 rounded-full border border-cyber-lime/80 px-6 py-3 text-sm font-bold text-cyber-lime transition-all hover:bg-cyber-lime/10"
          >
            Lihat Hot Pick 🔥
          </Link>
        </div>
      </div>
    </section>
  );
}

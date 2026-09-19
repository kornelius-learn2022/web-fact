"use client";

import React from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import {
  Cpu,
  Palette,
  Brain,
  FlaskConical,
  Landmark,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const iconMap: { [key: string]: any } = {
  Cpu: Cpu,
  Palette: Palette,
  Brain: Brain,
  FlaskConical: FlaskConical,
  Landmark: Landmark,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
};

interface CategoryCardsProps {
  activeCategory?: string | null;
  onSelectCategory?: (slug: string | null) => void;
}

export default function CategoryCards({
  activeCategory,
  onSelectCategory,
}: CategoryCardsProps) {
  const { categories, articles } = useData();

  return (
    <section id="explore" className="bg-graphite-black px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-white sm:text-2xl">
              Kategori Eksplorasi
            </h2>
            <p className="text-xs text-gray-400 sm:text-sm">
              Klik kategori untuk melihat artikel dan fakta terkait
            </p>
          </div>

          {onSelectCategory && activeCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="rounded-full border border-cyber-lime bg-cyber-lime/10 px-3.5 py-1 text-xs font-bold text-cyber-lime hover:bg-cyber-lime/20"
            >
              ✕ Tampilkan Semua Kategori
            </button>
          )}
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = activeCategory === cat.slug;
            const articleCount = articles.filter(
              (a) => a.categorySlug === cat.slug && a.status === "published"
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() =>
                  onSelectCategory ? onSelectCategory(cat.slug) : undefined
                }
                className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-200 cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl ${
                  cat.bgColor
                } ${cat.textColor} ${
                  isSelected
                    ? "ring-4 ring-white shadow-2xl scale-[1.02]"
                    : "opacity-95 hover:opacity-100"
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-black/15 p-3 backdrop-blur-xs">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black tracking-widest opacity-60">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title & Count */}
                <div className="mt-6">
                  <h3 className="text-xl font-black leading-snug">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold opacity-85 line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="mt-2 text-xs font-black opacity-75">
                    {articleCount} facts available
                  </p>
                </div>

                {/* Direct Link to Category Page */}
                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">
                    Lihat Selengkapnya
                  </span>
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 transition-transform hover:scale-110 active:scale-95"
                    title={`Buka halaman kategori ${cat.name}`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

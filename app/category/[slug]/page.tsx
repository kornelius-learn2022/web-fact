import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, ARTICLES } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Clock,
  ArrowRight,
  Bookmark,
  Share2,
  Landmark,
  Brain,
  FlaskConical,
  TrendingUp,
  Activity,
  Cpu,
  Palette,
  Sparkles,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

const iconMap: { [key: string]: any } = {
  Landmark: Landmark,
  Brain: Brain,
  FlaskConical: FlaskConical,
  TrendingUp: TrendingUp,
  Activity: Activity,
  Cpu: Cpu,
  Palette: Palette,
  Sparkles: Sparkles,
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = ARTICLES.filter((art) => art.categorySlug === slug);
  const IconComponent = iconMap[category.icon];

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black">
      <Navbar />

      <main className="flex-1 px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-white transition-opacity hover:opacity-80 md:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Category Banner Header */}
          <div
            className={`relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-2xl ${category.bgColor} ${category.textColor}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-black/15 p-4 backdrop-blur-xs">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-widest uppercase opacity-75">
                    Kategori Pengetahuan
                  </span>
                  <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                    {category.name}
                  </h1>
                </div>
              </div>

              <span className="rounded-full bg-black/20 px-4 py-1.5 text-xs font-black">
                {articles.length} Artikel Tersedia
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm font-semibold opacity-90 md:text-base">
              {category.description}
            </p>
          </div>

          {/* Articles in this Category */}
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-black text-white sm:text-2xl">
              Daftar Fakta & Artikel Terkait
            </h2>

            {articles.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#202020] p-12 text-center text-gray-400">
                Belum ada artikel yang dipublikasikan dalam kategori ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#202020] transition-all duration-200 hover:-translate-y-1 hover:border-cyber-lime/60 hover:shadow-2xl"
                  >
                    <div>
                      {/* Thumbnail Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-black/40">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-gray-200 backdrop-blur-xs">
                          <Clock className="h-3 w-3 text-cyber-lime" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Author Info */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-black ${article.author.avatarColor}`}
                            >
                              {article.author.name.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-gray-300">
                              {article.author.name}
                            </span>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider uppercase ${
                              article.author.role === "Admin"
                                ? "bg-neon-fuchsia/20 text-neon-fuchsia border border-neon-fuchsia/50"
                                : "bg-electric-indigo/30 text-white border border-electric-indigo/50"
                            }`}
                          >
                            {article.author.role === "Admin" ? (
                              <ShieldCheck className="h-3 w-3" />
                            ) : (
                              <UserCheck className="h-3 w-3" />
                            )}
                            {article.author.role}
                          </span>
                        </div>

                        <h3 className="text-lg font-black leading-snug text-white transition-colors group-hover:text-cyber-lime">
                          <Link href={`/article/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="mt-3 text-xs leading-relaxed text-gray-300 line-clamp-3">
                          {article.shortSummary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action: Baca Detail */}
                    <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-[#1b1b1b]">
                      <Link
                        href={`/article/${article.slug}`}
                        className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neon-fuchsia px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95"
                      >
                        <span>Baca Detail</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>

                      <span className="text-xs text-gray-500 font-semibold">
                        Mind.Maze
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

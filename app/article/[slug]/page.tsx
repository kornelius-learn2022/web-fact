import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TriviaPopup from "@/components/article/TriviaPopup";
import ReactionActions from "@/components/article/ReactionActions";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  // Render title with highlighted word if available
  const renderTitle = () => {
    if (!article.highlightWord) return article.title;
    const parts = article.title.split(article.highlightWord);
    return (
      <>
        {parts[0]}
        <span
          style={{ color: article.highlightColor || "#CFFF04" }}
          className="underline decoration-wavy decoration-2 underline-offset-4"
        >
          {article.highlightWord}
        </span>
        {parts.slice(1).join(article.highlightWord)}
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-graphite-black">
      <Navbar />

      <main className="flex-1 px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Subheader: Back Button, Category Badge, Reading Time */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-white transition-opacity hover:opacity-80 md:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>

            <div className="flex items-center gap-3">
              {/* Category Badge */}
              <Link
                href={`/category/${article.categorySlug}`}
                className="rounded-full border border-cyber-lime px-3.5 py-1 text-xs font-black tracking-widest text-cyber-lime uppercase hover:bg-cyber-lime/10 transition-colors"
              >
                {article.category}
              </Link>

              {/* Read Time Badge */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                <Clock className="h-3.5 w-3.5 text-cyber-lime" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.2]">
            {renderTitle()}
          </h1>

          {/* Author Meta Bar */}
          <div className="mt-4 flex items-center gap-3 border-b border-white/10 pb-6">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-black ${article.author.avatarColor}`}
            >
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {article.author.name}
                </span>
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
              <p className="text-[11px] text-gray-400">
                Terverifikasi oleh Tim Redaksi Mind.Maze
              </p>
            </div>
          </div>

          {/* Article Lead Content */}
          <div className="mt-6 text-base md:text-lg leading-relaxed text-gray-300 space-y-4">
            {article.content.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Article Image Preview */}
          <div className="relative my-8 h-64 md:h-96 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Did You Know ("Ternyata selama ini...") Popup/Card */}
          {article.triviaPopup && (
            <TriviaPopup
              title={article.triviaPopup.title}
              text={article.triviaPopup.text}
            />
          )}

          {/* Crossword Clue Teaser from this Article */}
          {article.crosswordClue && (
            <div className="my-6 rounded-2xl border border-electric-indigo/40 bg-electric-indigo/10 p-5">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider text-cyber-lime uppercase">
                <Sparkles className="h-4 w-4 text-cyber-lime" />
                <span>Petunjuk Teka-Teki Silang Terkait</span>
              </div>
              <p className="mt-2 text-sm text-gray-200">
                Kata kunci dari artikel ini adalah{" "}
                <span className="font-black text-neon-fuchsia tracking-widest">
                  {article.crosswordClue.word}
                </span>{" "}
                ({article.crosswordClue.word.length} huruf).
              </p>
              <p className="mt-1 text-xs text-gray-400 italic">
                Clue: "{article.crosswordClue.clue}"
              </p>
            </div>
          )}

          {/* Reactions and Social Actions */}
          <ReactionActions
            initialReactions={article.reactions}
            articleTitle={article.title}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

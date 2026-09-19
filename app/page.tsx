"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import HotPickSection from "@/components/HotPickSection";
import CrosswordTeaser from "@/components/CrosswordTeaser";
import Footer from "@/components/Footer";
import TypingLoader from "@/components/TypingLoader";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showWebIntro, setShowWebIntro] = useState(false);

  useEffect(() => {
    // Show typing loader on initial visit to web in this browser session
    const entered = sessionStorage.getItem("mindmaze_web_entered");
    if (!entered) {
      setShowWebIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("mindmaze_web_entered", "true");
    setShowWebIntro(false);
  };

  const handleSelectCategory = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) {
      // Smooth scroll to articles section
      document.getElementById("hot-picks")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {showWebIntro && (
        <TypingLoader
          onComplete={handleIntroComplete}
        />
      )}
      <div className="flex min-h-screen flex-col bg-graphite-black">
        {/* Top Navigation */}
        <Navbar />

      {/* Main Home Content */}
      <main className="flex-1">
        <Hero />
        
        {/* Category Cards with click to filter */}
        <CategoryCards
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Articles Section filtered by category or hot picks */}
        <HotPickSection
          selectedCategory={selectedCategory}
          onClearCategory={() => setSelectedCategory(null)}
        />

        {/* 2-Way Interlocking Crossword (TTS) */}
        <CrosswordTeaser />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypingLoaderProps {
  onComplete?: () => void;
}

const FULL_TEXT = "Mind.Maze";

export default function TypingLoader({
  onComplete,
}: TypingLoaderProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "pause1" | "deleting" | "pause2" | "retyping" | "complete"
  >("typing");
  const [isFinishing, setIsFinishing] = useState(false);

  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFinishing(true);
    setTimeout(() => {
      onComplete?.();
    }, 350);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedText.length < FULL_TEXT.length) {
        timer = setTimeout(() => {
          setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setPhase("pause1");
        }, 450);
      }
    } else if (phase === "pause1") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, 250);
    } else if (phase === "deleting") {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 45);
      } else {
        timer = setTimeout(() => {
          setPhase("pause2");
        }, 250);
      }
    } else if (phase === "pause2") {
      timer = setTimeout(() => {
        setPhase("retyping");
      }, 200);
    } else if (phase === "retyping") {
      if (displayedText.length < FULL_TEXT.length) {
        timer = setTimeout(() => {
          setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setPhase("complete");
          handleFinish();
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, displayedText]);

  // Format "Mind." in Neon Fuchsia and "Maze" in Cyber Lime
  const renderFormattedText = () => {
    if (displayedText.length === 0) return null;
    if (displayedText.length <= 5) {
      return <span className="text-neon-fuchsia">{displayedText}</span>;
    }
    return (
      <>
        <span className="text-neon-fuchsia">Mind.</span>
        <span className="text-cyber-lime">{displayedText.slice(5)}</span>
      </>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09080e] select-none px-4 transition-opacity duration-500 ${
        isFinishing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient Neon Atmosphere Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-electric-indigo/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-neon-fuchsia/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyber-lime/10 blur-[100px]" />

      {/* Center Typing Stage */}
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* Main "Mind.Maze" Typing Typography */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none drop-shadow-[0_0_40px_rgba(207,255,4,0.35)] min-h-[1.2em] flex items-center justify-center">
          {renderFormattedText()}
          <span className="text-cyber-lime font-light ml-1 sm:ml-2 inline-block animate-pulse">
            |
          </span>
        </h1>

        {/* Minimalist Subtitle / Status */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime animate-ping" />
          <p className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase">
            Curious Minds Knowledge Hub
          </p>
        </div>

        {/* Subtle glowing progress line */}
        <div className="mt-8 h-1 w-32 sm:w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full bg-gradient-to-r from-neon-fuchsia to-cyber-lime transition-all duration-300 ${
              phase === "typing"
                ? "w-1/2"
                : phase === "deleting"
                ? "w-1/4"
                : phase === "retyping" || phase === "complete"
                ? "w-full"
                : "w-1/3"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

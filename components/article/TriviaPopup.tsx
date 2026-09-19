"use client";

import React, { useState } from "react";
import { Lightbulb, X, RotateCcw } from "lucide-react";

interface TriviaPopupProps {
  title: string;
  text: string;
}

export default function TriviaPopup({ title, text }: TriviaPopupProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="my-6 flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-cyber-lime bg-black/60 px-4 py-2 text-xs font-bold text-cyber-lime shadow-lg backdrop-blur-sm transition-all hover:bg-cyber-lime hover:text-black"
        >
          <Lightbulb className="h-4 w-4" />
          Buka Info Menarik ("{title}")
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl bg-cyber-lime p-6 md:p-8 text-black shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
      {/* Header with Lightbulb & Close */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-black/10 p-2">
            <Lightbulb className="h-6 w-6 text-black stroke-[2.5]" />
          </div>
          <h4 className="text-lg md:text-xl font-black tracking-tight">
            {title}
          </h4>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          aria-label="Tutup info"
          className="rounded-full p-1.5 transition-colors hover:bg-black/15 active:scale-90"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Body Content */}
      <p className="mt-4 text-sm md:text-base font-semibold leading-relaxed text-black/90">
        {text}
      </p>
    </div>
  );
}

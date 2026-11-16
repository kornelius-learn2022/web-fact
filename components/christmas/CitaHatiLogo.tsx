import React from "react";

interface CitaHatiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function CitaHatiLogo({
  className = "",
  size = "md",
  showText = true,
}: CitaHatiLogoProps) {
  const dimension = size === "sm" ? 38 : size === "lg" ? 64 : 48;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Emblem Frame */}
      <div
        style={{ width: dimension, height: dimension }}
        className="relative rounded-md bg-[#1B324F] p-1.5 border border-[#DFB76C]/60 shadow-md flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="Cita Hati Christian School Emblem"
        >
          {/* Background grid texture */}
          <rect width="60" height="60" rx="4" fill="#15263C" />
          
          {/* Vertical white/blue stripes */}
          <rect x="10" y="8" width="5" height="44" fill="#3A608B" rx="1.5" />
          <rect x="20" y="8" width="5" height="44" fill="#DFB76C" rx="1.5" opacity="0.9" />
          <rect x="35" y="8" width="5" height="44" fill="#3A608B" rx="1.5" />
          <rect x="45" y="8" width="5" height="44" fill="#3A608B" rx="1.5" />
          
          {/* Horizontal cross bar */}
          <rect x="8" y="27" width="44" height="6" fill="#C53030" rx="2" />
          
          {/* Red Heart Accent in top right */}
          <path
            d="M42 15 C42 12.5, 40 11, 38 12.5 C36 11, 34 12.5, 34 15 C34 18, 38 21, 38 21 C38 21, 42 18, 42 15 Z"
            fill="#E53E3E"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`mt-1 font-serif tracking-[0.25em] text-[#DFB76C] font-bold uppercase ${
            size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]"
          }`}
        >
          CITA HATI
        </span>
      )}
    </div>
  );
}

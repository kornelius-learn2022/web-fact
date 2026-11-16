import React from "react";
import Image from "next/image";

interface CitaHatiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  priority?: boolean;
}

export default function CitaHatiLogo({
  className = "",
  size = "md",
  showText = false,
  priority = false,
}: CitaHatiLogoProps) {
  const dimensions = {
    sm: { width: 38, height: 37 },
    md: { width: 54, height: 53 },
    lg: { width: 88, height: 86 },
    xl: { width: 120, height: 117 },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Official Cita Hati School Emblem Image */}
      <div
        className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <Image
          src="/images/cita-hati-logo.png"
          alt="Sekolah Kristen Cita Hati Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <span
          className={`mt-1.5 font-serif tracking-[0.22em] text-[#e5c07b] font-bold uppercase ${
            size === "sm" ? "text-[8px]" : size === "lg" || size === "xl" ? "text-xs" : "text-[10px]"
          }`}
        >
          Pakuwon City
        </span>
      )}
    </div>
  );
}

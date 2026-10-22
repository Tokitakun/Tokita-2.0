"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlitchText } from "@/components/layout/glitch";

const CORRUPT_LINES = [
  "▓▒░ ATTEMPTING RECOVERY ░▒▓",
  "ERR_0X404: PATH_NOT_FOUND",
  "CHECKSUM MISMATCH // DATA CORRUPTED",
  "SECTOR: UNKNOWN — CLUSTER: LOST",
];

export default function NotFound() {
  const [lineIndex, setLineIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [currentPath, setCurrentPath] = useState("/???");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setLineIndex((i) => (i + 1) % CORRUPT_LINES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-deep-text)] flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle scanline noise behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(200,30,74,0.022) 0px, rgba(200,30,74,0.022) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <main className="relative z-10 w-full max-w-xl">
        {/* Window panel — "damaged" look via crimson border accent */}
        <div
          className="bg-white border-2 rounded-2xl overflow-hidden"
          style={{
            borderColor: "#B83255",
            boxShadow: "4px 4px 0px #5C2C40, 0 0 24px rgba(184,50,85,0.12)",
          }}
        >
          {/* Title bar */}
          <div
            className="px-4 py-2.5 border-b-2 flex items-center justify-between"
            style={{ background: "#FFE3F1", borderColor: "#F0C8DF" }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#B83255]">
                C:\NAFIS\SYSTEM\
              </span>
              <GlitchText
                as="span"
                className="font-mono text-[10px] font-bold text-[#302432]"
              >
                NOT_FOUND.EXE
              </GlitchText>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B83255] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5] opacity-40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0C8DF]" />
            </div>
          </div>

          {/* Body */}
          <div
            className="px-6 py-8 sm:px-10 sm:py-12 flex flex-col items-center text-center gap-6"
            style={{ background: "#FFF8FC" }}
          >
            {/* Large error code */}
            <div className="relative select-none">
              <p
                className="font-sora font-extrabold text-[5rem] sm:text-[7rem] leading-none tracking-tight"
                style={{
                  color: "#B83255",
                  textShadow:
                    "2px 0 0 rgba(121,231,229,0.4), -2px 0 0 rgba(200,30,74,0.4)",
                }}
              >
                404
              </p>
              <p
                className="font-mono text-[10px] font-bold tracking-widest uppercase mt-1"
                style={{ color: "#806D7D" }}
              >
                FILE NOT FOUND
              </p>
            </div>

            {/* Corrupted diagnostic panel */}
            <div
              className="w-full rounded-lg border px-4 py-3 font-mono text-[11px] text-left space-y-1"
              style={{
                borderColor: "#5C2C40",
                background: "#302432",
                color: "#F5DCE7",
              }}
            >
              <p style={{ color: "#D9A8BE" }}>
                {">"} SYSTEM: NAFIS.EXE OS v2.7
              </p>
              <p style={{ color: "#B83255" }}>
                {">"} STATUS: FILE_NOT_FOUND
              </p>
              <p style={{ color: "#D9A8BE" }}>
                {">"} PATH: {currentPath}
              </p>
              <p
                key={tick}
                className="animate-pulse motion-reduce:animate-none"
                style={{ color: "#C81E4A" }}
              >
                {">"} {CORRUPT_LINES[lineIndex]}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <p className="font-sora font-bold text-lg text-[#302432] leading-snug">
                Halaman tidak ditemukan.
              </p>
              <p className="font-inter text-sm text-[#806D7D] leading-relaxed max-w-sm mx-auto">
                Berkas yang kamu cari tidak ada di direktori ini, sudah dipindahkan, atau belum pernah ada.
              </p>
            </div>

            {/* CTA back home */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-6 py-3 font-mono font-bold text-sm text-white rounded-xl transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "#FF75B9",
                boxShadow: "3px 3px 0px #F0C8DF",
                minHeight: "44px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F54DAD")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FF75B9")
              }
            >
              <span aria-hidden="true">←</span>
              <span>Kembali ke Home</span>
            </Link>

            {/* System metadata footer */}
            <p
              className="font-mono text-[9px] tracking-wider"
              style={{ color: "#806D7D" }}
            >
              NAFIS.EXE // SYS://RECOVERY // ERR_0X404
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

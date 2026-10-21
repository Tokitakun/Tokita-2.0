"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, MapPin, ChevronLeft, ChevronRight, RotateCcw, ArrowLeft, Sparkles } from "lucide-react";
import { STRUCTURED_DIALOGUE, type Friend, type DialogueStep } from "./data";
import { MascotStage } from "./mascot-stage";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function VNScene({ friend, onBack }: { friend: Friend; onBack: () => void }) {
  const prefersReduced = useReducedMotion();

  // Retrieve multi-page dialogue steps for this friend
  const steps: DialogueStep[] = STRUCTURED_DIALOGUE[friend.id] ?? [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: `${friend.name} (@${friend.username}) adalah rekan kolaborator di GitHub yang terhubung di jaringan ini.`,
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: friend.bio ? `Catatan bio: "${friend.bio}"` : "Aktif berkontribusi di berbagai repositori open-source.",
      tag: "BIO",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi1",
      text: `Berada dalam ${friend.zone.toUpperCase()} ZONE. Kunjungi profil GitHub resminya untuk melihat karya terbarunya!`,
      tag: "ZONE_INFO",
    },
  ];

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [shownCharCount, setShownCharCount] = useState<number>(0);

  const totalSteps = steps.length;
  const currentStep = steps[stepIndex] || steps[0];
  const fullText = currentStep.text;
  const isTypingDone = shownCharCount >= fullText.length;

  // Typewriter effect per step
  useEffect(() => {
    if (prefersReduced) {
      setShownCharCount(fullText.length);
      return;
    }
    setShownCharCount(0);
    const interval = window.setInterval(() => {
      setShownCharCount((prev) => {
        if (prev >= fullText.length) {
          window.clearInterval(interval);
          return fullText.length;
        }
        return prev + 1;
      });
    }, 20);

    return () => window.clearInterval(interval);
  }, [fullText, prefersReduced, stepIndex]);

  const handleSkipTyping = useCallback(() => {
    setShownCharCount(fullText.length);
  }, [fullText.length]);

  const handleNext = useCallback(() => {
    if (!isTypingDone) {
      handleSkipTyping();
      return;
    }
    if (stepIndex < totalSteps - 1) {
      setStepIndex((s) => s + 1);
    }
  }, [isTypingDone, handleSkipTyping, stepIndex, totalSteps]);

  const handlePrev = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
    }
  }, [stepIndex]);

  const handleRestart = useCallback(() => {
    setStepIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev, onBack]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF]"
    >
      {/* Retro Window Header */}
      <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="text-[11px] font-mono font-bold text-[#F54DAD] hover:underline flex items-center gap-1 active:scale-95"
            title="Kembali ke seleksi karakter (Esc)"
          >
            <ArrowLeft size={13} />
            <span>CONNECT</span>
          </button>
          <span className="text-[#806D7D]">/</span>
          <span className="text-[11px] font-mono font-bold text-[#302432] truncate">
            DOSSIER_{friend.username.toUpperCase()}.EXE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border hidden sm:inline"
            style={{ color: friend.accent, borderColor: `${friend.accent}66`, backgroundColor: `${friend.accent}12` }}
          >
            {friend.zone} zone
          </span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
            <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
            <span className="w-2 h-2 rounded-full bg-[#A993FF]" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8 bg-[#FFF8FC] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Left Side: Character Portrait + Mascot Narrator Avatar */}
        <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-56">
          {/* Main Friend Avatar */}
          <div
            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 bg-[#FFE3F1] transition-transform duration-300 hover:scale-105"
            style={{ borderColor: friend.accent, boxShadow: `5px 5px 0px ${friend.accent}44` }}
          >
            <Image
              src={friend.avatarUrl}
              alt={friend.name}
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>

          {/* Character Identity */}
          <div className="text-center w-full">
            <p className="font-sora font-extrabold text-[#302432] text-base sm:text-lg leading-tight">
              {friend.name}
            </p>
            <a
              href={friend.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono inline-flex items-center gap-1 hover:underline mt-0.5"
              style={{ color: friend.accent }}
            >
              <Github size={12} />
              <span>@{friend.username}</span>
            </a>
            {friend.location && (
              <p className="text-[11px] font-mono text-[#806D7D] flex items-center justify-center gap-1 mt-1">
                <MapPin size={11} className="shrink-0" />
                <span>{friend.location}</span>
              </p>
            )}
          </div>

          {/* Accompanying Mascot Stage (Mini Guide) */}
          <div className="w-full pt-3 border-t border-[#F0C8DF]/60 flex flex-col items-center">
            <span className="text-[9px] font-mono text-[#806D7D] font-bold uppercase tracking-wider mb-1">
              // MASCOT COMMENTATOR
            </span>
            <MascotStage expression={currentStep.expression} size="sm" showBadge={false} />
          </div>
        </div>

        {/* Right Side: Multi-Page Visual Novel Dialogue Box */}
        <div className="flex-1 flex flex-col justify-between w-full min-w-0">
          <div
            className="flex-1 cursor-pointer bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] rounded-2xl p-5 shadow-[3px_3px_0px_#FFE3F1] transition-colors relative flex flex-col justify-between min-h-[12rem]"
            onClick={handleSkipTyping}
            role="region"
            aria-label="Kotak dialog visual novel"
          >
            <div>
              {/* Speaker Header & Page Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF75B9] text-white shadow-sm flex items-center gap-1">
                    <Sparkles size={11} />
                    {currentStep.speaker}
                  </span>
                  {currentStep.tag && (
                    <span className="text-[9px] font-mono text-[#806D7D] px-2 py-0.5 rounded border border-[#F0C8DF] bg-[#FFF4FA]">
                      #{currentStep.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#806D7D]">
                  <span>HAL {stepIndex + 1} / {totalSteps}</span>
                  <div className="flex items-center gap-1 ml-1">
                    {steps.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === stepIndex ? "bg-[#FF75B9]" : "bg-[#F0C8DF]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Dialogue Typed Text */}
              <p className="text-sm sm:text-base font-inter text-[#302432] leading-relaxed">
                {fullText.slice(0, shownCharCount)}
                {!isTypingDone && (
                  <span className="text-[#F54DAD] animate-blink font-mono font-bold" aria-hidden="true">
                    _
                  </span>
                )}
              </p>
            </div>

            {/* Helper status */}
            <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#F0C8DF]/50 text-[10px] font-mono text-[#806D7D]">
              <span className="hidden sm:inline">Space / Enter untuk lanjut ▸ (Esc untuk kembali)</span>
              {!isTypingDone ? (
                <span className="text-[#F54DAD] ml-auto font-bold animate-pulse">
                  klik untuk lewati animasi teks ▸
                </span>
              ) : (
                <span className="ml-auto text-[#63CBA8] font-bold">✓ Selesai dibaca</span>
              )}
            </div>
          </div>

          {/* Step Navigation Controls */}
          <div className="mt-3 flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1 px-3.5 py-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] text-xs font-mono font-bold rounded-xl shadow-[2px_2px_0px_#FFE3F1] active:scale-95 transition-all"
              >
                <ChevronLeft size={14} />
                <span>Sebelumnya</span>
              </button>
            )}

            {stepIndex < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-mono font-bold rounded-xl shadow-[3px_3px_0px_#F0C8DF] active:scale-95 transition-all"
              >
                <span>{isTypingDone ? "Halaman Berikutnya" : "Lewati & Lanjut"}</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#FF75B9] text-[#F54DAD] text-xs font-mono font-bold rounded-xl shadow-[2px_2px_0px_#FFE3F1] active:scale-95 transition-all"
              >
                <RotateCcw size={13} />
                <span>Baca Ulang Dossier</span>
              </button>
            )}
          </div>

          {/* Primary Action Buttons (GitHub Profile & Back to Selection) */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={friend.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#F0C8DF] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:scale-95"
              style={{ minHeight: "44px" }}
            >
              <Github size={15} />
              <span>Visit @{friend.username} on GitHub</span>
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] hover:border-[#FF75B9] text-[#302432] text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#FFE3F1] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:scale-95"
              style={{ minHeight: "44px" }}
            >
              ← Back to Character Selection
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

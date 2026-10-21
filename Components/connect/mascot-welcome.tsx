"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronRight, ChevronLeft, RotateCcw, Sparkles, Users } from "lucide-react";
import { WELCOME_TOPICS, type WelcomeTopic } from "./data";
import { MascotStage } from "./mascot-stage";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function MascotWelcome({ onExploreGrid }: { onExploreGrid?: () => void }) {
  const [currentTopicId, setCurrentTopicId] = useState<string>("welcome");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [shownCharCount, setShownCharCount] = useState<number>(0);
  const prefersRM = useReducedMotion();

  const currentTopic: WelcomeTopic =
    WELCOME_TOPICS.find((t) => t.id === currentTopicId) || WELCOME_TOPICS[0];
  const totalSteps = currentTopic.steps.length;
  const currentStep = currentTopic.steps[stepIndex] || currentTopic.steps[0];
  const fullText = currentStep.text;
  const isTypingDone = shownCharCount >= fullText.length;

  // Typewriter effect per step
  useEffect(() => {
    if (prefersRM) {
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
    }, 22);

    return () => window.clearInterval(interval);
  }, [fullText, prefersRM, stepIndex, currentTopicId]);

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

  const handleTopicChange = useCallback((id: string) => {
    setCurrentTopicId(id);
    setStepIndex(0);
  }, []);

  // Keyboard controls: ArrowRight/Space/Enter for Next, ArrowLeft for Prev
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't capture keyboard if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="relative overflow-hidden bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF] mb-10">
      {/* Desktop Window Titlebar */}
      <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9] animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-[#F54DAD] tracking-tight">
            NAFIS_CONNECT_OS://MASCOT_TERMINAL.EXE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-[#806D7D] hidden sm:inline">
            {currentTopic.badge}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
            <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
            <span className="w-2 h-2 rounded-full bg-[#A993FF]" />
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 md:p-8 bg-[#FFF8FC] flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
        {/* Mascot Stage Column */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <MascotStage expression={currentStep.expression} size="md" />
        </div>

        {/* Dialogue Box Column */}
        <div className="flex-1 flex flex-col justify-between w-full min-w-0">
          {/* Top Dialogue Card */}
          <div
            onClick={handleSkipTyping}
            className="flex-1 cursor-pointer bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_#FFE3F1] transition-colors relative flex flex-col justify-between"
            role="region"
            aria-label="Kotak dialog maskot"
          >
            <div>
              {/* Speaker Header */}
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

                {/* Progress Counter */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#806D7D]">
                  <span>HAL {stepIndex + 1} / {totalSteps}</span>
                  <div className="flex items-center gap-1 ml-1">
                    {currentTopic.steps.map((_, i) => (
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

              {/* Typed Message */}
              <p className="text-sm md:text-base font-inter text-[#302432] leading-relaxed min-h-[4.5rem]">
                {fullText.slice(0, shownCharCount)}
                {!isTypingDone && (
                  <span className="text-[#F54DAD] animate-blink font-mono font-bold" aria-hidden="true">
                    _
                  </span>
                )}
              </p>
            </div>

            {/* Click to skip helper */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#F0C8DF]/50 text-[10px] font-mono text-[#806D7D]">
              <span className="hidden sm:inline">Tekan Space / Enter untuk lanjut ▸</span>
              {!isTypingDone ? (
                <span className="text-[#F54DAD] ml-auto font-bold animate-pulse">
                  klik untuk lewati animasi teks ▸
                </span>
              ) : (
                <span className="ml-auto text-[#63CBA8] font-bold">✓ Teks selesai</span>
              )}
            </div>
          </div>

          {/* Dialogue Navigation Action Buttons */}
          <div className="mt-3 flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] text-xs font-mono font-bold rounded-xl shadow-[2px_2px_0px_#FFE3F1] active:scale-95 transition-all"
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
                <span>{isTypingDone ? "Lanjut" : "Lewati & Lanjut"}</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#FF75B9] text-[#F54DAD] text-xs font-mono font-bold rounded-xl shadow-[2px_2px_0px_#FFE3F1] active:scale-95 transition-all"
              >
                <RotateCcw size={13} />
                <span>Ulangi Topik Ini</span>
              </button>
            )}

            {onExploreGrid && (
              <button
                type="button"
                onClick={onExploreGrid}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-[#FFF4FA] hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] text-xs font-mono font-bold rounded-xl shadow-[2px_2px_0px_#FFE3F1] active:scale-95 transition-all"
                title="Langsung ke daftar karakter"
              >
                <Users size={14} className="text-[#FF75B9]" />
                <span>Pilih Teman ↓</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="px-4 py-3 bg-[#FFE3F1]/70 border-t-2 border-[#F0C8DF] flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono font-bold text-[#806D7D] flex items-center gap-1 mr-1">
          <MessageSquare size={12} className="text-[#FF75B9]" />
          <span>PILIH TOPIK:</span>
        </span>
        {WELCOME_TOPICS.map((topic) => {
          const isActive = topic.id === currentTopicId;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => handleTopicChange(topic.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                isActive
                  ? "bg-[#FF75B9] text-white border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF] scale-105"
                  : "bg-white text-[#302432] border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1]"
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

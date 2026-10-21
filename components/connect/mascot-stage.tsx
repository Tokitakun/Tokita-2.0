"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MASCOT_IMAGES, type MascotExpression } from "./data";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface MascotStageProps {
  expression: MascotExpression;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBadge?: boolean;
}

const EXPRESSION_LABELS: Record<MascotExpression, { label: string; mood: string; color: string }> = {
  body: { label: "DEFAULT", mood: "LISTENING", color: "#F54DAD" },
  smile: { label: "CHEERFUL", mood: "WELCOME!", color: "#63CBA8" },
  nope: { label: "RESTRICTED", mood: "NOPE!", color: "#FF5E7E" },
  chibi1: { label: "PLAYFUL", mood: "THINKING...", color: "#79E7E5" },
  chibi2: { label: "EXCITED", mood: "SPARKLE★", color: "#A993FF" },
};

export function MascotStage({
  expression,
  size = "md",
  className = "",
  showBadge = true,
}: MascotStageProps) {
  const prefersRM = useReducedMotion();
  const currentImg = MASCOT_IMAGES[expression] || MASCOT_IMAGES.body;
  const meta = EXPRESSION_LABELS[expression] || EXPRESSION_LABELS.body;

  const sizeClasses = {
    sm: "w-32 sm:w-36",
    md: "w-56 sm:w-64 md:w-72 lg:w-80",
    lg: "w-72 sm:w-80 md:w-96",
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Decorative Aura / Background Blob */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: meta.color }}
      />

      {/* Mascot Sprite Container */}
      <motion.div
        animate={prefersRM ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={`relative aspect-[4/5] ${sizeClasses} filter drop-shadow-[0_12px_24px_rgba(245,77,173,0.22)]`}
      >
        <motion.div
          key={expression}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersRM ? 0 : 0.2 }}
          className="relative w-full h-full"
        >
          <Image
            src={currentImg}
            alt={`NAFIS.EXE Mascot - ${meta.label}`}
            fill
            sizes="(max-width: 768px) 280px, 400px"
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Retro Status Tag Badge */}
      {showBadge && (
        <motion.div
          key={`badge-${expression}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#F0C8DF] shadow-[2px_2px_0px_#FFE3F1] text-[10px] font-mono font-bold"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: meta.color }}
          />
          <span className="text-[#302432]">{meta.mood}</span>
          <span className="text-[#806D7D] text-[9px]">[{meta.label}]</span>
        </motion.div>
      )}
    </div>
  );
}

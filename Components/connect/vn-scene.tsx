"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { DIALOGUE, type Friend } from "./data";

export function VNScene({ friend, onBack }: { friend: Friend; onBack: () => void }) {
  const lines = DIALOGUE[friend.id] ?? [
    `${friend.name}, salah satu teman dari GitHub.`,
    "Cek profil GitHub-nya lewat tombol di bawah.",
  ];
  const fullText = lines.join(" ");
  const [shown, setShown] = useState(0);
  const prefersReduced = useReducedMotion();

  const done = shown >= fullText.length;

  useEffect(() => {
    if (prefersReduced) {
      setShown(fullText.length);
      return;
    }
    if (shown >= fullText.length) return;
    const t = window.setInterval(() => {
      setShown((s) => Math.min(fullText.length, s + 1));
    }, 22);
    return () => window.clearInterval(t);
  }, [friend.id, fullText, shown]);

  const skip = () => setShown(fullText.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF]"
    >
      {/* window header */}
      <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-[#F54DAD] truncate">
          VN_SCENE://{friend.username}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
          <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
          <span className="w-2 h-2 rounded-full bg-[#A993FF]" />
        </div>
      </div>

      <div className="p-4 md:p-8 bg-[#FFF8FC] flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
        {/* portrait */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div
            className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 bg-[#FFE3F1]"
            style={{ borderColor: friend.accent, boxShadow: `4px 4px 0px ${friend.accent}44` }}
          >
            <Image src={friend.avatarUrl} alt={friend.name} fill sizes="128px" className="object-cover" />
          </div>
          <div className="text-center">
            <p className="font-sora font-extrabold text-[#302432]">{friend.name}</p>
            <p className="text-[11px] font-mono flex items-center justify-center gap-1" style={{ color: friend.accent }}>
              <Github size={11} /> @{friend.username}
            </p>
          </div>
        </div>

        {/* dialogue */}
        <div className="flex-1 flex flex-col min-w-0">
          <div
            className="flex-1 cursor-pointer bg-white border-2 border-[#F0C8DF] rounded-2xl p-5 shadow-[3px_3px_0px_#FFE3F1]"
            onClick={skip}
            role="presentation"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#FF75B9] text-white">
                TOKITA
              </span>
              <span className="text-[9px] font-mono text-[#806D7D] tracking-widest uppercase">
                Zone: {friend.zone}
              </span>
            </div>
            <p className="text-sm font-inter text-[#302432] leading-relaxed min-h-[5rem]">
              {fullText.slice(0, shown)}
              {!done && <span className="animate-blink" aria-hidden="true">▌</span>}
            </p>
            {!done && (
              <p className="text-[9px] font-mono text-[#806D7D] mt-2 text-right">
                klik untuk skip ▸
              </p>
            )}
          </div>

          {/* actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={friend.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#F0C8DF] transition-colors"
              style={{ minHeight: "44px" }}
            >
              <Github size={14} />
              Visit GitHub Profile
              <ExternalLink size={12} />
            </a>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] hover:border-[#FF75B9] text-[#302432] text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#FFE3F1] transition-colors"
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

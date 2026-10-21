"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FRIENDS, type Friend } from "@/components/connect/data";
import { CharacterCard } from "@/components/connect/character-card";
import { VNScene } from "@/components/connect/vn-scene";
import { MascotWelcome } from "@/components/connect/mascot-welcome";

export default function ConnectPage() {
  const [selected, setSelected] = useState<Friend | null>(null);
  const prefersRM = useReducedMotion();

  const handleSelect = useCallback((f: Friend) => {
    setSelected(f);
    requestAnimationFrame(() => {
      document
        .getElementById("connect-select")
        ?.scrollIntoView({ behavior: prefersRM ? "auto" : "smooth", block: "start" });
    });
  }, [prefersRM]);

  const handleBack = useCallback(() => {
    setSelected(null);
    requestAnimationFrame(() => {
      document
        .getElementById("connect-select")
        ?.scrollIntoView({ behavior: prefersRM ? "auto" : "smooth", block: "start" });
    });
  }, [prefersRM]);

  const handleScrollToGrid = useCallback(() => {
    document
      .getElementById("character-grid")
      ?.scrollIntoView({ behavior: prefersRM ? "auto" : "smooth", block: "start" });
  }, [prefersRM]);

  return (
    <div className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />

      <main id="connect-select" className="relative z-10 pt-8 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs font-mono font-bold text-[#F54DAD]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80 hover:opacity-100 flex items-center gap-1">
              <span>root</span>
              <span>/</span>
            </Link>
            <span className="text-[#302432]">connect</span>
          </div>
          <span className="flex items-center gap-2 bg-white border border-[#F0C8DF] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#FFE3F1]">
            <span className="w-2 h-2 rounded-full bg-[#63CBA8] animate-pulse" />
            <span className="text-[#302432]">SOC // VISUAL_NOVEL</span>
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-[#F54DAD] uppercase tracking-wider">
            // INTERACTIVE COMPANION & CHARACTER DOSSIER
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold font-sora text-[#302432] tracking-tight leading-tight mt-1">
            Connect
          </h1>
          <p className="text-sm text-[#806D7D] max-w-2xl leading-relaxed font-inter mt-1">
            Temui maskot resmi NAFIS.EXE, dengarkan cerita jaringan pertemanan, dan buka dossier visual novel untuk menjelajahi profil GitHub rekan-rekan kolaborator.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={`vn-${selected.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: prefersRM ? 0 : 0.3 }}
            >
              <VNScene friend={selected} onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div
              key="main-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersRM ? 0 : 0.25 }}
              className="space-y-8"
            >
              {/* Mascot Welcome Interactive Console */}
              <MascotWelcome onExploreGrid={handleScrollToGrid} />

              {/* Character Directory Grid */}
              <div id="character-grid" className="pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                    <h2 className="text-xs sm:text-sm font-mono font-bold text-[#F54DAD] uppercase tracking-wider">
                      // CHARACTER_SELECT ({FRIENDS.length} COLLABORATORS LOADED)
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-[#806D7D]">
                    KLIK KARTU UNTUK MEMBUKA ADEGAN VN
                  </span>
                </div>

                <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {FRIENDS.map((friend) => (
                    <CharacterCard key={friend.id} friend={friend} onSelect={handleSelect} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

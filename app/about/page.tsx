"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Palette,
  Gamepad2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Compass,
  Terminal,
  Layers,
  Flame,
  User,
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import { ScrollProgress, TiltCard } from "@/Components/fx";
import { GlitchText } from "@/Components/glitch";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  const dossierBadges = [
    { label: "Personality", val: "INFJ-T (The Advocate)", color: "text-[#F54DAD] border-[#FF75B9] bg-[#FFE3F1]" },
    { label: "Location", val: "Jakarta, Indonesia", color: "text-[#302432] border-[#F0C8DF] bg-white" },
    { label: "Craft", val: "Web Frontend & UI/UX", color: "text-[#F54DAD] border-[#FF75B9] bg-[#FFE3F1]" },
    { label: "Core Stack", val: "Next.js / React / TypeScript", color: "text-[#302432] border-[#F0C8DF] bg-white" },
  ];

  const focusPillars = [
    {
      icon: Code2,
      title: "Frontend Engineering",
      color: "#F54DAD",
      accentBg: "bg-[#FFE3F1] border-[#FF75B9]",
      description: "Building fast, type-safe, and modular web interfaces using Next.js, React, TypeScript, and Tailwind CSS. Obsessed with maintainable component architecture and buttery smooth framerates.",
    },
    {
      icon: Palette,
      title: "UI/UX & Design Systems",
      color: "#FF75B9",
      accentBg: "bg-[#FFF4FA] border-[#F0C8DF]",
      description: "Designing tactile user interfaces in Figma with atomic design tokens, clear typographic hierarchy, and intentional negative space that respects human cognitive load.",
    },
    {
      icon: Gamepad2,
      title: "Storytelling & Indie Aesthetics",
      color: "#A993FF",
      accentBg: "bg-[#FFE3F1] border-[#A993FF]/40",
      description: "Drawing deep creative inspiration from atmospheric narrative games like Needy Streamer Overload and indie culture. Infusing web interfaces with mood, exploration, and soul.",
    },
    {
      icon: BookOpen,
      title: "Philosophy & Psychology",
      color: "#79E7E5",
      accentBg: "bg-[#FFF4FA] border-[#79E7E5]/40",
      description: "Passionate about human behavior, existential reflections, and empathy in communication. Believing that technology should deepen human connection rather than exploit attention.",
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden selection:bg-[#FF75B9] selection:text-white">
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb / Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs font-mono font-bold text-[#F54DAD]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80 hover:opacity-100 flex items-center gap-1">
              <span>root</span>
              <span>/</span>
            </Link>
            <span className="text-[#302432]">about_nafis.dossier</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#F0C8DF] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#FFE3F1]">
            <span className="w-2 h-2 rounded-full bg-[#63CBA8] animate-pulse" />
            <span className="text-[#302432]">SYSTEM LOG: 2026 ACTIVE</span>
          </div>
        </div>

        {/* Hero Dossier Window */}
        <div className="bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF,_0_16px_40px_rgba(245,77,173,0.12)] overflow-hidden mb-12">
          {/* Retro Window Header */}
          <div className="window-header flex items-center justify-between px-4 py-3 bg-[#FFE3F1] border-b-2 border-[#F0C8DF]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF75B9]" />
                <span className="w-3 h-3 rounded-full bg-[#79E7E5]" />
                <span className="w-3 h-3 rounded-full bg-[#A993FF]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#F54DAD] ml-2">USER_PROFILE://nafis_exe</span>
            </div>
            <div className="text-[11px] font-mono text-[#806D7D] font-bold flex items-center gap-1">
              <Terminal size={12} className="text-[#F54DAD]" />
              <span>READ_ONLY_ACCESS</span>
            </div>
          </div>

          <div className="p-6 md:p-10 grid lg:grid-cols-12 gap-8 items-center bg-white">
            {/* Avatar / Portrait with Tilt */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <TiltCard className="w-full max-w-[320px]">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#FF75B9] bg-[#FFF8FC] p-2 shadow-[4px_4px_0px_#F0C8DF]">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white">
                    <Image
                      src="/profil.jpg"
                      alt="Muhammad Dzurunnafis Khairuddin"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-white/95 backdrop-blur-md border border-[#F0C8DF] rounded-xl shadow-[2px_2px_0px_#FFE3F1]">
                      <p className="text-[10px] font-mono font-bold text-[#F54DAD]">ID: NAFIS // TOKITA</p>
                      <p className="text-sm font-bold text-[#302432] font-sora">M. Dzurunnafis Khairuddin</p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Status Pills */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="px-3.5 py-1 text-xs font-mono font-bold rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#FF75B9] flex items-center gap-1.5 shadow-[1px_1px_0px_#F0C8DF]">
                  <Sparkles size={12} />
                  Creative Coder
                </span>
                <span className="px-3.5 py-1 text-xs font-mono font-bold rounded-full bg-white text-[#302432] border border-[#F0C8DF] flex items-center gap-1.5 shadow-[1px_1px_0px_#FFE3F1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A993FF]" />
                  INFJ-T Mindset
                </span>
              </div>
            </div>

            {/* Narrative / Dossier Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#F54DAD] uppercase tracking-wider block mb-1">
                  // BIOGRAPHICAL DOSSIER
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold font-sora text-[#302432] tracking-tight">
                  Muhammad Dzurunnafis{" "}
                  <GlitchText as="span" className="text-[#F54DAD]">Khairuddin</GlitchText>
                </h1>
                <p className="text-[#FF75B9] font-mono font-bold text-sm mt-1">
                  Known online as Tokita (Tokitakun)
                </p>
              </div>

              <div className="text-base text-[#806D7D] space-y-4 font-inter leading-relaxed">
                <p>
                  Hi! I am <strong className="text-[#302432] font-semibold">Muhammad Dzurunnafis Khairuddin</strong>, a front-end developer and UI/UX enthusiast based in Jakarta, Indonesia.
                </p>
                <p>
                  I enjoy designing and engineering digital experiences where technical rigor meets artistic atmosphere. Drawing inspiration from retro desktop operating systems and indie internet culture, I build software that feels human, contemplative, and genuinely responsive.
                </p>
                <p>
                  Outside lines of TypeScript and CSS, my mind gravitates toward philosophy, cognitive psychology, historical chronicles, and character-driven cinema. I view design not just as decoration, but as an act of empathy.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dossierBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`px-3.5 py-2.5 rounded-xl border-2 font-mono text-xs flex flex-col gap-0.5 shadow-[2px_2px_0px_#F0C8DF] ${badge.color}`}
                  >
                    <span className="text-[10px] text-[#806D7D] uppercase font-bold">{badge.label}</span>
                    <span className="font-bold">{badge.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="omori-divider my-12" />

        {/* The 4 Focus Pillars */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold text-[#F54DAD] tracking-wider uppercase">
              // PILLARS & PURSUITS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-[#302432] mt-1">
              What I Think About & Build
            </h2>
            <p className="text-sm text-[#806D7D] max-w-lg mx-auto mt-2 font-inter">
              The balance between technical execution, aesthetic vision, and intellectual curiosity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {focusPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#F0C8DF] rounded-2xl p-6 hover:border-[#FF75B9] transition-all duration-200 flex flex-col justify-between shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl border ${pillar.accentBg}`}>
                        <IconComponent size={22} style={{ color: pillar.color }} />
                      </div>
                      <h3 className="text-lg font-bold font-sora text-[#302432]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#806D7D] font-inter leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Philosophical Notes Card */}
        <div className="bg-[#FFE3F1] border-2 border-[#FF75B9] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#F0C8DF] mb-14 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F54DAD]">
              <Flame size={14} />
              <span>PERSONAL MANIFESTO</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold font-sora text-[#302432]">
              Designing for Human Calm in a Hyper-Stimulated Web
            </h3>
            <p className="text-sm md:text-base text-[#302432] font-inter leading-relaxed max-w-3xl">
              Modern websites often overwhelm with aggressive notifications, intrusive popups, and sensory overload. My goal with NAFIS.EXE is the exact opposite: an introspective, joyful digital room where every transition has weight, typography has clarity, and visitors feel respected.
            </p>
          </div>
        </div>

        {/* Quick Navigation Action Grid */}
        <div className="bg-white border-2 border-[#F0C8DF] rounded-2xl p-6 md:p-8 text-center space-y-6 shadow-[4px_4px_0px_#FFE3F1]">
          <div>
            <h3 className="text-xl font-bold font-sora text-[#302432]">
              Explore Further
            </h3>
            <p className="text-xs md:text-sm text-[#806D7D] mt-1 font-inter">
              Discover real projects, verified credentials, and short stories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/project"
              className="px-5 py-2.5 rounded-xl bg-[#FF75B9] text-white font-bold text-sm hover:bg-[#F54DAD] transition-colors flex items-center gap-2 shadow-[3px_3px_0px_#F0C8DF]"
            >
              <span>View Projects</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/serti"
              className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#302432] font-bold text-sm hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-colors flex items-center gap-2 shadow-[3px_3px_0px_#FFE3F1]"
            >
              <span>Certificates & Awards</span>
              <Layers size={14} className="text-[#F54DAD]" />
            </Link>
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#F54DAD] font-bold text-sm hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-colors flex items-center gap-2 shadow-[3px_3px_0px_#FFE3F1]"
            >
              <span>Read Stories (Cerpen)</span>
              <BookOpen size={14} />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#302432] font-bold text-sm hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-colors flex items-center gap-2 shadow-[3px_3px_0px_#FFE3F1]"
            >
              <span>Contact Nafis</span>
              <Compass size={14} className="text-[#FF75B9]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
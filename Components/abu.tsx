"use client";

import { useEffect, useRef, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Fish, Gamepad2, Film, Terminal, Heart, Music, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA & CONFIG — NAFIS.EXE KAWAII CYBER PALETTE
// ============================================================================

const INTERESTS = [
  { 
    id: "reading", 
    icon: BookOpen, 
    color: "#F54DAD", 
    label: "Reading", 
    desc: "Philosophy, psychology, and history", 
    x: 20, y: 25, 
    path: "M 50 50 V 30 Q 50 25 45 25 H 20" 
  },
  { 
    id: "fish", 
    icon: Fish, 
    color: "#79E7E5", 
    label: "Aquarium", 
    desc: "Mini ecosystems & natural aquascaping", 
    x: 80, y: 25, 
    path: "M 50 50 V 30 Q 50 25 55 25 H 80" 
  },
  { 
    id: "game", 
    icon: Gamepad2, 
    color: "#FF75B9", 
    label: "Gaming", 
    desc: "Atmospheric RPGs & indie storytelling", 
    x: 20, y: 75, 
    path: "M 50 50 V 70 Q 50 75 45 75 H 20" 
  },
  { 
    id: "movie", 
    icon: Film, 
    color: "#A993FF", 
    label: "Cinema", 
    desc: "Anime series, mystery films, and documentaries", 
    x: 80, y: 75, 
    path: "M 50 50 V 70 Q 50 75 55 75 H 80" 
  },
  { 
    id: "lang", 
    icon: Globe, 
    color: "#79E7E5", 
    label: "Languages", 
    desc: "Exploring ID, EN, JP, and AR", 
    x: 50, y: 15, 
    path: "M 50 50 V 15" 
  },
  { 
    id: "music", 
    icon: Music, 
    color: "#FF75B9", 
    label: "Music", 
    desc: "Lo-fi beats, game soundtracks, and J-Pop", 
    x: 50, y: 85, 
    path: "M 50 50 V 85" 
  },
];

// ============================================================================
// SUB-COMPONENTS FOR ANIMATION
// ============================================================================

const AnimatedPath = ({ d, color }: { d: string; color: string }) => {
  return (
    <>
      <path d={d} stroke="currentColor" strokeWidth="1" fill="none" className="text-[#F0C8DF]" />
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 100"
        initial={{ strokeDashoffset: 140 }}
        animate={{ strokeDashoffset: -140 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        strokeLinecap="round"
      />
    </>
  );
};

const InterestNode = ({ item }: { item: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={`${item.label}: ${item.desc}`}
    >
      {/* Tooltip Dialog */}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[180px] opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 z-50">
        <div className="bg-white border-2 border-[#FF75B9] rounded-xl px-3 py-2 shadow-[3px_3px_0px_#F0C8DF] relative text-center">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5" style={{ color: item.color }}>
            ★ {item.label}
          </p>
          <p className="text-[11px] text-[#302432] leading-snug font-inter">{item.desc}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#FF75B9]" />
        </div>
      </div>

      {/* Node Icon Box */}
      <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#F0C8DF] flex items-center justify-center shadow-[2px_2px_0px_#FFE3F1] group-hover:border-[#FF75B9] group-hover:scale-110 transition-all duration-200">
        <item.icon size={18} style={{ color: item.color }} />
      </div>
    </motion.div>
  );
};

const IntegrationVisual = () => {
  const containerId = useId();

  return (
    <div className="relative h-full w-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl bg-[#FFF8FC] border border-[#F0C8DF]">
      {/* Dot Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.25]" 
        style={{ backgroundImage: "radial-gradient(circle, #F0C8DF 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} 
      />
      
      {/* SVG Interconnect Lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {INTERESTS.map((item) => (
          <AnimatedPath key={`${containerId}-${item.id}`} d={item.path} color={item.color} />
        ))}
      </svg>

      {/* Center Core Hub */}
      <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-2 border-[#FF75B9] bg-white p-3.5 shadow-[4px_4px_0px_#F0C8DF]">
        <Heart size={22} className="text-[#F54DAD] fill-[#FF75B9]/30 animate-pulse" />
      </div>

      {/* Node icons */}
      {INTERESTS.map((item) => (
        <InterestNode key={item.id} item={item} />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN ABOUT COMPONENT — NAFIS.EXE
// ============================================================================

const AboutModern = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#FFF4FA] overflow-hidden border-t-2 border-[#F0C8DF]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative & Personality */}
          <div ref={contentRef} className="space-y-6">
            <div className="about-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] w-fit shadow-[2px_2px_0px_#FFE3F1]">
              <span className="w-2 h-2 rounded-full bg-[#79E7E5] border border-[#FF75B9]" />
              <span>ABOUT_ME.TXT ♡</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#302432] leading-tight about-text tracking-tight font-sora">
              Exploring worlds through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF75B9] to-[#F54DAD]">
                code & playful design.
              </span>
            </h2>

            <div className="space-y-4 text-[#806D7D] leading-relaxed text-sm md:text-base about-text font-inter">
              <p>
                Hi, I am <strong className="text-[#302432]">Nafis</strong>, a{" "}
                <span className="text-[#F54DAD] font-semibold">Front-End Developer</span> and{" "}
                <span className="text-[#FF75B9] font-semibold">UI/UX Enthusiast</span> from Indonesia.
              </p>
              <p>
                To me, a website is never just a cold set of static rectangles. It is an expressive interactive space that conveys emotion, mood, and rock-solid usability. I specialize in <strong className="text-[#302432]">Next.js</strong>, <strong className="text-[#302432]">React</strong>, <strong className="text-[#302432]">TypeScript</strong>, and responsive desktop aesthetics.
              </p>
              <p>
                Outside of code, I am fascinated by narrative indie games, language learning, natural aquascapes, and psychological literature.
              </p>
            </div>

            <div className="about-text pt-2 flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#302432] shadow-[2px_2px_0px_#FFE3F1] flex items-center gap-1.5">
                <Heart size={13} className="text-[#FF75B9]" />
                INFJ-T Personality
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#FFE3F1] border-2 border-[#FF75B9] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF] flex items-center gap-1.5">
                <Sparkles size={13} />
                Creative Explorer
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Window Interactivity */}
          <div ref={cardRef} className="relative h-[400px] md:h-[450px]">
            <div className="relative h-full bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF,_0_16px_36px_rgba(245,77,173,0.12)] overflow-hidden flex flex-col">
              
              {/* Window Header */}
              <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#F54DAD]" />
                  <span className="text-xs font-mono font-bold text-[#302432]">MINDSPACE_MAP.EXE</span>
                  <span className="text-[10px] text-[#F54DAD] font-mono font-bold hidden sm:inline">v2.6</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A993FF]" />
                </div>
              </div>

              {/* Visual Interactive Canvas */}
              <div className="flex-1 relative p-3 bg-white">
                 <IntegrationVisual />
              </div>

              {/* Window Status Bar */}
              <div className="px-4 py-2.5 border-t-2 border-[#F0C8DF] bg-[#FFE3F1] flex justify-between items-center text-[10px] font-mono font-bold text-[#806D7D]">
                <span>INTEREST_MAP: ACTIVE ♡</span>
                <span className="text-[#F54DAD]">CLICK NODES TO INSPECT</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutModern;
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Fish, Gamepad2, Film, Terminal, Heart, Music, Globe } from "lucide-react";
import { motion } from "motion/react";
import { useId } from "react";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA & CONFIG
// ============================================================================

const INTERESTS = [
  { 
    id: "reading", 
    icon: BookOpen, 
    color: "#6B9FBF", 
    label: "Reading", 
    desc: "Exploring worlds through words", 
    x: 20, y: 25, 
    path: "M 50 50 V 30 Q 50 25 45 25 H 20" 
  },
  { 
    id: "fish", 
    icon: Fish, 
    color: "#38bdf8", // sky-400
    label: "Aquarium", 
    desc: "Peaceful underwater ecosystems", 
    x: 80, y: 25, 
    path: "M 50 50 V 30 Q 50 25 55 25 H 80" 
  },
  { 
    id: "game", 
    icon: Gamepad2, 
    color: "#c084fc", // purple-400
    label: "Gaming", 
    desc: "RPG Stories & FPS Action", 
    x: 20, y: 75, 
    path: "M 50 50 V 70 Q 50 75 45 75 H 20" 
  },
  { 
    id: "movie", 
    icon: Film, 
    color: "#fb7185", // rose-400
    label: "Movies", 
    desc: "Anime series & cinematic films", 
    x: 80, y: 75, 
    path: "M 50 50 V 70 Q 50 75 55 75 H 80" 
  },
  { 
    id: "lang", 
    icon: Globe, 
    color: "#4ade80", // green-400
    label: "Languages", 
    desc: "ID, EN, JP, AR exploration", 
    x: 50, y: 15, 
    path: "M 50 50 V 15" 
  },
  { 
    id: "music", 
    icon: Music, 
    color: "#facc15", // yellow-400
    label: "Music", 
    desc: "Lo-fi beats & J-Pop vibes", 
    x: 50, y: 85, 
    path: "M 50 50 V 85" 
  },
];

// ============================================================================
// SUB-COMPONENTS FOR ANIMATION
// ============================================================================

const AnimatedPath = ({ d, id, color }: { d: string; id: string; color: string }) => {
  return (
    <>
      {/* Static faint line */}
      <path d={d} stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white/5" />
      
      {/* Flowing animated line */}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="60 140"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        strokeLinecap="round"
      />
    </>
  );
};

const InterestNode = ({ item, containerId }: { item: any; containerId: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: item.delay || 0.2, duration: 0.5 }}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
    >
      {/* Tooltip Alert */}
      <div className="node-tooltip absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-max max-w-[160px] opacity-0 pointer-events-none z-50 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-2">
        <div className="bg-[#2A2A2A]/95 backdrop-blur-md border border-[#6B9FBF]/30 rounded-lg px-3 py-2 shadow-xl relative">
          <p className="text-[10px] font-bold text-[#6B9FBF] uppercase tracking-wider mb-0.5">{item.label}</p>
          <p className="text-[10px] text-gray-300 leading-snug">{item.desc}</p>
          {/* Arrow Down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#6B9FBF]/30" />
        </div>
      </div>

      {/* Icon Circle */}
      <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/30 group-hover:-translate-y-1 transition-all duration-300">
        <item.icon size={18} style={{ color: item.color }} className="group-hover:scale-110 transition-transform" />
      </div>
    </motion.div>
  );
};

const IntegrationVisual = () => {
  const containerId = useId();

  return (
    <div className="relative h-full w-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl bg-[#1a1a1a]">
      {/* Dots Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      
      {/* SVG Lines Container */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {INTERESTS.map((item) => (
          <AnimatedPath key={item.id} d={item.path} id={`${containerId}-${item.id}`} color={item.color} />
        ))}
      </svg>

      {/* Center Hub (You) */}
      <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#222] p-3 shadow-xl">
        <Heart size={24} className="text-[#6B9FBF] fill-[#6B9FBF]/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#6B9FBF]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Peripheral Icons */}
      {INTERESTS.map((item) => (
        <InterestNode key={item.id} item={item} containerId={containerId} />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AboutModern = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Animation
      gsap.fromTo(
        ".about-text",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // 2. Card Entry Animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
          delay: 0.2,
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
      className="relative py-24 md:py-32 bg-[#1A1A1A] overflow-hidden border-t border-white/5"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#6B9FBF]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#B06C6C]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Introduction */}
          <div ref={contentRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#6B9FBF] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B9FBF] animate-pulse" />
              WHO AM I?
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight about-text tracking-tight">
              Hello, I'm <span className="text-[#6B9FBF]">Nafis</span>.
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg about-text">
              <p>
                Halo! Saya <strong className="text-white">Muhammad Dzurunnafis Khairuddin (Nafis)</strong>, seorang 
                {' '}<span className="text-[#6B9FBF] font-semibold">Front End Developer</span> dan 
                {' '}<span className="text-[#B06C6C] font-semibold">UI/UX Design Enthusiast</span> yang 
                tinggal di <span className="text-[#F0F0F0]">Indonesia</span>.
              </p>
              <p>
                Saya memiliki passion dalam membangun antarmuka yang tidak hanya fungsional, tetapi juga estetis dan nyaman digunakan.
                Saat ini saya mendalami <span className="text-[#6B9FBF]">Flutter</span>,{' '}
                <span className="text-[#6B9FBF]">Next.js</span>, dan berbagai teknologi front-end modern lainnya.
              </p>
              <p>
                Di luar coding, saya menikmati eksplorasi bahasa asing, bermain game, dan mendengarkan musik.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Seamless Integrations Visual */}
          <div ref={cardRef} className="relative mt-8 md:mt-0 h-[400px] md:h-[450px]">
            {/* Decorative Blur Behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#6B9FBF]/20 to-[#B06C6C]/20 rounded-2xl blur-xl opacity-70" />
            
            {/* Main Card Container */}
            <div className="relative h-full bg-[#222222] border border-white/10 rounded-2xl p-1 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#252525]/50 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-[#6B9FBF]/10 rounded-lg text-[#6B9FBF]">
                    <Terminal size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Personal Interests</h3>
                    <p className="text-[10px] text-gray-500 font-mono">SEAMLESS_INTEGRATION_V1.0</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
              </div>

              {/* The Visual Component */}
              <div className="flex-1 relative p-4">
                 <IntegrationVisual />
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 border-t border-white/5 bg-[#252525]/50 backdrop-blur-sm flex justify-between items-center z-10">
                <span className="text-[10px] text-gray-500 font-mono">STATUS: CONNECTED</span>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] text-green-500 font-mono">ACTIVE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutModern;
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Server, 
  TerminalSquare, 
  Cpu,
  Layers,
  Globe,
  Zap
} from "lucide-react";
import {
  FaReact,
  FaGithub,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiVite,
  SiMysql,
  SiFlutter,
  SiJavascript,
  SiExpress,
  SiDocker,
  SiVercel,
  SiUbuntu,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

const TECH_STACK = [
  {
    category: "Frontend Core",
    icon: Code2,
    items: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ]
  },
  {
    category: "Backend & Database",
    icon: Server,
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ]
  },
  {
    category: "DevOps & Tools",
    icon: TerminalSquare,
    items: [
      { name: "Git", icon: FaGithub, color: "#FFFFFF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Ubuntu", icon: SiUbuntu, color: "#E95420" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    ]
  },
  {
    category: "Mobile & Design",
    icon: Layers,
    items: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ]
  }
];

const LANGUAGES = [
  { name: "Indonesia", level: 100, label: "Native Speaker" },
  { name: "English", level: 85, label: "Professional Working" },
  { name: "Japanese", level: 40, label: "Basic (JLPT N5)" },
  { name: "Arabic", level: 25, label: "Elementary" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const TechNode = ({ item, delay }: { item: any, delay: number }) => {
  return (
    <div 
      className="group relative flex items-center gap-2 px-3 py-2 bg-[#222] border border-white/5 rounded-lg hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow Effect on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: item.color }}
      />
      
      <item.icon size={16} className="text-gray-400 group-hover:text-white transition-colors relative z-10" style={{ color: item.color }} />
      
      <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors relative z-10">
        {item.name}
      </span>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out", 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 80%",
            toggleActions: "play none none reverse"
          } 
        }
      );

      // 2. Staggered Grid Items
      if (gridRef.current) {
        const cards = gsap.utils.toArray(".skill-card") as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.7, 
            stagger: 0.1, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: gridRef.current, 
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 3. Language Bars Animation
      const bars = gsap.utils.toArray(".lang-fill") as HTMLElement[];
      gsap.fromTo(
        bars,
        { width: "0%" },
        { 
          width: (i) => `${LANGUAGES[i].level}%`, 
          duration: 1.5, 
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: { 
            trigger: ".lang-container", 
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Background Grid Pattern (Like Reference) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#6B9FBF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ========== HEADER ========== */}
        <div ref={headerRef} className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap size={14} className="text-[#6B9FBF]" />
            <span className="text-[10px] font-mono text-[#6B9FBF] tracking-widest uppercase">Technical Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Tools & <span className="text-[#6B9FBF]">Technologies</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Ekosistem teknologi modern untuk membangun aplikasi yang cepat, responsif, dan skalabel.
          </p>
        </div>

        {/* ========== TECH STACK GRID ========== */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {TECH_STACK.map((group, idx) => (
            <div 
              key={idx} 
              className="skill-card group relative bg-[#222]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-[#252525] hover:border-[#6B9FBF]/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Header Group with Icon */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-[#6B9FBF] group-hover:bg-[#6B9FBF]/10 transition-colors">
                  <group.icon size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  {group.category}
                </h3>
              </div>

              {/* Tech Items - Node Style */}
              <div className="flex flex-wrap gap-2 content-start">
                {group.items.map((tech, i) => (
                  <TechNode key={i} item={tech} delay={i * 50} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ========== LANGUAGES (System Monitor Style) ========== */}
        <div className="lang-container max-w-4xl mx-auto bg-[#222]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6B9FBF]/30 to-transparent" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-[#6B9FBF]" />
              <h3 className="text-base font-semibold text-white">Language Proficiency</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 bg-black/30 px-2 py-1 rounded border border-white/5">STATUS: ONLINE</span>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{lang.name}</span>
                  <span className="text-xs font-mono text-[#6B9FBF]">{lang.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="lang-fill h-full bg-[#6B9FBF] rounded-full relative z-10 shadow-[0_0_10px_rgba(107,159,191,0.3)]"
                    style={{ width: '0%' }} 
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5 font-mono uppercase tracking-wider">{lang.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
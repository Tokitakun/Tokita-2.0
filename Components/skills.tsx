"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Server, 
  TerminalSquare, 
  Layers,
  Globe,
  Cpu,
  Sparkles,
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
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

const TECH_STACK = [
  {
    category: "Frontend Core",
    icon: Code2,
    code: "FE_CORE.EXE",
    items: [
      { name: "React.js", icon: FaReact, color: "#00B8D9" },
      { name: "Next.js", icon: SiNextdotjs, color: "#302432" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#D97706" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vite", icon: SiVite, color: "#7C3AED" },
    ]
  },
  {
    category: "Backend & Database",
    icon: Server,
    code: "BACKEND_DB.EXE",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#16A34A" },
      { name: "Express", icon: SiExpress, color: "#302432" },
      { name: "MySQL", icon: SiMysql, color: "#0284C7" },
    ]
  },
  {
    category: "DevOps & Tools",
    icon: TerminalSquare,
    code: "DEVOPS_TOOL.EXE",
    items: [
      { name: "Git", icon: FaGithub, color: "#EA580C" },
      { name: "Docker", icon: SiDocker, color: "#0284C7" },
      { name: "Ubuntu", icon: SiUbuntu, color: "#E11D48" },
      { name: "Vercel", icon: SiVercel, color: "#302432" },
    ]
  },
  {
    category: "Mobile & Design",
    icon: Layers,
    code: "MOBILE_UI.EXE",
    items: [
      { name: "Flutter", icon: SiFlutter, color: "#0284C7" },
      { name: "Figma", icon: FaFigma, color: "#F54DAD" },
    ]
  }
];

const LANGUAGES = [
  { name: "Indonesia", level: 100, label: "Native Speaker" },
  { name: "English", level: 85, label: "Professional Working" },
  { name: "Japanese", level: 40, label: "Basic (JLPT N5)" },
  { name: "Arabic", level: 25, label: "Elementary" },
];

const TechNode = ({ item }: { item: any }) => {
  return (
    <div 
      className="group relative flex items-center gap-2 px-3 py-1.5 bg-[#FFF8FC] border border-[#F0C8DF] rounded-xl hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-all duration-150 cursor-default shadow-[1px_1px_0px_#FFE3F1]"
    >
      <item.icon size={15} style={{ color: item.color }} className="group-hover:scale-110 transition-transform" />
      <span className="text-xs text-[#302432] font-mono font-semibold group-hover:text-[#F54DAD] transition-colors">
        {item.name}
      </span>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: "power3.out", 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 80%",
            toggleActions: "play none none reverse"
          } 
        }
      );

      if (gridRef.current) {
        const cards = gsap.utils.toArray(".skill-card") as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.08, 
            ease: "power3.out", 
            scrollTrigger: { 
              trigger: gridRef.current, 
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      const bars = gsap.utils.toArray(".lang-fill") as HTMLElement[];
      gsap.fromTo(
        bars,
        { width: "0%" },
        { 
          width: (i) => `${LANGUAGES[i].level}%`, 
          duration: 1.1, 
          ease: "power3.out", 
          stagger: 0.1,
          scrollTrigger: { 
            trigger: ".lang-container", 
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-8 bg-[#FFF4FA] overflow-hidden border-t-2 border-[#F0C8DF]"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div ref={headerRef} className="mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#FFE3F1]">
            <Cpu size={14} className="text-[#FF75B9]" />
            <span className="tracking-widest uppercase">TECH_EQUIPMENT.EXE ♡</span>
            <span className="text-[#79E7E5]">★</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#302432] tracking-tight leading-tight mb-3 font-sora">
            Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF75B9] to-[#F54DAD]">Arsenal</span>
          </h2>
          <p className="text-sm md:text-base text-[#806D7D] max-w-xl leading-relaxed font-inter">
            Technologies and tools I use to create expressive, resilient, and responsive digital products.
          </p>
        </div>

        {/* TECH STACK GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TECH_STACK.map((group, idx) => (
            <div 
              key={idx} 
              className="skill-card bg-white border-2 border-[#F0C8DF] rounded-2xl overflow-hidden hover:border-[#FF75B9] transition-all duration-200 flex flex-col shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1"
            >
              {/* Desktop Window Mini Header */}
              <div className="window-header px-3.5 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#F54DAD]">{group.code}</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                  <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 bg-[#FFE3F1] rounded-xl text-[#F54DAD] border border-[#F0C8DF]">
                    <group.icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#302432] font-sora">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 content-start mt-auto">
                  {group.items.map((tech, i) => (
                    <TechNode key={i} item={tech} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LANGUAGES SYSTEM MONITOR */}
        <div className="lang-container max-w-4xl mx-auto bg-white border-2 border-[#FF75B9] rounded-2xl overflow-hidden shadow-[6px_6px_0px_#F0C8DF]">
          {/* Header */}
          <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#F54DAD]" />
              <span className="text-xs font-mono font-bold text-[#302432]">LINGUISTIC_DIAGNOSTICS.EXE</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#F54DAD] bg-white px-2 py-0.5 rounded-md border border-[#F0C8DF]">
              STATUS: MONITORED ♡
            </span>
          </div>

          <div className="p-6 md:p-8 bg-[#FFF8FC]">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {LANGUAGES.map((lang, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-[#302432] font-sora">{lang.name}</span>
                    <span className="text-xs font-mono font-bold text-[#F54DAD]">{lang.level}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-[#F0C8DF] relative">
                    <div 
                      className="lang-fill h-full bg-gradient-to-r from-[#FF75B9] to-[#F54DAD] rounded-full relative z-10"
                      style={{ width: prefersReduced ? `${lang.level}%` : '0%' }} 
                    />
                  </div>
                  <p className="text-[10px] text-[#806D7D] mt-1.5 font-mono font-bold uppercase tracking-wider">{lang.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
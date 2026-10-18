"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
<<<<<<< HEAD:Components/timeline.tsx
import { Briefcase, GraduationCap, Calendar, Sparkles } from "lucide-react";
import timelineData from "../public/data/timeline.json";
import { useReducedMotion } from "@/lib/useReducedMotion";
=======
import { Briefcase, GraduationCap, Calendar, ArrowRight } from "lucide-react";
import timelineData from "@/public/data/timeline.json";
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/sections/timeline.tsx

gsap.registerPlugin(ScrollTrigger);

const ExperienceTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      const rows = gsap.utils.toArray<HTMLElement>(".tl-card");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tl-track", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "work": return <Briefcase size={16} className="text-[#F54DAD]" />;
      case "education": return <GraduationCap size={16} className="text-[#FF75B9]" />;
      default: return <Calendar size={16} className="text-[#79E7E5]" />;
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#FFF4FA] overflow-hidden border-t-2 border-[#F0C8DF]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* HEADER */}
        <div className="tl-head flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 max-w-4xl">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#F0C8DF] rounded-full px-3.5 py-1.5 mb-3 shadow-[2px_2px_0px_#FFE3F1]">
              <span className="w-2 h-2 rounded-full bg-[#79E7E5] border border-[#FF75B9]" />
              <span className="text-[11px] font-mono font-bold text-[#F54DAD] tracking-wider uppercase">
                CAREER & EDUCATION LOGS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#302432] tracking-tight font-sora">
              Journey & <span className="text-[#FF75B9]">Milestones</span>
            </h2>
          </div>
          <p className="text-xs font-mono font-bold text-[#806D7D] flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#F0C8DF]">
            <span className="w-2 h-2 rounded-full bg-[#63CBA8]" />
            MILESTONES: {timelineData.length} NODES VERIFIED
          </p>
        </div>

        {/* VERTICAL TRACK */}
        <div className="tl-track relative">
          {/* Continuous line */}
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-1 bg-gradient-to-b from-[#FF75B9] via-[#F54DAD] to-[#79E7E5] rounded-full" />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative md:flex items-start mb-10 md:mb-14 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Node on the line */}
                <div className="absolute left-[18px] md:left-1/2 -translate-x-1/2 top-1 z-10">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FF75B9] flex items-center justify-center shadow-[0_0_12px_rgba(245,77,173,0.3),_2px_2px_0px_#F0C8DF]">
                    {getTypeIcon(item.type)}
                  </div>
                </div>

                {/* Half-width spacer */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="tl-card pl-14 md:pl-0 md:px-8 w-full md:w-1/2">
                  <div className="bg-white border-2 border-[#F0C8DF] rounded-2xl p-6 hover:border-[#FF75B9] transition-all duration-200 shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#F54DAD] bg-[#FFE3F1] border border-[#FF75B9] px-3 py-1 rounded-lg">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#806D7D] uppercase tracking-wider">
                        NODE_0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#302432] mb-1 font-sora">
                      {item.title}
                    </h3>
                    {item.role && (
                      <p className="text-xs text-[#FF75B9] font-mono font-bold mb-3">{item.role}</p>
                    )}
                    <p className="text-xs md:text-sm text-[#806D7D] leading-relaxed mb-4 font-inter">
                      {item.description}
                    </p>
                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-2 pt-3 border-t border-[#F0C8DF]">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#302432]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF75B9] flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="omori-divider absolute bottom-0 left-0" />
    </section>
  );
};

export default ExperienceTimeline;

"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Code2, Layers, Calendar } from "lucide-react";
import Image from "next/image";
import projectsData from "../../public/data/project.json"; 

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  status: "live" | "wip" | "archive";
  featured: boolean;
  image: string;
  github: string;
  demo: string;
  year: number;
}

// Helper untuk menghitung jarak antar kartu
function calculateGap(width: number) {
  // Gap lebih besar karena kartunya juga lebih besar
  const minWidth = 768;
  const maxWidth = 1456;
  const minGap = 60; 
  const maxGap = 120; 
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/data/project.json");
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects(projectsData as Project[]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, projects.length]);

  const handleNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex, projects]);

  function getImageStyle(index: number): React.CSSProperties {
    if (!projects.length) return {};
    const gap = calculateGap(containerWidth);
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + projects.length) % projects.length === index;
    const isRight = (activeIndex + 1) % projects.length === index;

    if (isActive) {
      return {
        zIndex: 10,
        opacity: 1,
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        filter: "brightness(1) drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
        transition: "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 5,
        opacity: 0.5,
        transform: `translateX(-${gap}px) translateY(20px) scale(0.8) rotateY(10deg)`,
        filter: "brightness(0.6) grayscale(0.8)",
        transition: "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 5,
        opacity: 0.5,
        transform: `translateX(${gap}px) translateY(20px) scale(0.8) rotateY(-10deg)`,
        filter: "brightness(0.6) grayscale(0.8)",
        transition: "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.7s ease",
    };
  }

  if (loading) return <div className="h-96 flex items-center justify-center text-gray-500">Loading Projects...</div>;
  if (!projects.length) return null;

  return (
    <section className="relative py-24 bg-[#1A1A1A] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6B9FBF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#6B9FBF]">
              <Layers size={14} />
              <span className="text-[10px] font-mono tracking-widest uppercase">Featured Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Selected Projects</h2>
          </div>
          <div className="hidden md:flex gap-2">
             <button onClick={handlePrev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors"><FaArrowLeft size={18}/></button>
             <button onClick={handleNext} className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors"><FaArrowRight size={18}/></button>
          </div>
        </div>

        {/* Main Grid Layout - Adjusted for larger images */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center min-h-[600px]">
          
          {/* LEFT: Circular Carousel (Larger Area) */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-1000">
            <div ref={imageContainerRef} className="relative w-full h-full flex items-center justify-center">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  // Increased width and changed aspect ratio for bigger frame
                  className="absolute w-[300px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#222] cursor-pointer group"
                  style={getImageStyle(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === activeIndex}
                  />
                  
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
            
            {/* Mobile Controls */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 md:hidden mt-8">
               <button onClick={handlePrev} className="p-3 rounded-full bg-[#2A2A2A] border border-white/10 text-white"><FaArrowLeft /></button>
               <button onClick={handleNext} className="p-3 rounded-full bg-[#2A2A2A] border border-white/10 text-white"><FaArrowRight /></button>
            </div>
          </div>

          {/* RIGHT: Content Details */}
          <div className="flex flex-col justify-center h-full pl-0 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                    <Calendar size={12} /> {activeProject.year}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg border ${
                    activeProject.status === 'live' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-gray-500/30 text-gray-400 bg-gray-500/10'
                  }`}>
                    {activeProject.status.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <div className="text-gray-400 leading-relaxed text-lg">
                  <motion.p>
                    {(activeProject.longDesc || activeProject.shortDesc).split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.03 * i }}
                        className="inline-block mr-1.5"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code2 size={12} /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#252525] border border-white/5 rounded-lg text-xs text-gray-300 font-mono hover:border-[#6B9FBF]/50 hover:text-[#6B9FBF] transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <a 
                    href={activeProject.demo} 
                    target="_blank" 
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#6B9FBF] hover:bg-[#5a8fae] text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-[#6B9FBF]/20"
                  >
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </a>
                  <a 
                    href={activeProject.github} 
                    target="_blank" 
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    <FaGithub size={16} /> Source Code
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* OMORI Divider */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8FC5F0] via-[#F08B8B] to-[#8FC5F0] opacity-80"></div>
    </section>
  );
};

export default ProjectShowcase;
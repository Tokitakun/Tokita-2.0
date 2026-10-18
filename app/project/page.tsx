"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Code2, Layers, Calendar, Sparkles, X, Terminal, Heart } from "lucide-react";
import Image from "next/image";
import projectsData from "../../public/data/project.json";
import { ScrollProgress } from "@/Components/fx";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import Skills from "@/Components/skills";
import { useReducedMotion } from "@/lib/useReducedMotion";

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

function calculateGap(width: number) {
  const minWidth = 768;
  const maxWidth = 1456;
  const minGap = 110; 
  const maxGap = 180; 

  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;

  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

  const handleNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === "Escape") setSelectedProject(null);
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  useEffect(() => {
    if (selectedProject && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [selectedProject]);

  const activeProject = useMemo(() => {
    if (!projects.length) return null;
    return projects[activeIndex] || projects[0];
  }, [projects, activeIndex]);

  function getImageStyle(index: number) {
    if (!projects.length) return {};
    const count = projects.length;
    const diff = (index - activeIndex + count) % count;

    if (diff === 0) {
      return {
        zIndex: 30,
        opacity: 1,
        transform: "translateX(0px) translateY(0px) scale(1)",
        filter: "drop-shadow(0 15px 30px rgba(245, 77, 173, 0.25))",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    if (diff === 1) {
      const gap = calculateGap(containerWidth);
      return {
        zIndex: 20,
        opacity: 0.85,
        transform: `translateX(${gap}px) translateY(12px) scale(0.88)`,
        filter: "brightness(0.9) grayscale(0.2)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    if (diff === count - 1) {
      const gap = calculateGap(containerWidth);
      return {
        zIndex: 20,
        opacity: 0.85,
        transform: `translateX(-${gap}px) translateY(12px) scale(0.88)`,
        filter: "brightness(0.9) grayscale(0.2)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    if (diff === 2) {
      const gap = calculateGap(containerWidth) * 1.7;
      return {
        zIndex: 10,
        opacity: 0.45,
        transform: `translateX(${gap}px) translateY(24px) scale(0.74)`,
        filter: "brightness(0.8) grayscale(0.6)",
        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    if (diff === count - 2) {
      const gap = calculateGap(containerWidth) * 1.7;
      return {
        zIndex: 10,
        opacity: 0.45,
        transform: `translateX(-${gap}px) translateY(24px) scale(0.74)`,
        filter: "brightness(0.8) grayscale(0.6)",
        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none" as const,
      transform: "translateX(0px) translateY(50px) scale(0.65)",
      transition: "all 0.6s ease",
    };
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-[#F54DAD] font-mono text-sm">
        INITIALIZING_PROJECT_MODULE... ♡
      </div>
    );
  }

  if (!projects.length || !activeProject) return null;

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-[#FFF4FA] overflow-hidden border-t-2 border-[#F0C8DF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 border-b-2 border-[#F0C8DF] pb-4 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#FFE3F1]">
              <Layers size={13} className="text-[#FF75B9]" />
              <span className="tracking-widest uppercase">CARTRIDGE_COLLECTION.EXE</span>
              <span className="text-[#79E7E5]">★</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#302432] tracking-tight font-sora">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF75B9] to-[#F54DAD]">Projects</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#806D7D] mr-2">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="p-3 rounded-xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="p-3 rounded-xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Main Grid: Carousel on Left, Details on Right */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center min-h-[500px]">
          
          {/* LEFT: 3D Visual Carousel */}
          <div className="relative h-[340px] sm:h-[400px] md:h-[460px] w-full flex items-center justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-full h-full flex items-center justify-center"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="
                    absolute
                    w-[290px]
                    sm:w-[380px]
                    md:w-[460px]
                    lg:w-[500px]
                    aspect-video
                    rounded-2xl
                    overflow-hidden
                    shadow-[6px_6px_0px_#F0C8DF]
                    border-2
                    border-[#FF75B9]
                    bg-white
                    cursor-pointer
                    group
                  "
                  style={getImageStyle(index)}
                  onClick={() => { setActiveIndex(index); setSelectedProject(project); }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open details for ${project.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveIndex(index); setSelectedProject(project); } }}
                >
                  {/* Window Bar atop card */}
                  <div className="window-header px-3 py-1.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] text-[10px] font-mono font-bold text-[#F54DAD] flex items-center justify-between">
                    <span className="truncate">★ {project.title.toUpperCase().replace(/\s+/g, '_')}.APP</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                      <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                    </div>
                  </div>

                  <div className="relative w-full h-[calc(100%-28px)] bg-[#FFF8FC]">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={index === activeIndex}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Touch Controls */}
            <div className="absolute -bottom-4 left-0 w-full flex justify-center gap-3 md:hidden">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#302432] min-w-[44px] min-h-[44px] flex items-center justify-center shadow-[2px_2px_0px_#F0C8DF]"
                aria-label="Previous Project"
              >
                <FaArrowLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#302432] min-w-[44px] min-h-[44px] flex items-center justify-center shadow-[2px_2px_0px_#F0C8DF]"
                aria-label="Next Project"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT: Content Details with word reveal */}
          <div className="flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Meta Badge */}
                <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#806D7D]">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-[#F0C8DF] shadow-[1px_1px_0px_#FFE3F1]">
                    <Calendar size={12} className="text-[#F54DAD]" />
                    {activeProject.year}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold uppercase ${
                      activeProject.status === 'live'
                        ? 'border-[#FF75B9] text-[#F54DAD] bg-[#FFE3F1]'
                        : 'border-[#F0C8DF] text-[#806D7D] bg-white'
                    }`}
                  >
                    STATUS: {activeProject.status} ♡
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#302432] tracking-tight font-sora">
                  {activeProject.title}
                </h3>

                {/* Word-by-word reveal description */}
                <div className="text-[#806D7D] leading-relaxed text-sm md:text-base min-h-[80px] font-inter">
                  <motion.p>
                    {(activeProject.longDesc || activeProject.shortDesc)
                      .split(" ")
                      .map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ filter: "blur(4px)", opacity: 0 }}
                          animate={{ filter: "blur(0px)", opacity: 1 }}
                          transition={{ duration: 0.15, delay: 0.015 * i }}
                          className="inline-block mr-1.5"
                        >
                          {word}
                        </motion.span>
                      ))}
                  </motion.p>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Code2 size={12} />
                    Built With
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-[#F0C8DF] rounded-lg text-xs text-[#302432] font-mono font-semibold shadow-[1px_1px_0px_#FFE3F1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: High contrast & tactile */}
                <div className="flex gap-4 pt-2">
                  <a 
                    href={activeProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-[3px_3px_0px_#F0C8DF] active:scale-95"
                  >
                    <FaExternalLinkAlt size={13} />
                    Live Demo
                  </a>

                  <a 
                    href={activeProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] hover:border-[#FF75B9] text-[#302432] hover:text-[#F54DAD] text-xs md:text-sm font-bold rounded-xl transition-all shadow-[3px_3px_0px_#F0C8DF] active:scale-95"
                  >
                    <FaGithub size={15} />
                    Source Code
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Project Detail Window Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#302432]/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Detail project ${selectedProject.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white border-2 border-[#FF75B9] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-[8px_8px_0px_#F0C8DF] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Header */}
              <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#F54DAD]" />
                  <span className="text-xs font-mono font-bold text-[#302432] truncate max-w-[240px] sm:max-w-sm">
                    {selectedProject.title.toUpperCase().replace(/\s+/g, "_")}.APP
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 hidden sm:flex">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                  </div>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="w-5 h-5 rounded-md bg-[#F54DAD] text-white flex items-center justify-center text-xs font-bold hover:bg-[#FF75B9] transition-colors"
                    aria-label="Close project modal"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1">
                {selectedProject.image && (
                  <div className="relative w-full h-48 sm:h-64 bg-[#FFF8FC] border-b border-[#F0C8DF]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-2.5 flex-wrap text-xs font-mono font-bold text-[#806D7D]">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FFE3F1] rounded-lg border border-[#F0C8DF]">
                      <Calendar size={12} className="text-[#F54DAD]" />
                      {selectedProject.year}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg border uppercase ${
                        selectedProject.status === 'live'
                          ? 'border-[#FF75B9] text-[#F54DAD] bg-[#FFE3F1]'
                          : 'border-[#F0C8DF] text-[#806D7D] bg-white'
                      }`}
                    >
                      STATUS: {selectedProject.status} ♡
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#302432] tracking-tight mb-2 font-sora">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[#806D7D] leading-relaxed text-sm md:text-base font-inter">
                      {selectedProject.longDesc || selectedProject.shortDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Code2 size={12} />
                      Built With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#FFF4FA] border border-[#F0C8DF] rounded-lg text-xs text-[#302432] font-mono font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
                    >
                      <FaExternalLinkAlt size={13} />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] text-xs md:text-sm font-bold rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
                    >
                      <FaGithub size={15} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="omori-divider absolute bottom-0 left-0" />
    </section>
  );
};

export { ProjectShowcase };

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <div className="pt-16">
        <Skills />
        <ProjectShowcase />
      </div>
      <Footer />
    </div>
  );
}

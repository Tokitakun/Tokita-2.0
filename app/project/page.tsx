"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Code2, Layers, Calendar, X, Terminal, Cpu, Globe } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import projectsData from "../../public/data/project.json";
import { ScrollProgress } from "@/Components/fx";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import Skills from "@/Components/skills";
import { GlitchText } from "@/Components/glitch";
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
        opacity: 0.5,
        transform: `translateX(${gap}px) translateY(24px) scale(0.76)`,
        filter: "brightness(0.7) grayscale(0.5)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    if (diff === count - 2) {
      const gap = calculateGap(containerWidth) * 1.7;
      return {
        zIndex: 10,
        opacity: 0.5,
        transform: `translateX(-${gap}px) translateY(24px) scale(0.76)`,
        filter: "brightness(0.7) grayscale(0.5)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };
    }

    return {
      zIndex: 0,
      opacity: 0,
      transform: "translateX(0px) scale(0.5)",
      transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    };
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#302432] font-mono">
        <div className="w-6 h-6 border-2 border-[#FF75B9] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">LOADING_CARTRIDGES.EXE...</span>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10">
      {/* Sub-Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 border-b-2 border-[#F0C8DF] pb-4 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD]">
            <Layers size={13} className="text-[#FF75B9]" />
            <span className="tracking-widest uppercase">CARTRIDGE_COLLECTION.DIR</span>
            <span className="text-[#79E7E5] font-mono">[8]</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#302432] tracking-tight font-sora">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF75B9] to-[#F54DAD]">Creations</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#806D7D] mr-2">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="p-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
          >
            <FaArrowLeft size={13} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="p-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
          >
            <FaArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Grid: Carousel on Left, Details on Right */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center min-h-[460px]">
        {/* Carousel */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[420px] w-full flex items-center justify-center">
          <div
            ref={imageContainerRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="
                  absolute
                  w-[280px]
                  sm:w-[360px]
                  md:w-[440px]
                  lg:w-[480px]
                  aspect-video
                  rounded-2xl
                  overflow-hidden
                  shadow-[4px_4px_0px_#F0C8DF]
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveIndex(index);
                    setSelectedProject(project);
                  }
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                
                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-[#302432]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-3 py-1.5 bg-white text-[#F54DAD] text-xs font-mono font-bold rounded-lg border border-[#FF75B9] shadow-md">
                    VIEW_FILE.EXE [CLICK]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Card */}
        {activeProject && (
          <div className="relative bg-white border-2 border-[#FF75B9] rounded-2xl p-6 sm:p-7 shadow-[4px_4px_0px_#F0C8DF]">
            {/* Window title bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0C8DF]">
              <span className="text-xs font-mono font-bold text-[#F54DAD]">
                FILE_INFO: #{String(activeProject.id).padStart(2, '0')}.DAT
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-extrabold text-[#302432] font-sora mb-2">
              {activeProject.title}
            </h4>

            <p className="text-sm text-[#806D7D] font-inter leading-relaxed mb-5">
              {activeProject.shortDesc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {activeProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#FFF4FA] border border-[#F0C8DF] rounded-lg text-xs font-mono text-[#302432]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(activeProject)}
                className="flex-1 py-2.5 px-4 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95 text-center"
              >
                OPEN_DETAILS.EXE
              </button>
              {activeProject.demo && (
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] rounded-xl text-[#302432] hover:text-[#F54DAD] transition-all"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] rounded-xl text-[#302432] hover:text-[#F54DAD] transition-all"
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={15} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#302432]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] shrink-0">
                <span className="text-xs font-mono font-bold text-[#F54DAD]">
                  WINDOW://{selectedProject.title.toUpperCase().replace(/\s+/g, "_")}.EXE
                </span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-5 h-5 rounded bg-[#F54DAD] text-white flex items-center justify-center text-xs font-bold font-mono"
                  aria-label="Close dialog"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-5 bg-[#FFF8FC]">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border-2 border-[#F0C8DF]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold font-sora text-[#302432] mb-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-[#806D7D] mb-3">
                    YEAR: {selectedProject.year} | STATUS: {selectedProject.status.toUpperCase()}
                  </p>
                  <p className="text-sm font-inter text-[#806D7D] leading-relaxed">
                    {selectedProject.longDesc || selectedProject.shortDesc}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-[#302432] block mb-2">
                    TECHNOLOGIES USED:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-[#F0C8DF] rounded-lg text-xs font-mono text-[#302432]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF]"
                    >
                      <FaExternalLinkAlt size={12} />
                      RUN_DEMO.EXE
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] text-xs font-bold font-mono rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF]"
                    >
                      <FaGithub size={14} />
                      SOURCE_CODE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ProjectShowcase };

interface UnifiedWorkspaceProps {
  defaultFolder?: "projects" | "skills";
}

export function UnifiedWorkspace({ defaultFolder = "projects" }: UnifiedWorkspaceProps) {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get("folder");
  const [activeFolder, setActiveFolder] = useState<"projects" | "skills">(
    folderParam === "skills" || defaultFolder === "skills" ? "skills" : "projects"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Sync folder state when query param changes
  useEffect(() => {
    if (folderParam === "skills") {
      setActiveFolder("skills");
    } else if (folderParam === "projects") {
      setActiveFolder("projects");
    }
  }, [folderParam]);

  const switchFolder = (folder: "projects" | "skills") => {
    setActiveFolder(folder);
    const url = new URL(window.location.href);
    url.searchParams.set("folder", folder);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 pb-20">
        {/* Main Desktop Folder Window */}
        <div className="bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF] overflow-hidden">
          {/* Top Window Titlebar */}
          <div className="px-4 py-3 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#302432]">
              <span className="text-[#F54DAD]">C:\NAFIS\ARCHIVES</span>
              <span className="text-[#806D7D]">//</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-[#F0C8DF] text-[#F54DAD]">
                {activeFolder === "projects" ? <GlitchText as="span">PROJECTS.DIR</GlitchText> : <GlitchText as="span">SKILLS.DIR</GlitchText>}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#806D7D] hidden sm:inline">
                EXPLORER_v2.6
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F0C8DF]" />
              </div>
            </div>
          </div>

          {/* Desktop Folder Navigation Tabs */}
          <div className="flex items-center px-4 pt-3 border-b-2 border-[#F0C8DF] bg-[#FFF8FC] gap-2 overflow-x-auto">
            {/* PROJECTS FOLDER TAB */}
            <button
              type="button"
              onClick={() => switchFolder("projects")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeFolder === "projects"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10 shadow-[0_-2px_6px_rgba(245,77,173,0.1)]"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">
                DIR
              </span>
              <span>PROJECTS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                8
              </span>
            </button>

            {/* SKILLS FOLDER TAB */}
            <button
              type="button"
              onClick={() => switchFolder("skills")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeFolder === "skills"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10 shadow-[0_-2px_6px_rgba(245,77,173,0.1)]"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">
                DIR
              </span>
              <span>SKILLS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                24
              </span>
            </button>
          </div>

          {/* Folder Content Area */}
          <div className="p-4 sm:p-6 md:p-8 bg-white min-h-[500px]">
            {activeFolder === "projects" ? (
              <ProjectShowcase />
            ) : (
              <div className="-mt-8">
                <Skills />
              </div>
            )}
          </div>

          {/* Window Status Bar */}
          <div className="px-4 py-2 bg-[#FFE3F1] border-t-2 border-[#F0C8DF] flex items-center justify-between font-mono text-[10px] text-[#806D7D]">
            <span>DIRECTORY: C:\NAFIS\{activeFolder.toUpperCase()}</span>
            <span>STATUS: ACTIVE_FOLDER_MOUNTED</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF4FA] flex items-center justify-center font-mono text-xs text-[#302432]">
          MOUNTING_DESKTOP_WORKSPACE.EXE...
        </div>
      }
    >
      <UnifiedWorkspace defaultFolder="projects" />
    </Suspense>
  );
}

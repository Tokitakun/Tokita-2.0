"use client";

import React, { useEffect, useRef, useState, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import projectsData from "../../public/data/project.json";
import { ScrollProgress } from "@/components/layout/fx";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Skills from "@/components/sections/skills";
import { SKILLS_COUNT } from "@/components/sections/skills";
import { GlitchText } from "@/components/layout/glitch";

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

interface WindowState {
  id: number;
  project: Project;
  x: number;
  y: number;
  z: number;
}

// ─── Single floating window ───────────────────────────────────────────────────
interface ProjectWindowProps {
  win: WindowState;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  corruptionStage: number;
  isTop: boolean;
}

const ProjectWindow = ({ win, onClose, onFocus, corruptionStage, isTop }: ProjectWindowProps) => {
  const { project, z } = win;
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPos({ x: win.x, y: win.y });
  }, [win.x, win.y]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: pos.x, winY: pos.y };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = Math.max(0, Math.min(window.innerWidth - 380, dragRef.current.winX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 560, dragRef.current.winY + dy));
      setPos({ x: newX, y: newY });
    };
    const onUp = () => {
      dragRef.current = null;
      setIsDragging(false);
      onFocus(win.id);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, onFocus, win.id]);

  const availability = (s: Project["status"]) =>
    s === "live" ? "LIVE" : s === "wip" ? "WIP" : "ARCHIVE";

  const corruptionClass =
    corruptionStage >= 5
      ? "proj-win-max"
      : corruptionStage >= 4
        ? "proj-win-severe"
        : corruptionStage >= 3
          ? "proj-win-deep"
          : corruptionStage >= 2
            ? "proj-win-corrupt"
            : corruptionStage >= 1
              ? "proj-win-initial"
              : "";

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className={`proj-window absolute bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF] overflow-hidden flex flex-col
        ${isTop ? "ring-2 ring-[#FF75B9] ring-offset-1" : ""}
        ${corruptionClass}`}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: z,
        width: "min(360px, calc(100vw - 16px))",
        maxHeight: "min(520px, calc(100vh - 80px))",
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title bar */}
      <div
        className="px-3 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between shrink-0 select-none cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
      >
        <span className="text-[10px] font-mono font-bold text-[#F54DAD] truncate max-w-[220px] no-drag">
          VIEWER://{project.title.toUpperCase().replace(/\s+/g, "_")}.PNG
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
          className="w-5 h-5 rounded bg-[#F54DAD] text-white flex items-center justify-center text-xs font-bold font-mono no-drag shrink-0"
          aria-label="Close window"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto bg-[#FFF8FC] flex-1">
        <div className="relative w-full aspect-video bg-[#FFF4FA] border-b border-[#F0C8DF]">
          <Image src={project.image} alt={project.title} fill className="object-contain" sizes="360px" />
        </div>

        <div className="p-3 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-sm font-bold font-sora text-[#302432]">{project.title}</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#F0C8DF] font-mono text-[#806D7D]">{project.year}</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border bg-white text-[#63CBA8] border-[#63CBA8]/40">
              {availability(project.status)}
            </span>
          </div>

          <p className="text-[11px] font-inter text-[#806D7D] leading-relaxed">
            {project.longDesc || project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-white border border-[#F0C8DF] rounded text-[9px] font-mono text-[#302432]">{tag}</span>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-[10px] font-bold font-mono rounded-xl transition-all">
                <FaExternalLinkAlt size={10} /> RUN_DEMO.EXE
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] text-[10px] font-bold font-mono rounded-xl transition-all">
                <FaGithub size={12} /> SOURCE_CODE
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Project file list (Explorer) ─────────────────────────────────────────────
interface ProjectShowcaseProps {
  corruptionStage: number;
}

const ProjectShowcase = ({ corruptionStage }: ProjectShowcaseProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const nextIdRef = useRef(1);
  const maxZRef = useRef(100);

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

  const bringToFront = useCallback((id: number) => {
    maxZRef.current += 1;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: maxZRef.current } : w)));
    setFocusedId(id);
  }, []);

  const openProject = useCallback((project: Project) => {
    const existing = windows.find((w) => w.project.id === project.id);
    if (existing) { bringToFront(existing.id); return; }
    const id = nextIdRef.current++;
    const offset = (id % 6) * 28;
    const z = ++maxZRef.current;
    setWindows((prev) => [...prev, {
      id, project,
      x: Math.min(window.innerWidth - 380, 40 + offset),
      y: Math.min(window.innerHeight - 560, 80 + offset),
      z,
    }]);
    setFocusedId(id);
  }, [windows, bringToFront]);

  const closeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((fid) => (fid === id ? null : fid));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId !== null) closeWindow(focusedId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId, closeWindow]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#302432] font-mono">
        <div className="w-6 h-6 border-2 border-[#FF75B9] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">READING_PROJECTS.DIR...</span>
      </div>
    );
  }

  const corruptionClass =
    corruptionStage >= 5 ? "explorer-max"
    : corruptionStage >= 4 ? "explorer-severe"
    : corruptionStage >= 3 ? "explorer-deep"
    : corruptionStage >= 2 ? "explorer-corrupt"
    : corruptionStage >= 1 ? "explorer-initial" : "";

  return (
    <div className={`py-2 md:py-4 relative ${corruptionClass}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-mono font-bold text-[#806D7D]">
          {projects.length} ITEM(S) IN C:\NAFIS\ARCHIVES\PROJECTS
        </span>
        <span className="text-[10px] font-mono text-[#806D7D] hidden sm:block">
          {windows.length > 0 ? `${windows.length} WINDOW(S) OPEN // CLICK TO FOCUS` : "CLICK ROW TO OPEN PREVIEW"}
        </span>
      </div>

      <div role="list" aria-label="Project files" className="border border-[#F0C8DF] rounded-xl overflow-hidden mb-4">
        {projects.map((project) => {
          const isOpen = windows.some((w) => w.project.id === project.id);
          return (
            <button
              key={project.id}
              type="button"
              className={`w-full text-left group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-b border-[#F0C8DF] last:border-b-0 transition-all duration-100 ${
                isOpen ? "bg-[#FFE3F1] shadow-[inset_3px_0_0_#FF75B9]" : "hover:bg-[#FFF8FC] focus-visible:bg-[#FFE3F1]"
              }`}
              onClick={() => openProject(project)}
            >
              <div className="relative w-14 h-10 sm:w-20 sm:h-14 shrink-0 rounded-lg overflow-hidden border border-[#F0C8DF] bg-[#FFF4FA]">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-sora font-bold text-sm text-[#302432] truncate group-hover:text-[#F54DAD] transition-colors">
                    {project.title}
                  </span>
                  {isOpen && (
                    <span className="text-[8px] px-1 py-0.5 rounded bg-[#FF75B9] text-white font-mono font-bold shrink-0">OPEN</span>
                  )}
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#F0C8DF] font-mono font-bold text-[#806D7D] shrink-0 hidden sm:inline">
                    #{String(project.id).padStart(2, "0")}.DAT
                  </span>
                </div>
                <p className="text-xs text-[#806D7D] font-inter truncate mt-0.5">{project.shortDesc}</p>
              </div>
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  project.status === "live" ? "text-[#63CBA8] border-[#63CBA8]/40 bg-white"
                  : project.status === "wip" ? "text-[#F54DAD] border-[#F54DAD]/40 bg-white"
                  : "text-[#806D7D] border-[#F0C8DF] bg-white"
                }`}>
                  {project.status === "live" ? "LIVE" : project.status === "wip" ? "WIP" : "ARCHIVE"}
                </span>
                <span className="font-mono text-[10px] text-[#806D7D]">{project.year}</span>
                <span className="font-mono text-[9px] text-[#79E7E5] font-bold max-w-[120px] truncate">
                  {project.tags.slice(0, 2).join(" / ")}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {windows.map((win) => (
          <ProjectWindow
            key={win.id}
            win={win}
            onClose={closeWindow}
            onFocus={bringToFront}
            corruptionStage={corruptionStage}
            isTop={focusedId === win.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ProjectShowcase };

interface UnifiedWorkspaceProps {
  defaultFolder?: "projects" | "skills";
}

function useCorruptionStage(): number {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const compute = () => {
      const html = document.documentElement;
      if (!html.classList.contains("glitch-armed")) { setStage(0); return; }
      if (html.classList.contains("glitch-phase-corrupted")) { setStage(5); return; }
      if (html.classList.contains("glitch-phase-unstable")) { setStage(3); return; }
      setStage(1);
    };
    compute();
    const observer = new MutationObserver(compute);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return stage;
}

export function UnifiedWorkspace({ defaultFolder = "projects" }: UnifiedWorkspaceProps) {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get("folder");
  const [activeFolder, setActiveFolder] = useState<"projects" | "skills">(
    folderParam === "skills" || defaultFolder === "skills" ? "skills" : "projects"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (folderParam === "skills") setActiveFolder("skills");
    else if (folderParam === "projects") setActiveFolder("projects");
  }, [folderParam]);

  const switchFolder = (folder: "projects" | "skills") => {
    setActiveFolder(folder);
    const url = new URL(window.location.href);
    url.searchParams.set("folder", folder);
    window.history.replaceState({}, "", url.toString());
  };

  const corruptionStage = useCorruptionStage();

  const stageNames = ["NORMAL", "INITIAL_DISTORTION", "UNSTABLE", "DEEP_CORRUPTION", "SEVERE", "MAXIMUM"];
  const statusLabel =
    corruptionStage === 0
      ? "STATUS: ACTIVE_FOLDER_MOUNTED"
      : `CORRUPTION_STAGE: ${corruptionStage}/5 — ${stageNames[corruptionStage]}`;

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 pb-20">
        <div className="bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF] overflow-hidden">
          <div className="px-4 py-3 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#302432]">
              <span className="text-[#F54DAD]">C:\NAFIS\ARCHIVES</span>
              <span className="text-[#806D7D]">//</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-[#F0C8DF] text-[#F54DAD]">
                {activeFolder === "projects" ? <GlitchText as="span">PROJECTS.DIR</GlitchText> : <GlitchText as="span">SKILLS.DIR</GlitchText>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#806D7D] hidden sm:inline">EXPLORER_v2.6</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F0C8DF]" />
              </div>
            </div>
          </div>

          <div className="flex items-center px-4 pt-3 border-b-2 border-[#F0C8DF] bg-[#FFF8FC] gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => switchFolder("projects")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeFolder === "projects"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">DIR</span>
              <span>PROJECTS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                {projectsData.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchFolder("skills")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeFolder === "skills"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">DIR</span>
              <span>SKILLS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                {SKILLS_COUNT}
              </span>
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-white min-h-[500px] relative">
            {activeFolder === "projects" ? (
              <ProjectShowcase corruptionStage={corruptionStage} />
            ) : (
              <div className="-mt-8"><Skills /></div>
            )}
          </div>

          <div className="px-4 py-2 bg-[#FFE3F1] border-t-2 border-[#F0C8DF] flex items-center justify-between font-mono text-[10px] text-[#806D7D]">
            <span>DIRECTORY: C:\NAFIS\{activeFolder.toUpperCase()}</span>
            <span>{statusLabel}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFF4FA] flex items-center justify-center font-mono text-xs text-[#302432]">
        MOUNTING_DESKTOP_WORKSPACE.EXE...
      </div>
    }>
      <UnifiedWorkspace defaultFolder="projects" />
    </Suspense>
  );
}

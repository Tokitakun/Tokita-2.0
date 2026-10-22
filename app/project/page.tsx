"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import projectsData from "../../public/data/project.json";
import { ScrollProgress } from "@/components/layout/fx";
import Footer from "@/components/layout/footer";
import Skills from "@/components/sections/skills";
import { SKILLS_COUNT } from "@/components/sections/skills";
import { GlitchText } from "@/components/layout/glitch";
import ProjectDetail from "@/components/project-detail";
import type { Project } from "@/components/project-types";

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

const ProjectShowcase = ({ corruptionStage }: { corruptionStage: number }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const selected = projects.find((p) => p.id === selectedId) ?? null;

  const corruptionClass =
    corruptionStage >= 5 ? "explorer-max"
    : corruptionStage >= 4 ? "explorer-severe"
    : corruptionStage >= 3 ? "explorer-deep"
    : corruptionStage >= 2 ? "explorer-corrupt"
    : corruptionStage >= 1 ? "explorer-initial" : "";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-[#302432] font-mono">
        <div className="w-6 h-6 border-2 border-[#FF75B9] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">READING_PROJECTS.DIR...</span>
      </div>
    );
  }

  const showcase = projects[0];
  const rest = projects.slice(1);

  return (
    <div className={`relative py-2 md:py-4 ${corruptionClass}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-mono font-bold text-[#806D7D]">
          {projects.length} ITEM(S) IN C:\NAFIS\ARCHIVES\PROJECTS
        </span>
        <span className="text-[10px] font-mono text-[#806D7D] hidden sm:block">
          SELECT A PROJECT TO OPEN ITS CASE STUDY
        </span>
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={`detail-${selected.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="explorer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showcase && (
              <button
                type="button"
                onClick={() => setSelectedId(showcase.id)}
                className="w-full text-left group border-2 border-[#FF75B9] rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0px_#F0C8DF] hover:shadow-[8px_8px_0px_#F54DAD] transition-all duration-200 hover:-translate-y-1 mb-6"
                aria-label={`Open case study: ${showcase.title}`}
              >
                <div className="relative w-full aspect-video sm:aspect-[21/9] bg-white">
                  <Image
                    src={showcase.image}
                    alt={showcase.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 border-t-2 border-[#FFE3F1]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F54DAD] text-white uppercase tracking-widest">
                        FEATURED
                      </span>
                      <span className="text-[9px] font-mono text-[#806D7D]">
                        #{String(showcase.id).padStart(2, "0")}.DAT // {showcase.year}
                      </span>
                    </div>
                    <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-[#302432] group-hover:text-[#F54DAD] transition-colors truncate">
                      {showcase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#806D7D] font-inter leading-relaxed mt-1 line-clamp-2">
                      {showcase.longDesc}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF75B9] text-white text-xs font-bold font-mono">
                    OPEN CASE STUDY <span aria-hidden="true">▸</span>
                  </span>
                </div>
              </button>
            )}

            <div role="list" aria-label="Project files" className="border-2 border-[#F0C8DF] rounded-xl overflow-hidden bg-white">
              {rest.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className="w-full text-left group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3.5 border-b border-[#F0C8DF] last:border-b-0 transition-all duration-100 hover:bg-[#FFF8FC] focus-visible:bg-[#FFE3F1]"
                >
                  <div className="relative w-16 h-12 sm:w-24 sm:h-16 shrink-0 rounded-lg overflow-hidden border border-[#F0C8DF] bg-[#FFF4FA]">
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sora font-bold text-sm text-[#302432] truncate group-hover:text-[#F54DAD] transition-colors">
                        {project.title}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#F0C8DF] font-mono font-bold text-[#806D7D] shrink-0 hidden sm:inline">
                        #{String(project.id).padStart(2, "0")}.DAT
                      </span>
                    </div>
                    <p className="text-xs text-[#806D7D] font-inter truncate mt-0.5">{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5 sm:hidden">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-white border border-[#F0C8DF] rounded text-[8px] font-mono text-[#806D7D]">
                          {tag}
                        </span>
                      ))}
                    </div>
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
                  <span aria-hidden="true" className="text-[#F54DAD] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    ▸
                  </span>
                </button>
              ))}
            </div>
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
      : `CORRUPTION_STAGE: ${corruptionStage}/5 - ${stageNames[corruptionStage]}`;

  return (
    <div className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />

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
              <span className="text-[10px] font-mono text-[#806D7D] hidden sm:inline">EXPLORER_v2.7</span>
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
              <Skills embedded />
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


"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "./project-types";

export default function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const availability = (s: Project["status"]) =>
    s === "live" ? "LIVE" : s === "wip" ? "WIP" : "ARCHIVE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <article className="overflow-hidden bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF]">
        <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs font-bold text-[#F54DAD] hover:text-[#302432] transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>BACK TO PROJECTS</span>
          </button>
          <span className="hidden sm:block text-[10px] font-mono font-bold text-[#806D7D] truncate max-w-[260px]">
            CASE_STUDY://{project.title.toUpperCase().replace(/\s+/g, "_")}
          </span>
        </div>

        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-white border-b-2 border-[#F0C8DF]">
          <Image src={project.image} alt={project.title} fill className="object-contain" sizes="(max-width: 1280px) 100vw, 1280px" priority />
        </div>

        <div className="p-5 sm:p-8 bg-[#FFF8FC] grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-6">
            <div>
              <p className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-1">
                ID // PROJECT
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#302432] leading-tight">
                {project.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-1 rounded border ${
                    project.status === "live"
                      ? "text-[#63CBA8] border-[#63CBA8]/40 bg-white"
                      : project.status === "wip"
                        ? "text-[#F54DAD] border-[#F54DAD]/40 bg-white"
                        : "text-[#806D7D] border-[#F0C8DF] bg-white"
                  }`}
                >
                  {availability(project.status)}
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-1 rounded border border-[#F0C8DF] bg-white text-[#806D7D]">
                  {project.year}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2">
                // TECH STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white border border-[#F0C8DF] rounded text-[10px] font-mono text-[#302432]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.github || project.demo) && (
              <div className="flex flex-col gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#F0C8DF] transition-colors"
                  >
                    <FaExternalLinkAlt size={13} />
                    RUN DEMO
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#FFE3F1] transition-colors"
                  >
                    <FaGithub size={14} />
                    SOURCE CODE
                  </a>
                )}
              </div>
            )}
          </aside>

          <div className="lg:col-span-8 space-y-6">
            <div>
              <p className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2">
                // SYNOPSIS
              </p>
              <p className="text-sm font-mono font-semibold text-[#302432] leading-relaxed">
                {project.shortDesc}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2">
                // OVERVIEW
              </p>
              <p className="text-sm md:text-base font-inter text-[#302432] leading-relaxed">
                {project.longDesc}
              </p>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

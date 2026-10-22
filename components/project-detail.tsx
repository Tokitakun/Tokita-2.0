"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "./project-types";

// Scene section with retro VN label
function SceneSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-mono font-bold text-[#F54DAD] uppercase tracking-wider mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const statusLabel =
    project.status === "live"
      ? "LIVE"
      : project.status === "wip"
        ? "WIP"
        : "ARCHIVE";

  const statusColor =
    project.status === "live"
      ? { text: "#63CBA8", border: "rgba(99,203,168,0.4)" }
      : project.status === "wip"
        ? { text: "#F54DAD", border: "rgba(245,77,173,0.4)" }
        : { text: "#806D7D", border: "#F0C8DF" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <article className="overflow-hidden bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[6px_6px_0px_#F0C8DF]">
        {/* Window title bar */}
        <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 font-mono text-xs font-bold text-[#F54DAD] hover:text-[#302432] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>BACK TO PROJECTS</span>
            </button>
            <span className="text-[#806D7D] text-xs">/</span>
            <span className="hidden sm:block text-[10px] font-mono font-bold text-[#806D7D] truncate max-w-[260px]">
              CASE_STUDY://{project.title.toUpperCase().replace(/\s+/g, "_")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0C8DF]" />
          </div>
        </div>

        {/* VN Scene header bar */}
        <div className="px-4 py-2 bg-[#302432] border-b-2 border-[#F0C8DF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-bold text-[#A993FF] uppercase tracking-widest">
              // SCENE_LOADED
            </span>
            <span className="font-mono text-[10px] font-bold text-[#FF75B9]">
              {project.title.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border"
              style={{ color: statusColor.text, borderColor: statusColor.border, background: "rgba(255,255,255,0.05)" }}
            >
              {statusLabel}
            </span>
            <span className="font-mono text-[10px] text-[#806D7D]">
              {project.year}
            </span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-white border-b-2 border-[#F0C8DF]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Content grid */}
        <div className="p-5 sm:p-8 bg-[#FFF8FC] grid lg:grid-cols-12 gap-8">
          {/* Sidebar: identity + links */}
          <aside className="lg:col-span-4 space-y-6">
            <SceneSection label="// ID — PROJECT">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#302432] leading-tight">
                {project.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-1 rounded border bg-white"
                  style={{ color: statusColor.text, borderColor: statusColor.border }}
                >
                  {statusLabel}
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-1 rounded border border-[#F0C8DF] bg-white text-[#806D7D]">
                  {project.year}
                </span>
              </div>
            </SceneSection>

            <SceneSection label="// TECH_STACK">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white border border-[#F0C8DF] rounded text-[10px] font-mono text-[#302432] hover:border-[#FF75B9] hover:text-[#F54DAD] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SceneSection>

            {(project.github || project.demo) && (
              <div className="flex flex-col gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#F0C8DF] transition-colors active:scale-95"
                    style={{ minHeight: "44px" }}
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
                    className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] text-xs font-bold font-mono rounded-xl shadow-[3px_3px_0px_#FFE3F1] transition-colors active:scale-95"
                    style={{ minHeight: "44px" }}
                  >
                    <FaGithub size={14} />
                    SOURCE CODE
                  </a>
                )}
              </div>
            )}
          </aside>

          {/* Main: narrative content */}
          <div className="lg:col-span-8 space-y-7">
            <SceneSection label="// SYNOPSIS">
              <p className="text-sm font-mono font-semibold text-[#302432] leading-relaxed">
                {project.shortDesc}
              </p>
            </SceneSection>

            <SceneSection label="// OVERVIEW — KONTEKS & TUJUAN">
              <p className="text-sm md:text-base font-inter text-[#302432] leading-relaxed">
                {project.longDesc}
              </p>
            </SceneSection>

            {/* VN dialogue box: scene framing */}
            <div className="bg-white border-2 border-[#F0C8DF] rounded-xl p-4 shadow-[2px_2px_0px_#FFE3F1]">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF75B9] text-white">
                  MASCOT // NAFIS.EXE
                </span>
                <span className="text-[9px] font-mono text-[#806D7D] px-2 py-0.5 rounded border border-[#F0C8DF] bg-[#FFF4FA]">
                  #DEVELOPER_NOTE
                </span>
              </div>
              <p className="text-sm font-inter text-[#302432] leading-relaxed">
                {project.status === "live"
                  ? `${project.title} sedang aktif dan dapat diakses secara publik. Teknologi yang digunakan mencakup ${project.tags.slice(0, 3).join(", ")}${project.tags.length > 3 ? ", dan lainnya" : ""}. Cek demo langsung atau lihat source code-nya di GitHub!`
                  : project.status === "wip"
                    ? `${project.title} sedang dalam pengembangan aktif. Stack saat ini: ${project.tags.slice(0, 3).join(", ")}. Pantau repositori GitHub untuk pembaruan terbaru.`
                    : `${project.title} adalah proyek arsip yang menandai perjalanan awal pengembangan. Dibangun dengan ${project.tags.slice(0, 2).join(" dan ")}, dan tetap tersedia sebagai referensi publik.`
                }
              </p>
            </div>

            {/* System metadata footer */}
            <div className="pt-4 border-t-2 border-[#F0C8DF] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#806D7D]">
              <span>FILE: #{String(project.id).padStart(2, "0")}.DAT</span>
              <span>YEAR: {project.year}</span>
              <span>TAGS: {project.tags.length} ENTRIES</span>
              <span
                className="font-bold"
                style={{ color: statusColor.text }}
              >
                STATUS: {statusLabel}
              </span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

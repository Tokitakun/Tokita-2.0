"use client";

import { Suspense } from "react";
import { UnifiedWorkspace } from "@/app/project/page";

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF4FA] flex items-center justify-center font-mono text-xs text-[#302432]">
          MOUNTING_DESKTOP_WORKSPACE.EXE...
        </div>
      }
    >
      <UnifiedWorkspace defaultFolder="skills" />
    </Suspense>
  );
}
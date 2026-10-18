"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SiMyanimelist, SiRobloxstudio } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { PiGameControllerDuotone } from "react-icons/pi";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function OrbitPlanet({ className = "" }: { className?: string }) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !orbitRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(orbitRef.current, { rotate: 360, duration: 32, repeat: -1, ease: "linear" });
    }, orbitRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={orbitRef} className={`absolute inset-0 z-10 pointer-events-none ${className}`}>
      <div className="absolute inset-[-30px] border-2 border-dashed border-[#F0C8DF] rounded-full" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 bg-white p-2.5 rounded-xl border-2 border-[#FF75B9] shadow-[2px_2px_0px_#F0C8DF] text-[#F54DAD]">
        <SiMyanimelist className="text-2xl" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5 bg-white p-2.5 rounded-xl border-2 border-[#79E7E5] shadow-[2px_2px_0px_#F0C8DF] text-[#00B8D9]">
        <FaReact className="text-2xl" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white p-2.5 rounded-xl border-2 border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF] text-[#FF75B9]">
        <PiGameControllerDuotone className="text-2xl" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white p-2.5 rounded-xl border-2 border-[#A993FF] shadow-[2px_2px_0px_#F0C8DF] text-[#A993FF]">
        <SiRobloxstudio className="text-2xl" />
      </div>
    </div>
  );
}

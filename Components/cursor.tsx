"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on desktop (fine pointer) without reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
      setIsVisible(true);
      document.body.classList.add("custom-cursor-active");
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.14,
        ease: "power2.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => setIsHovering(false);
    const onMouseDown = () => setIsDragging(true);
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    if (isHovering) {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        backgroundColor: "#F54DAD",
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(followerRef.current, {
        scale: 1.7,
        borderColor: "#F54DAD",
        backgroundColor: "rgba(255, 117, 185, 0.15)",
        duration: 0.15,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#FF75B9",
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(followerRef.current, {
        scale: 1,
        borderColor: "#FF75B9",
        backgroundColor: "transparent",
        duration: 0.15,
        ease: "power2.out",
      });
    }

    if (isDragging) {
      gsap.to([cursorRef.current, followerRef.current], {
        scale: 0.85,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  }, [isHovering, isDragging]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full 
          bg-[#FF75B9] pointer-events-none z-[9999] 
          -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(255,117,185,0.7)]"
      />

      {/* Follower circle */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-7 h-7 rounded-full border-2 border-[#FF75B9]/70 
          pointer-events-none z-[9998] 
          -translate-x-1/2 -translate-y-1/2 transition-colors duration-150"
      />
    </>
  );
}
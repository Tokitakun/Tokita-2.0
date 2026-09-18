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
    // ✅ Only activate on desktop (fine pointer)
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      // Main cursor: instant follow
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Follower cursor: smooth delay follow
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    // ✅ Hover effect: scale + color change
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => setIsHovering(false);

    // ✅ Click effect: shrink
    const onMouseDown = () => setIsDragging(true);
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // ✅ Animate cursor states
  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    // Hover state
    gsap.to([cursorRef.current, followerRef.current], {
      scale: isHovering ? 1.5 : 1,
      backgroundColor: isHovering ? "var(--sky-blue-dark)" : "var(--sky-blue)",
      duration: 0.2,
      ease: "power2.out",
    });

    // Click state
    gsap.to([cursorRef.current, followerRef.current], {
      scale: isDragging ? 0.8 : isHovering ? 1.5 : 1,
      duration: 0.1,
      ease: "power2.out",
    });
  }, [isHovering, isDragging]);

  // ✅ Don't render on mobile/touch
  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full 
          bg-[var(--sky-blue)] pointer-events-none z-[9999] 
          translate-x-[-50%] translate-y-[-50%]"
      />

      {/* Follower circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 
          border-[var(--sky-blue)] pointer-events-none z-[9998] 
          translate-x-[-50%] translate-y-[-50%] opacity-70"
      />
    </>
  );
}
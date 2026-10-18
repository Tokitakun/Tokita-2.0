"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Home, Heart, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const NavbarBlog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
        );
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b-2 border-[#F0C8DF] shadow-[0_6px_20px_rgba(245,77,173,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5">
        <div className="flex justify-between items-center">
          
          {/* Logo / Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group px-2 py-1 rounded-xl hover:bg-[#FFE3F1] transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#79E7E5] border border-[#FF75B9] shadow-[0_0_8px_#79E7E5] animate-pulse" />
            <span className="text-base font-extrabold text-[#302432] group-hover:text-[#F54DAD] transition-colors font-sora">
              NAFIS<span className="text-[#FF75B9]">.EXE</span>{" "}
              <span className="text-[#806D7D] font-mono text-xs font-normal">// Stories ♡</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3 text-xs font-mono font-bold">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[#302432] hover:text-[#F54DAD] transition-colors px-3 py-1.5 rounded-xl border border-transparent hover:border-[#F0C8DF] hover:bg-[#FFE3F1]"
            >
              <Home size={14} className="text-[#FF75B9]" />
              <span>Desktop Home</span>
            </Link>
            
            <div className="flex items-center gap-1.5 text-[#F54DAD] bg-[#FFE3F1] px-3.5 py-1.5 rounded-xl border border-[#FF75B9] shadow-[2px_2px_0px_#F0C8DF]">
              <BookOpen size={14} />
              <span>Cerita Fiksi & Logs</span>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-3 bg-white border-2 border-[#FF75B9] rounded-2xl p-4 space-y-2 shadow-[0_16px_36px_rgba(245,77,173,0.2)]"
          >
            <div className="window-header -mx-4 -mt-4 mb-3 px-4 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#F54DAD]">★ STORIES_MENU.EXE</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-4 h-4 rounded bg-[#F54DAD] text-white flex items-center justify-center text-[10px] font-bold"
              >
                ×
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#302432] hover:text-[#F54DAD] transition-colors py-2.5 px-3 rounded-xl bg-white border border-[#F0C8DF] hover:bg-[#FFE3F1] min-h-[44px]"
            >
              <Home size={16} className="text-[#FF75B9]" />
              <span className="font-bold text-sm font-sora">Desktop Home</span>
            </Link>
            
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#F54DAD] py-2.5 px-3 rounded-xl bg-[#FFE3F1] border border-[#FF75B9] min-h-[44px]"
            >
              <BookOpen size={16} />
              <span className="font-bold text-sm font-sora">Cerita Fiksi & Logs</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarBlog;
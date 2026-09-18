"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Home } from "lucide-react";
import { gsap } from "gsap";

const NavbarBlog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
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
          ? "bg-black/90 backdrop-blur-md border-b border-[#3a2a2a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => sessionStorage.setItem('returnFromBlog', 'true')}
            className="text-2xl font-bold text-white hover:text-[#5f3a4a] transition-colors"
          >
            Nafeez
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              onClick={() => sessionStorage.setItem('returnFromBlog', 'true')}
              className="relative flex items-center gap-2 text-gray-400 hover:text-[#5f3a4a] transition-colors group"
            >
              <Home size={18} />
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#5f3a4a] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[#5f3a4a] border-b border-[#5f3a4a] pb-1"
            >
              <BookOpen size={18} />
              <span>Cerita Maria</span>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-[#5f3a4a] transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-4 bg-black/90 backdrop-blur-md border border-[#3a2a2a] rounded-xl p-4 space-y-4"
          >
            <Link
              href="/"
              onClick={() => {
                sessionStorage.setItem('returnFromBlog', 'true');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-[#5f3a4a] transition-colors py-2"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#5f3a4a] py-2 border-t border-[#3a2a2a] pt-4"
            >
              <BookOpen size={18} />
              <span>Cerita Maria</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarBlog;
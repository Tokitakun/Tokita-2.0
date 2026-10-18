"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Heart, Terminal, FolderGit2, Award, BookOpen, Mail } from "lucide-react";
import { gsap } from "gsap";

interface MenuItem {
  name: string;
  href: string;
  icon?: string;
  badge?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [sysTime, setSysTime] = useState<string>("12:00");
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "About", href: "/about", icon: "♡" },
    { name: "Skills", href: "/#skills", icon: "✦" },
    { name: "Projects", href: "/project", icon: "📁" },
    { name: "Certs", href: "/serti", icon: "🏆" },
    { name: "Stories", href: "/blog", icon: "📝", badge: "LOG" },
    { name: "Contact", href: "/#contact", icon: "✉" },
  ];

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = String(d.getHours()).padStart(2, "0");
      const mins = String(d.getMinutes()).padStart(2, "0");
      setSysTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="NAFIS.EXE Main Navigation"
      className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 flex items-center justify-center">
        {/* Kawaii Cyber Desktop Taskbar */}
        <header
          className={`pointer-events-auto flex h-14 max-w-fit items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 rounded-2xl border-2 transition-all duration-200 ${scrolled
            ? "bg-[#FFFFFF]/95 border-[#FF75B9] shadow-[0_8px_24px_rgba(245,77,173,0.18),_3px_3px_0px_#F0C8DF]"
            : "bg-[#FFFFFF]/90 border-[#F0C8DF] shadow-[0_6px_20px_rgba(245,77,173,0.1),_2px_2px_0px_#FFE3F1]"
            } backdrop-blur-md`}
        >
          {/* Brand Badge / Start Menu */}
          <Link
            href="/"
            className="flex items-center gap-2 group px-2 py-1 select-none rounded-xl hover:bg-[#FFE3F1] transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#79E7E5] border border-[#FF75B9] shadow-[0_0_8px_#79E7E5] animate-pulse" />
            <div className="flex items-center gap-1">
              <span className="font-extrabold font-sora text-sm sm:text-base tracking-tight text-[#302432] group-hover:text-[#F54DAD] transition-colors">
                NAFIS<span className="text-[#FF75B9]">.EXE</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF] hidden sm:inline-block">
                v2.6
              </span>
            </div>
          </Link>

          {/* Separator */}
          <div className="w-0.5 h-5 bg-[#F0C8DF] hidden md:block" />

          {/* Desktop Menu Tabs */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-1.5 text-xs font-mono">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 2);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`relative px-3 py-1.5 rounded-xl transition-all duration-150 flex items-center gap-1.5 font-medium border ${isActive
                        ? "bg-[#FF75B9] text-white border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF]"
                        : "bg-[#FFF4FA] text-[#302432] border-transparent hover:border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#F54DAD]"
                        }`}
                    >
                      <span className="text-xs">{item.icon}</span>
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#79E7E5] text-[#302432] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop Status Tray */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l-2 border-[#F0C8DF] text-[11px] font-mono">
            <div className="flex items-center gap-1 bg-[#FFE3F1] px-2 py-1 rounded-lg border border-[#F0C8DF] text-[#302432]">
              <span className="text-[#FF75B9]">♡</span>
              <span>READY</span>
            </div>
            <div className="bg-[#FFF4FA] px-2 py-1 rounded-lg border border-[#F0C8DF] text-[#806D7D] font-bold">
              {sysTime}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] hover:border-[#FF75B9] transition-all"
            aria-label={isOpen ? "Close desktop menu" : "Open desktop menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        {/* Mobile Window Drawer */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="pointer-events-auto fixed inset-x-4 top-20 z-50 md:hidden kawaii-window shadow-[0_20px_40px_rgba(245,77,173,0.25)] border-2 border-[#FF75B9] bg-white rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Retro Window Header */}
            <div className="window-header flex items-center justify-between px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#F54DAD] flex items-center gap-1">
                  <span>★</span> NAFIS.EXE // MENU
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-4 h-4 rounded bg-[#F54DAD] text-white flex items-center justify-center text-[10px] font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Menu List */}
            <div className="p-4 space-y-2 bg-[#FFF8FC]">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] text-[#302432] hover:text-[#F54DAD] font-mono text-sm transition-all shadow-[2px_2px_0px_#F0C8DF]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base text-[#FF75B9]">{item.icon}</span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#79E7E5] text-[#302432]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-[#F0C8DF] flex items-center justify-between text-xs font-mono text-[#806D7D]">
                <span>STATUS: ONLINE ♡</span>
                <span>SYS TIME: {sysTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
<<<<<<< HEAD:Components/Navbar.tsx
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
=======
import { Menu, X, BookOpen, FolderLock, Users } from "lucide-react"; // Tambah icon FolderLock & Users
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/layout/navbar.tsx
import { gsap } from "gsap";
import { CorruptStatus } from "@/Components/glitch";

interface NavEntry {
  name: string;
  tag: string;
  href: string;
  matchPrefix?: string;
  folderQuery?: string;
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sysTime, setSysTime] = useState<string>("12:00");
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

<<<<<<< HEAD:Components/Navbar.tsx
  const currentFolder = searchParams.get("folder") || (pathname === "/skills" ? "skills" : "projects");

  const navEntries: NavEntry[] = [
    { name: "About", tag: "USR", href: "/about" },
    { name: "Timeline", tag: "TL", href: "/timeline" },
    { name: "Projects", tag: "DIR", href: "/project?folder=projects", matchPrefix: "/project", folderQuery: "projects" },
    { name: "Skills", tag: "SYS", href: "/project?folder=skills", matchPrefix: "/skills", folderQuery: "skills" },
    { name: "Certs", tag: "CRT", href: "/serti" },
    { name: "Stories", tag: "LOG", href: "/blog" },
    { name: "Contact", tag: "MSG", href: "/contact" },
=======
  // Menu Items
  const menuItems: MenuItem[] = [
    { name: "Education", to: "education" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
    { 
      name: "Connect", 
      to: "connect", 
      isPage: true, 
      href: "/connect", 
    },
    // Highlighted Item
    { 
      name: "ARCHIVES", 
      to: "blog", 
      isPage: true, 
      href: "/blog", 
      isHighlight: true 
    },
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/layout/navbar.tsx
  ];

  // Live retro clock
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
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, []);

  // Close mobile drawer on route change or Escape
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const isItemActive = (item: NavEntry): boolean => {
    if (pathname === "/project" || pathname === "/skills") {
      if (item.folderQuery) {
        return currentFolder === item.folderQuery;
      }
    }
    if (item.href.startsWith("/project")) {
      return pathname === "/project" && (!item.folderQuery || currentFolder === item.folderQuery);
    }
    if (item.matchPrefix) {
      return pathname.startsWith(item.matchPrefix);
    }
    return pathname === item.href;
  };

  return (
<<<<<<< HEAD:Components/Navbar.tsx
    <>
      {/* DESKTOP LEFT TASKBAR (md and up) */}
      <aside
        ref={navRef}
        aria-label="Desktop Taskbar Navigation"
        className="hidden md:flex fixed left-3 lg:left-4 top-4 bottom-4 w-16 lg:w-44 z-50 flex-col justify-between bg-white/95 border-2 border-[#FF75B9] rounded-2xl shadow-[4px_4px_0px_#F0C8DF,0_12px_28px_rgba(245,77,173,0.14)] backdrop-blur-md p-2 select-none overflow-hidden transition-all duration-200"
      >
        {/* Top: Window Header & Start Button */}
        <div className="flex flex-col gap-2">
          {/* Retro Window Grip Titlebar */}
          <div className="flex items-center justify-between px-1.5 py-1 bg-[#FFE3F1] border border-[#F0C8DF] rounded-lg">
            <span className="text-[10px] font-mono font-bold text-[#F54DAD] tracking-tight truncate hidden lg:inline">
              SYS://NAV
            </span>
            <div className="flex items-center gap-1 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
              <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
              <span className="w-2 h-2 rounded-full bg-[#F0C8DF]" />
=======
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none`}
    >
      {/* Container dengan pointer-events-auto agar bisa diklik */}
      <div className="mx-auto flex h-12 max-w-fit items-center justify-center gap-2 px-4 sm:px-6 mt-3 rounded-full shadow-md border border-[#3A3A3A] bg-[#232323]/90 backdrop-blur-md pointer-events-auto">
        
        {/* Logo */}
        <ScrollLink
          to="hero"
          smooth
          duration={500}
          className="flex items-center gap-1 text-lg text-gray-200 cursor-pointer shrink-0 hover:text-sky-400 transition-colors px-2"
        >
          <svg
            className="size-5 text-sky-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9l3 3l-3 3" />
            <path d="M13 15l3 0" />
            <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" />
          </svg>
          <span className="font-semibold text-white">Nafeez</span>
        </ScrollLink>

        {/* Separator */}
        <div className="w-px h-5 bg-[#3A3A3A] mx-1"></div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center justify-center gap-1 text-sm">
              {menuItems.map((item) =>
                item.isPage ? (
                  <li key={item.to}>
                    <Link
                      href={item.href || "#"}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 font-medium
                        ${item.isHighlight 
                          ? "bg-[#4A6B7F]/20 text-[#8FC5F0] border border-[#4A6B7F]/40 hover:bg-[#4A6B7F]/30" 
                          : "text-gray-300 hover:text-sky-400 hover:bg-white/5"
                        }
                      `}
                    >
                      {item.isHighlight ? (
                        <FolderLock size={14} className="text-sky-400" />
                      ) : item.name === "Connect" ? (
                        <Users size={14} className="text-sky-400" />
                      ) : (
                        item.name === "ARCHIVES" && <BookOpen size={14} className="text-sky-400" />
                      )}
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={item.to}>
                    <ScrollLink
                      to={item.to}
                      smooth
                      duration={500}
                      spy
                      offset={-80}
                      activeClass="text-sky-400 font-medium"
                      className="cursor-pointer px-2.5 py-1.5 text-gray-300 transition hover:text-sky-400 rounded-lg hover:bg-white/5"
                    >
                      {item.name}
                    </ScrollLink>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-5 bg-[#3A3A3A] mx-1"></div>

        {/* Avatar / Profile Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <div className="shrink-0 cursor-pointer group">
            <div className="h-8 w-8 rounded-full bg-[#4A6B7F] flex items-center justify-center text-white font-semibold text-sm shadow-sm transition-all">
              N
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/layout/navbar.tsx
            </div>
          </div>

          {/* Start / Home Button */}
          <Link
            href="/"
            title="Start Menu / Homepage"
            className={`group relative flex items-center justify-center lg:justify-start gap-2 p-2 rounded-xl border-2 transition-all duration-150 ${
              pathname === "/"
                ? "bg-[#FF75B9] text-white border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF]"
                : "bg-[#FFF8FC] text-[#302432] border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1]"
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#79E7E5] border border-[#302432] shadow-[0_0_6px_#79E7E5] shrink-0 animate-pulse" />
            <div className="hidden lg:flex flex-col leading-none">
              <span className="font-sora font-extrabold text-xs tracking-tight">
                NAFIS<span className={pathname === "/" ? "text-white" : "text-[#FF75B9]"}>.EXE</span>
              </span>
              <span className={`text-[9px] font-mono font-semibold ${pathname === "/" ? "text-pink-100" : "text-[#806D7D]"}`}>
                v2.6 OS
              </span>
            </div>
          </Link>
        </div>

<<<<<<< HEAD:Components/Navbar.tsx
        {/* Middle: Navigation Items Stack */}
        <nav aria-label="Desktop navigation list" className="my-auto py-2">
          <ul className="flex flex-col gap-1.5">
            {navEntries.map((item) => {
              const active = isItemActive(item);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    title={`${item.name} (${item.tag})`}
                    className={`relative flex items-center justify-center lg:justify-start gap-2 px-2 py-2 rounded-xl font-mono text-xs transition-all duration-150 border ${
                      active
                        ? "bg-[#FF75B9] text-white border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF] font-bold"
                        : "bg-[#FFF8FC] text-[#302432] border-[#F0C8DF] hover:border-[#FF75B9] hover:bg-[#FFE3F1] hover:text-[#F54DAD]"
                    }`}
                  >
                    {/* Active desktop marker indicator */}
                    {active && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 rounded-sm bg-[#79E7E5] hidden lg:block" />
                    )}

                    {/* Tag badge */}
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                        active
                          ? "bg-[#F54DAD] text-white border-white/40"
                          : "bg-white text-[#806D7D] border-[#F0C8DF] group-hover:text-[#F54DAD]"
                      }`}
                    >
                      {item.tag}
                    </span>

                    {/* Label (visible on lg screens) */}
                    <span className="hidden lg:inline truncate tracking-tight font-medium pl-0.5">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: Desktop System Tray */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F0C8DF]">
          <div className="flex items-center justify-center lg:justify-between px-1.5 py-1 bg-[#FFF4FA] rounded-lg border border-[#F0C8DF] text-[10px] font-mono">
            <span className="hidden lg:inline text-[#806D7D] font-bold">STATUS</span>
            <CorruptStatus okText="OK" className="font-extrabold tracking-wider" />
          </div>

          <div className="flex items-center justify-center px-1.5 py-1 bg-white rounded-lg border border-[#F0C8DF] text-[10px] font-mono font-bold text-[#302432] shadow-sm">
            <span>{sysTime}</span>
=======
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden rounded-full bg-white/5 p-1.5 text-gray-300 transition hover:bg-white/10"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm bg-[#232323]/95 backdrop-blur-xl rounded-2xl border border-[#3A3A3A] shadow-xl z-40 overflow-hidden"
        >
          <div className="flex flex-col space-y-1 px-4 py-4">
            {menuItems.map((item) =>
              item.isPage ? (
                <Link
                  key={item.to}
                  href={item.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium
                    ${item.isHighlight
                      ? "bg-[#4A6B7F]/20 text-[#8FC5F0] border border-[#4A6B7F]/40"
                      : "text-gray-200 hover:text-sky-400 hover:bg-white/5"
                    }
                  `}
                >
                  {item.isHighlight ? (
                    <FolderLock size={18} className="text-sky-400" />
                  ) : item.name === "Connect" ? (
                    <Users size={18} className="text-sky-400" />
                  ) : (
                    item.name === "ARCHIVES" && <BookOpen size={18} className="text-sky-400" />
                  )}
                  {item.name}
                </Link>
              ) : (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-200 hover:text-sky-400 hover:bg-white/5 rounded-xl transition cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  {item.name}
                </ScrollLink>
              )
            )}
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9:components/layout/navbar.tsx
          </div>
        </div>
      </aside>

      {/* MOBILE FLOATING TASKBAR (under md) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-50 pointer-events-auto">
        <header className="flex items-center justify-between h-12 px-3 bg-white/95 border-2 border-[#FF75B9] rounded-2xl shadow-[0_8px_24px_rgba(245,77,173,0.22),_2px_2px_0px_#F0C8DF] backdrop-blur-md">
          {/* Start Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-[#FFE3F1] border border-[#F0C8DF] text-[#302432] text-xs font-mono font-bold active:scale-95 transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-[#79E7E5] border border-[#302432] animate-pulse" />
            <span>NAFIS.EXE</span>
          </Link>

          {/* Current Route Indicator */}
          <div className="text-[10px] font-mono text-[#806D7D] font-bold px-2 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] truncate max-w-[120px]">
            {pathname === "/" ? "ROOT" : pathname.replace("/", "").toUpperCase()}
          </div>

          {/* Menu Toggle / Window Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FF75B9] text-white border border-[#F54DAD] shadow-sm text-xs font-mono font-bold active:scale-95 transition-transform"
            aria-label={isOpen ? "Close navigation window" : "Open navigation window"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={14} /> : <Menu size={14} />}
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </header>

        {/* Mobile Retro Start Menu Drawer */}
        {isOpen && (
          <div
            className="fixed inset-x-3 bottom-16 z-50 bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[0_20px_40px_rgba(245,77,173,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF]">
              <span className="text-xs font-mono font-bold text-[#F54DAD]">
                SYS://START_MENU.EXE
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 rounded bg-[#F54DAD] text-white flex items-center justify-center text-xs font-bold font-mono"
                aria-label="Close menu window"
              >
                ×
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-3 grid grid-cols-2 gap-2 bg-[#FFF8FC] max-h-[60vh] overflow-y-auto">
              {navEntries.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      active
                        ? "bg-[#FF75B9] text-white border-[#F54DAD] shadow-[2px_2px_0px_#F0C8DF] font-bold"
                        : "bg-white text-[#302432] border-[#F0C8DF] hover:bg-[#FFE3F1]"
                    }`}
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border ${
                        active
                          ? "bg-[#F54DAD] text-white border-white/30"
                          : "bg-[#FFF4FA] text-[#806D7D] border-[#F0C8DF]"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Window Footer */}
            <div className="px-3.5 py-2 bg-[#FFE3F1] border-t border-[#F0C8DF] flex items-center justify-between text-[11px] font-mono text-[#806D7D]">
              <span className="text-[#302432] font-semibold">STATUS: ONLINE</span>
              <span>SYS TIME: {sysTime}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
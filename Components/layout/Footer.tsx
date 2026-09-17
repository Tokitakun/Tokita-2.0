"use client";

import { Github, Instagram, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/MuhammadNafeezKh", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/_nafietzsche/", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:nafismuhammad277@gmail.com", label: "Email" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--cream)]/95 backdrop-blur-sm border-t border-[var(--sky-blue)]/30">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Copyright */}
          <p className="text-xs text-[var(--text)]/70">
            © {currentYear} Tokita. Made with <Heart size={10} className="inline text-red-500 fill-red-500" />
          </p>

          {/* Social Links - Simple Row */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)]/60 hover:text-[var(--sky-blue-dark)] transition-colors"
                  aria-label={social.label}
                  data-cursor="hover"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>

          {/* Tech Badge */}
          <span className="hidden sm:inline text-[10px] text-[var(--text)]/50 font-mono">
            Next.js + Tailwind + GSAP
          </span>

        </div>
      </div>
    </footer>
  );
}
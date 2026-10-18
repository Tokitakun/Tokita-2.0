"use client";

import { Github, Instagram, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Tokitakun", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-dzurunnafis-khairuddin/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/_nafietzsche/", label: "Instagram" },
    { icon: Mail, href: "mailto:nafismuhammad277@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-[#FFF4FA] border-t-2 border-[#F0C8DF] text-[#302432] overflow-hidden">
      {/* Top Kawaii Gradient Divider */}
      <div className="omori-divider" />

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity & Status */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5] border border-[#FF75B9] shadow-[0_0_8px_#79E7E5] animate-pulse" />
              <p className="text-base font-extrabold tracking-tight text-[#302432] font-sora">
                NAFIS<span className="text-[#FF75B9]">.EXE</span>{" "}
                <span className="text-[#806D7D] font-normal text-xs font-mono">// Tokita</span>
              </p>
            </div>
            <p className="text-xs text-[#806D7D] max-w-sm text-center md:text-left leading-relaxed">
              An expressive, interactive corner of the internet. Built with Next.js, TypeScript, and kawaii cyber love.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border-2 border-[#F0C8DF] text-[#302432] hover:text-[#F54DAD] hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-all transform hover:-translate-y-0.5 shadow-[2px_2px_0px_#F0C8DF]"
                  aria-label={social.label}
                  data-cursor="hover"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-8 pt-6 border-t border-[#F0C8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#806D7D] font-mono">
          <p>
            © {currentYear} NAFIS.EXE. Made with <span className="text-[#F54DAD]">♡</span> by Nafis.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F0C8DF] text-[11px] text-[#302432] shadow-[1px_1px_0px_#F0C8DF]">
              <span className="w-2 h-2 rounded-full bg-[#63CBA8]" />
              STATUS: OPERATIONAL
            </span>
            <Link href="/blog" className="text-[#F54DAD] hover:underline font-semibold flex items-center gap-1">
              <span>Read Story Logs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
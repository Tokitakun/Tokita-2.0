"use client";

import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Instagram, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowUpRight, 
  MessageCircle, 
  QrCode, 
  ExternalLink, 
  Terminal, 
  Sparkles,
  Heart,
} from 'lucide-react';
import OrbitPlanet from "@/Components/OrbitPlanet";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import { ScrollProgress } from "@/Components/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  
  const embedUrl = "https://tree.icqr.com/s/MDNodHRwczovL2dpdGh1Yi5jb20vVG9raXRha3Vu";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nafismuhammad277@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="relative bg-[#FFF4FA] py-20 md:py-28 overflow-hidden border-t-2 border-[#F0C8DF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Bagian Kiri: Kontak & Info */}
          <div className="space-y-6 order-2 md:order-1">
            <div>
              <span className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white text-[#F54DAD] text-xs font-mono font-bold uppercase tracking-wider mb-4 border-2 border-[#F0C8DF] shadow-[2px_2px_0px_#FFE3F1]">
                <Terminal size={12} className="text-[#FF75B9]" />
                COMMUNICATION_RELAY.EXE ♡
                <span className="text-[#79E7E5]">★</span>
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#302432] leading-tight tracking-tight mb-4 font-sora">
                Let us build something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF75B9] to-[#F54DAD]">
                  expressive together.
                </span>
              </h2>
              
              <p className="text-sm md:text-base text-[#806D7D] leading-relaxed mb-6 font-inter">
                Open for creative frontend projects, design engineering, modern web app builds, or friendly conversations about tech and aesthetic interfaces.
              </p>

              {/* Email Box */}
              <div className="bg-white border-2 border-[#F0C8DF] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[4px_4px_0px_#F0C8DF]">
                <div className="break-all">
                  <p className="text-[10px] text-[#806D7D] font-mono font-bold uppercase tracking-wider mb-1">
                    Direct Email Transmission
                  </p>
                  <p className="text-sm md:text-base font-bold text-[#302432] font-mono">
                    nafismuhammad277@gmail.com
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95 w-full sm:w-auto"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Address"}</span>
                </button>
              </div>

              {/* Social Channels List */}
              <div className="space-y-2.5">
                {[
                  { icon: Github, label: "GitHub", value: "@Tokitakun", url: "https://github.com/Tokitakun" },
                  { icon: Linkedin, label: "LinkedIn", value: "Muhammad Nafis", url: "https://www.linkedin.com/in/muhammad-dzurunnafis-khairuddin/" },
                  { icon: Instagram, label: "Instagram", value: "@_nafietzsche", url: "https://www.instagram.com/_nafietzsche/" },
                  { icon: MessageCircle, label: "WhatsApp", value: "+62 856-1470-816", url: "https://wa.me/628561470816" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] hover:border-[#FF75B9] transition-all duration-150 shadow-[2px_2px_0px_#FFE3F1]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-lg bg-[#FFE3F1] text-[#F54DAD] group-hover:bg-[#FF75B9] group-hover:text-white transition-colors">
                        <item.icon size={17} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#302432] group-hover:text-[#F54DAD] transition-colors font-sora">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-[#806D7D] font-mono">{item.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#806D7D] group-hover:text-[#F54DAD] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Iframe Window Desktop Game UI */}
          <div className="relative order-1 md:order-2 hidden md:block">
            <div className="relative z-[1] bg-white rounded-2xl border-2 border-[#FF75B9] shadow-[6px_6px_0px_#F0C8DF] overflow-hidden">
              
              {/* Window Header */}
              <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A993FF]" />
                </div>
                <div className="text-[10px] text-[#302432] font-mono font-bold bg-white px-3 py-1 rounded-md border border-[#F0C8DF] flex items-center gap-1.5">
                  <QrCode size={11} className="text-[#F54DAD]" />
                  <span>tree.icqr.com/Tokitakun</span>
                </div>
                <div className="text-[11px] font-mono text-[#F54DAD] font-bold">LIVE ♡</div>
              </div>

              {/* Iframe Frame */}
              <div className="relative w-full h-[440px] lg:h-[480px] bg-[#FFF8FC] overflow-hidden flex items-start justify-center">
                <div 
                  className="origin-top transition-transform duration-300"
                  style={{ 
                    width: '1280px', 
                    height: '800px', 
                    transform: 'scale(0.58)' 
                  }}
                >
                  <iframe 
                    src={embedUrl}
                    title="Nafis Digital Tree Desktop"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>

              {/* Footer status bar */}
              <div className="px-4 py-2 border-t-2 border-[#F0C8DF] bg-[#FFE3F1] flex justify-between items-center text-[10px] font-mono font-bold text-[#806D7D]">
                <span>CONNECTOR: ONLINE ♡</span>
                <span className="text-[#F54DAD]">CLICK TO NAVIGATE</span>
              </div>
            </div>
          </div>

          {/* Mobile Fallback Card */}
          <div className="block md:hidden order-1">
             <div className="bg-white border-2 border-[#FF75B9] rounded-2xl p-6 text-center space-y-4 shadow-[4px_4px_0px_#F0C8DF]">
                <div className="w-12 h-12 bg-[#FFE3F1] rounded-2xl flex items-center justify-center mx-auto text-[#F54DAD] border border-[#FF75B9]">
                  <QrCode size={22} />
                </div>
                <h3 className="text-[#302432] font-bold text-lg font-sora">Digital Linktree</h3>
                <p className="text-xs text-[#806D7D] leading-relaxed font-inter">
                  Explore my complete ecosystem of digital links and projects through the verified portal below.
                </p>
                <a 
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white rounded-xl font-bold text-xs transition-colors min-h-[44px] shadow-[2px_2px_0px_#F0C8DF]"
                >
                  <span>Open Portfolio Tree</span>
                  <ExternalLink size={14} />
                </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
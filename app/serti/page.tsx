"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar, 
  Building2, 
  Download, 
  ArrowLeft, 
  Sparkles,
  Maximize2,
  X,
  FileText,
  Terminal,
} from "lucide-react";

import certificatesData from "../../public/data/serti.json";
import Footer from "@/components/layout/footer";
import { GlitchText } from "@/components/layout/glitch";
import { ScrollProgress } from "@/components/layout/fx";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description?: string;
  category: "kompetensi" | "prestasi";
  link?: string;
};

type CertificatesJSON = {
  kompetensi: Certificate[];
  prestasi: Certificate[];
};

export default function CertificatesListPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden">
      <ScrollProgress />
      <CertificatesPage />
    </div>
  );
}

function CertificatesPage() {
  const [activeTab, setActiveTab] = useState<"kompetensi" | "prestasi">("kompetensi");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<CertificatesJSON | null>(null);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    try {
      setCertificates(certificatesData as CertificatesJSON);
    } catch (err) {
      console.error("Error reading certificates data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (loading || !certificates) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-element",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      const activeCards = cardsRef.current.filter(Boolean);
      if (activeCards.length > 0) {
        gsap.fromTo(
          activeCards,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [loading, certificates, activeTab]);

  if (loading || !certificates) {
    return (
      <div className="min-h-screen bg-[#FFF4FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#FF75B9]/30 border-t-[#F54DAD] rounded-full animate-spin" />
          <p className="text-[#F54DAD] text-xs font-mono font-bold tracking-widest uppercase">
            LOADING_CREDENTIAL_DATABASE...
          </p>
        </div>
      </div>
    );
  }

  const currentData = certificates[activeTab];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FFF4FA] text-[#302432] relative overflow-hidden flex flex-col pt-6">
      
      {/* Main Container */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 md:py-20 w-full relative z-10">
        
        {/* Navigation & Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <Link
            href="/"
            className="header-element inline-flex items-center gap-2 text-xs font-mono font-bold text-[#806D7D] hover:text-[#F54DAD] transition-colors mb-8 group"
          >
            <div className="p-1.5 rounded-full bg-white border border-[#F0C8DF] group-hover:border-[#FF75B9] transition-colors shadow-[1px_1px_0px_#FFE3F1]">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Kembali ke Portfolio Utama</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="header-element inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#FFE3F1]">
                <Sparkles size={12} className="text-[#FF75B9]" />
                <span className="tracking-wider uppercase">VERIFIED_CREDENTIALS.EXE</span>
                <span className="text-[#79E7E5]">★</span>
              </div>
              <h1 className="header-element text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#302432] tracking-tight leading-tight font-sora">
                Certificates &amp; <br />
                <GlitchText as="span" className="text-[#F54DAD]">Achievements</GlitchText>
              </h1>
              <p className="header-element text-[#806D7D] text-sm md:text-base leading-relaxed font-inter">
                Verified documentation of technical certifications, competition awards, and credentials.
              </p>
            </div>

            {/* Total Items Badge */}
            <div className="header-element bg-white border-2 border-[#F0C8DF] rounded-2xl p-4 min-w-[130px] text-right shadow-[4px_4px_0px_#F0C8DF]">
              <span className="block text-2xl md:text-3xl font-extrabold text-[#F54DAD] font-mono">{currentData.length}</span>
              <span className="text-[10px] text-[#806D7D] uppercase tracking-widest font-mono font-bold">Verified Items</span>
            </div>
          </div>
        </div>

        {/* Desktop Folder Tabs — matches Skills/Projects workspace pattern */}
        <div ref={tabsRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-0">
          <div className="flex items-center px-1 pt-3 border-b-2 border-[#F0C8DF] bg-[#FFF8FC] w-full gap-2 overflow-x-auto rounded-t-2xl">
            {/* KOMPETENSI FOLDER TAB */}
            <button
              type="button"
              onClick={() => setActiveTab("kompetensi")}
              aria-pressed={activeTab === "kompetensi"}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeTab === "kompetensi"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10 shadow-[0_-2px_6px_rgba(245,77,173,0.1)]"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">
                CRT
              </span>
              <span>KOMPETENSI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                {certificates.kompetensi.length}
              </span>
            </button>

            {/* PRESTASI FOLDER TAB */}
            <button
              type="button"
              onClick={() => setActiveTab("prestasi")}
              aria-pressed={activeTab === "prestasi"}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold transition-all border-t-2 border-x-2 -mb-[2px] ${
                activeTab === "prestasi"
                  ? "bg-white text-[#F54DAD] border-[#FF75B9] border-b-2 border-b-white z-10 shadow-[0_-2px_6px_rgba(245,77,173,0.1)]"
                  : "bg-[#FFE3F1]/70 text-[#806D7D] border-[#F0C8DF] hover:bg-[#FFE3F1] hover:text-[#302432]"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-[#FFF4FA] border border-[#F0C8DF] text-[10px]">
                AWD
              </span>
              <span>PRESTASI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FFE3F1] text-[#F54DAD] border border-[#F0C8DF]">
                {certificates.prestasi.length}
              </span>
            </button>

            {/* Right-aligned category readout inside tab strip */}
            <div className="ml-auto pr-4 text-[10px] text-[#806D7D] font-mono font-bold hidden sm:block">
              {activeTab === "kompetensi" ? "SERTIFIKASI_TEKNIS.DIR" : "PENGHARGAAN_KOMPETISI.DIR"}
            </div>
          </div>
        </div>

        {/* Folder Content Area */}
        <div className="p-4 sm:p-6 md:p-8 bg-white border-x-2 border-b-2 border-[#F0C8DF] rounded-b-2xl min-h-[400px] mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentData.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group bg-white border-2 border-[#F0C8DF] rounded-2xl overflow-hidden hover:border-[#FF75B9] transition-all duration-200 flex flex-col shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1"
            >
              {/* Window Header */}
              <div className="window-header px-3.5 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] text-[10px] font-mono font-bold text-[#F54DAD] flex items-center justify-between">
                <span className="truncate">★ CERT_ID_0{cert.id}.PNG</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                  <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                </div>
              </div>

              {/* Image Preview with Click to Open Lightbox */}
              <div 
                className="relative h-48 sm:h-52 overflow-hidden bg-[#FFF8FC] cursor-pointer"
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat pratinjau sertifikat ${cert.title}`}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                <div className="absolute inset-0 bg-[#302432]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white text-xs font-mono font-bold text-[#F54DAD] flex items-center gap-1.5 shadow-md">
                    <Maximize2 size={13} className="text-[#FF75B9]" />
                    Perbesar Bukti
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-lg px-2.5 py-1 border border-[#F0C8DF] text-[10px] font-mono font-bold text-[#302432]">
                  <Calendar size={10} className="text-[#F54DAD]" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={13} className="text-[#FF75B9]" />
                  <span className="text-[11px] font-mono font-bold text-[#806D7D] uppercase tracking-wide">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="font-bold text-[#302432] text-base md:text-lg leading-snug mb-2 group-hover:text-[#F54DAD] transition-colors font-sora">
                  {cert.title}
                </h3>

                {cert.description && (
                  <p className="text-[#806D7D] text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 flex-grow font-inter">
                    {cert.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#F0C8DF] mt-auto">
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#FF75B9] hover:bg-[#F54DAD] rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF] active:scale-95"
                    >
                      <Maximize2 size={13} />
                      Lihat Bukti
                    </button>
                    
                    <a
                      href={cert.image}
                      download={`Sertifikat_${cert.title.replace(/\s+/g, '_')}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-3 py-2.5 text-[#302432] hover:text-[#F54DAD] bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] rounded-xl transition-all shadow-[2px_2px_0px_#FFE3F1]"
                      title="Unduh Salinan Asli"
                      aria-label="Unduh Sertifikat"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentData.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-[#F0C8DF] rounded-2xl bg-white">
            <FileText size={24} className="text-[#806D7D] mx-auto mb-2" />
            <p className="text-[#302432] font-bold text-sm">Tidak ada sertifikat dalam kategori ini.</p>
          </div>
        )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#302432]/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative bg-white border-2 border-[#FF75B9] rounded-2xl max-w-3xl w-full overflow-hidden shadow-[8px_8px_0px_#F0C8DF] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="window-header px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#F54DAD]" />
                <span className="text-xs font-mono font-bold text-[#302432] truncate max-w-[280px] sm:max-w-md">
                  VERIFIED_PROOF: {selectedCert.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-5 h-5 rounded-md bg-[#F54DAD] text-white flex items-center justify-center text-xs font-bold hover:bg-[#FF75B9] transition-colors"
                  aria-label="Tutup Pratinjau"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Image Area */}
            <div className="relative w-full h-[320px] sm:h-[450px] bg-[#FFF8FC] flex items-center justify-center p-2 border-b border-[#F0C8DF]">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Modal Footer & Details */}
            <div className="p-5 border-t border-[#F0C8DF] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-bold text-[#F54DAD] mb-0.5">
                  Penerbit: {selectedCert.issuer} ({selectedCert.date})
                </p>
                <h4 className="text-base font-bold text-[#302432] font-sora">
                  {selectedCert.title}
                </h4>
                {selectedCert.description && (
                  <p className="text-xs text-[#806D7D] mt-1 font-inter">
                    {selectedCert.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedCert.image}
                  download={`Sertifikat_${selectedCert.title.replace(/\s+/g, '_')}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold rounded-xl transition-all shadow-[2px_2px_0px_#F0C8DF]"
                >
                  <Download size={14} />
                  <span>Unduh File Asli</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2.5 bg-white hover:bg-[#FFE3F1] border-2 border-[#F0C8DF] text-[#302432] text-xs font-bold rounded-xl transition-all"
                >
                  Tutup (Esc)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="omori-divider" />
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Feather,
  Terminal,
  ArrowRight,
} from "lucide-react";
<<<<<<< HEAD
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
=======
import CustomCursor from "@/components/layout/cursor";
import NavbarBlog from "@/components/blog/navbar-blog";
import Footer from "@/components/layout/footer";
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9

interface Cerpen {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogPage() {
  const router = useRouter();
  const [cerpen, setCerpen] = useState<Cerpen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [error, setError] = useState<string | null>(null);

  // Hint State
  const [showHint, setShowHint] = useState(false);
  const [typedHint, setTypedHint] = useState("");
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Audio State
  const [audioEnabled, setAudioEnabled] = useState(false);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);

  const mysteriousMessages = [
    "...ada yang mengawasi?",
    "Mari kita baca bersama...",
    "Setiap kata menyimpan rahasia ★",
    "Jangan terlalu dalam menyelam...",
    "Ingatan itu rapuh...",
    "???"
  ];

  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  const handleHintHover = useCallback(() => {
    setShowHint(true);
    const msg = mysteriousMessages[Math.floor(Math.random() * mysteriousMessages.length)];

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

    setTypedHint(msg);
    hintTimeoutRef.current = setTimeout(() => {
      setTypedHint("");
      setShowHint(false);
    }, 2800);
  }, []);

  const fetchCerpen = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/data/cerpen.json?t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setCerpen(data.cerpen || []);
    } catch (err) {
      console.error("Gagal memuat data cerpen:", err);
      setError("Gagal memuat catatan cerita. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCerpen();
    window.addEventListener('focus', fetchCerpen);
    return () => window.removeEventListener('focus', fetchCerpen);
  }, [fetchCerpen]);

  const toggleAudio = useCallback(() => {
    if (!bgmAudioRef.current) {
      bgmAudioRef.current = new Audio('/audio/blog.mp3');
      bgmAudioRef.current.loop = true;
      bgmAudioRef.current.volume = 0.15;
    }

    if (audioEnabled) {
      bgmAudioRef.current.pause();
      setAudioEnabled(false);
    } else {
      bgmAudioRef.current.play()
        .then(() => setAudioEnabled(true))
        .catch(e => console.warn("Audio play blocked by browser:", e));
    }
  }, [audioEnabled]);

  useEffect(() => {
    return () => {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
        bgmAudioRef.current.src = "";
      }
    };
  }, []);

  const filteredCerpen = cerpen.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Semua", ...new Set(cerpen.map(item => item.category))];

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#FFF4FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#FF75B9]/30 border-t-[#F54DAD] rounded-full animate-spin" />
          <p className="text-[#F54DAD] font-mono text-xs font-bold tracking-widest uppercase animate-pulse">
            Membuka lembaran arsip cerita...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-[#FFF4FA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-[#F54DAD] rounded-2xl p-8 text-center shadow-[4px_4px_0px_#F0C8DF]">
          <AlertCircle className="w-10 h-10 text-[#F54DAD] mx-auto mb-3" />
          <h3 className="text-[#302432] font-bold mb-2 font-sora">Terjadi Kesalahan</h3>
          <p className="text-[#806D7D] text-sm mb-6 font-inter">{error}</p>
          <button
            type="button"
            onClick={() => fetchCerpen()}
            className="px-5 py-2.5 bg-[#FF75B9] hover:bg-[#F54DAD] text-white rounded-xl transition-all text-xs font-mono font-bold flex items-center gap-2 mx-auto shadow-md"
          >
            <RefreshCw size={13} /> Coba Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="relative min-h-screen bg-[#FFF4FA] text-[#302432] overflow-x-hidden pt-12">
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 min-h-screen">
        
=======
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <CustomCursor />
      <NavbarBlog />

      {/* Background Ambience - More Soft & Atmospheric */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

        {/* Radial Glow at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/5 rounded-full blur-[100px]" />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Floating Particles - Subtle */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 min-h-screen">

>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
<<<<<<< HEAD
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 text-[#806D7D] hover:text-[#F54DAD] transition-colors text-xs font-mono font-bold"
=======
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem('returnFromBlog', 'true');
                router.push('/');
              }}
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors text-sm font-mono"
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
            >
              <div className="p-1.5 rounded-full bg-white border border-[#F0C8DF] group-hover:border-[#FF75B9] transition-all shadow-[1px_1px_0px_#FFE3F1]">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span>Kembali ke Desktop Utama</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* Mystery Eye Button */}
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={handleHintHover}
                  onClick={handleHintHover}
                  className="p-2.5 bg-white border-2 border-[#F0C8DF] rounded-full hover:border-[#FF75B9] hover:bg-[#FFE3F1] transition-all group min-w-[44px] min-h-[44px] flex items-center justify-center shadow-[2px_2px_0px_#FFE3F1]"
                  aria-label="Petunjuk Misterius"
                >
                  <Eye className="w-4 h-4 text-[#806D7D] group-hover:text-[#F54DAD] transition-colors" />
                </button>
<<<<<<< HEAD
                
=======

                {/* Floating Hint Tooltip */}
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
                {showHint && typedHint && (
                  <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-white border-2 border-[#FF75B9] rounded-xl text-xs text-[#F54DAD] font-mono font-bold whitespace-nowrap shadow-[3px_3px_0px_#F0C8DF] z-50">
                    {typedHint}
                  </div>
                )}
              </div>

              {/* BGM Audio Toggle */}
              <button
                type="button"
                onClick={toggleAudio}
<<<<<<< HEAD
                className={`p-2.5 rounded-full border-2 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center shadow-[2px_2px_0px_#FFE3F1] ${
                  audioEnabled 
                    ? 'bg-[#FFE3F1] border-[#FF75B9] text-[#F54DAD]' 
                    : 'bg-white border-[#F0C8DF] text-[#806D7D] hover:text-[#302432]'
                }`}
                aria-label={audioEnabled ? "Matikan Musik Latar" : "Nyalakan Musik Latar"}
=======
                className={`p-2.5 rounded-full border transition-all duration-300 ${audioEnabled
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                aria-label={audioEnabled ? "Matikan Musik" : "Nyalakan Musik"}
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 animate-pulse text-[#F54DAD]" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
<<<<<<< HEAD
          
          <div className="relative pl-6 border-l-4 border-[#FF75B9]">
            <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#F0C8DF] text-xs font-mono font-bold text-[#F54DAD] shadow-[2px_2px_0px_#FFE3F1]">
              <Feather size={12} className="text-[#FF75B9]" />
              <span>MARIA_ARCHIVES.LOG</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#302432] mb-3 tracking-tight font-sora">
              Cerita Maria <span className="text-[#F54DAD] inline-block">★</span>
=======

          <div className="relative pl-6 border-l-2 border-sky-500/30">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Cerita <span className="text-sky-400 inline-block animate-pulse">??</span>
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
            </h1>
            <p className="text-[#806D7D] text-sm md:text-base font-inter italic max-w-xl leading-relaxed">
              &quot;Kumpulan cerita fiksi, catatan memori, dan eksplorasi narasi dalam sudut pandang sureal.&quot;
            </p>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="sticky top-16 z-30 bg-[#FFF4FA]/90 backdrop-blur-xl py-4 border-b-2 border-[#F0C8DF] mb-10 transition-all">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#806D7D] group-focus-within:text-[#F54DAD] transition-colors" />
              <input
                type="text"
                placeholder="Cari judul atau potongan kata..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-[#F0C8DF] rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-[#302432] placeholder:text-[#806D7D] focus:border-[#FF75B9] focus:outline-none transition-all shadow-[2px_2px_0px_#FFE3F1]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
<<<<<<< HEAD
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap border-2 min-h-[36px] shadow-[2px_2px_0px_#FFE3F1] ${
                    selectedCategory === category
                      ? 'bg-[#FF75B9] text-white border-[#F54DAD]'
                      : 'bg-white border-[#F0C8DF] text-[#806D7D] hover:text-[#302432] hover:bg-[#FFE3F1]'
                  }`}
=======
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap border ${selectedCategory === category
                    ? 'bg-sky-500 text-slate-950 border-sky-500 font-bold'
                    : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="min-h-[380px]">
          {filteredCerpen.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[#F0C8DF] rounded-2xl bg-white shadow-[4px_4px_0px_#FFE3F1]">
              <BookOpen className="w-10 h-10 text-[#FF75B9] mb-3" />
              <p className="text-[#302432] font-bold font-sora">Tidak ada cerita ditemukan</p>
              <p className="text-[#806D7D] text-xs mt-1 font-inter">Mungkin ceritanya tersimpan di bab lain?</p>
              {(searchTerm || selectedCategory !== "Semua") && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(""); setSelectedCategory("Semua"); }}
                  className="mt-4 text-[#F54DAD] text-xs font-mono font-bold hover:underline underline-offset-4"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerpen.map((cerita) => (
                <Link
                  key={cerita.id}
                  href={`/blog/${cerita.id}`}
                  className="group relative block h-full"
                >
<<<<<<< HEAD
                  <article className="h-full bg-white border-2 border-[#F0C8DF] rounded-2xl overflow-hidden hover:border-[#FF75B9] transition-all duration-200 flex flex-col shadow-[4px_4px_0px_#F0C8DF] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1">
                    
                    {/* Window Header */}
                    <div className="window-header px-3.5 py-2 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#F54DAD] truncate">★ ENTRY_0{cerita.id}.LOG</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
                        <span className="w-2 h-2 rounded-full bg-[#79E7E5]" />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-[#F54DAD] bg-[#FFE3F1] px-2.5 py-0.5 rounded border border-[#FF75B9]">
=======
                  <article className="h-full bg-slate-900/40 border border-slate-800 rounded-xl p-6 transition-all duration-500 hover:bg-slate-900 hover:border-sky-500/30 hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.1)] overflow-hidden flex flex-col">

                    {/* Hover Glow Effect */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
                          {cerita.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#806D7D] font-mono font-bold">
                          <Clock className="w-3 h-3 text-[#FF75B9]" />
                          <span>{cerita.readTime}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-[#302432] mb-2 group-hover:text-[#F54DAD] transition-colors line-clamp-2 leading-snug font-sora">
                        {cerita.title}
                      </h2>
<<<<<<< HEAD
                      
                      <p className="text-[#806D7D] text-xs md:text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-inter">
=======

                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
                        {cerita.excerpt}
                      </p>

                      <div className="pt-4 border-t border-[#F0C8DF] flex items-center justify-between mt-auto text-xs">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#806D7D] font-mono font-bold">
                          <Calendar className="w-3 h-3 text-[#79E7E5]" />
                          <span>{cerita.date}</span>
                        </div>
                        <span className="text-xs font-bold text-[#F54DAD] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Baca Cerita <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer Quote / Maria's Note */}
<<<<<<< HEAD
        <div className="mt-20 text-center relative py-8">
          <div className="inline-block max-w-md mx-auto px-6 py-4 bg-white border-2 border-[#FF75B9] rounded-2xl shadow-[4px_4px_0px_#F0C8DF]">
            <Sparkles className="w-4 h-4 text-[#F54DAD] mx-auto mb-2" />
            <p className="text-[#302432] text-xs md:text-sm italic leading-relaxed font-inter">
              &quot;Setiap cerita adalah serpihan ingatan yang mencoba bertahan. Pilih dengan hati-hati, karena beberapa pintu tidak boleh dibuka.&quot;
=======
        <div className="mt-24 text-center relative py-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-slate-800 to-transparent" />

          <div className="inline-block max-w-md mx-auto px-6 py-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-sky-500/50 mx-auto mb-3" />
            <p className="text-slate-400 text-sm italic leading-relaxed">
              &quot;Setiap cerita adalah potongan ingatan yang mencoba bertahan. Pilih dengan hati-hati, karena beberapa pintu tidak boleh dibuka.&quot;
>>>>>>> 64cbbcef4cd3e46c1a1f567fed5ff42d1afa3cd9
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-[#806D7D] font-mono font-bold uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-[#F0C8DF]" />
              Maria
              <span className="w-6 h-0.5 bg-[#F0C8DF]" />
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
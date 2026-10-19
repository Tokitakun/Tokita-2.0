"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, Clock, Volume2, VolumeX, 
  Quote, Sun, Moon, Share2, Hash, 
  ShieldAlert, Terminal, Sparkles
} from "lucide-react";
import Footer from "@/components/layout/footer";

interface Cerpen {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  warnings?: string[];
}

export default function CerpenDetail() {
  const params = useParams();
  const router = useRouter();
  
  const [cerpen, setCerpen] = useState<Cerpen | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCerpen, setRelatedCerpen] = useState<Cerpen[]>([]);
  
  // Reading mode settings: Default to false (kawaii light reading canvas)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Gatekeeper state for sensitive content
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    if (!bgmAudioRef.current) {
      bgmAudioRef.current = new Audio('/audio/blog.mp3');
      bgmAudioRef.current.loop = true;
      bgmAudioRef.current.volume = 0.12;
    }
    if (audioEnabled) {
      bgmAudioRef.current.pause();
      setAudioEnabled(false);
    } else {
      bgmAudioRef.current.play().catch(e => console.log("Audio blocked:", e));
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    return () => {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
        bgmAudioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    const fetchCerpen = async () => {
      try {
        const res = await fetch('/data/cerpen.json?t=' + Date.now());
        const data = await res.json();
        const found = data.cerpen?.find((c: Cerpen) => c.id === Number(params.id));
        
        if (found) {
          setCerpen(found);
          const related = data.cerpen
            .filter((c: Cerpen) => c.category === found.category && c.id !== found.id)
            .slice(0, 3);
          setRelatedCerpen(related);
        } else {
          router.push('/blog');
        }
      } catch (error) {
        console.error("Error loading cerita:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCerpen();
  }, [params.id, router]);

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.match(/["'].*?["']/)) {
        return (
          <p key={i} className="mb-6 leading-relaxed text-base md:text-lg">
            {line.split(/(["'].*?["'])/g).map((part, j) => 
              part.match(/["'].*?["']/) ? (
                <span key={j} className="font-semibold italic text-[#F54DAD]">
                  {part}
                </span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      if (!line.trim()) return <br key={i} />;
      return <p key={i} className="mb-6 leading-relaxed text-base md:text-lg opacity-90">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF4FA]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#FF75B9] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-[#F54DAD]">ACCESSING_LOG_ENTRY...</p>
        </div>
      </div>
    );
  }

  if (!cerpen) return null;

  const sensitiveKeywords = ["Suicide", "Bunuh", "Metode", "NSFW", "Peringatan", "Trauma"];
  const hasSensitiveKeyword = sensitiveKeywords.some(keyword => cerpen.category.toLowerCase().includes(keyword.toLowerCase()));
  const needsWarning = (cerpen.warnings && cerpen.warnings.length > 0) || hasSensitiveKeyword;
  const isLocked = needsWarning && !hasAcknowledged;
  const displayWarnings = cerpen.warnings || (hasSensitiveKeyword ? ["Sensitive Content", "Atmospheric Fiction"] : []);

  const theme = isDarkMode ? {
    bg: "bg-[#252525]",
    paper: "bg-[#2D2D2D] border-[#FF75B9] text-[#FFF4FA]",
    text: "text-[#FFF4FA]",
    heading: "text-white",
    meta: "text-[#806D7D]",
    accent: "text-[#FF75B9]",
    button: "bg-[#252525] hover:bg-[#333333] text-white border-white/10",
  } : {
    bg: "bg-[#FFF4FA]",
    paper: "bg-white border-2 border-[#FF75B9] text-[#302432] shadow-[6px_6px_0px_#F0C8DF]",
    text: "text-[#302432]",
    heading: "text-[#302432]",
    meta: "text-[#806D7D]",
    accent: "text-[#F54DAD]",
    button: "bg-white hover:bg-[#FFE3F1] text-[#302432] border-2 border-[#F0C8DF]",
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${theme.bg}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-[#FFE3F1]">
        <div 
          className="h-full bg-gradient-to-r from-[#FF75B9] via-[#F54DAD] to-[#79E7E5] transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between mb-8 sticky top-14 z-40 py-2.5 px-4 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#F0C8DF] shadow-[3px_3px_0px_#FFE3F1]">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#302432] hover:text-[#F54DAD] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> 
            <span>Kembali ke Arsip</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${theme.button}`}
              aria-label={isDarkMode ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            >
              {isDarkMode ? <Sun size={14} className="text-[#FF75B9]" /> : <Moon size={14} />}
            </button>
            <button 
              type="button"
              onClick={toggleAudio} 
              className={`p-2 rounded-xl ${theme.button}`}
              aria-label={audioEnabled ? "Matikan musik" : "Nyalakan musik"}
            >
              {audioEnabled ? <Volume2 size={14} className="text-[#F54DAD] animate-pulse" /> : <VolumeX size={14} />}
            </button>
          </div>
        </div>

        {/* Sensitive Content Gatekeeper Modal */}
        {isLocked && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#302432]/80 backdrop-blur-md">
            <div className="max-w-md w-full bg-white border-2 border-[#FF75B9] rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_#F0C8DF] relative overflow-hidden">
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#FFE3F1] flex items-center justify-center border-2 border-[#FF75B9]">
                  <ShieldAlert className="w-7 h-7 text-[#F54DAD]" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-[#302432] mb-2 tracking-tight font-sora">Catatan Peringatan Konten</h2>
                  <p className="text-[#806D7D] text-xs md:text-sm leading-relaxed font-inter">
                    Bab cerita ini memuat tema psikologis yang mendalam dan berpotensi memicu ketidaknyamanan emosional.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {displayWarnings.map((warn, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#FFE3F1] border border-[#FF75B9] text-[#F54DAD] text-[10px] font-mono font-bold uppercase tracking-wide">
                      {warn}
                    </span>
                  ))}
                </div>

                <div className="w-full pt-4 border-t border-[#F0C8DF] flex flex-col gap-2.5">
                  <button 
                    type="button"
                    onClick={() => setHasAcknowledged(true)}
                    className="w-full py-3 bg-[#FF75B9] hover:bg-[#F54DAD] text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Saya Mengerti, Lanjutkan Membaca
                  </button>
                  <Link 
                    href="/blog" 
                    className="w-full py-3 bg-white hover:bg-[#FFE3F1] text-[#302432] border-2 border-[#F0C8DF] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} /> Kembali ke Lembaran Aman
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Article Container */}
        <article className={`rounded-2xl p-6 md:p-10 border transition-all duration-300 ${theme.paper} ${isLocked ? 'blur-lg select-none pointer-events-none opacity-40' : ''}`}>
          
          {/* Window Header */}
          <div className="window-header -mx-6 md:-mx-10 -mt-6 md:-mt-10 mb-8 rounded-t-2xl px-4 py-2.5 bg-[#FFE3F1] border-b-2 border-[#F0C8DF] flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#F54DAD]">★ ENTRY_ARCHIVE_VIEWER.EXE</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF75B9]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#79E7E5]" />
            </div>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FFE3F1] text-[#F54DAD] border border-[#FF75B9]">
                {cerpen.category}
              </span>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#806D7D] bg-white border border-[#F0C8DF]">
                <Hash size={10} className="text-[#FF75B9]" />
                <span>{String(cerpen.id).padStart(3, '0')}</span>
              </div>
            </div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight font-sora ${theme.heading}`}>
              {cerpen.title}
            </h1>
            
            <div className={`flex items-center gap-4 text-xs font-mono font-bold ${theme.meta}`}>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#79E7E5]" /> {cerpen.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF75B9]" />
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#F54DAD]" /> {cerpen.readTime}</span>
            </div>
          </header>

          {/* Excerpt Quote */}
          <div className="mb-8 pl-4 border-l-4 border-[#FF75B9] italic opacity-90 bg-[#FFF8FC] p-3 rounded-r-xl border border-l-0 border-[#F0C8DF]">
            <Quote className="w-4 h-4 mb-1 text-[#F54DAD]" />
            <p className="text-sm leading-relaxed text-[#302432] font-inter">{cerpen.excerpt}</p>
          </div>

          {/* Content Body */}
          <div 
            ref={contentRef}
            className={`prose prose-lg max-w-none font-inter ${theme.text}`}
          >
            {renderContent(cerpen.content)}
          </div>

          {/* End of File Bar */}
          <div className="mt-12 pt-6 border-t-2 border-[#F0C8DF] flex justify-between items-center text-xs font-mono font-bold text-[#806D7D]">
            <span>~ END_OF_TRANSMISSION ~</span>
            <button 
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: cerpen.title, url: window.location.href });
                }
              }}
              className="p-2 rounded-xl bg-[#FFE3F1] hover:bg-[#FF75B9] hover:text-white border border-[#F0C8DF] transition-colors"
              aria-label="Bagikan Cerita"
            >
              <Share2 size={15} />
            </button>
          </div>
        </article>

        {/* Related Entries */}
        {!isLocked && relatedCerpen.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#302432] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF75B9]" />
              Catatan Terkait dalam Kategori Sama
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCerpen.map((item) => (
                <Link key={item.id} href={`/blog/${item.id}`} className="group block">
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#F0C8DF] hover:border-[#FF75B9] transition-all hover:-translate-y-1 shadow-[3px_3px_0px_#F0C8DF]">
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono font-bold text-[#806D7D]">
                      <span>#{String(item.id).padStart(3, '0')}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#302432] group-hover:text-[#F54DAD] transition-colors line-clamp-1 mb-1 font-sora">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#806D7D] line-clamp-2 leading-relaxed font-inter">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
}
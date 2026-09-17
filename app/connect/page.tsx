"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Users,
  MapPin,
  Search,
  X,
} from "lucide-react";
import CustomCursor from "@/components/layout/Cursor";
import Footer from "@/components/layout/Footer";

export interface FriendProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location?: string;
  githubUrl: string;
}

const friends: FriendProfile[] = [
  {
    username: "Barabr0",
    name: "Bara",
    avatarUrl: "https://avatars.githubusercontent.com/u/228843429?v=4",
    bio: "My daily life it's usually @NLFTs @godotengine @laravel @blender",
    location: "Bandung",
    githubUrl: "https://github.com/Barabr0",
  },
  {
    username: "davingm",
    name: "Kinn",
    avatarUrl: "https://avatars.githubusercontent.com/u/228851591?v=4",
    bio: "Sure..... @nuxt @nlfts @vuejs",
    location: "Shenzhen, China",
    githubUrl: "https://github.com/davingm",
  },
  {
    username: "Destkaa",
    name: "KakaViangi",
    avatarUrl: "https://avatars.githubusercontent.com/u/228332586?v=4",
    bio: "“Orang terkuat di dunia adalah dia yang paling mampu berdiri sendiri.” @NFLTs",
    location: "Bandung, Indonesia",
    githubUrl: "https://github.com/Destkaa",
  },
  {
    username: "nairha",
    name: "azunya 😺",
    avatarUrl: "https://avatars.githubusercontent.com/u/204519754?v=4",
    bio: "Harum dan wangi @NLFTs @nuxt",
    location: "Indonesia, Yogyakarta",
    githubUrl: "https://github.com/nairha",
  },
  {
    username: "Radiedtya",
    name: "Radiedtya",
    avatarUrl: "https://avatars.githubusercontent.com/u/226198461?v=4",
    bio: "Just a Rocky",
    location: "Bandung",
    githubUrl: "https://github.com/Radiedtya",
  },
  {
    username: "sidiktsq",
    name: "シディック",
    avatarUrl: "https://avatars.githubusercontent.com/u/230048582?v=4",
    bio: "情報リンク github 兄弟",
    location: "きょうと",
    githubUrl: "https://github.com/sidiktsq",
  },
];

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] =
    useState<FriendProfile | null>(null);

  const filteredFriends = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return friends.filter((friend) => {
      return (
        friend.name.toLowerCase().includes(query) ||
        friend.username.toLowerCase().includes(query) ||
        friend.bio.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#6B9FBF]/30 selection:text-white">
      <CustomCursor />

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 w-full flex-1">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#6B9FBF] transition-colors group"
          >
            <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#6B9FBF]/10 transition-colors">
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </div>

            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#6B9FBF] mb-3">
            <Users size={14} />

            <span className="uppercase tracking-widest text-[10px]">
              Friends Directory
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
            Connect & <span className="text-[#6B9FBF]">Circle</span>
          </h1>

          <p className="text-gray-400 text-xs md:text-sm max-w-2xl leading-relaxed">
            Mengenalkan rekan-rekan dan sahabat developer yang saling berbagi
            inspirasi, proyek open-source, dan eksplorasi dunia teknologi.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-[#222222]/90 p-3 md:p-4 rounded-2xl border border-white/5 shadow-xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#6B9FBF] transition-colors" />

            <input
              type="text"
              placeholder="Cari berdasarkan nama atau username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs md:text-sm text-white placeholder:text-gray-500 focus:border-[#6B9FBF]/60 focus:outline-none transition-all"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                title="Hapus kata kunci"
                aria-label="Hapus pencarian"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Friends Profile Cards */}
        {filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredFriends.map((friend) => (
              <div
                key={friend.username}
                onClick={() => setSelectedFriend(friend)}
                className="group relative bg-[#222222]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#6B9FBF]/40 hover:bg-[#262626] shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Avatar and GitHub Button */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-[#1A1A1A] shrink-0 group-hover:border-[#6B9FBF]/50 transition-colors">
                      <Image
                        src={friend.avatarUrl}
                        alt={friend.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>

                    <a
                      href={friend.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-[#6B9FBF] hover:border-[#6B9FBF] text-gray-400 hover:text-white transition-all duration-300"
                      title={`Buka profil GitHub @${friend.username}`}
                      aria-label={`Buka profil GitHub @${friend.username}`}
                    >
                      <Github size={18} />
                    </a>
                  </div>

                  {/* Name and Username */}
                  <div className="mb-3">
                    <h2 className="text-base md:text-lg font-bold text-white group-hover:text-[#6B9FBF] transition-colors leading-snug">
                      {friend.name}
                    </h2>

                    <p className="text-xs font-mono text-gray-400">
                      @{friend.username}
                    </p>
                  </div>

                  {/* Bio */}
                  {friend.bio && (
                    <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {friend.bio}
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 mt-2">
                  {friend.location ? (
                    <div className="flex items-center gap-1.5 font-mono text-gray-400">
                      <MapPin size={12} className="text-[#6B9FBF]" />

                      <span className="truncate max-w-[140px]">
                        {friend.location}
                      </span>
                    </div>
                  ) : (
                    <span className="font-mono text-gray-400">
                      Developer
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 font-semibold text-[#6B9FBF] group-hover:text-white transition-colors">
                    Detail
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Result */
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-[#222222]/30 mb-16">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />

            <h3 className="text-base font-semibold text-white mb-1">
              Tidak Ada Teman Ditemukan
            </h3>

            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5">
              Tidak ada teman yang cocok dengan pencarian &quot;
              {searchQuery}
              &quot;.
            </p>

            <button
              onClick={resetSearch}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white rounded-xl transition-all"
            >
              <X size={14} />
              Reset Pencarian
            </button>
          </div>
        )}
      </main>

      {/* Friend Profile Detail Modal */}
      {selectedFriend && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedFriend(null)}
        >
          <div
            className="relative bg-[#222222] border border-[#6B9FBF]/40 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Decoration */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6B9FBF] to-[#8FC5F0]" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedFriend(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Tutup detail profil"
            >
              <X size={18} />
            </button>

            {/* Friend Profile Detail */}
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-[#6B9FBF] shadow-2xl bg-[#1A1A1A]">
                <Image
                  src={selectedFriend.avatarUrl}
                  alt={selectedFriend.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white leading-snug">
                  {selectedFriend.name}
                </h2>

                <p className="text-xs font-mono text-[#6B9FBF]">
                  @{selectedFriend.username}
                </p>
              </div>

              {selectedFriend.bio && (
                <p className="text-xs text-gray-300 leading-relaxed max-w-sm px-3 py-3 bg-[#1A1A1A] rounded-xl border border-white/5">
                  &quot;{selectedFriend.bio}&quot;
                </p>
              )}

              {selectedFriend.location && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-black/30 px-3 py-1 rounded-full border border-white/5">
                  <MapPin size={12} className="text-[#6B9FBF]" />

                  <span>{selectedFriend.location}</span>
                </div>
              )}

              {/* GitHub Button */}
              <div className="w-full pt-4 border-t border-white/5">
                <a
                  href={selectedFriend.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#6B9FBF] hover:bg-[#5a8fae] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#6B9FBF]/20 active:scale-95"
                >
                  <Github size={16} />

                  Buka Profil GitHub @{selectedFriend.username}

                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
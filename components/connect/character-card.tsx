"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Friend } from "./data";

export function CharacterCard({
  friend,
  onSelect,
}: {
  friend: Friend;
  onSelect: (f: Friend) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(friend)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="group relative flex flex-col items-start text-left gap-3 p-4 bg-white border-2 border-[#F0C8DF] rounded-2xl shadow-[4px_4px_0px_#F0C8DF] transition-all duration-200 w-full min-h-[13rem] hover:border-[#FF75B9] hover:shadow-[6px_6px_0px_#FF75B9] hover:-translate-y-1"
      aria-label={`Buka adegan ${friend.name}`}
    >
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden border-2 bg-[#FFE3F1] shrink-0"
        style={{ borderColor: friend.accent }}
      >
        <Image
          src={friend.avatarUrl}
          alt={friend.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 w-full">
        <p className="font-sora font-extrabold text-[#302432] text-sm truncate">
          {friend.name}
        </p>
        <p className="text-[11px] font-mono truncate" style={{ color: friend.accent }}>
          @{friend.username}
        </p>
        {friend.bio && (
          <p className="text-[11px] text-[#806D7D] font-inter leading-snug mt-1 line-clamp-2">
            {friend.bio}
          </p>
        )}
      </div>

      <div className="mt-auto flex w-full items-center justify-between gap-1 pt-1">
        <span
          className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded border"
          style={{ color: friend.accent, borderColor: `${friend.accent}44` }}
        >
          {friend.zone}
        </span>
        {friend.location && (
          <span className="text-[10px] font-mono text-[#806D7D] flex items-center gap-1 truncate">
            <MapPin size={9} className="shrink-0" />
            <span className="truncate">{friend.location}</span>
          </span>
        )}
      </div>

      <span
        aria-hidden="true"
        className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#79E7E5]"
      />
      <span className="sr-only">Open VN scene</span>
    </motion.button>
  );
}

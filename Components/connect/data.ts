"use client";

export type Zone = "sunlight" | "twilight" | "abyss";

export interface Friend {
  id: string;
  name: string;
  username: string;
  bio: string;
  location?: string;
  avatarUrl: string;
  githubUrl: string;
  zone: Zone;
  accent: string;
}

export const FRIENDS: Friend[] = [
  {
    id: "barabr0",
    name: "Bara",
    username: "Barabr0",
    bio: "My daily life its usually @NLFTs @godotengine @laravel @blender",
    location: "Bandung",
    avatarUrl: "https://avatars.githubusercontent.com/u/228843429?v=4",
    githubUrl: "https://github.com/Barabr0",
    zone: "sunlight",
    accent: "#F54DAD",
  },
  {
    id: "davingm",
    name: "Kinn",
    username: "davingm",
    bio: "Sure..... @nuxt @nlfts @vuejs",
    location: "Shenzhen, China",
    avatarUrl: "https://avatars.githubusercontent.com/u/228851591?v=4",
    githubUrl: "https://github.com/davingm",
    zone: "sunlight",
    accent: "#63CBA8",
  },
  {
    id: "destkaa",
    name: "KakaViangi",
    username: "Destkaa",
    bio: "Orang terkuat adalah dia yang paling mampu berdiri sendiri. @NFLTs",
    location: "Bandung, Indonesia",
    avatarUrl: "https://avatars.githubusercontent.com/u/228332586?v=4",
    githubUrl: "https://github.com/Destkaa",
    zone: "twilight",
    accent: "#A993FF",
  },
  {
    id: "nairha",
    name: "azunya",
    username: "nairha",
    bio: "Harum dan wangi @NLFTs @nuxt",
    location: "Indonesia, Yogyakarta",
    avatarUrl: "https://avatars.githubusercontent.com/u/204519754?v=4",
    githubUrl: "https://github.com/nairha",
    zone: "twilight",
    accent: "#79E7E5",
  },
  {
    id: "radiedtya",
    name: "Radiedtya",
    username: "Radiedtya",
    bio: "Just a Rocky",
    location: "Bandung",
    avatarUrl: "https://avatars.githubusercontent.com/u/226198461?v=4",
    githubUrl: "https://github.com/Radiedtya",
    zone: "twilight",
    accent: "#A993FF",
  },
  {
    id: "sidiktsq",
    name: "Siddiq",
    username: "sidiktsq",
    bio: "github brother in arms",
    location: "Kyoto",
    avatarUrl: "https://avatars.githubusercontent.com/u/230048582?v=4",
    githubUrl: "https://github.com/sidiktsq",
    zone: "abyss",
    accent: "#F54DAD",
  },
];

export const DIALOGUE: Record<string, string[]> = {
  barabr0: [
    "Eh, lo ketemu Bara.",
    "Hari-harinya biasanya sama Godot, Laravel, dan Blender.",
    "Dari Bandung, teman ngoding yang solid.",
  ],
  davingm: [
    "Ini Kinn.",
    "Rame banget sama Nuxt sama Vue.",
    "Base-nya jauh, di Shenzhen.",
  ],
  destkaa: [
    "KakaViangi.",
    "Kata dia, orang terkuat adalah yang paling mampu berdiri sendiri.",
    "Sama-sama dari Bandung.",
  ],
  nairha: [
    "Ini azunya.",
    "Asalnya dari Yogyakarta.",
    "Sering main di dunia Nuxt bareng.",
  ],
  radiedtya: [
    "Radiedtya. Just a Rocky, kata dia.",
    "Orangnya solid, dari Bandung.",
  ],
  sidiktsq: [
    "Siddiq, github brother in arms.",
    "Katanya sekarang dari Kyoto.",
    "Partner ngoprek repo.",
  ],
};

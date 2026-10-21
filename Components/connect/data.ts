"use client";

export type Zone = "sunlight" | "twilight" | "abyss";

export type MascotExpression = "body" | "smile" | "nope" | "chibi1" | "chibi2";

export const MASCOT_IMAGES: Record<MascotExpression, string> = {
  body: "/mascot/body-mascot.webp",
  smile: "/mascot/smile-mascot.webp",
  nope: "/mascot/nope-mascot.webp",
  chibi1: "/mascot/chibi-mascot1.webp",
  chibi2: "/mascot/chibi-mascot2.webp",
};

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

export interface DialogueStep {
  speaker: string;
  text: string;
  expression: MascotExpression;
  tag?: string;
}

export interface WelcomeTopic {
  id: string;
  title: string;
  badge: string;
  steps: DialogueStep[];
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

// Rich, multi-page visual novel dialogue for each friend dossier
export const STRUCTURED_DIALOGUE: Record<string, DialogueStep[]> = {
  barabr0: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Sistem mendeteksi entri untuk Bara (@Barabr0)! Salah satu kawan dekat Nafis yang berbasis di Bandung.",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Catatan bio mencatat: 'My daily life its usually @NLFTs @godotengine @laravel @blender'. Hari-harinya diisi eksplorasi game development di Godot, backend Laravel, dan visual 3D Blender.",
      tag: "TECH_STACK",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi1",
      text: "Tergolong dalam Sunlight Zone karena kontribusinya yang aktif dan terbuka di ekosistem open-source. Kamu bisa meninjau langsung proyek kreasinya di profil GitHub Bara!",
      tag: "ZONE_INFO",
    },
  ],
  davingm: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Ini dia Kinn (@davingm)! Salah satu partner ngoding Nafis dengan koordinat terjauh di jaringan ini—berbasis di Shenzhen, China.",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Fokus dan minat utamanya banyak berkutat di ekosistem modern Nuxt.js dan Vue.js bersama lingkaran @NLFTs. Bio khasnya ringkas: 'Sure..... @nuxt @nlfts @vuejs'.",
      tag: "TECH_STACK",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi2",
      text: "Meskipun terpisah jarak antaranegara, sinergi repositori dan kode di GitHub tetap terhubung tanpa batas geografis. Yuk kunjungi profil GitHub Kinn!",
      tag: "ZONE_INFO",
    },
  ],
  destkaa: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Memuat berkas KakaViangi (@Destkaa)! Berada di Twilight Zone dan sama-sama berasal dari Bandung, Indonesia.",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Prinsip yang tertera di bio-nya cukup berkesan: 'Orang terkuat adalah dia yang paling mampu berdiri sendiri'. Rekan seperjuangan di lingkaran @NFLTs.",
      tag: "MOTTO",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi1",
      text: "Twilight Zone menggambarkan karakter mandiri yang fokus mendalam, namun selalu siap bersinergi saat repositori membutuhkan kolaborasi. Simak jejak kodenya di bawah!",
      tag: "ZONE_INFO",
    },
  ],
  nairha: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Mendeteksi azunya (@nairha)! Rekan kolaborator yang bertempat di Yogyakarta, Indonesia.",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi2",
      text: "Bio-nya bernada ceria: 'Harum dan wangi @NLFTs @nuxt'. Kerap bereksplorasi di ranah antarmuka web modern bersama Nuxt.js.",
      tag: "TECH_STACK",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Nuansa Yogyakarta yang bersahabat dipadukan dengan semangat ngoding komunitas. Jangan ragu untuk menyapa dan melihat repositori kreasinya di GitHub!",
      tag: "ZONE_INFO",
    },
  ],
  radiedtya: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Membuka dossier Radiedtya (@Radiedtya). Teman dari Bandung yang punya karakter tenang dan terpercaya.",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi1",
      text: "Deskripsi profilnya lugas: 'Just a Rocky'. Sosok yang kokoh seperti karang dalam menghadapi debugging dan alur logika sistem.",
      tag: "PROFILE",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Rekan yang selalu bisa diandalkan untuk bertukar ide dan solusi teknis praktis. Telusuri profil GitHub Radiedtya lewat tautan di bawah!",
      tag: "ZONE_INFO",
    },
  ],
  sidiktsq: [
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "chibi1",
      text: "Kamu telah memasuki Abyss Zone dan menemukan berkas Siddiq (@sidiktsq)!",
      tag: "DISCOVERY",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "body",
      text: "Statusnya tercatat sebagai 'github brother in arms' dengan koordinat lokasi di Kyoto. Kawan sejati dalam membedah repositori dan menyelesaikan tantangan rumit.",
      tag: "BROTHER_IN_ARMS",
    },
    {
      speaker: "MASCOT // NAFIS.EXE",
      expression: "smile",
      text: "Kedalaman Abyss Zone menyimpan kolaborasi dan petualangan eksplorasi teknologi yang seru. Mari kunjungi repositori GitHub Siddiq!",
      tag: "ZONE_INFO",
    },
  ],
};

// Legacy fallback dictionary
export const DIALOGUE: Record<string, string[]> = Object.fromEntries(
  Object.entries(STRUCTURED_DIALOGUE).map(([k, steps]) => [k, steps.map((s) => s.text)])
);

// Welcome scene topics for interactive mascot dialogue before selecting a card
export const WELCOME_TOPICS: WelcomeTopic[] = [
  {
    id: "welcome",
    title: "Salam Pembuka",
    badge: "SYS://GREETING",
    steps: [
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "smile",
        text: "Halo, pengelana internet! Aku maskot resmi NAFIS.EXE yang bertugas memandu direktori jaringan Connect.",
        tag: "WELCOME",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "body",
        text: "Di halaman ini, kamu bisa berinteraksi langsung denganku dan menjelajahi profil rekan-rekan pengembang, kreator, dan sahabat seperjuangan Nafis.",
        tag: "OVERVIEW",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "chibi1",
        text: "Pilih topik obrolan di bawah untuk mendengar ceritaku, atau langsung klik salah satu kartu karakter di bawah untuk membuka dossier visual novel mereka!",
        tag: "GUIDE",
      },
    ],
  },
  {
    id: "network",
    title: "Koneksi & NLFTs",
    badge: "SYS://NETWORK",
    steps: [
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "smile",
        text: "Teman-teman di direktori ini adalah sahabat dan kolaborator nyata yang saling terhubung melalui repositori GitHub, proyek bersama, dan komunitas seperti NLFTs.",
        tag: "COMMUNITY",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "body",
        text: "Mulai dari Bandung, Yogyakarta, hingga Shenzhen dan Kyoto—kami berbagi antusiasme yang sama terhadap web development, game engine, dan retro cyber aesthetics.",
        tag: "GLOBAL",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "chibi2",
        text: "Silakan telusuri karya-karya mereka dan jangan ragu untuk memberikan bintang (star) serta follow profil GitHub mereka!",
        tag: "SUPPORT",
      },
    ],
  },
  {
    id: "zones",
    title: "Sistem Tiga Zona",
    badge: "SYS://ZONES",
    steps: [
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "body",
        text: "Karakter di direktori ini dikelompokkan ke dalam 3 zona tematik: Sunlight, Twilight, dan Abyss.",
        tag: "ZONES_INTRO",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "chibi1",
        text: "Sunlight Zone melambangkan mereka yang berada di garis depan frontend dan visual interaktif. Twilight Zone mencakup eksplorasi mandiri dan arsitektur logika yang tenang.",
        tag: "SUN_TWILIGHT",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "smile",
        text: "Sedangkan Abyss Zone adalah zona eksplorasi kode yang mendalam! Setiap zona memiliki warna aksen dan identitas unik tersendiri.",
        tag: "ABYSS",
      },
    ],
  },
  {
    id: "secrets",
    title: "Rahasia Sistem?",
    badge: "SYS://RESTRICTED",
    steps: [
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "nope",
        text: "E-eh?! Data terenkripsi level 4! Jangan sembarangan mencoba mengakses direktori rahasia NAFIS.EXE ya! (＞﹏＜)",
        tag: "DENIED",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "chibi2",
        text: "Tapi kalau kamu berhasil menjelajahi semua sudut portfolio ini... mungkin status sistem akan memicu respons tersembunyi yang menarik!",
        tag: "HINT",
      },
      {
        speaker: "MASCOT // NAFIS.EXE",
        expression: "smile",
        text: "Hehehe, sekarang coba pilih salah satu kartu teman di bawah dan mari kita bedah profil GitHub mereka bareng-bareng!",
        tag: "LET_GO",
      },
    ],
  },
];

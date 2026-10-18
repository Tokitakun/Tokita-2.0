import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/cursor";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#FF75B9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NAFIS.EXE | Muhammad Nafis | Front-End Developer & UI/UX Enthusiast",
  description: "Personal developer portfolio of Muhammad Dzurunnafis Khairuddin (Nafis / Tokita). Inspired by NEEDY STREAMER OVERLOAD, retro internet culture, and kawaii cyber aesthetics.",
  authors: [{ name: "Muhammad Dzurunnafis Khairuddin", url: "https://github.com/Tokitakun" }],
  keywords: ["NAFIS.EXE", "Tokita", "Muhammad Nafis", "Frontend Developer", "Next.js", "React", "TypeScript", "Portfolio", "UI/UX", "Kawaii Cyber", "Needy Streamer Overload"],
  openGraph: {
    title: "NAFIS.EXE | Muhammad Nafis | Front-End Developer & UI/UX Enthusiast",
    description: "Welcome to my little corner of the internet. Creative developer portfolio featuring interactive desktop windows, live projects, and digital stories.",
    type: "website",
    locale: "id_ID",
    url: "https://tokita.vercel.app",
    siteName: "NAFIS.EXE Portfolio",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#FFF4FA] text-[#302432] selection:bg-[#FF75B9] selection:text-[#FFFFFF] min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}